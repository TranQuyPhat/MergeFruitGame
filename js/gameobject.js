class Fruit {
  constructor(x, y, type, stt, status) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.falling = status;
    this.stt = stt;
    const data = fruitsdata[type];
    if (data) {
      this.radius = data.size;
      this.imgSrc = data.img;
    } else {
      this.radius = 20;
      this.imgSrc = "";
    }
    this.dx = 0;
    this.dy = 0;
    this.ax = 0;
    this.ay = 0;
    this.mass = data.mass;

    this.restitution = 0.5;
    this.friction = 0.98;
    this.image = new Image();
    this.image.src = this.imgSrc;
  }
  draw(ctx) {
    if (this.image.complete) {
      const imgSize = this.radius * 1.73;

      ctx.drawImage(
        this.image,
        this.x - imgSize / 2,
        this.y - imgSize / 2,
        imgSize,
        imgSize
      );
    }
  }
  update(gravity) {
    if (this.falling) {
      this.ax = 0;
      this.ay = gravity;
      this.dx += this.ax;
      this.dy += this.ay;
      this.x += this.dx;
      this.y += this.dy;
      this.dx *= this.friction;
      this.dy *= this.friction;
    }
  }
}
