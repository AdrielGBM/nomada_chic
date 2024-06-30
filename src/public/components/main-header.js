class MainHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <header class="row container header-padding center space shadow primary">
            <div class="row center">
                <a href="/">
                    <img class="medium-size" src="assets/images/dark-logo.png">
                </a>
            </div>
            <label class="row container center border primary textfield" for="search-bar">
                <input id="search-bar" type="text" class="small-text primary" placeholder="Buscar..."/>
                <a class="primary" href="/search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </a>
            </label>
            <div class="row container center">
                <div class="row container hide">
                    <a class="border medium-text nowrap-text primary" href="/register">Registrarse</a>
                    <a class="border medium-text nowrap-text secondary" href="/login">Iniciar sesión</a>
                </div>
                <i class="fa-solid fa-bars large-text"></i>
            </div>
        </header>
        `
    }
}

customElements.define("main-header-component", MainHeader);