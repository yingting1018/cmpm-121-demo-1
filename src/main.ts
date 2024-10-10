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
  // counterDisplay.textContent = `Meows: ${clickCount}`;
  // updateShopButton();
});
// time();
// function updateShopButton()
// {
//   shop.disabled = clickCount < 10;
// }

const shop = document.createElement("button");
shop.textContent = "🍀";
shop.disabled = true;
app.append(shop);

shop.addEventListener("click", () =>
{
  growthRate++;
  clickCount = clickCount - 10;
});
let growthRate = 1;

let previousTime: number = performance.now();
function updateCount() {
  if (clickCount >= 10)
  {
    shop.disabled = false;
  }
  if (clickCount < 10)
  {
    shop.disabled = true;
  }
  const currentTime = performance.now();
  const increment = currentTime - previousTime;
  clickCount += increment / 1000 * growthRate;
  counterDisplay.innerHTML = `${Math.round(clickCount)} Meows`;
  previousTime = currentTime;
  requestAnimationFrame(updateCount);
}
requestAnimationFrame(updateCount);
// updateShopButton();