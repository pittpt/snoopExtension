const emailForm = document.querySelector(".email-form");
const inputNewItem = document.getElementById("input");
const errorMsg = document.querySelector(".error-message");
// const mongo = require("/database/mongo");

var email = "";
const standardized = (str) => str.toLowerCase();

async function main() {
  const url =
    "mongodb+srv://snoop:snoopdatabase@cluster0.kmktr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

const init = () => {
  chrome.storage.local.get(["logIn"], (data) => {
    if (data.logIn == true) {
      console.log(data.userMail);
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
      init();
      // main().catch(console.error);
    });
    chrome.storage.local.set({ logIn: true }, () => {
      console.log("logged in");
    });
  }

  inputNewItem.value = "";
};

init();
emailForm.addEventListener("submit", setMail);
