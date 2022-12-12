const template = document.createElement('template');
const ModalBox = document.getElementById('signin-modal-box');
const signinLink = document.getElementById('signin-link');

template.innerHTML = `
<link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="./node_modules/bootstrap-icons/font/bootstrap-icons.css">
<link rel="stylesheet" href="./js/components/signinpage/signinpage.css">
    
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Sign In</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
        <label for="user-name" class="form-label">user name</label>
        <div class="input-group">
            <input type="text" id="user-name" class="form-control" placeholder="username">
        </div>
        <label for="user-email" class="form-label">user email</label>
        <div class="input-group">
            <input type="email" id="user-email" class="form-control" placeholder="Enter Your Email">
            <span class="input-group-text" id="basic-addon2">example@gmail.com</span>
        </div>
        <label for="user-pass" class="form-label">user password</label>
        <div class="row">
            <div class=" my-1 col-md input-group">
                <input type="password" id="user-pass" class="form-control pass" placeholder="Enter Your Password">
                <span class="bi bi-eye ms-2"></span>
            </div>
            <div class="col-md my-1 input-group">
                <input type="password" id="repeat-pass" class="form-control pass" placeholder="Repeat Password">
            </div>
        </div>
        <div class="progress my-3" style="height: 5px;>
            <div class="progress-bar" role="progressbar" id='progress' aria-valuemax="100"></div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="w-50 m-auto">
            <button class="btn btn-outline-dark w-100 py-2 px-4" id="signin-btn">Sign In</button>
        </div>
    </div>
`;


export default class SignInPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        const inputPass = this.shadowRoot.querySelectorAll('.pass');
        const setTypeInput = this.shadowRoot.querySelector('.bi');
        const userEmail = this.shadowRoot.getElementById('user-email');
        const userPass = this.shadowRoot.getElementById('user-pass');
        const repeatPass = this.shadowRoot.getElementById('repeat-pass');
        const userName = this.shadowRoot.getElementById('user-name');
        const signInBtn = this.shadowRoot.getElementById('signin-btn');
        const inputs = this.shadowRoot.querySelectorAll('input');
        const progressBar = this.shadowRoot.getElementById('progress');

        let score = 0;

        var myModal = new bootstrap.Modal(ModalBox, {
            keyboard: false
        })

        inputs.forEach(input => {
            input.addEventListener('focus', (e) => e.target.style.boxShadow = '');
        })


        userPass.addEventListener('input', e => {
            if (!e.target.value.trim().match(/\s/)) {
                score = e.target.value.length;
                if (e.target.value.match(/[A-Z]/)) {
                    score = score + 6;
                }
                if (e.target.value.match(/[a-z]/)) {
                    score = score + 6;
                }
                if (e.target.value.match(/\W/)) {
                    score = score + 10;
                }
            } else {
                score = 0;
            }
            score >= 1 && score <= 8 ? this.showSecurityPass(progressBar, 'red', 25) :
                score > 8 && score <= 16 ? this.showSecurityPass(progressBar, 'orange', 50) :
                    score > 16 && score <= 29 ? this.showSecurityPass(progressBar, 'yellow', 75) :
                        score >= 30 ? this.showSecurityPass(progressBar, 'green', 100) :
                            this.showSecurityPass(progressBar, 'none', 0);
        })


        signInBtn.addEventListener('click', (e) => {

            (userName.value.length < 4 || userName.value.trim().match(/\s/)) && this.inputStyle(userName);

            (score < 30) && this.inputStyle(userPass);

            (!userEmail.value.includes('@gmail.com') || userEmail.value.trim().match(/\s/)) &&
                this.inputStyle(userEmail);



            if ((userName.value.length >= 5 && !userName.value.trim().match(/\s/)) &&
                (userEmail.value.includes('@gmail.com') && !userEmail.value.trim().match(/\s/)) &&
                score >= 30) {
                if (userPass.value === repeatPass.value) {
                    this.setCockie(3, userName.value, userPass.value, userEmail.value, '/');
                    location.reload(true);
                } else {
                    this.inputStyle(repeatPass)
                }
            }

        })

        setTypeInput.addEventListener('click', (e) => {
            inputPass.forEach(input => {
                input.type === 'password' ? this.set(input, e, 'text', 'bi bi-eye-slash ms-1') :
                    this.set(input, e, 'password', 'bi bi-eye ms-1')
            })
        });

    }

    set(input, e, type, eye) {
        input.type = type;
        e.target.className = eye;
    }

    inputStyle(element) {
        element.style.boxShadow = "2px 1px 3px red";
    }


    setCockie(day, userName, userPass, userEmail, path) {
        let nowTime = new Date();
        nowTime.setTime(nowTime.getTime() + day * 24 * 60 * 60 * 1000)
        document.cookie = `username=${userName};path=${path};expires=${nowTime}`;
        document.cookie = `password=${userPass};path=${path};expires=${nowTime}`;
        document.cookie = `email=${userEmail};path=${path};expires=${nowTime}`;
    }


    showSecurityPass(element, bgColor, size) {
        element.style.width = size + '%';
        element.style.backgroundColor = `${bgColor}`;
    }

    static observedAttributes = () => ["signin-page"]

}
