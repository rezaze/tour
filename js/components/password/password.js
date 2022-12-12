const template = document.createElement('template');
const modalBox = document.getElementById('signin-modal-box');
const signinLink = document.getElementById('signin-link');
const modalBody = document.getElementById('signin-modal');

template.innerHTML = `
    <link rel="stylesheet" href="./js/components/password/password.css">
    <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="./node_modules/bootstrap-icons/font/bootstrap-icons.css">

    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
        <label for="user-pass" class="form-label">new password</label>
        <div class="row">
            <div class=" my-1 col-md input-group">
                <input type="password" id="user-pass" class="form-control pass" placeholder="Enter Your Password">
                <span class="bi bi-eye ms-2"></span>
            </div>
            <div class="col-md my-1 input-group">
                <input type="password" id="repeat-pass" class="form-control pass" placeholder="Repeat Password">
            </div>
        </div>
        <p href="" class="text-danger fade">Invalid Email</p>
        <div class="progress my-3" style="height: 5px;>
            <div class="progress-bar" role="progressbar" id='progress' aria-valuemax="100"></div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="w-50 m-auto">
            <button class="btn btn-outline-dark w-100 py-2 px-4" id="signin-btn">Log In</button>
        </div>
    </div>
`

class Password extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        const inputPass = this.shadowRoot.querySelectorAll('input');
        const setTypeInput = this.shadowRoot.querySelector('span');
        const userPass = this.shadowRoot.getElementById('user-pass');
        const modalTitle = this.shadowRoot.querySelector('.modal-title');
        const signInBtn = this.shadowRoot.getElementById('signin-btn');
        const paragrath = this.shadowRoot.querySelector('.text-danger');
        const progressBar = this.shadowRoot.getElementById('progress');
        const repeatPass = this.shadowRoot.getElementById('repeat-pass');
        const btnClose = this.shadowRoot.querySelector('.btn-close');

        let myModal = new bootstrap.Modal(modalBox, {
            keyboard: false
        })

        let coockieArr = document.cookie.split(';');
        let objectCookie = {};
        coockieArr.forEach(cookie => Object.assign(objectCookie, Object.fromEntries([cookie.trim().split('=')])))
        let { username } = objectCookie;


        let score = 0;


        inputPass.forEach(input => {
            input.addEventListener('focus', (e) => e.target.style.boxShadow = '');
        })

        if (!paragrath.className.includes('fade')) {
            setTimeout(e => {
                paragrath.classList.add('fade');
            }, 4000);
        }

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

        signInBtn.addEventListener('click', e => {
            if (score < 30) {
                this.showProblem(userPass, paragrath)
            } else {
                if (userPass.value === repeatPass.value) {
                    setCockie(3, userPass.value);
                    myModal.hide();
                    signinLink.innerHTML = username;
                } else {
                    this.inputStyle(repeatPass);
                }
            }


        })

        modalTitle.innerHTML = `${username}`;



        setTypeInput.addEventListener('click', (e) => {
            inputPass.forEach(input => {
                input.type === 'password' ? this.set(input, e, 'text', 'bi bi-eye-slash ms-1') :
                    this.set(input, e, 'password', 'bi bi-eye ms-1')
            })
        })
    }

    setCockie(day, userPass) {
        let nowTime = new Date();
        nowTime.setTime(nowTime.getTime() + day * 24 * 60 * 60 * 1000)
        document.cookie = `password=${userPass};path=${path};expires=${nowTime}`;
    }

    set(input, e, type, eye) {
        input.type = type;
        e.target.className = eye;
    }

    showSecurityPass(element, bgColor, size) {
        element.style.width = size + '%';
        element.style.backgroundColor = `${bgColor}`;
    }

    showProblem(element, text) {
        this.inputStyle(element);
        text.style.transition = 'all .5s';
        text.classList.remove('fade');
    }

    inputStyle(element) {
        element.style.boxShadow = "2px 1px 3px red";
    }


    static observedAttributes = () => ["password-bar"]

}

export default Password;