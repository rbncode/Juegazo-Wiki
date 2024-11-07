export default class Player {
  constructor(name, health, speed, x, y) {
    this.name = name;
    this.health = health;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.alive = true;
  }

  isAlive() {
    return this.health > 0;
  }

  setX(newX) {
    this.x = newX;
  }

  setY(newY) {
    this.y = newY;
  }

  takeDamage(damageAmount) {
    this.health -= damageAmount;
    if (this.health <= 0) {
      this.alive = false;
    }
  }

  getName() {
    return this.name;
  }
}
