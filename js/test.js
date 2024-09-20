const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 600;
const backgroundImage = new Image();
backgroundImage.src =
  "../image/wooden-background-with-leaves-frame-your-text_860540-2214.avif";
const imageSources = ["1", "2", " 3"];
const images = [];
const gravity = 0.3;
const Fruitarr = [];
const gif = new Image();
let score = 0;
const fruitsdata = [
  {
    name: "cherry",
    level: 0,
    size: 15,
    mass: 0.35,
    color: "#FF0000",
    img: "../image/pngs/black-cherry.png",
  },
  {
    name: "seedy",
    level: 1,
    size: 20,
    mass: 0.4,
    img: "../image/pngs/coconut.png",
  },
  {
    name: "orange",
    level: 2,
    size: 25,
    mass: 0.45,
    img: "../image/pngs/green-apple.png",
  },
  {
    name: "lemon",
    level: 3,
    size: 30,
    mass: 0.5,
    img: "../image/pngs/lemon.png",
  },

  {
    name: "peach",
    level: 4,
    size: 35,
    mass: 0.6,
    img: "../image/pngs/peach.png",
  },
  {
    name: "peach",
    level: 5,
    size: 40,
    mass: 0.7,
    img: "../image/pngs/strawberry.png",
  },
  {
    name: "peach",
    level: 6,
    size: 45,
    mass: 0.8,
    img: "../image/pngs/lime.png",
  },
  {
    name: "peach",
    level: 7,
    size: 50,
    mass: 0.9,
    img: "../image/pngs/plum.png",
  },
  {
    name: "peach",
    level: 8,
    size: 55,
    mass: 1,
    img: "../image/pngs/watermelon.png",
  },
];
let count = 1;
let currentFruit;
let canClick = true;
function update() {
  if (Fruitarr.length >= 2) {
    handleCollision(Fruitarr);
  }

  for (const fruit of Fruitarr) {
    checkEdge(fruit);
    fruit.update(gravity);
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  if (backgroundImage.complete) {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  } else {
    backgroundImage.onload = function () {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
  }
  ctx.fillText(`Score: ${score}`, 10, 10);

  ctx.beginPath();
  ctx.moveTo(0, 150);
  ctx.lineTo(ctx.canvas.width, 150);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();

  for (const fruit of Fruitarr) {
    fruit.draw(ctx);
  }
}
const fruitCreateSound = new Audio("../sound/Text 1.wav");
function createFirstFruit() {
  const xrandom = Math.random();
  let randomIndex = Math.floor(Math.random() * imageSources.length);
  let lengtimg = fruitsdata[randomIndex].size;
  let mass = fruitsdata[randomIndex].mass;
  let fruitnew = new Fruit(
    mouseX + xrandom,
    150 - lengtimg,
    randomIndex,
    Fruitarr.length,
    false
  );
  Fruitarr.push(fruitnew);

  fruitCreateSound.play();
  return fruitnew;
}

window.addEventListener("load", createFirstFruit);
function animate() {
  if (!checkGameOver(Fruitarr, ctx)) {
    update();
    draw();
    requestAnimationFrame(animate);
  }
}
animate();
function checkGameOver(Fruitarr, ctx) {
  for (let i = 0; i < Fruitarr.length; i++) {
    if (Fruitarr[i].y < 150 - Fruitarr[i].radius - 20) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Xóa toàn bộ canvas
      ctx.font = "40px Arial"; // Kiểu chữ và kích thước
      ctx.fillStyle = "red"; // Màu chữ
      ctx.textAlign = "center"; // Canh giữa
      ctx.fillText("Game Over", ctx.canvas.width / 2, ctx.canvas.height / 2); // Hiển thị "Game Over"
      drawPlayAgainButton(ctx);
      return true;
    }
  }
  return false;
}
function resetGame() {
  location.reload();
}
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const buttonX = canvas.width / 2 - 75;
  const buttonY = canvas.height / 2 + 50;
  const buttonWidth = 150;
  const buttonHeight = 50;

  if (
    mouseX >= buttonX &&
    mouseX <= buttonX + buttonWidth &&
    mouseY >= buttonY &&
    mouseY <= buttonY + buttonHeight
  ) {
    resetGame();
  }
});

function drawPlayAgainButton(ctx) {
  const buttonX = ctx.canvas.width / 2 - 50;
  const buttonY = ctx.canvas.height / 2 + 50;
  const buttonWidth = 100;
  const buttonHeight = 40;

  ctx.fillStyle = "blue";
  ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

  ctx.font = "14px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(
    "Play Again",
    buttonX + buttonWidth / 2,
    buttonY + buttonHeight / 2
  );
}
