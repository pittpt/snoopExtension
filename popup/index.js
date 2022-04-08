const inputNewItem = document.getElementById("emailText");
var bg = chrome.extension.getBackgroundPage();

chrome.storage.local.get(["userMail"], (data) => {
  inputNewItem.innerHTML = data.userMail;
  // console.log(JSON.parse(data));
  localStorage.setItem("userMail", userMail);
});

const logOut = () => {
  chrome.storage.local.remove(["userMail"], (data) => {
    // bg.console.log("removed userMail");
  });
  chrome.storage.local.set({ logIn: false }, () => {
    // bg.console.log("logged out");
  });
  window.location.href = "/popup/popup.html";
};
const logout = (document.getElementById("logout").onclick = () => {
  logOut();
});
// logout.addEventListener("click", logOut);
