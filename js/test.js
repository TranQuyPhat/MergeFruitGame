const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 600;
const backgroundImage = new Image();
backgroundImage.src = "../image/823388313309606.jpg"; // Replace with your image path
const imageSources = [
  "../image/pngs/orange.png",
  "../image/pngs/green-apple.png",
];
const images = [];
const gravity = 0.2;
const Fruitarr = [];
const gif = new Image();
let score = 0;

let x = canvas.width / 2;
// Tạo các đối tượng vật lý
// Xử lý sự kiện khi nhấn phím Space
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    // Kiểm tra nếu phím nhấn là Space
    const rect = canvas.getBoundingClientRect();
    const xrandom = Math.random(); // Sử dụng random thay cho clientX (không có vị trí chuột trong sự kiện keydown)
    const randomIndex = Math.floor(Math.random() * imageSources.length);
    let lengtimg = fruitsdata[randomIndex].size;

    Fruitarr.push(new Fruit(x + xrandom, 100 - lengtimg, randomIndex, "new"));
  }
  if (event.code === "ArrowL eft") {
    x -= 20;
  }
  if (event.code === "ArrowRight") {
    x += 20;
  }
});

function update() {
  if (Fruitarr.length >= 2) {
    handleCollision(Fruitarr);
  }

  for (const body of Fruitarr) {
    body.update(gravity);
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (backgroundImage.complete) {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  } else {
    // Optionally handle the case where the image is still loading
    backgroundImage.onload = function () {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
  }

  for (const body of Fruitarr) {
    body.draw(ctx);
  }
  ctx.font = "20px Arial"; // Kích thước và kiểu chữ
  ctx.fillStyle = "black"; // Màu chữ
  ctx.textAlign = "left"; // Canh lề chữ
  ctx.textBaseline = "top"; // Căn chỉnh chữ từ trên xuống

  // Vẽ dòng điểm số
  ctx.fillText(`Score: ${score}`, 10, 10); // X, Y là vị trí điểm số

  // Vẽ đường ngang (đường mốc)
  ctx.beginPath();
  ctx.moveTo(0, 100); // Điểm bắt đầu của đường
  ctx.lineTo(ctx.canvas.width, 100); // Điểm kết thúc của đường
  ctx.strokeStyle = "red"; // Màu đường
  ctx.lineWidth = 2; // Độ dày đường
  ctx.stroke(); // Vẽ đường
  ctx.closePath();
}

function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}
animate();
