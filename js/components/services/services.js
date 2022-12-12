
const template = document.createElement('template');



template.innerHTML = `
    <link rel="stylesheet" href="./js/components/services/services.css">
    <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
    
    <div class="services-bar col-lg-8 row my-md-4 my-2 shadow-lg m-auto">
                <div class="services-image col-4">
                    <img class="w-100 h-100" src="" alt="">
                </div>
                <div class="services-content col-8">
                    <h3 class="services-title card-title my-2"></h3>
                    <p class="services-text card-text my-2"></p>
                    <a href='#' class='link'>more...</a>
                </div>
            </div>

            `


export default class Services extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        const showImage = this.shadowRoot.querySelector("img"),
            showTitle = this.shadowRoot.querySelector(".services-title"),
            showText = this.shadowRoot.querySelector(".services-text"),
            servicesBar = this.shadowRoot.querySelector('.services-bar');

        showImage.src = this.dataset.image;
        showTitle.innerHTML = this.dataset.title;
        showText.innerHTML = this.dataset.text;

        window.addEventListener('scroll', e => {
            if (480 <= window.scrollY) {
                servicesBar.style.animation = `scrollShow 3.4s`;
            }
        })
    }

    static observedAttributes = () => ["services-bar"]

}
