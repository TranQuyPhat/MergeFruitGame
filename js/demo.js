const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// Tạo đối tượng hình ảnh
const img = new Image();
// img.src = "../image/pngs/green-apple.pn g"; // Thay bằng đường dẫn hình ảnh của bạn

let mouseX = 0; // Tọa độ X của chuột
let mouseY = 0; // Tọa độ Y của chuột
let isMouseMoving = false;

// Lắng nghe sự kiện di chuyển chuột
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  isMouseMoving = true; // Đánh dấu rằng chuột đang di chuyển
});
function draw() {
  if (isMouseMoving) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imgSize = 20 * 1.73;
    ctx.drawImage(
      img,
      mouseX - imgSize / 2,
      mouseY - imgSize / 2,
      imgSize,
      imgSize
    );
    isMouseMoving = false;
  }
  requestAnimationFrame(draw);
}
img.onload = () => {
  requestAnimationFrame(draw);
};
