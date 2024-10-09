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
// let isCounting = false;

// const time = () => {
  // if (!isCounting) {
  //   isCounting = true;
  //   setInterval(() => {
  //     clickCount++;
  //     counterDisplay.textContent = `Meows: ${clickCount}`;
//   //   }, 1000);
//   }
// };
button.addEventListener("click", () => {
  clickCount++;
  counterDisplay.textContent = `Meows: ${clickCount}`;
  // time();
});
// time();

let previousTime: number = performance.now()
function updateCount() 
{
  const currentTime = performance.now()
  const increment = (currentTime - previousTime)
  clickCount += (increment / 1000)
  counterDisplay.innerHTML = `${Math.round(clickCount)} Meows`;
  previousTime = currentTime
  requestAnimationFrame(updateCount)
}
requestAnimationFrame(updateCount);