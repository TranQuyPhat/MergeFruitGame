function handleCollision(Fruitarr) {
  Fruitarr.forEach((fruit, index) => {
    fruit.stt = index; // Cập nhật chỉ số vị trí
  });
  let n = 0;
  const fruitCreateSound = new Audio(
    "../sound/FreeSFX/GameSFX/PickUp/Retro PickUp Coin StereoUP 04.wav"
  );

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
              const newFruit = new Fruit(
                midX,
                midY,
                nextLevel,
                Fruitarr.length,
                true
              );
              // console.log(`New fruit created: `, newFruit);
              score += A.radius;
              Fruitarr.unshift(newFruit);
              fruitCreateSound.play();
              const indexA = Fruitarr.indexOf(A);
              const indexB = Fruitarr.indexOf(B);

              // console.log(`indexA :${indexA}, indexB :${indexB}, `);
              // console.log(Fruitarr.length);
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
          const ax = targetX - A.x;
          const ay = targetY - A.y;

          A.x += ax;
          A.y += ay;
          B.x -= ax;
          B.y -= ay;

          const normalX = dx / distance;
          const normalY = dy / distance;
          const relativeVelocityX = A.dx - B.dx;
          const relativeVelocityY = A.dy - B.dy;
          const dotProduct =
            normalX * relativeVelocityX + normalY * relativeVelocityY;
          const coefficient = A.restitution * B.restitution;
          let impulse = (2 * dotProduct) / (A.mass + B.mass);

          A.dx -= coefficient * impulse * normalX * B.mass;
          A.dy -= coefficient * impulse * normalY * B.mass;
          B.dx += coefficient * impulse * normalX * A.mass;
          B.dy += coefficient * impulse * normalY * A.mass;
        }
      }
    }
  }
}
function checkEdge(A) {
  if (A.y + A.radius > canvas.height) {
    A.y = canvas.height - A.radius;
    A.dy *= -A.restitution;
    if (A.dy <= 0) {
      A.dy = 0;
    }
  }
  if (A.x + A.radius > canvas.width) {
    A.x = canvas.width - A.radius;
  } else if (A.x < A.radius) {
    A.x = A.radius;
  }
}
