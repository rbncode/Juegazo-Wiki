export default class Bullet {
  constructor(x, y, direction, sprite) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = 10;
    this.sprite = sprite;
  }

  move() {
    this.x += this.speed * this.direction;
  }

  mostrar() {
    const bulletElement = document.createElement("div");
    bulletElement.classList.add("bala");
    bulletElement.style.backgroundImage = `url(${this.sprite})`;
    bulletElement.style.left = `${this.x}px`;
    bulletElement.style.top = `${this.y}px`;
    document.getElementById("area").appendChild(bulletElement);
    return bulletElement;
  }
}
