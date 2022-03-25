const submitBtn = document.getElementById("submit_button");
const inputNewItem = document.getElementById("input");

var email = "hi";

const standardized = (str) => str.toLowerCase();

const setMail = function (e) {
  e.preventDefault();

  if (inputNewItem.value !== "") {
    email = standardized(inputNewItem.value);
  }
  inputNewItem.value = "";

  console.log(email);
};
console.log(email);
console.log("g");
submitBtn.addEventListener("click", setMail);
