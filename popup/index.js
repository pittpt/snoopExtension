const inputNewItem = document.getElementById("emailText");
// import mongoose from "mongoose";

// mongoose
//   .connect(process.env.MONGODB_CONNECT || "")
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//   })
//   .catch((err) => {
//     console.log("Failed to connect with MongoDB " + err);
//   });

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
const logout = (document.getElementById("logout").onclick = () => {
  logOut();
});
// logout.addEventListener("click", logOut);
