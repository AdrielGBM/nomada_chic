class SimpleHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <header class="row container header-padding center shadow secondary">
            <div class="row center">
                <a href="/">
                    <img class="medium-size" src="assets/images/light-logo.png">
                </a>
            </div>
        </header>
        `
    }
}

customElements.define("simple-header-component", SimpleHeader);