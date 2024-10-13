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
  button.textContent = button.textContent === "🐱" ? "😺" : "🐱";
});

interface Item {
  name: string,
  price: number,
  growth: number
  desc: string
};

const availableItems : Item[] = [
  {name: "Good Luck 🍀", price: 10, growth: 0.1, desc: "Increases your growth rate by 0.2!"},
  {name: "Super Luck 🍀", price: 100, growth: 2, desc: "Increases your growth rate by 2!"},
  {name: "Amazing Luck 🍀", price: 1000, growth: 50, desc: "Increases your growth rate by 50!"},
  {name: "Mystical Luck 🍀", price: 500, growth: 0, desc: "Increases your growth rate by 5 for 10 seconds!"},
  {name: "Mystery Luck 🎲", price: 50, growth: 0, desc: "Chance of winning either 500 meows or losing 100.. Buy at your own risk!"},
];


const shopButtons: HTMLButtonElement[] = [];



let shopPurchases: number[] = [0, 0, 0, 0, 0];
let index = 0;
let growthRate = 1;
let boost = false;
let boosttime = 10000;
let originalGrowthRate = growthRate;
for (const item of availableItems)
{
  const shopButton = document.createElement("button");
  shopButton.disabled = true;
  app.append(shopButton);
  shopButton.textContent = `${item.name} - Price: ${item.price} ≽^-˕-^≼ : ${item.desc}`;
  shopButton.addEventListener("click", () => handleClick(item, shopButton, shopCountDisplay));
  shopButtons.push(shopButton);
  const shopCountDisplay = document.createElement("div");
  app.append(shopCountDisplay);
  shopCountDisplay.textContent = `${item.name} Purchases: ${shopPurchases[index]}`;
  index++;
}

  function handleClick(item: Item, shopButton: HTMLButtonElement, shopCountDisplay: HTMLDivElement)
  {
    clickCount -= item.price;
    item.price = item.price * 1.15;
    growthRate += item.growth;
    if (item.name == "Good Luck 🍀")
    {
      shopPurchases[0]++;
      shopCountDisplay.textContent = `${item.name} Purchases: ${shopPurchases[0]}`;
    }
    else if (item.name == "Super Luck 🍀")
    {
      shopPurchases[1]++;
      shopCountDisplay.textContent = `${item.name} Purchases: ${shopPurchases[1]}`;
    }
    else if (item.name == "Amazing Luck 🍀")
    {
      shopPurchases[2]++;
      shopCountDisplay.textContent = `${item.name} Purchases: ${shopPurchases[2]}`;
    }
    else if (item.name == "Mystical Luck 🍀")
    {
      activateMysticalLuck();
      shopPurchases[3]++;
      shopCountDisplay.textContent = `${item.name} Purchases: ${shopPurchases[3]}`;
    }
    else if (item.name == "Mystery Luck 🎲")
    {
      startMysteryLuck(shopButton);
      shopPurchases[4]++;
      shopCountDisplay.textContent = `${item.name} Purchases: ${shopPurchases[4]}`;
    }
    shopButton.textContent = `${item.name} - Price: ${item.price.toFixed(1)}`;
    growthRateDisplay.textContent = `Current Growth Rate: ${growthRate.toFixed(1)}`;
  }

function activateMysticalLuck()
{
  if (!boost)
  {
    boost = true;
    growthRate *= 5;
    setTimeout(() =>
    {
      growthRate = originalGrowthRate;
      boost = false;
      growthRateDisplay.textContent = `Current Growth Rate: ${growthRate}`;
    }, boosttime)
  }
}
function startMysteryLuck(shopButton: HTMLButtonElement)
{
  if (clickCount >= availableItems[4].price)
  {
    clickCount -= availableItems[4].price;
    const outcome = Math.random();
    if (outcome < 0.5)
    {
      clickCount -= 100;
    }
    else {
      clickCount += 500;
    }
    shopButton.textContent = `${availableItems[4].name} - Price: ${availableItems[4].price.toFixed(1)}`;
    counterDisplay.innerHTML = `${Math.round(clickCount)} Meows`;
    availableItems[4].price *= 1.15;
  }
}
const growthRateDisplay = document.createElement("div");
growthRateDisplay.textContent = `Current Growth Rate: ${growthRate}`;
app.append(growthRateDisplay);

let previousTime: number = performance.now();


function updateCount()
{
  if (clickCount >= availableItems[0].price)
  {
    shopButtons[0].disabled = false;
  }
  else
  {
    shopButtons[0].disabled = true;
  }
  if (clickCount >= availableItems[1].price)
  {
    shopButtons[1].disabled = false;
  }
  else
  {
    shopButtons[1].disabled = true;
  }
  if (clickCount >= availableItems[2].price)
  {
    shopButtons[2].disabled = false;
  }
  else
  {
    shopButtons[2].disabled = true;
  }
  if (clickCount >= availableItems[3].price)
  {
    shopButtons[3].disabled = false;
  }
  else
  {
    shopButtons[3].disabled = true;
  }
  if (clickCount >= availableItems[4].price)
  {
    shopButtons[4].disabled = false;
  }
  else
  {
    shopButtons[4].disabled = true;
  }

  const currentTime = performance.now();
  const increment = currentTime - previousTime;
  clickCount += (increment / 1000) * growthRate;
  counterDisplay.innerHTML = `${Math.round(clickCount)} Meows`;
  previousTime = currentTime;
  requestAnimationFrame(updateCount);
}
requestAnimationFrame(updateCount);
