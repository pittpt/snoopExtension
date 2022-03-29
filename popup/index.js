const inputNewItem = document.getElementById("emailText");
const logout = (document.getElementById("logout").onclick = () => {
  logOut();
});
// logout.addEventListener("click", logOut);

chrome.storage.local.get(["userMail"], (data) => {
  inputNewItem.innerHTML = data.userMail;
});

const logOut = () => {
  chrome.storage.local.remove(["userMail"], (data) => {
    console.log("removed userMail");
  });
  chrome.storage.local.set({ logIn: false }, () => {
    console.log("logged out");
  });
  window.location.href = "/popup/popup.html";
};
