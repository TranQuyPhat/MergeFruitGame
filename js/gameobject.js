const fruitsdata = [
  {
    name: "cherry",
    level: 0,
    size: 20,
    color: "#FF0000",
    img: "../image/pngs/black-cherry.png",
  },
  {
    name: "seedy",
    level: 1,
    size: 30,
    img: "../image/pngs/coconut.png",
  },
  {
    name: "orange",
    level: 2,
    size: 40,
    img: "../image/pngs/green-apple.png",
  },
  {
    name: "lemon",
    level: 3,
    size: 50,
    img: "../image/pngs/lemon.png",
  },

  {
    name: "kiwi",
    level: 4,
    size: 60,
    img: "../image/pngs/peach.png",
  },
];

class Fruit {
  constructor(x, y, type, status) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.status = status;
    const data = fruitsdata[type];
    console.log(`x :  ${x}, y: ${y} , ${status}`);

    if (data) {
      this.radius = data.size;
      this.imgSrc = data.img; // Lưu đường dẫn hình ảnh
    } else {
      this.radius = 20; // Default size if type not found
      this.imgSrc = ""; // Không có hình ảnh nếu type không tìm thấy
    }
    this.dx = 0;
    this.dy = 0;
    this.ax = 0;
    this.ay = 0;
    this.mass = 1;
    this.restitution = 0.8;
    this.friction = 0.98;
    this.image = new Image();
    this.image.src = this.imgSrc;
  }
  // Vẽ đối tượng
  // Vẽ đối tượng
  draw(ctx) {
    // Vẽ hình tròn
    // Vẽ hình ảnh vào giữa hình tròn
    if (this.image.complete) {
      // Tính toán vị trí và kích thước để hình ảnh vừa khớp với hình tròn
      const imgSize = this.radius * 1.73; // Kích thước hình ảnh dựa trên radius
      ctx.drawImage(
        this.image,
        this.x - imgSize / 2, // Căn giữa theo trục x
        this.y - imgSize / 2, // Căn giữa theo trục y
        imgSize,
        imgSize
      );
    }
  }
  // Cập nhật trạng thái của đối tượng
  update(gravity) {
    this.ax = 0; // Reset gia tốc
    this.ay = gravity; // Thêm lực hấp dẫn

    this.dx += this.ax;
    this.dy += this.ay;

    this.x += this.dx;
    this.y += this.dy;

    this.dx *= this.friction;
    this.dy *= this.friction;

    // Va chạm với mặt đất
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.dy *= -this.restitution;
    }
    if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius;
    } else if (this.x < this.radius) {
      this.x = this.radius;
    }
  }

  // Va chạm với đối tượng khác
}
