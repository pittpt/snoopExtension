const emailForm = document.querySelector('.email-form');
const inputNewItem = document.getElementById('input');
const errorMsg = document.querySelector('.error-message');

var email = '';

const standardized = str => str.toLowerCase();

const setMail = function (e) {
  e.preventDefault();

  if (inputNewItem.value === '') {
    errorMsg.innerText = 'Email not found!';
  }
  email = standardized(inputNewItem.value);
  inputNewItem.value = '';

  console.log(email);
};

emailForm.addEventListener('submit', setMail);
