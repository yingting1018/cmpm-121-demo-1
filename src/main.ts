import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Lucky Cat Clicker!";
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

const growthRateDisplay = document.createElement("div");
growthRateDisplay.textContent = "Current Growth Rate: 1";
app.append(growthRateDisplay);
const game = {
  clickCount: 0,
  growthRate: 1,
  boost: false,
  boostTime: 10000,
  items: [
    { name: "Good Luck 🍀", price: 10, growth: 0.1, desc: "Increases your growth rate by 0.2!" },
    { name: "Super Luck 🍀", price: 100, growth: 2, desc: "Increases your growth rate by 2!" },
    { name: "Amazing Luck 🍀", price: 1000, growth: 50, desc: "Increases your growth rate by 50!" },
    { name: "Mystical Luck 🍀", price: 500, growth: 0, desc: "Increases your growth rate by 5 for 10 seconds!" },
    { name: "Mystery Luck 🎲", price: 50, growth: 0, desc: "Chance of winning either 500 meows or losing 100.. Buy at your own risk!" },
  ]
};

const shopButtons: HTMLButtonElement[] = [];
const shopPurchases: number[] = [0, 0, 0, 0, 0];
const colors = ["#ffd1dc", "#ffb7c5", "#ff9eb5", "#ff8aa4", "#ff7093"];
game.items.forEach((item, index) => {
  const shopButton = document.createElement("button");
  shopButton.disabled = true;
  shopButton.textContent = `${item.name} - Price: ${item.price} ≽^-˕-^≼ ${item.desc}`;
  shopButton.style.backgroundColor = colors[index % colors.length]; 
  app.append(shopButton);
  shopButtons.push(shopButton);

  const shopCountDisplay = document.createElement("div");
  shopCountDisplay.textContent = `${item.name} Purchases: ${shopPurchases[index]}`;
  app.append(shopCountDisplay);

  shopButton.addEventListener("click", () => handleItemPurchase(item, shopButton, shopCountDisplay, index));
});

button.addEventListener("click", () => {
  game.clickCount++;
  button.textContent = button.textContent === "🐱" ? "😺" : "🐱";
});

function updateButtonStates() {
  shopButtons.forEach((button, index) => {
    button.disabled = game.clickCount < game.items[index].price;
  });
}

function updateUI() {
  counterDisplay.textContent = `Meows: ${Math.round(game.clickCount)}`;
  growthRateDisplay.textContent = `Current Growth Rate: ${game.growthRate.toFixed(1)}`;
  updateButtonStates();
  shopButtons.forEach((button, index) => {
    button.textContent = `${game.items[index].name} - Price: ${game.items[index].price.toFixed(1)} ≽^-˕-^≼ ${game.items[index].desc}`;
  });
}

function activateMysticalLuck() {
  if (!game.boost) {
    game.boost = true;
    game.growthRate += 5;
    setTimeout(() => {
      game.growthRate -= 5;
      game.boost = false;
      updateUI();
    }, game.boostTime);
  }
}

function handleItemPurchase(item: Item, shopButton: HTMLButtonElement, shopCountDisplay: HTMLDivElement, index: number) {
  game.clickCount -= item.price;
  item.price *= 1.15;
  game.growthRate += item.growth;
  shopPurchases[index]++;
  shopCountDisplay.textContent = `${item.name} Purchases: ${shopPurchases[index]}`;

  if (item.name === "Mystical Luck 🍀") activateMysticalLuck();
  if (item.name === "Mystery Luck 🎲") startMysteryLuck(); 

  updateUI();
}

function startMysteryLuck() { 
  const mysteryItem = game.items[4];
  if (game.clickCount >= mysteryItem.price) {
    game.clickCount -= mysteryItem.price;
    const outcome = Math.random() < 0.5 ? -100 : 500;
    game.clickCount += outcome;
    mysteryItem.price *= 1.15;
    updateUI();
  }
}


let previousTime: number = performance.now();

function updateCount() {
  const currentTime = performance.now();
  const elapsedTime = (currentTime - previousTime) / 1000;
  game.clickCount += elapsedTime * game.growthRate;
  previousTime = currentTime;
  updateUI();
  requestAnimationFrame(updateCount);
}
requestAnimationFrame(updateCount);
