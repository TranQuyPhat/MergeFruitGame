const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 600;
const backgroundImage = new Image();
backgroundImage.src = "../image/823388313309606.jpg"; // Replace with your image path
const imageSources = ["1", "2", " 3"];
const images = [];
const gravity = 0.2;
const Fruitarr = [];
const gif = new Image();
let score = 0;
const fruitsdata = [
  {
    name: "cherry",
    level: 0,
    size: 10,
    color: "#FF0000",
    img: "../image/pngs/black-cherry.png",
  },
  {
    name: "seedy",
    level: 1,
    size: 15,
    img: "../image/pngs/coconut.png",
  },
  {
    name: "orange",
    level: 2,
    size: 20,
    img: "../image/pngs/green-apple.png",
  },
  {
    name: "lemon",
    level: 3,
    size: 30,
    img: "../image/pngs/lemon.png",
  },

  {
    name: "kiwi",
    level: 4,
    size: 40,
    img: "../image/pngs/peach.png",
  },
];
let currentFruit;
canvas.addEventListener("click", (event) => {
  createFirstFruit();
  console.log(Fruitarr);
  for (fruit of Fruitarr) {
    if (fruit.stt == Fruitarr.length - 2) {
      fruit.falling = true;
    }
  }
});
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
});
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

  for (const fruit of Fruitarr) {
    fruit.draw(ctx);
  }
}
function createFirstFruit() {
  const xrandom = Math.random();
  const randomIndex = Math.floor(Math.random() * imageSources.length);
  let lengtimg = fruitsdata[randomIndex].size;

  let fruitnew = new Fruit(
    canvas.width / 2 + xrandom,
    100 - lengtimg,
    randomIndex,
    Fruitarr.length,
    false
  );
  Fruitarr.push(fruitnew);
  return fruitnew;
}

window.addEventListener("load", createFirstFruit);
function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}
animate();

// ctx.font = "20px Arial"; // Kích thước và kiểu chữ
//   ctx.fillStyle = "black"; // Màu chữ
//   ctx.textAlign = "left"; // Canh lề chữ
//   ctx.textBaseline = "top"; // Căn chỉnh chữ từ trên xuống

//   // Vẽ dòng điểm số
//   ctx.fillText(`Score: ${score}`, 10, 10); // X, Y là vị trí điểm số

//   ctx.beginPath();
//   ctx.moveTo(0, 100);
//   ctx.lineTo(ctx.canvas.width, 100);
//   ctx.strokeStyle = "red";
//   ctx.lineWidth = 2;
//   ctx.stroke();
//   ctx.closePath();
// if (backgroundImage.complete) {
//   ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
// } else {
//   // Optionally handle the case where the image is still loading
//   backgroundImage.onload = function () {
//     ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//   };
// }
