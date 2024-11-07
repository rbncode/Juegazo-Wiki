<script>
class Player {
  constructor(name, health, damage, posX, posY) {
    this.name = name;
    this.health = health;
    this.maxhealth = health;
    this.damage = damage;
    this.x = posX;
    this.y = posY;
  }

  //Verifica si el personaje esta vivo
  isAlive() {
    return this.health > 0;
  }

  //Retorna la información actual del personaje
  status() {
    return `${this.name} - HP ${this.health}/${this.maxhealth}`;
  }

  getName() {
    return `${this.name}`;
  }

  getHealth() {
    return `${this.health}`;
  }

  setX(posX) {
    this.x = posX;
  }
  getX() {
    return `${this.x}`;
  }
  setY(posY) {
    this.y = posY;
  }
  getY() {
    return `${this.y}`;
  }
}
</script>

<template></template>
