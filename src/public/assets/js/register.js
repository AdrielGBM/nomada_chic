function createEventListener() {
    const registerButton = document.getElementById("register");
    registerButton.addEventListener("click", authenticate);
}

function authenticate() {
    fetch("http://localhost:3000/authenticate").then((res) => {})
}

window.addEventListener("load", createEventListener)