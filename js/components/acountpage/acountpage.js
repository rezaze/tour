const template = document.createElement('template');
const modalBody = document.getElementById('signin-modal');
const modalBox = document.querySelector('.modal');

template.innerHTML = `
<link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="./node_modules/bootstrap-icons/font/bootstrap-icons.css">
<link rel="stylesheet" href="./js/components/acountpage/acountpage.css">

    <div class="modal-header">
    <div class='w-100' style='height:200px'>
    <img class='w-100 h-100 img-fluid' src='https://wallpaperaccess.com/full/110023.jpg'>
    </div>
    </div>
    <div class="modal-body">
        <div class='text-center'>
            <h2 class='user-name my-3'></h2>
            <h4 class='user-email my-3'></h4>
            <h3 class='user-location my-3'></h3>
            <a href='' class='nav-link my-3' id='link-bar'>change password ?<a>
        </div>
        <div class='text-center reserve-box bg-light my-5'>
            <h2 class='user-name my-3'>reserved tour</h2>
        </div>
    </div>
    <div class="modal-footer">
    </div>
`;


export default class AcountBox extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        const userName = this.shadowRoot.querySelector('.user-name');
        const userEmail = this.shadowRoot.querySelector('.user-email');
        const userLocation = this.shadowRoot.querySelector('.user-location');
        const linkBar = this.shadowRoot.getElementById('link-bar');
        const modalBar = this.shadowRoot.querySelector('.reserve-box');

        let coockieArr = document.cookie.split(';');
        let objectCookie = {};
        coockieArr.forEach(cookie => Object.assign(objectCookie, Object.fromEntries([cookie.trim().split('=')])))
        let { username, password, email, userreserve } = objectCookie;

        userName.innerHTML = username;
        userEmail.innerHTML = email;

        fetch('https://api.ipregistry.co/?key=ae71tv8q05lc8zmx')
            .then(response => response.json())
            .then((payload) => {
                userLocation.innerHTML = payload.location.country.name + ', ' + payload.location.city;
            }).catch(() => {
                userLocation.innerHTML = 'undefind';
            })

        linkBar.addEventListener('click', e => {
            e.preventDefault();
            modalBody.innerHTML = '<validation-pass-bar></validation-pass-bar>';
        })

        if (userreserve) {
            JSON.parse(userreserve).forEach(reserveBar=>{
                    modalBar.insertAdjacentHTML('beforeend', `
                    <div class="list-bar col-lg-8 row my-md-4 my-4 shadow-lg m-auto">
                    <div class="list-image col-4 px-0">
                        <img class="w-100 h-100" src="${reserveBar.image}" alt="">
                    </div>
                    <div class="list-content col-8 row text-center py-1 px-4">
                        <h4 class="list-place">${reserveBar.location}</h4>
                        <h5 class="list-tour ">${reserveBar.title}</h5>
                        <button class="btn ">
                            <span>$${reserveBar.price}</span>
                        </button>
                    </div>
                </div>
                    `)
            })
        }
    }
    static observedAttributes = () => ["acount-page"]

}
