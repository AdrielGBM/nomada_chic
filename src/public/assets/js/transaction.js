function deleteShoppingCart() {
    fetch(`http://localhost:3000/deleteShoppingCart`).then((res) => {
    })
}

window.addEventListener("load", deleteShoppingCart)