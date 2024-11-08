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
    this.element = document.createElement("img");
    this.element.src = this.sprite;
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.classList.add("bala");
    return this.element;
  }

  move() {
    this.x += this.direction * 10;
  }

  isOffScreen() {
    return this.x < 0 || this.x > window.innerWidth;
  }
}
