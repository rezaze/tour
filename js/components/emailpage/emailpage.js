const template = document.createElement('template');
const modalBody = document.getElementById('signin-modal');
const modalBox = document.querySelector('.modal');

template.innerHTML = `
<link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="./node_modules/bootstrap-icons/font/bootstrap-icons.css">
<link rel="stylesheet" href="./js/components/emailpage/emailpage.css">
    
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Login In</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
        <label for="user-email" class="form-label">user email</label>
        <div class="input-group">
            <input type="email" id="user-email" class="form-control" placeholder="Enter Your Email">
            <span class="input-group-text" id="basic-addon2">example@gmail.com</span>
        </div>
        <p href="" class="text-danger fade">Invalid Email</p>
    </div>
    <div class="modal-footer">
        <div class="w-50 m-auto">
            <button class="btn btn-outline-dark w-100 py-2 px-4" id="signin-btn">Log In</button>
        </div>
    </div>
`;


export default class EmailPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        const userEmail = this.shadowRoot.getElementById('user-email');
        const paragrath = this.shadowRoot.querySelector('.text-danger');
        const checkBtn = this.shadowRoot.getElementById('signin-btn');
        const btnClose = this.shadowRoot.querySelector('.btn-close');

        let myModal = new bootstrap.Modal(modalBox, {
            keyboard: false
        })

        let coockieArr = document.cookie.split(';');
        let objectCookie = {};
        coockieArr.forEach(cookie => Object.assign(objectCookie, Object.fromEntries([cookie.trim().split('=')])))
        let { email } = objectCookie;

        checkBtn.addEventListener('click',e=>{
            if (userEmail.value !== email) {
                this.showProblem(userEmail, paragrath);
            } else {
                modalBody.innerHTML = '<code-page></code-page>';
            }
        })

    }

    showProblem(element, text) {
        this.inputStyle(element);
        text.style.transition = 'all .5s';
        text.classList.remove('fade');
    }

    inputStyle(element) {
        element.style.boxShadow = "2px 1px 3px red";
    }

    static observedAttributes = () => ["email-page"]

}
