function getProductList() {
    const shoppingCartProductsDiv = document.getElementById("shopping-cart-products")
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
                            shoppingCartProductsDiv.innerHTML += `
                            <div class="row container space border shadow">
                                <img class="small-product" src="${product.image}" alt="Producto">
                                <p class="center-text">${product.price.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
                                <div>
                                    <input type="number" class="medium-text center-text primary" value="1" min="1" max="24">
                                </div>
                                <p class="center-text">${product.price.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
                                <button id="${id}" class="no-border primary delete-product">
                                    <i class="fa-solid fa-trash-can" for="${id}"></i>
                                </button>
                            </div>
                            `;
                        }
                    }
                    const buttons = document.querySelectorAll(".delete-product")
                    buttons.forEach((button) => {
                        button.addEventListener("click", deleteProductFromShoppingCart)
                    })
                }
            })
        }
    })
}

function deleteProductFromShoppingCart(event) {
    const shoppingCartProductsDiv = document.getElementById("shopping-cart-products")
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

window.addEventListener("load", getProductList)