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

  takeDamage(damageAmount) {
    this.health -= damageAmount;
    console.log(
      `${this.name} took damage: ${damageAmount}. Health now: ${this.health}`
    );

    if (this.health <= 0) {
      this.alive = false;
      console.log(`${this.name} has died.`);
    }
  }

  getName() {
    return this.name;
  }
}
