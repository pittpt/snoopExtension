const emailForm = document.querySelector(".email-form");
const inputNewItem = document.getElementById("input");
const errorMsg = document.querySelector(".error-message");

var bg = chrome.extension.getBackgroundPage();
var email = "";
const standardized = (str) => str.toLowerCase();

const url = "http://localhost:3000/api";
const options = {
  method: "POST",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const init = () => {
  chrome.storage.local.get(["logIn", "userMail"], async (data) => {
    if (data.logIn == true) {
      // bg.console.log(data.userMail + " INIT");
      await fetch(url + `/newUser/${data.userMail}`, options);
      window.location.href = "/popup/index.html";
    }
  });
};

const setMail = (e) => {
  e.preventDefault();

  if (inputNewItem.value === "") {
    errorMsg.innerText = "Email not found!";
  } else {
    email = standardized(inputNewItem.value);
    chrome.storage.local.set({ userMail: email }, () => {
      localStorage.setItem("userMail", {
        userMail: email,
      });
      init();
    });
    chrome.storage.local.set({ logIn: true }, () => {
      // bg.console.log("logged in");
    });
  }

  inputNewItem.value = "";
};

init();
emailForm.addEventListener("submit", setMail);
