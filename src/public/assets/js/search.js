function getProductList() {
    const featuredProductsDiv = document.getElementById("products")
    fetch("http://localhost:3000/products").then((res) => {
        if (res.ok) {
            res.json().then((products) => {
                for (const id in products) {
                    if (products.hasOwnProperty(id)) {
                        const product = products[id];
                        featuredProductsDiv.innerHTML += `
                        <div class="column container-product center primary">
                            <a class="column container-product center primary" href="/detail-${id}">
                                <img class="product" src="${product.image}">
                                <p class="medium-text">${product.name}</p>
                                <p class="large-text">${product.price.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
                            </a>
                            <button class="border medium-text nowrap-text secondary shopping-cart">Añadir al carrito</button>
                        </div>
                        `
                    }
                }
            })
        }
    })
}

window.addEventListener("load", getProductList)