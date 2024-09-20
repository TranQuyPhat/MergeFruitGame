canvas.addEventListener("click", (event) => {
  if (!canClick) {
    return;
  }

  canClick = false;
  createFirstFruit();
  for (let fruit of Fruitarr) {
    if (fruit.stt == Fruitarr.length - 2) {
      fruit.falling = true;
    }
  }
  setTimeout(() => {
    canClick = true;
  }, 1000);
});

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  for (fruit of Fruitarr) {
    if (fruit.stt == Fruitarr.length - 1) {
      fruit.x = mouseX;
    }
  }
});
