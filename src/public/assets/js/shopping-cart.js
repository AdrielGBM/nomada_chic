function getProductList() {
    const shoppingCartProductsDiv = document.getElementById("shopping-cart-products");
    const subtotalP = document.getElementById("subtotal");
    const totalP = document.getElementById("total");
    const payButton = document.getElementById("pay");
    let subtotal = 0;

    fetch("http://localhost:3000/shoppingCartProducts").then((res) => {
        if (res.ok) {
            res.json().then((products) => {
                if (Object.keys(products).length === 0) {
                    shoppingCartProductsDiv.innerHTML += `
                    <p class="medium-text center-text padding">Agregue productos al carrito de compras.</p>
                    `;
                } else {
                    for (const id in products) {
                        if (products.hasOwnProperty(id)) {
                            const product = products[id];
                            if (product.quantity === undefined) {
                                product.quantity = 1;
                                addProductQuantity(id, 1)
                            }
                            const productSubTotal = product.price * product.quantity;
                            subtotal += productSubTotal;
                            shoppingCartProductsDiv.innerHTML += `
                            <div class="row container space border shadow">
                                <a href="/detail-${id}">
                                    <img class="small-product" src="${product.image}" alt="Producto">
                                </a>
                                <div class="column center">
                                    <p class="center-text">${product.price.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
                                </div>
                                <div class="column center">
                                    <input id="${id}-quantity" type="number" class="medium-text center-text primary set-quantity" value="${product.quantity}" min="1" max="24">
                                </div>
                                <div class="column center">
                                    <p id="${id}-subtotal" class="center-text">${productSubTotal.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
                                </div>
                                <button id="${id}" class="no-border primary delete-product">
                                    <i class="fa-solid fa-trash-can" for="${id}"></i>
                                </button>
                            </div>
                            `;
                        }
                    }
                    subtotalP.innerHTML = subtotal.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'});
                    totalP.innerHTML = (subtotal + 5990).toLocaleString('es-CL', {style: 'currency', currency: 'CLP'});
                    payButton.addEventListener("click", paymentProcess)
                    const inputs = document.querySelectorAll(".set-quantity")
                    inputs.forEach((input) => {
                        input.addEventListener("input", setProductQuantity)
                    })
                    const buttons = document.querySelectorAll(".delete-product")
                    buttons.forEach((button) => {
                        button.addEventListener("click", deleteProductFromShoppingCart)
                    })
                }
            })
        }
    })
}

function addProductQuantity(id, quantity) {
    const product = {
        "productId": id,
        "productQuantity": quantity
    };
    fetch("http://localhost:3000/setProductQuantity", {
        method: "POST",
        body: JSON.stringify(product)
    })
}

function setProductQuantity(event) {
    const input = event.target;
    const productId = input.id.split("-")[0];
    let productQuantity = input.value;
    if (productQuantity > 12) {
        productQuantity = 12;
    } else if (productQuantity < 1) {
        productQuantity = 1;
    }
    const product = {
        "productId": productId,
        "productQuantity": productQuantity
    };
    fetch("http://localhost:3000/setProductQuantity", {
        method: "POST",
        body: JSON.stringify(product)
    })
    setProductSubTotal(productId, productQuantity)
}

function setProductSubTotal(id, quantity) {
    const productQuantity = document.getElementById(`${id}-quantity`);
    const productSubTotal = document.getElementById(`${id}-subtotal`);
    fetch(`http://localhost:3000/product/${id}`).then((res) => {
        if (res.ok) {
            res.json().then((product) => {
                productQuantity.value = quantity
                productSubTotal.innerHTML = (product.price * product.quantity).toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})
            })
        }
    })
    setSummaryPrices()
}

function setSummaryPrices() {
    const subtotalP = document.getElementById("subtotal");
    const totalP = document.getElementById("total");
    let subtotal = 0;
    fetch("http://localhost:3000/shoppingCartProducts").then((res) => {
        if (res.ok) {
            res.json().then((products) => {
                for (const id in products) {
                    if (products.hasOwnProperty(id)) {
                        const product = products[id];
                        const productSubTotal = product.price * product.quantity;
                        subtotal += productSubTotal;
                    }
                }
                subtotalP.innerHTML = subtotal.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'});
                totalP.innerHTML = (subtotal + 5990).toLocaleString('es-CL', {style: 'currency', currency: 'CLP'});
            })
        }
    })
}

function deleteProductFromShoppingCart(event) {
    const shoppingCartProductsDiv = document.getElementById("shopping-cart-products");
    const button = event.target.closest(".no-border");
    const productId = {"productId": button.id};
    fetch("http://localhost:3000/deleteProductFromShoppingCart", {
        method: "POST",
        body: JSON.stringify(productId)
    })
    button.closest(".container").remove();
    if (shoppingCartProductsDiv.childElementCount <= 1) {
        shoppingCartProductsDiv.innerHTML += `
        <p class="medium-text center-text padding">Agregue productos al carrito de compras.</p>
        `;
    }
}

async function paymentProcess() {
    const res = await fetch("http://localhost:3000/payment-process", {
        method: "POST",
        body: JSON.stringify({"message": "Se está intentando realizar una transacción."})
    })
    const data = await res.json()
    window.location.href = data.url
}

window.addEventListener("load", getProductList)