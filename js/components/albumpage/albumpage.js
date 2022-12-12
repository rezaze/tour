const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="./node_modules/bootstrap-icons/font/bootstrap-icons.css">
<link rel="stylesheet" href="./js/components/albumpage/albumpage.css">
    
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Album</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
        <nav class="header-nav navbar navbar-expand justify-content-center w-100">
            <div class="navbar-nav w-100 justify-content-center">
                <a class="nav-link option-bar mx-1 active pb-1" href="">All</a>
                <a class="nav-link option-bar mx-1" href="">Nature</a>
                <a class="nav-link option-bar mx-1" href="">Historical</a>
                <a class="nav-link option-bar mx-1" href="">City</a>
            </div>
    </nav>
    <div class="photo-box row">
        
    </div>
    </div>
        <div class="modal-footer">
    </div>
`;


export default class AlbunPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        const photoBox = this.shadowRoot.querySelector('.photo-box');
        const groupLink = this.shadowRoot.querySelectorAll('.nav-link');
        let imageBox = JSON.parse(this.dataset.arr.split(','));

        groupLink.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                groupLink.forEach(linkActive => {
                    linkActive.classList.remove('active');
                });
                link.classList.add('active');
                let fillterImage = imageBox.filter(e => e.group === link.innerHTML.toLowerCase());
                fillterImage.length === 0 ?
                    this.showImages(imageBox, photoBox) :
                    this.showImages(fillterImage, photoBox);
            })
        })

        this.showImages(imageBox, photoBox);
    }

    showImages(arr, element) {
        element.innerHTML = '';
        arr.forEach(image => {
            element.insertAdjacentHTML('beforeend', `
        <div class="photo-bar px-1 col-6 col-md-4 col-lg-3 my-2" style="height: 200px;">    
            <img class="img-fluid h-100 w-100" src="${image.image}" alt='${image.group}' >
        </div>
    `)
        })
    }

    static observedAttributes = () => ["album-bar"]

}