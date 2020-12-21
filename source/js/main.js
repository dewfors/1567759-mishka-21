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

const addToCartLinks = document.querySelectorAll('.add-to-cart');
const addToCartPopup = document.querySelector('.modal__form-cart');
const addToCartClose = document.querySelector('.form-cart__button');

// console.log(addToCartLink);

for (let i = 0; i < addToCartLinks.length; i++) {
  addToCartLinks[i].addEventListener("click",(evt) => {
    evt.preventDefault();
    addToCartPopup.classList.add("modal-show");
  });

}

addToCartClose.addEventListener("click",(evt) => {
  evt.preventDefault();

  // добавляем в корзину

  //закрываем окно
  addToCartPopup.classList.remove("modal-show");
});
