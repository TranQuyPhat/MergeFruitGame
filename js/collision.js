function handleCollision(Fruitarr) {
  Fruitarr.forEach((fruit, index) => {
    fruit.stt = index; // Cập nhật chỉ số vị trí
  });
  for (let i = 0; i < Fruitarr.length; i++) {
    for (let j = i + 1; j < Fruitarr.length; j++) {
      let A = Fruitarr[i];
      let B = Fruitarr[j];

      const dx = A.x - B.x;
      const dy = A.y - B.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDist = A.radius + B.radius;
      if (A.falling && B.falling) {
        if (distance < minDist) {
          if (A.type === B.type) {
            const midX = (A.x + B.x) / 2;
            const midY = (A.y + B.y) / 2;

            const nextLevel = A.type + 1;
            if (nextLevel < fruitsdata.length) {
              // Create a new fruit at the midpoint with the next level
              const newFruit = new Fruit(
                midX,
                midY,
                nextLevel,
                Fruitarr.length,
                true
              );
              // console.log(`New fruit created: `, newFruit);
              score += A.radius;
              // Add the new fruit to the fruits array
              Fruitarr.unshift(newFruit);
              const indexA = Fruitarr.indexOf(A);
              const indexB = Fruitarr.indexOf(B);

              // console.log(`indexA :${indexA}, indexB :${indexB}, `);
              // console.log(Fruitarr.length);
              // Kiểm tra và xóa phần tử có chỉ số cao hơn trước
              if (indexA > indexB) {
                if (indexA > -1) Fruitarr.splice(indexA, 1); // Xóa A trước nếu indexA lớn hơn indexB
                if (indexB > -1) Fruitarr.splice(indexB, 1); // Sau đó xóa B
              } else {
                if (indexB > -1) Fruitarr.splice(indexB, 1); // Xóa B trước nếu indexB lớn hơn indexA
                if (indexA > -1) Fruitarr.splice(indexA, 1); // Sau đó xóa A
              }
            }
          }

          const angle = Math.atan2(dy, dx);
          const targetX = B.x + Math.cos(angle) * minDist;
          const targetY = B.y + Math.sin(angle) * minDist;
          const ax = (targetX - A.x) * 0.5;
          const ay = (targetY - A.y) * 0.5;

          A.x += ax;
          A.y += ay;
          B.x -= ax;
          B.y -= ay;

          // Cập nhật vận tốc sau va chạm
          const normalX = dx / distance;
          const normalY = dy / distance;
          const relativeVelocityX = A.dx - B.dx;
          const relativeVelocityY = A.dy - B.dy;
          const dotProduct =
            normalX * relativeVelocityX + normalY * relativeVelocityY;
          const coefficient = A.restitution * B.restitution;
          A.dx -= coefficient * dotProduct * normalX;
          A.dy -= coefficient * dotProduct * normalY;
          B.dx += coefficient * dotProduct * normalX;
          B.dy += coefficient * dotProduct * normalY;
        }
      }
    }
  }
}
function checkEdge(A) {
  if (A.y + A.radius > canvas.height) {
    A.y = canvas.height - A.radius;
    A.dy *= -A.restitution;
  }
  if (A.x + A.radius > canvas.width) {
    A.x = canvas.width - A.radius;
  } else if (A.x < A.radius) {
    A.x = A.radius;
  }
}
