class Head extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <title>Nómada Chic</title>
        
        <link rel="apple-touch-icon" sizes="180x180" href="assets/images/icon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="assets/images/icon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="assets/images/icon/favicon-16x16.png">
        <link rel="manifest" href="assets/images/icon/site.webmanifest">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Catamaran'>
        <link rel="stylesheet" href="assets/styles/style.css"/>
        `
    }
}

customElements.define("head-component", Head);