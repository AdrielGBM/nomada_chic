function getProductList() {
    const shoppingCartProductsDiv = document.getElementById("shopping-cart-products")
    fetch("http://localhost:3000/shoppingCartProducts").then((res) => {
        if (res.ok) {
            res.json().then((products) => {
                console.log(products)
                for (const id in products) {
                    if (products.hasOwnProperty(id)) {
                        const product = products[id];
                        shoppingCartProductsDiv.innerHTML += `
                        <div class="row container space border shadow">
                            <img class="small-product" src="${product.image}" alt="Producto">
                            <p class="center-text">${product.price.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
                            <div>
                                <input id="${id}" type="number" class="medium-text center-text primary" value="1" min="1" max="24">
                            </div>
                            <p class="center-text">${product.price.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
                            <i class= "fa-solid fa-trash-can"></i>
                        </div>
                        `
                    }
                }
            })
        }
    })
}

window.addEventListener("load", getProductList)