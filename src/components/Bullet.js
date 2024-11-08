// Bullet.js
export default class Bullet {
  constructor(x, y, direction, sprite) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.sprite = sprite;
    this.width = 12;
    this.height = 5;
  }

  mostrar() {
    const bulletElement = document.createElement("div");
    bulletElement.classList.add("bala");
    bulletElement.style.backgroundImage = `url(${this.sprite})`;
    bulletElement.style.left = `${this.x}px`;
    bulletElement.style.top = `${this.y}px`;
    document.querySelector("#area").appendChild(bulletElement);

    return bulletElement;
  }

  move() {
    this.x += this.direction * 10;
  }

  isOffScreen() {
    return this.x < 0 || this.x > window.innerWidth;
  }
}
