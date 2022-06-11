const statusDisplay = document.querySelector(".status");
const image = document.getElementById("image");
const container = document.getElementById("main");

/*window.addEventListener("load", (e) => {
  statusDisplay.textContent = navigator.onLine ? "Online" : "Offline";
});*/

function setColor() {
  container.style.backgroundColor = "var(--light-blue)";
}

async function connectionStatus() {
  try {
    const fetchResult = await fetch(
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/440px-Lenna_%28test_image%29.png?fbclid=IwAR2pcHsYAwUzchoU-Q23iwMJvXdaGNp1H-c0uxfdh-b_3CN5ltGxskoXDjg?time=" +
        new Date().getTime()
    );
    image.src = "./images/online.png";
    setColor();
    return fetchResult.status >= 200 && fetchResult.status < 300;
  } catch (error) {
    statusDisplay.textContent = "OOPS !! Your internet connection is down";
    image.src = "./images/offline.png";
    container.style.backgroundColor = "var(--black)";
  }
}

setInterval(async () => {
  const result = await connectionStatus();
  if (result) {
    statusDisplay.textContent = "You are Online";
    setColor();
  }
}, 5000);

window.addEventListener("load", async (e) => {
  if (connectionStatus()) {
    statusDisplay.textContent = "You are Online";
  } else {
    statusDisplay.textContent = "You are Offline";
  }
});
