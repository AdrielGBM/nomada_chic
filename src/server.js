const express = require('express');
const app = express();
const port = 3000

const routes = require('./routes/routes');
app.use(routes)
app.use(express.static('./src/public'));

app.use("/", routes)
app.use("/login", routes)
app.use("/register", routes)
app.use("/account", routes)

app.use("/search", routes)
app.use("/detail", routes)
app.use("/shopping-cart", routes)
app.use("/payment-process", routes)
app.use("/transaction", routes)

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})