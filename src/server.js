const express = require("express");
const cors = require("cors")
const fs = require('fs');
const Stripe = require("stripe")
const app = express();
const port = 3000
const stripe = new Stripe("sk_test_51PbooTRru8LiBYYNPfiDYrYBQrKQ1wd6SQJRTMxIw7JW9aWcYGlH4hG0D9x0yGb0O3SWcaD4L7AKntSry03Mqay900zDuclRY1");

const routes = require("./routes/routes");
const { send } = require("process");
app.use(routes)
app.use(express.static("./src/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({type:"*/*" }));
app.use(cors());

let products = JSON.parse(fs.readFileSync("src/product-list.json", "utf8"));
let isAuthenticated = false;
let shoppingCart = {};

app.use("/", routes)
app.use("/login", routes)
app.use("/register", routes)

app.use("/search", routes)
app.use("/detail-:productId", routes)

app.use("/shopping-cart", routes)
app.use("/transaction", routes)
app.use("/cancel", routes)

app.get('/products', (req, res) => {
    res.send(JSON.stringify(products));
})

app.get('/product/:productId', (req, res) => {
    const productId = req.params.productId || ""
    for (const id in products) {
        if (id === productId) {
            res.send(JSON.stringify(products[id]));
            break;
        }
    }
})

app.get("/isAuthenticated", (req, res) => {
    res.send(JSON.stringify(isAuthenticated));
})

app.get("/authenticate", (req, res) => { //No necesita ser POST ya que los formularios no son funcionales
    isAuthenticated = true;
    res.end();
})

app.post('/addToShoppingCart', (req, res) => {
    const productId = req.body.productId || "";
    let isEqual = false;
    for (const id in products) {
        if (id === productId) {
            if (shoppingCart.length > 0) {
                for (const product of shoppingCart) {
                    if (product === productId) {
                        isEqual = true;
                        break;
                    }
                }
            }
            if (!isEqual) {
                shoppingCart[id] = products[id];
            }
            break;
        }
    }
    res.end();
})

app.get('/shoppingCartProducts', (req, res) => {
    if (shoppingCart.length != 0) {
        res.send(JSON.stringify(shoppingCart));
    } else {
        res.end()
    }
})

app.post('/setProductQuantity', (req, res) => {
    const productId = req.body.productId || "";
    const productQuantity = req.body.productQuantity || "";
    if (shoppingCart.hasOwnProperty(productId)) {
        shoppingCart[productId].quantity = productQuantity;
    }
    res.end();
})

app.post('/deleteProductFromShoppingCart', (req, res) => {
    const productId = req.body.productId || "";
    if (shoppingCart.hasOwnProperty(productId)) {
        delete shoppingCart[productId];
    }
    res.end();
})

app.post("/payment-process", async (req, res) => {
    const shoppingCartProducts = []
    for (const product in shoppingCart) {
        shoppingCartProducts.push(
            {
                price_data: {
                    product_data: {
                        name: shoppingCart[product].name,
                        description: shoppingCart[product].description,
                    },
                    currency: 'clp',                    
                    unit_amount: shoppingCart[product].price,
                },
                quantity: shoppingCart[product].quantity,
            }
        )
    }
    shoppingCartProducts.push(
        {
            price_data: {
                product_data: {
                    name: "Costo por envío",
                    description: "Envío a todo Chile.",
                },
                currency: 'clp',                    
                unit_amount: 5990,
            },
            quantity: 1,
        }
    )
    const session = await stripe.checkout.sessions.create({
        line_items: shoppingCartProducts,
        mode: "payment",
        success_url:'http://localhost:3000/transaction',
        cancel_url: 'http://localhost:3000/cancel',
    })
    return res.json(session)
})

app.get('/deleteShoppingCart', (req, res) => {
    if (shoppingCart.length != 0) {
        for (const product in shoppingCart) {
            delete shoppingCart[product];
        }
    }
    res.end()
})

app.listen(port, () => {
    console.log("Server started at http://localhost:" + port);
})