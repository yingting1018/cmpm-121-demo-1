import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Yingting's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🐱";
app.append(button);

const counterDisplay = document.createElement("div");
counterDisplay.textContent = "Meow: 0";
app.append(counterDisplay);
let clickCount = 0;

button.addEventListener("click", () => {
  clickCount++;
});
const shopA = document.createElement("button");
shopA.textContent = "Good Luck 🍀";
shopA.disabled = true;
app.append(shopA);

const shopB = document.createElement("button");
shopB.textContent = "Super Luck 🍀";
shopB.disabled = true;
app.append(shopB);

const shopC = document.createElement("button");
shopC.textContent = "Amazing Luck 🍀";
shopC.disabled = true;
app.append(shopC);

let shopACount = 0;
let shopBCount = 0;
let shopCCount = 0;

const shopACountDisplay = document.createElement("div");
shopACountDisplay.textContent = `Good Luck Purchases: ${shopACount}`;
app.append(shopACountDisplay);

const shopBCountDisplay = document.createElement("div");
shopBCountDisplay.textContent = `Super Luck Purchases: ${shopBCount}`;
app.append(shopBCountDisplay);

const shopCCountDisplay = document.createElement("div");
shopCCountDisplay.textContent = `Amazing Luck Purchases: ${shopCCount}`;
app.append(shopCCountDisplay);

shopA.addEventListener("click", () => {
  growthRate+= 0.1;
  clickCount = clickCount - 10;
  shopACount++;
  growthRateDisplay.textContent = `Current Growth Rate: ${growthRate.toFixed(1)}`;
  shopACountDisplay.textContent = `Good Luck Purchases: ${shopACount}`;
});
shopB.addEventListener("click", () => {
  growthRate = growthRate*2;
  clickCount = clickCount - 100;
  shopBCount++;
  shopBCountDisplay.textContent = `Super Luck Purchases: ${shopBCount}`;
  growthRateDisplay.textContent = `Current Growth Rate: ${growthRate.toFixed(1)}`;
});
shopC.addEventListener("click", () => {
  growthRate = growthRate*50;
  clickCount = clickCount - 1000;
  shopCCount++;
  shopCCountDisplay.textContent = `Amazing Luck Purchases: ${shopCCount}`;
  growthRateDisplay.textContent = `Current Growth Rate: ${growthRate.toFixed(1)}`;
});

let growthRate = 1;
const growthRateDisplay = document.createElement("div");
growthRateDisplay.textContent = `Current Growth Rate: ${growthRate}`;
app.append(growthRateDisplay);

const PurchaseADisplay = document.createElement("div");
PurchaseADisplay.textContent = `Current Growth Rate: ${growthRate}`;
let previousTime: number = performance.now();

function updateCount() {
  if (clickCount >= 10) {
    shopA.disabled = false;
  }
  if (clickCount >= 100) {
    shopB.disabled = false;
  }
  if (clickCount >= 1000) {
    shopC.disabled = false;
  }
  if (clickCount < 10) {
    shopA.disabled = true;
  }
  if (clickCount < 100) {
    shopB.disabled = true;
  }
  if (clickCount < 1000) {
    shopC.disabled = true;
  }
  const currentTime = performance.now();
  const increment = currentTime - previousTime;
  clickCount += (increment / 1000) * growthRate;
  counterDisplay.innerHTML = `${Math.round(clickCount)} Meows`;
  previousTime = currentTime;
  requestAnimationFrame(updateCount);
}
requestAnimationFrame(updateCount);