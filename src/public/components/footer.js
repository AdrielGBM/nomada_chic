class Footer extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <footer class="column container large-padding secondary">
            <div class="row wrap container space shadow secondary">
                <div class="column item">
                    <p class="vertical-padding large-text nowrap-text">CONTACTO</p>
                    <p>Avenida Las Condes Nro. 5000</p>
                    <p>+56 9 1234 5678</p>
                    <p>nomadechic@gmail.com</p>
                </div>
                <div class="column item">
                    <p class="vertical-padding large-text nowrap-text">REDES SOCIALES</p>
                    <div class="row container center">
                        <i class="fa-brands fa-facebook large-text"></i>
                        <i class="fa-brands fa-instagram large-text"></i>
                        <i class="fa-brands fa-twitter large-text"></i>
                    </div>
                </div>
                <div class="column center item">
                    <p class="vertical-padding large-text nowrap-text">METODOS DE PAGO</p>
                    <img class="medium-size" src="assets/images/webpay.png" alt="Webpay">
                </div>
                <div class="column item">
                    <img class="medium-size" src="assets/images/ssl.png" alt="Pago seguro">
                </div>
            </div>
            <div>
                <p class="center-text">&copy; NomadaChic.com</p>
                <p class="center-text">Tienda online de venta de bolsos y mochilas.</p>
            </div>
        <footer>
        `
    }
}

customElements.define("footer-component", Footer);