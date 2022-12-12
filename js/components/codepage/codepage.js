const template = document.createElement('template');
const modalBody = document.getElementById('signin-modal');
const modalBox = document.querySelector('.modal');

template.innerHTML = `
<link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="./node_modules/bootstrap-icons/font/bootstrap-icons.css">
<link rel="stylesheet" href="./js/components/codepage/codepage.css">

    <div class="modal-header">
        <h5 class="modal-title">Log In</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
        <label for="user-code" id='timer-box' class="form-label">Code will be sent at 03:00</label>
        <div class="row mb-3">
            <input type="password" id="user-code" class="form-control" placeholder="Enter Code">
        </div>
    </div>
    <div class="modal-footer">
    </div>
`;


export default class CodePage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));
    }


    connectedCallback() {
        const userCode = this.shadowRoot.getElementById('user-code');
        const timerBox = this.shadowRoot.getElementById('timer-box');
        const btnClose = this.shadowRoot.querySelector('.btn-close');

        let myModal = new bootstrap.Modal(modalBox, {
            keyboard: false
        })


        let timeSec = 59;
        let timerMin = 2;

        let getCode = Math.floor(Math.random() * 1000);
        let randNum = Math.floor(Math.random() * 1000000);

        let timer = setInterval(() => {
            if (timeSec < 10) {
                timerBox.innerHTML = `Code will be sent at 0${timerMin}:0${timeSec}`;
            } else {
                timerBox.innerHTML = `Code will be sent at 0${timerMin}:${timeSec}`;
            }
            timeSec--;
            if (timeSec === 0) {
                timeSec = 60;
                timerMin--;
            }
            timerMin <= 0 && clearInterval(timer);
        }, 1000)

        console.log(getCode);
        setTimeout(() => {
            userCode.value = randNum;
            clearInterval(timer);
            setTimeout(() => {
                modalBody.innerHTML = `<password-bar></password-bar>`;
            }, 300)
        }, getCode)

    }
    static observedAttributes = () => ["code-page"]

}
