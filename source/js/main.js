var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

const addToCartLinkTopLeader = document.querySelector('.week-top-leader__button');
const addToCartLinks = document.querySelectorAll('.button--control');
const addToCartPopup = document.querySelector('.popup__cart');
const addToCartClose = document.querySelector('.popup__cart-button');

// console.log(addToCartLinkTopLeader);
// console.log(addToCartLinks);
// console.log(addToCartClose);

if (addToCartLinkTopLeader != null){
  addToCartLinkTopLeader.addEventListener("click", (evt) => {
    evt.preventDefault();
    addToCartPopup.classList.add("popup--show");
  });
}

if (addToCartLinks.length !== 0){
  for (let i = 0; i < addToCartLinks.length; i++) {
    addToCartLinks[i].addEventListener("click",(evt) => {
      evt.preventDefault();
      addToCartPopup.classList.add("popup--show");
    });
  }
}

if (addToCartClose != null){
  addToCartClose.addEventListener("click",(evt) => {
    evt.preventDefault();

    // добавляем в корзину

    //закрываем окно
    addToCartPopup.classList.remove("popup--show");
  });
}

