const ip = "localhost"
function getProduct() {
    const productId = ((window.location.href).split('-'))[1];
    const productName = document.getElementById("product-name")
    const productImage = document.getElementById("product-image")
    const productDescription = document.getElementById("product-description")
    const productPrice = document.getElementById("product-price")
    const productButton = document.getElementById("product-button")
    fetch(`http://${ip}:3000/product/${productId}`).then((res) => {
        if (res.ok) {
            res.json().then((product) => {
                productName.innerHTML = product.name
                productImage.src = product.image
                productDescription.innerHTML = product.description
                productPrice.innerHTML = product.price.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})
                productButton.addEventListener("click", addToShoppingCart)
            })
        }
    })
}

function addToShoppingCart() {
    const productId = {"productId": ((window.location.href).split('-'))[1]};
    fetch(`http://${ip}:3000/isAuthenticated`).then((res) => {
        if (res.ok) {
            res.json().then((value) => {
                if (value) {
                    fetch(`http://${ip}:3000/addToShoppingCart`, {
                        method: "POST",
                        body: JSON.stringify(productId)
                    })
                } else {
                    window.location.href = `http://${ip}:3000/login`
                }
            })
        }
    })
}

window.addEventListener("load", getProduct)