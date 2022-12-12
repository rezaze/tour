import AcountBox from "./components/acountpage/acountpage.js";
import AlbunPage from "./components/albumpage/albumpage.js";
import CodePage from "./components/codepage/codepage.js";
import EmailPage from "./components/emailpage/emailpage.js";
import LoginInPage from "./components/loginpage/loginpage.js";
import Password from "./components/password/password.js";
import Services from "./components/services/services.js";
import SignInPage from "./components/signinpage/signinpage.js";
import ValidationPasswordPage from "./components/validationpasswordpage/validationpasswordpage.js";


window.addEventListener("load", () => {
    const $ = document;

    const headerNav = $.querySelector('.header-nav'),
        servicesBox = $.querySelector('.services-box'),
        descriptionBox = $.querySelector('.description-box'),
        hotelBox = $.getElementById('hotels'),
        btnBox = $.getElementById('btn-box'),
        tourListBox = $.querySelector('.tour-list-box'),
        tourBtnBox = $.querySelector('.tour-btn-box'),
        modalBody = $.querySelector('#tour-box'),
        accordion = $.getElementById('accordion'),
        buttonAdd = $.getElementById('button-add'),
        searchBox = $.getElementById('search-box'),
        optionBox = $.getElementById('option-box'),
        signinBody = $.getElementById('signin-modal'),
        signinLink = $.getElementById('signin-link'),
        reserveBox = $.getElementById('reserve-box'),
        albumBody = $.getElementById('album-body');

    const root = $.querySelector(':root');

    let pageIndex = null;
    let rowPage = null;
    let pageTourIndex = null;
    let rowTourPage = null;
    let userResevition = [];

    if ($.cookie) {
        var coockieArr = document.cookie.split(';');
        var objectCookie = {};
        coockieArr.forEach(cookie => Object.assign(objectCookie, Object.fromEntries([cookie.trim().split('=')])))
        var { username, password, userreserve } = objectCookie;
        if (userreserve) {
            userResevition = JSON.parse(userreserve);
        }
        if(username){
            signinLink.innerHTML = 'Login';
            signinBody.innerHTML = '<login-page></login-page>';
        }
    }

    // variable

    window.customElements.define("services-bar", Services);
    window.customElements.define('signin-page', SignInPage);
    window.customElements.define('password-bar', Password);
    window.customElements.define('login-page', LoginInPage);
    window.customElements.define('email-page', EmailPage);
    window.customElements.define('code-page', CodePage);
    window.customElements.define('album-bar', AlbunPage);
    window.customElements.define('acount-page', AcountBox);
    window.customElements.define('validation-pass-bar', ValidationPasswordPage);

    // components

    let services = [
        { image: 'https://wallpaperaccess.com/full/1371182.jpg', title: 'Have fun and learn new information', text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti. Consequuntur, deserunt.` },
        { image: 'https://wallpaperaccess.com/full/8183906.jpg', title: 'stay in the best hotels', text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti. Consequuntur, deserunt.` },
        { image: 'https://wallpaperaccess.com/full/2702643.jpg', title: 'get best services', text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti. Consequuntur, deserunt.` },
        { image: 'https://wallpaperaccess.com/full/2313727.jpg', title: 'Explore whole city with your new friends', text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti. Consequuntur, deserunt` },
        { image: 'https://wallpaperaccess.com/full/3120795.jpg', title: 'injoy sights nature', text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti. Consequuntur, deserunt.` },
        { image: 'https://wallpaperaccess.com/full/129569.jpg', title: "do not forget sights historical", text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti. Consequuntur, deserunt.` },
    ]

    let description = [
        { classname: 'bi-map', title: 'find pefect place', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, repellendus!' },
        { classname: 'bi-credit-card', title: 'Fair prices', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, repellendus!' },
        { classname: 'bi-heart', title: 'diversity in entertainment', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, repellendus!' }
    ]

    let hotels = [
        {
            id: 1, name: 'Goldener Hirsch', mainImage: 'https://wallpaperaccess.com/full/2690589.jpg',
            country: 'Austria', city: 'Salzborg',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing.', range: '98',
            secoundPic: 'https://wallpaperaccess.com/full/5655394.jpg'
        },
        {
            id: 2, name: 'Crescent Court', mainImage: 'https://wallpaperaccess.com/full/2690623.jpg',
            country: 'America', city: 'Dalias',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing.', range: '96',
            secoundPic: 'https://wallpaperaccess.com/full/2690978.jpg'
        },
        {
            id: 3, name: 'Villa cimbrone', mainImage: 'https://wallpaperaccess.com/full/2690938.jpg',
            country: 'Italy', city: 'Naples',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing.', range: '96',
            secoundPic: 'https://wallpaperaccess.com/full/2690578.jpg'
        },
        {
            id: 4, name: 'Relais Bernard Loiseau', mainImage: 'https://wallpaperaccess.com/full/2690984.jpg',
            country: 'France', city: 'Saulieu',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing.', range: '93',
            secoundPic: 'https://wallpaperaccess.com/full/2690994.jpg'
        },
        {
            id: 5, name: 'Babylonstoren', mainImage: 'https://wallpaperaccess.com/full/2691021.jpg',
            country: 'South Africa', city: 'Franschoek Valley',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing.', range: '94',
            secoundPic: 'https://wallpaperaccess.com/full/7148784.jpg'
        },
        {
            id: 6, name: 'COMO The Halkin', mainImage: 'https://wallpaperaccess.com/full/2691012.jpg',
            country: 'United Kingdom', city: 'London',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing.', range: '92',
            secoundPic: 'https://wallpaperaccess.com/full/8183871.jpg'
        }
    ]

    let tourArr = [
        { id: 1, title: 'Desert Tour', day: 2, price: 59.5, place: 'Dubai, Oman', image: 'https://wallpaperaccess.com/full/49843.jpg' },
        { id: 2, title: 'City Tour', day: 3, price: 79.5, place: 'London, England', image: "https://wallpaperaccess.com/full/32533.jpg" },
        { id: 3, title: 'City Tour', day: 2, price: 59.5, place: 'Rio, Brazil', image: "https://wallpaperaccess.com/full/337805.jpg" },
        { id: 4, title: 'City Tour', day: 3, price: 79.5, place: 'Barcelona, Spain', image: "https://wallpaperaccess.com/full/1127219.jpg" },
        { id: 5, title: 'Jungle Tour', day: 5, price: 149.5, place: 'Mazandaran, Iran', image: "https://wallpaperaccess.com/full/6498803.jpg" },
        { id: 6, title: 'City Tour', day: 7, price: 204.5, place: 'Istanbul, Turkey', image: "https://wallpaperaccess.com/full/316238.jpg" },
        { id: 7, title: 'City Tour', day: 1, price: 25.5, place: 'Moscow, Russia', image: "https://wallpaperaccess.com/full/1389025.jpg" },
        { id: 8, title: 'City Tour', day: 4, price: 125.5, place: 'Berlin, Germany', image: "https://wallpaperaccess.com/full/775779.jpg" },
        { id: 9, title: 'City Tour', day: 6, price: 169.5, place: 'Tokyo, Japan', image: "https://wallpaperaccess.com/full/31161.jpg" },
    ]

    let monthlyToursArr = [
        {
            title: 'Historical Tour ', collapseId: 'esir', carouselId: 'carouseles',
            images: [
                'https://wallpaperaccess.com/full/5349847.jpg',
                'https://wallpaperaccess.com/full/5967575.jpg',
                'https://wallpaperaccess.com/full/5967851.jpg',
            ],
            massage: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aut odio laborum totam voluptas
            doloremque in, fugiat dicta expedita nobis temporibus quam ipsum, aspernatur, harum eius
            quidem distinctio aliquam laudantium voluptates atque neque quis dolore! Obcaecati natus
            velit deleniti assumenda! Eos nesciunt eligendi magni alias veritatis harum voluptatum.
            Quam, impedit?...`,
            date: 5, price: 225, day: 7, score: 92, place: 'Esfahan, Iran', registrants: 25435,
            year: new Date().getFullYear(), mounth: new Date().getMonth(),
            get isdate() {
                return this.date === new Date().getDay();
            },
            get setPrice() {
                return (this.price) + ((this.price / 100) * (this.mounth - 6) + ((this.price / 10) * (this.year - 2022)));
            },
        },
        {
            title: 'City Tour', collapseId: 'caeg', carouselId: 'carouseleg',
            images: [
                'https://wallpaperaccess.com/full/3782.jpg',
                'https://wallpaperaccess.com/full/110023.jpg',
                'https://wallpaperaccess.com/full/110027.jpg'
            ],
            massage: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aut odio laborum totam voluptas
            doloremque in, fugiat dicta expedita nobis temporibus quam ipsum, aspernatur, harum eius
            quidem distinctio aliquam laudantium voluptates atque neque quis dolore! Obcaecati natus
            velit deleniti assumenda! Eos nesciunt eligendi magni alias veritatis harum voluptatum.
            Quam, impedit?...`,
            date: 4, price: 202.5, day: 6, score: 95, place: 'Cairo,Egypt', registrants: 27435,
            year: new Date().getFullYear(), mounth: new Date().getMonth(),
            get isdate() {
                return this.date === new Date().getDay();
            },
            get setPrice() {
                return (this.price) + ((this.price / 100) * (this.mounth - 6) + ((this.price / 10) * (this.year - 2022)));
            },
        },
        {
            title: 'Nature Tour', collapseId: 'mair', carouselId: 'carouselma',
            images: [
                'https://wallpaperaccess.com/full/6498827.jpg',
                "https://wallpaperaccess.com/full/6529279.jpg",
                "https://wallpaperaccess.com/full/3421576.jpg"
            ],
            massage: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aut odio laborum totam voluptas
        doloremque in, fugiat dicta expedita nobis temporibus quam ipsum, aspernatur, harum eius
        quidem distinctio aliquam laudantium voluptates atque neque quis dolore! Obcaecati natus
        velit deleniti assumenda! Eos nesciunt eligendi magni alias veritatis harum voluptatum.
        Quam, impedit?...`,
            date: 3, price: 320, day: 7, score: 97, place: 'Mazandaran, Iran', registrants: 35435,
            year: new Date().getFullYear(), mounth: new Date().getMonth(),
            get isdate() {
                return this.date === new Date().getDay();
            },
            get setPrice() {
                return (this.price) + ((this.price / 100) * (this.mounth - 6) + ((this.price / 10) * (this.year - 2022)));
            },
        }
    ]

    let counties = {
        iran: ['a', 'b', 'c', 'd'],
        germany: ['e', 'f', 'g'],
        england: ['h', 'i', 'j', 'k'],
        america: ['l', 'm', 'n'],
        brazil: ['o', 'p'],
        japon: ['q', 'r', 's'],
        iraq: ['x', 'y'],
        egypt: ['z']
    }

    let albumBar = [
        { id: 1, image: 'https://wallpaperaccess.com/full/6498827.jpg', group: 'nature' },
        { id: 2, image: 'https://wallpaperaccess.com/full/3782.jpg', group: 'historical' },
        { id: 3, image: 'https://wallpaperaccess.com/full/5349847.jpg', group: 'city' },
        { id: 4, image: 'https://wallpaperaccess.com/full/6529279.jpg', group: 'nature' },
        { id: 5, image: 'https://wallpaperaccess.com/full/110023.jpg', group: 'city' },
        { id: 6, image: 'https://wallpaperaccess.com/full/1389025.jpg', group: 'historical' },
        { id: 8, image: 'https://wallpaperaccess.com/full/3421576.jpg', group: 'nature' },
        { id: 9, image: 'https://wallpaperaccess.com/full/32533.jpg', group: 'historical' },
        { id: 11, image: 'https://wallpaperaccess.com/full/5967575.jpg', group: 'historical' },
        { id: 12, image: 'https://wallpaperaccess.com/full/5967851.jpg', group: 'city' },
        { id: 13, image: 'https://wallpaperaccess.com/full/110027.jpg', group: 'historical' },
    ]

    //our data

    getWindowSize();
    getTourWindowSize();

    //window events

    window.addEventListener('resize', () => {
        getWindowSize();
        getTourWindowSize();
    })

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 80) {
            headerNav.classList.add('bg-light');
            root.style.setProperty('--header-text', 'black');
        } else {
            headerNav.classList.remove('bg-light');
            root.style.setProperty('--header-text', 'white');
        }
    })

    // functions


    // hotel

    function getWindowSize() {
        window.outerWidth >= 992 ? setIndexPage(1, 4) :
            window.outerWidth < 992 && window.outerWidth >= 768 ? setIndexPage(1, 3) :
                window.outerWidth < 768 ? setIndexPage(1, 2) :
                    setIndexPage(1, 2);
    }

    function setIndexPage(page, row) {
        pageIndex = page;
        rowPage = row;
        displayList(hotelBox, btnBox, rowPage, pageIndex, hotels);
    }

    function displayList(shower, btnBox, row, page, items) {
        setHotels(shower, row, page, items);
        let indexBtn = Math.ceil(items.length / row);
        btnBox.innerHTML = '';
        for (let i = 1; i <= indexBtn; i++) {
            createBtn(btnBox, 'bg-light', 'btn');
        }
        const btnBar = document.querySelectorAll("#btn");

        btnBar.forEach((e, index) => {
            btnOperator(e, index, btnBar, shower, row, page, items, setHotels)
        })

    }

    function setHotels(shower, row, page, items) {
        shower.innerHTML = "";
        let end = row * page;
        let start = end - row;

        let cutUsers = items.slice(start, end);

        cutUsers.forEach((e) => {
            shower.insertAdjacentHTML('beforeend', `    
    <div class='parent col-lg-3 col-md-4 col-6 card'>                  
        <div class="hotel-bar card justify-content-between p-0 my-2 border border-2 h-100">
            <img src="${e.mainImage}" id='image-hotel' class="card-img-top img-bar">
            <div class="card-header">${e.name}</div>
            <div class="card-body">
                <h5 class="card-title">${e.country}, ${e.city}</h5>
                <span> score: ${e.range}% </span>        
                <p class="card-text">${e.text}</p>
                <a href="#" class="hotel-btn btn">Visit Hotel</a>
            </div>
        </div>
    </div>  
`);

            document.querySelectorAll('#hotels img').forEach(img => {
                img.addEventListener('mouseenter', (target) => {
                    if (target.target.src === e.mainImage) {

                        target.target.src = e.secoundPic;
                    }
                });
            })
            document.querySelectorAll('#hotels img').forEach(img => {
                img.addEventListener('mouseleave', (target) => {
                    if (target.target.src === e.secoundPic) {
                        target.target.src = e.mainImage;
                    }
                });
            });

        })
    }

    // tour

    function getTourWindowSize() {
        window.outerWidth >= 992 ? setTourIndexPage(1, 6) :
            window.outerWidth < 992 && window.outerWidth >= 768 ? setTourIndexPage(1, 3) :
                window.outerWidth < 768 ? setTourIndexPage(1, 2) :
                    setTourIndexPage(1, 2);
    }

    function setTourIndexPage(page, row) {
        pageTourIndex = page;
        rowTourPage = row;
        displayTour(tourListBox, tourBtnBox, rowTourPage, pageTourIndex, tourArr);
    }


    function displayTour(shower, btnBox, row, page, items) {
        setTour(shower, row, page, items);
        btnBox.innerHTML = '';
        let indexBtn = Math.ceil(items.length / row);
        for (let i = 1; i <= indexBtn; i++) {
            createBtn(btnBox, 'bg-secondary', 'btn-tour');
        }
        const btnTourBar = document.querySelectorAll("#btn-tour");

        btnTourBar.forEach((e, index) => {
            btnOperator(e, index, btnTourBar, shower, row, page, items, setTour);
        })

    }

    function setTour(shower, row, page, items) {
        shower.innerHTML = "";
        let end = row * page;
        let start = end - row;
        var cutUsers = items.slice(start, end);

        cutUsers.forEach((e) => {
            shower.insertAdjacentHTML('beforeend', `   
            <div class="col-lg-2 col-md-4 col-6"> 
                <div style='background:url(${e.image})' class="tour-list-bar mx-2 container-md shadow-sm rounded-2  d-flex flex-column justify-content-end">
                        <div class=" mt-2">
                            <h2 class="text-light">${e.title}</h2>
                        </div>
                        <div class=" mt-2 ">
                            <h3 class="text-light">${e.place}</h3>
                            <p class="text-light">${e.day} days</p>
                        </div>
                        <div class=" mt-2">
                            <h4 class="text-light">$${e.price}</h4>
                        </div>
                </div>
            </div>
        `
            );
            document.querySelectorAll('.tour-list-bar').forEach(back => {
                back.style.backgroundSize = 'cover';
                back.style.backgroundPosition = 'center';
            })
        })
    }

    function createBtn(box, bgColor, id) {
        let pageBtn = document.createElement("button");
        pageBtn.className = `btn ${bgColor} rounded-circle mx-2 p-2 dot`;
        pageBtn.id = id;
        box.append(pageBtn);
    }

    function btnOperator(e, index, btn, shower, row, page, items, callback) {
        index + 1 === pageIndex &&
            e.classList.add("active-btn");

        e.addEventListener("click", (event) => {
            btn.forEach(e => e.classList.remove('active-btn'));

            e.classList.add("active-btn");
            page = index + 1;
            callback(shower, row, page, items)
        })
    }


    // functions


    services.forEach(service => {
        if (service.title !== "undefined") {
            let serviceBar = `
    <services-bar data-title='${service.title}' data-image='${service.image}' 
    data-text='${service.text}'></services-bar>`;
            servicesBox.insertAdjacentHTML('beforeend', serviceBar)
        }
    })

    description.forEach(descrip => {
        const descriptionBar = `<div class="mt-4 description-bar text-center">
    <span class="bi ${descrip.classname} p-3 rounded-circle"></span>
    <h4 class="mt-3">${descrip.title}</h4>
    <p>${descrip.text}</p>
</div>
`
        descriptionBox.insertAdjacentHTML('beforeend', descriptionBar)
    })

    tourArr.forEach(tour => {
        modalBody.insertAdjacentHTML('beforeend', `
    <div class="list-bar col-lg-8 row my-md-4 my-4 shadow-lg m-auto">
        <div class="list-image col-4 px-0">
            <img class="w-100 h-100" src="${tour.image}" alt="">
        </div>
        <div class="list-content col-8 row text-center py-1 px-4">
            <h4 class="list-place">${tour.place}</h4>
            <h5 class="list-tour ">${tour.title}</h5>
            <h6 class="list-days text-secondary">${tour.day} days</h6>
            <button class="btn ">
                <span>$${tour.price}</span>
            </button>
        </div>
    </div>
        `)
    })

    monthlyToursArr.forEach(tour => {
        accordion.insertAdjacentHTML('beforeend', `
        <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#${tour.collapseId}">${tour.title}</button>
        </h2>
        <div id="${tour.collapseId}" class="accordion-collapse collapse">
            <div class="accordion-body">
                <h3 class="text-center">${tour.title}</h3>
                <h4 class="text-center">${tour.place}</h4>
                <div id="${tour.carouselId}" class="px-5 mt-3 mx-5 carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                    </div>
                    <div class="carousel-inner m-auto">
                        
                    </div>

                </div>
                <h3 class="text-center my-5">${tour.day} days stay at Tehmina Hotel</h3>
                <p class="text-center my-4">
                    ${tour.massage}
                </p>
                <p class="text-center my-3 ">
                    <a class="link-dark alert alert-link" href="">for more infomation about city seen our artucle <span
                            class="bi bi-chevron-double-right"></span></a>
                </p>
                <h3 class="text-center my-3"> Registrants : ${tour.registrants}</h3>
                <h2 class="text-center my-3">Range Score</h2>
                <div class="progress w-75 m-auto">
                    <div class="progress-bar progress-bar-animated progress-bar-striped bg-warning" role="progressbar"
                        style="width: ${tour.score}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">${tour.score}%</div>
                </div>
                <hr>
                <div class="Registration" id="Registration">
                    <h3 class="text-center alert alert-warning">Registration on the ${tour.date}th of every month</h3>
                    <div class="w-50 m-auto">
                    <buttom class='btn btn-secondary w-100' id='${tour.carouselId}-btn'>Reserve</button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  `)

        const miniDoc = $.getElementById(tour.collapseId);
        const carouselBtnBox = miniDoc.querySelector('.carousel-indicators');
        const carouselInner = miniDoc.querySelector('.carousel-inner');
        const registration = miniDoc.querySelector('.Registration');
        const toastLiveExample = document.getElementById('liveToast')

        tour.images.forEach((image, index) => {
            if (index === 0) {
                carouselBtnBox.insertAdjacentHTML('beforeend', `
                <button type="button" data-bs-target="#${tour.carouselId}" data-bs-slide-to="${index}" aria-current="true" class="bg-dark active"></button>
                `)
                carouselInner.insertAdjacentHTML('beforeend', `
                <div class="carousel-item active">
                    <img src="${image}" class="d-block w-100">
                </div>
                `)
            } else {
                carouselBtnBox.insertAdjacentHTML('beforeend', `
                <button type="button" data-bs-target="#${tour.carouselId}" data-bs-slide-to="${index}" class="bg-dark"></button>
                `);
                carouselInner.insertAdjacentHTML('beforeend', `
                <div class="carousel-item ">
                    <img src="${image}" class="d-block w-100">
                </div>
                `);
            }
        });
        if (tour.isdate === true) {
            registration.className = 'Registration w-25 m-auto';
            registration.innerHTML = `
            <button id='${tour.carouselId}-btn-buy' class='btn w-100'>$${tour.setPrice}</button>
            `;
            let btnBuy = document.getElementById(`${tour.carouselId}-btn-buy`);

            btnBuy.addEventListener('click', () => {
                if ($.cookie) {
                    if (signinLink.innerHTML !== username) {
                        userRegistrationStatus(btnBuy, toastLiveExample);
                    } else {
                        console.log($.querySelector('validation-pass-bar'));
                    }
                } else {
                    userRegistrationStatus(btnBuy, toastLiveExample);
                }
            })
        } else {
            let btnReserve = document.getElementById(`${tour.carouselId}-btn`);

            btnReserve.addEventListener('click', () => {
                if ($.cookie) {
                    if (signinLink.innerHTML !== username) {
                        userRegistrationStatus(btnReserve, toastLiveExample);
                    } else {
                        if (userResevition.length !== 0) {
                            let fillterUserResevation = userResevition.filter(reserveBar => reserveBar.image === tour.images[0]);
                            if (fillterUserResevation.length === 0) {
                                setUserReserve(tour)
                            }
                            fillterUserResevation = [];
                        } else {
                            setUserReserve(tour)
                        }
                    }
                } else {
                    userRegistrationStatus(btnReserve, toastLiveExample);
                }
            })
        }
    })

    albumBody.innerHTML = `
    <album-bar data-arr='${JSON.stringify(albumBar)}'></album-bar>
    `


    function userRegistrationStatus(btn, toastLive) {
        const toast = new bootstrap.Toast(toastLive);
        toast.show();
    }

    //function

    //show in DOM

    searchBox.addEventListener('click', (e) => {
        const dropMenu = e.path[1].children[1];
        dropMenu.innerHTML = '';
    })

    searchBox.addEventListener('input', e => {
        let targetContry = Object.entries(counties).filter(arr => arr[0].includes(e.target.value));
        const dropMenu = e.path[1].children[1];
        dropMenu.innerHTML = '';
        if (e.target.value.trim()) {
            targetContry.forEach(arr => {
                dropMenu.insertAdjacentHTML('beforeend', `
                <li><a class="dropdown-item" href="#">${arr[0]}</a></li>
                `);
            })
        }
        dropMenu.querySelectorAll('li a').forEach(list => {
            list.addEventListener('click', (listTarget) => {
                e.target.value = listTarget.target.innerHTML;
                showItems(listTarget.target.innerHTML);
            })
        })
    })


    searchBox.addEventListener('blur', (e) => showItems(e.target.value))

    signinLink.addEventListener('click', (e) => {
        if (username) {
            if (e.target.innerHTML === username) {
                signinBody.innerHTML = `<acount-page id="${e.target.innerHTML}-page"></acount-page>`;
            } else {
                signinBody.innerHTML = '<login-page></login-page>';
            }
        }
    })

    //Events


    function showItems(value) {
        optionBox.innerHTML = `
        <option selected>select Your City</option>
        `
        Object.entries(counties).forEach(arr => {
            arr[0] === value && setOptions(arr[1]);
        })
    }

    function setOptions(arr) {
        arr.forEach(city => {
            optionBox.insertAdjacentHTML('beforeend', `
        <option>${city}</option>
        `)
        })
    }

    //  site

    function setUserReserve(tour) {
        userResevition.push({ image: tour.images[0], title: tour.title, price: tour.setPrice, location: tour.place });
        let nowTime = new Date();
        nowTime.setTime(nowTime.getTime() + 3 * 24 * 60 * 60 * 1000)
        $.cookie = `userreserve=${JSON.stringify(userResevition)};path=/;expires=${nowTime}`;
    }


    // set cockie

    // functions

})

