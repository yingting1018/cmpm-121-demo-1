import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Yingting's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.classList.add("cat-button");
button.textContent = "🐱";
app.append(button);

const counterDisplay = document.createElement("div");
counterDisplay.classList.add("counter");
counterDisplay.textContent = "Meow: 0";
app.append(counterDisplay);
let clickCount = 0;

button.addEventListener("click", () => {
  clickCount++;
  if (button.textContent === "🐱") {
    button.textContent = "😺"; 
  } else {
    button.textContent = "🐱"; 
  }
});



let priceA = 10;
let priceB = 100;
let priceC = 1000;
const shopA = document.createElement("button");
shopA.textContent = `Good Luck 🍀 - Price: ${priceA}`;
shopA.disabled = true;
app.append(shopA);

const shopB = document.createElement("button");
shopB.textContent = `Super Luck 🍀 - Price: ${priceB}`;
shopB.disabled = true;
app.append(shopB);

const shopC = document.createElement("button");
shopC.textContent = `Amazing Luck 🍀 - Price: ${priceC}`;
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
  if (clickCount >= priceA) {
    growthRate += 0.1;
    clickCount -= priceA;
    shopACount++;
    priceA = priceA * 1.15;
    shopA.textContent = `Good Luck 🍀 - Price: ${priceA.toFixed(1)}`;
    growthRateDisplay.textContent = `Current Growth Rate: ${growthRate.toFixed(1)}`;
    shopACountDisplay.textContent = `Good Luck Purchases: ${shopACount}`;
  }
});
shopB.addEventListener("click", () => {
  if (clickCount >= priceB) {
    growthRate = growthRate * 2;
    clickCount -= priceB;
    shopBCount++;
    priceB = priceB * 1.15;
    shopB.textContent = `Super Luck 🍀 - Price: ${priceB.toFixed(1)}`;
    growthRateDisplay.textContent = `Current Growth Rate: ${growthRate.toFixed(1)}`;
    shopBCountDisplay.textContent = `Super Luck Purchases: ${shopBCount}`;
  }
});
shopC.addEventListener("click", () => {
  if (clickCount >= priceC) {
    growthRate = growthRate * 50;
    clickCount -= priceC;
    shopCCount++;
    priceC = priceC * 1.15;
    shopC.textContent = `Amazing Luck 🍀 - Price: ${priceC.toFixed(1)}`;
    growthRateDisplay.textContent = `Current Growth Rate: ${growthRate.toFixed(1)}`;
    shopCCountDisplay.textContent = `Amazing Luck Purchases: ${shopCCount}`;
  }
});

let growthRate = 1;
const growthRateDisplay = document.createElement("div");
growthRateDisplay.textContent = `Current Growth Rate: ${growthRate}`;
app.append(growthRateDisplay);

const PurchaseADisplay = document.createElement("div");
PurchaseADisplay.textContent = `Current Growth Rate: ${growthRate}`;
let previousTime: number = performance.now();

function updateCount() {
  if (clickCount >= priceA) {
    shopA.disabled = false;
  }
  if (clickCount >= priceB) {
    shopB.disabled = false;
  }
  if (clickCount >= priceC) {
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
