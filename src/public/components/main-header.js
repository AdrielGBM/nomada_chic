class MainHeader extends HTMLElement {
    constructor() {
        super();
        fetch(`http://${ip}:3000/isAuthenticated`).then((res) => {
            if (res.ok) {
                res.json().then((value) => {
                    if (value) {
                        this.innerHTML = `
                        <header class="row container header-padding center space shadow primary">
                            <div class="row center">
                                <a href="/">
                                    <img class="medium-size" src="assets/images/dark-logo.png">
                                </a>
                            </div>
                            <label class="row container center border large-product primary textfield" for="search-bar">
                                <input id="search-bar" type="text" class="small-text primary" placeholder="Buscar..."/>
                                <a class="primary" href="/search">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </a>
                            </label>
                            <div class="row container center">
                                <a class="primary" href="/shopping-cart">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                </a>
                                <i class="fa-solid fa-bars large-text"></i>
                            </div>
                        </header>
                        `
                    } else {
                        this.innerHTML = `
                        <header class="row container header-padding center space shadow primary">
                            <div class="row center">
                                <a href="/">
                                    <img class="medium-size" src="assets/images/dark-logo.png">
                                </a>
                            </div>
                            <label class="row container center border large-product primary textfield" for="search-bar">
                                <input id="search-bar" type="text" class="small-text primary" placeholder="Buscar..."/>
                                <a class="primary" href="/search">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </a>
                            </label>
                            <div class="row container center">
                                <div id="authentication" class="row container hide">
                                    <a class="border medium-text nowrap-text primary" href="/register">Registrarse</a>
                                    <a class="border medium-text nowrap-text secondary" href="/login">Iniciar sesión</a>
                                </div>
                                <a class="primary" href="/login">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                </a>
                                <i class="fa-solid fa-bars large-text"></i>
                            </div>
                        </header>
                        `
                    }
                })
            }
        })
    }
}

customElements.define("main-header-component", MainHeader);