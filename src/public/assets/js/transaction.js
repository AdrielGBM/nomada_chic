const ip = "localhost"
function deleteShoppingCart() {
    fetch(`http://${ip}:3000/deleteShoppingCart`).then((res) => {
    })
}

window.addEventListener("load", deleteShoppingCart)