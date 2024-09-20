function drawMenu() {
  // Vẽ nền cho menu
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Vẽ nút Resume
  ctx.fillStyle = "blue";
  ctx.fillRect(canvas.width / 2 - 75, 150, 150, 50);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Resume", canvas.width / 2, 180);

  // Vẽ nút Restart
  ctx.fillStyle = "blue";
  ctx.fillRect(canvas.width / 2 - 75, 250, 150, 50);
  ctx.fillStyle = "white";
  ctx.fillText("Restart", canvas.width / 2, 280);
}
