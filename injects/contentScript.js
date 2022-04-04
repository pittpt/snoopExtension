//set follow button
const init = function () {
  // var thisDiv = document.getElementsByClassName("Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 gbiTQT jYqxGr");
  const titleAdd = document.createElement("button");
  titleAdd.id = "follow-button";
  // titleAdd.innerText = "+ Follow";
  titleAdd.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 516 516"><title>Person Add</title><path d="M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M88 176v112M144 232H32"/></svg>
  `;
  // injectElement.innerHTML = "Hello From the Rusty Zone Element";
  document.getElementsByClassName("gbiTQT jYqxGr")[0].prepend(titleAdd);
};
init();

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

//follow functions
var followBut = document.getElementById("follow-button");
var following = false;
document.getElementById("follow-button").onclick = () => {
  //   console.log("click");
  //   console.log(webData[155]);
  //   console.log(webData);
  //   console.log(address);

  //to follow >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  if (following == false) {
    // followBut.classList.add("followed");
    followBut.innerHTML = "Following";
    followBut.style.color = "#ffffff";
    followBut.style.backgroundColor = "rgb(97, 167, 238)";
    followBut.style.borderColor = "rgb(97, 167, 238)";
    // console.log("follow");
    following = true;

    chrome.storage.local.set({ address: address }, () => {
      console.log(address);
    });
    chrome.storage.local.get(["address"], (data) => {
      console.log(data);
      console.log(data.adrs);
    });
    // walletIds.push(address);
    // console.log(walletIds[walletIds.length - 1]);
    // console.log(walletIds.length);
  }
  //to unfolow >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  else {
    // followBut.classList.remove("followed");
    followBut.innerHTML = "+ Follow";
    followBut.style.color = "#3399ff";
    followBut.style.backgroundColor = "#ffffff";
    followBut.style.borderColor = "#3399ff";
    following = false;

    // console.log("unfollow");
  }
};
