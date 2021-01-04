var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
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

if (addToCartLinkTopLeader != null) {
  addToCartLinkTopLeader.addEventListener("click", (evt) => {
    evt.preventDefault();
    addToCartPopup.classList.add("popup--show");
  });
}

if (addToCartLinks.length !== 0) {
  for (let i = 0; i < addToCartLinks.length; i++) {
    addToCartLinks[i].addEventListener("click", (evt) => {
      evt.preventDefault();
      addToCartPopup.classList.add("popup--show");
    });
  }
}

if (addToCartClose != null) {
  addToCartClose.addEventListener("click", (evt) => {
    evt.preventDefault();

    // добавляем в корзину

    //закрываем окно
    addToCartPopup.classList.remove("popup--show");
  });
}

// Валидация формы
const form = document.querySelector('.form__order');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const tel = document.querySelector('#tel');
const email = document.querySelector('#email');

if (form != null) {
  form.addEventListener('submit', validateForm);
}

function validateForm(evt) {
  //Отменяем отправку формы
  evt.preventDefault();

  const elements = Array.of(firstName, lastName, tel, email);
  const resultNotEmpty = [...elements].every(isEmpty);
  const resultValidTel = validPhone(tel);
  const resultValidEmail = validMail(email);

  // console.log(resultValidEmail);

  if (resultNotEmpty && resultValidTel && resultValidEmail) {
    this.classList.remove('invalid');
    this.classList.add('valid');
    form.submit();
  } else {
    this.classList.remove('valid');
    this.classList.add('invalid');
    alert("Форма невалидна. Заполните обязательные поля корректными данными!")
  }

}

// Простая проверка заполненено ли поле
function isEmpty(elem) {
  return (elem.value) ? true : false;
}

function validMail(email) {
  const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/;
  const myMail = email.value;
  const valid = re.test(myMail);
  // if (valid) output = 'Адрес эл. почты введен правильно!';
  // else output = 'Адрес электронной почты введен неправильно!';
  // document.getElementById('message').innerHTML = output;
  return valid;
}

function validPhone(tel) {
  const re = /^\d[\d\(\)\ -]{4,14}\d$/;
  const myPhone = tel.value;
  const valid = re.test(myPhone);
  // if (valid) output = 'Номер телефона введен правильно!';
  // else output = 'Номер телефона введен неправильно!';
  // document.getElementById('message').innerHTML = document.getElementById('message').innerHTML+'<br />'+output;
  return valid;
}
