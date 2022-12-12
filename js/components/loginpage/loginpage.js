const template = document.createElement('template');
const modalBody = document.getElementById('signin-modal');
const modalBox = document.getElementById('signin-modal-box');
const signinLink = document.getElementById('signin-link');
const body = document.querySelector('body');


template.innerHTML = `
<link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="./node_modules/bootstrap-icons/font/bootstrap-icons.css">
<link rel="stylesheet" href="./js/components/loginpage/loginpage.css">
    
    <div class="modal-header">
        <h5 class="modal-title">Log In</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
        <label for="user-name" class="form-label">user name</label>
        <div class="input-group mb-3">
            <input type="text" id="user-name" class="form-control" placeholder="username">
        </div>
        <div class=" my-1 col-md input-group">
            <input type="password" id="user-pass" class="form-control" placeholder="Enter Your Password">
            <span class="bi bi-eye ms-2"></span>
        </div>
        <a href="" class="text-danger fade">Forget Your Password !?...</a>
    </div>
    <div class="modal-footer">
        <div class="w-50 m-auto">
            <button class="btn btn-outline-dark w-100 py-2 px-4" id="signin-btn">Log In</button>
        </div>
    </div>
`;


export default class LoginInPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        const setTypeInput = this.shadowRoot.querySelector('.bi');
        const userPass = this.shadowRoot.getElementById('user-pass');
        const userName = this.shadowRoot.getElementById('user-name');
        const signInBtn = this.shadowRoot.getElementById('signin-btn');
        const inputs = this.shadowRoot.querySelectorAll('input');
        const licnkCheck = this.shadowRoot.querySelector('.text-danger');

        let coockieArr = document.cookie.split(';');
        let objectCookie = {};
        coockieArr.forEach(cookie => Object.assign(objectCookie, Object.fromEntries([cookie.trim().split('=')])))
        let { username, password } = objectCookie;

        var myModal = new bootstrap.Modal(modalBox, {
            keyboard: false
        })


        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.style.boxShadow = '';

                const nextElmnt = e.path[1].nextElementSibling;

                nextElmnt.className.includes('text-danger') &&
                    nextElmnt.classList.add('fade');
            });
        })

        signInBtn.addEventListener('click', e => {
            userName.value !== username && this.inputStyle(userName);
            userPass.value !== password && this.showProblem(userPass, licnkCheck);

            if (userName.value === username && userPass.value === password) {
                myModal.hide();
                signinLink.innerHTML = username;
            }

        })

        setTypeInput.addEventListener('click', (e) => {
            userPass.type === 'password' ? this.set(userPass, e, 'text', 'bi bi-eye-slash ms-1') :
                this.set(userPass, e, 'password', 'bi bi-eye ms-1')
        });

        licnkCheck.addEventListener('click', e => {
            e.preventDefault();
            modalBody.innerHTML = `<email-page></email-page>`;
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

    set(input, e, type, eye) {
        input.type = type;
        e.target.className = eye;
    }

    static observedAttributes = () => ["login-page"]

}
