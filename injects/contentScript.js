//set follow button
const init = async function () {
  await checkFollowing();
  // console.log(email);
  // var thisDiv = document.getElementsByClassName("Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 gbiTQT jYqxGr");
  const titleAdd = document.createElement("button");
  titleAdd.id = "follow-button";
  // titleAdd.innerText = "+ Follow";
  titleAdd.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 516 516"><title>Person Add</title><path d="M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M88 176v112M144 232H32"/></svg>
  `;
  // injectElement.innerHTML = "Hello From the Rusty Zone Element";
  document.getElementsByClassName("gbiTQT jYqxGr")[0].prepend(titleAdd);

  followFunction();
};

window.addEventListener("load", init);
var following = false;

// Check Already Followed
async function checkFollowing() {
  const url = "http://localhost:3000/api";
  const getFollowing = {
    method: "GET",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(url + `/find/${email}/${address}`, getFollowing);
  console.log(data.status);
  if (data.status == 200) following = true;
  else following == false;
}

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log(changeInfo.status);
//   if (changeInfo.status === "completed") {
//     if (tab.url === "https://opensea.io/") {
//       chrome.tabs.reload();
//     }
//   }
// });

//get address
const webData = document
  .getElementById("__NEXT_DATA__")
  .innerHTML.toString()
  .split('"');
var address;
for (let i in webData) {
  if (webData[i] == "address") {
    var num = parseInt(i);
    address = webData[num + 2];
    break;
  }
}

//get user email
var email;
chrome.storage.local.get(["userMail"], (data) => {
  console.log(data.userMail);
  email = data.userMail;
});

//api routes
const url = "http://localhost:3000/api";
const follow = {
  method: "POST",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const unfollow = {
  method: "DELETE",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

//follow functions
function followFunction() {
  console.log("following " + following);
  var followBut = document.getElementById("follow-button");
  if (following == true) setFollowing();

  followBut.addEventListener("click", async function () {
    //to follow >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (following == false) {
      setFollowing();
      await fetch(url + `/follow/${email}/${address}`, follow);
    }
    //to unfolow >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    else {
      await fetch(url + `/unfollow/${email}/${address}`, unfollow);
      setUnfollowing();
    }
  });

  function setUnfollowing() {
    followBut.style.color = "#3399ff";
    followBut.style.backgroundColor = "#ffffff";
    followBut.style.borderColor = "#3399ff";
    following = false;
  }
  function setFollowing() {
    followBut.style.color = "#3399ff";
    followBut.style.color = "#ffffff";
    followBut.style.backgroundColor = "rgb(97, 167, 238)";
    followBut.style.borderColor = "rgb(97, 167, 238)";
    following = true;
  }
}
