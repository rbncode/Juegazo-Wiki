<script>
let juego = true;

const musica = new Audio("../audio/Heaven Pierce Her - Versus.mp3");
musica.currentTime = 0;
musica.volume = 0.7;
musica.play();

const player1Name = localStorage.getItem("player1Name");
const player2Name = localStorage.getItem("player2Name");

document.querySelector(".player-1 .name").textContent = player1Name;
document.querySelector(".player-2 .name").textContent = player2Name;

const player1Character = localStorage.getItem("player1Character");
const player2Character = localStorage.getItem("player2Character");

console.log(`Player 1: ${player1Name}, Character: ${player1Character}`);
console.log(`Player 2: ${player2Name}, Character: ${player2Character}`);

const player1Image =
  player1Character === "commando"
    ? "img/commando.png"
    : player1Character === "marco"
    ? "img/marco.png"
    : "img/tarma.png";

const player2Image =
  player2Character === "commando2"
    ? "img/commando2.png"
    : player2Character === "marco2"
    ? "img/marco2.png"
    : "img/tarma2.png";

document.getElementById(
  "player-1"
).style.backgroundImage = `url(${player1Image})`;
document.getElementById(
  "player-2"
).style.backgroundImage = `url(${player2Image})`; // Optional: to ensure the image fits

//Objeto Jugador -- Listo

const area = document.getElementById("area");
console.log(document.getElementById("area").offsetWidth);
const player1 = new Player(
  player1Name,
  150,
  5,
  Number(area.offsetWidth / 10) - 25,
  Number(area.offsetHeight / 2) - 25
);
const player2 = new Player(
  player2Name,
  150,
  5,
  Number(area.offsetWidth - Number(area.offsetWidth / 10)) - 25,
  Number(area.offsetHeight / 2) - 25
);

document.querySelector(
  ".player-1 .hp"
).textContent = `${player1.health}/${player1.maxhealth}`;
document.querySelector(
  ".player-2 .hp"
).textContent = `${player2.health}/${player2.maxhealth}`;

//Fisicas Bala -- Listo

class Bullet {
  constructor(x, y, direccion, sprite) {
    this.x = x;
    this.y = y;
    this.direccion = direccion;
    this.speed = 12;
    this.sprite = sprite;
  }

  mover() {
    this.x += this.speed * this.direccion;
  }

  mostrar() {
    const bala = document.createElement("img");
    bala.src = this.sprite;
    bala.classList.add("bala");
    bala.style.left = this.x + "px";
    bala.style.top = this.y + "px";
    document.querySelector(".game").appendChild(bala);
    return bala;
  }
}

function actualizarHUD(player, healthBarId, healthTextId) {
  const healthBar = document.getElementById(healthBarId);
  const healthText = document.getElementById(healthTextId);

  // Calcula el porcentaje de vida restante
  const healthPercentage = (player.health / player.maxhealth) * 100;

  // Actualiza el ancho de la barra de vida
  healthBar.style.width = healthPercentage + "%";

  // Actualiza el texto de vida
  healthText.innerHTML = `${player.health}/${player.maxhealth}`;
}

//Mecanica de Disparo -- En Progreso

let balas = [];
const shotCooldown = 333; //cuanto tiempo en milisegundos pasa para que se muestre otra bala
let ultimoDisparoP1 = 0;
let ultimoDisparoP2 = 0;

const disparoSFX = new Audio("../audio/disparo.ogg");

function disparo(player, direccion, sprite, ultimoDisparo) {
  const tiempoActual = Date.now();

  if (tiempoActual - ultimoDisparo >= shotCooldown) {
    // Ajusta las coordenadas para que la bala salga del centro del jugador
    const xBala = player.x + (direccion === 1 ? 50 : -10); // Ajustar dependiendo del tamaño del sprite
    const yBala = player.y + 20; // Ajustar dependiendo de dónde quieres que salga la bala
    const bala = new Bullet(xBala, yBala, direccion, sprite);
    const balaDisparada = bala.mostrar();
    disparoSFX.currentTime = 0;
    disparoSFX.volume = 0.5;
    disparoSFX.play();
    balas.push({ bala, element: balaDisparada });

    // Actualizar el tiempo del último disparo
    return tiempoActual;
  }

  // Si no dispara, mantener el tiempo de último disparo sin cambios
  return ultimoDisparo;
}

function verificarColision(bala, jugador) {
  const jugadorWidth = 50;
  const jugadorHeight = 50;

  return (
    bala.x < jugador.x + jugadorWidth &&
    bala.x + 12 > jugador.x &&
    bala.y < jugador.y + jugadorHeight &&
    bala.y + 5 > jugador.y
  );
}

const explosionSFX = new Audio("../audio/explosion.ogg");

function mostrarExplosion(posX, posY) {
  const explosion = document.createElement("img");
  explosion.src = "../img/explosion.gif";
  explosion.classList.add("explosion");
  explosion.style.position = "fixed";
  explosion.style.left = posX - 56 + "px";
  explosion.style.top = posY - 63 + "px";
  document.querySelector(".game").appendChild(explosion);

  explosionSFX.currentTime = 0;
  explosionSFX.play();

  setTimeout(() => {
    explosion.remove();
  }, 1700);
}

function limpiarBalas() {
  balas.forEach((balaObj) => {
    balaObj.element.remove(); // Elimina el elemento del DOM
  });
  balas = []; // Reinicia el array de balas
}

function verificarSiJugadorMuere(jugador) {
  if (!jugador.isAlive()) {
    juego = false;
    limpiarBalas();
    console.log(`${jugador.getName()} ha sido eliminado.`);
    mostrarExplosion(Number(`${jugador.getX()}`), Number(`${jugador.getY()}`));
    setTimeout(() => {
      alert(`${jugador.getName()} Ha Muerto.`);
      window.location.href = "../index.html";
    }, 1750);
  }
}

const impactoSFX = new Audio("../audio/impacto.ogg");

function actualizarBala() {
  balas.forEach((balaObj, index) => {
    balaObj.bala.mover();
    balaObj.element.style.left = balaObj.bala.x + "px";

    if (verificarColision(balaObj.bala, player1Pos)) {
      balaObj.element.remove();
      balas.splice(index, 1);
      player1.health -= player2.damage;
      actualizarHUD(player1, "p1-health-bar", "p1-health-value");
      verificarSiJugadorMuere(player1);
      impactoSFX.currentTime = 0;
      impactoSFX.play();
      console.log(
        `${player1.getName()} recibió un disparo. HP restante: ${
          player1.health
        }`
      );
    }

    if (verificarColision(balaObj.bala, player2Pos)) {
      balaObj.element.remove();
      balas.splice(index, 1);
      player2.health -= player1.damage;
      actualizarHUD(player2, "p2-health-bar", "p2-health-value");
      verificarSiJugadorMuere(player2);
      impactoSFX.currentTime = 0;
      impactoSFX.play();
      console.log(
        `${player2.getName()} recibió un disparo. HP restante: ${
          player2.health
        }`
      );
    }

    // Elimina la bala si sale del área de juego
    if (balaObj.bala.x > window.innerWidth || balaObj.bala.x < 0) {
      balaObj.element.remove();
      balas.splice(index, 1);
    }
  });
  requestAnimationFrame(actualizarBala);
}
actualizarBala();

const playerSpeed = 5;
const player_1 = document.getElementById("player-1");
const player_2 = document.getElementById("player-2");

let player1Pos = {
  x: Number(`${player1.getX()}`),
  y: Number(`${player1.getY()}`),
};
let player2Pos = {
  x: Number(`${player2.getX()}`),
  y: Number(`${player2.getY()}`),
};

// Handlers
const keys = {};

function update() {
  if (!juego) return;

  if (keys["w"] && player1Pos.y > 0) {
    player1Pos.y -= playerSpeed;
    player1.setY(player1Pos.y);
  }
  if (
    keys["s"] &&
    player1Pos.y < document.getElementById("area").offsetHeight - 52
  ) {
    player1Pos.y += playerSpeed;
    player1.setY(player1Pos.y);
  }
  if (keys["a"] && player1Pos.x > 0) {
    player1Pos.x -= playerSpeed;
    player1.setX(player1Pos.x);
  }
  if (
    keys["d"] &&
    player1Pos.x < document.getElementById("area").offsetWidth / 2 - 60
  ) {
    player1Pos.x += playerSpeed;
    player1.setX(player1Pos.x);
  }
  if (keys["f"]) {
    player1.setX(player1Pos.x);
    player1.setY(player1Pos.y);
    // Aquí actualizamos el tiempo de disparo del jugador 1
    ultimoDisparoP1 = disparo(
      player1,
      1,
      "../img/BulletP1.png",
      ultimoDisparoP1
    );
  }

  if (keys["i"] && player2Pos.y > 0) {
    player2Pos.y -= playerSpeed;
    player2.setY(player2Pos.y);
  }
  if (
    keys["k"] &&
    player2Pos.y < document.getElementById("area").offsetHeight - 52
  ) {
    player2Pos.y += playerSpeed;
    player2.setY(player2Pos.y);
  }
  if (
    keys["j"] &&
    player2Pos.x > document.getElementById("area").offsetWidth / 2 + 10
  ) {
    player2Pos.x -= playerSpeed;
    player2.setX(player2Pos.x);
  }
  if (
    keys["l"] &&
    player2Pos.x < document.getElementById("area").offsetWidth - 52
  ) {
    player2Pos.x += playerSpeed;
    player2.setX(player2Pos.x);
  }
  if (keys["h"]) {
    player2.setX(player2Pos.x);
    player2.setY(player2Pos.y);
    // Aquí actualizamos el tiempo de disparo del jugador 2
    ultimoDisparoP2 = disparo(
      player2,
      -1,
      "../img/BulletP2.png",
      ultimoDisparoP2
    );
  }

  player_1.style.left = `${player1Pos.x}px`;
  player_1.style.top = `${player1Pos.y}px`;

  player_2.style.left = `${player2Pos.x}px`;
  player_2.style.top = `${player2Pos.y}px`;

  requestAnimationFrame(update);
}

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

update();

console.log(player1);
console.log(player2);

//Musica y SFX -- En Progreso

function reproducir() {
  const music = document.getElementById("musica");
  music.play();
}
</script>

<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/styles/juego.css" />
      <title>Juego Disparo</title>
    </head>
    <body>
      <div class="health-container">
        <div class="info player-1">
          <div class="health-bar">
            <div id="p1-health-bar" class="health"></div>
            <div id="p1-health-value" class="hp"></div>
          </div>
          <div class="name">Player 1</div>
        </div>
        <div class="info player-2">
          <div class="health-bar">
            <div id="p2-health-bar" class="health"></div>
            <div id="p2-health-value" class="hp"></div>
          </div>
          <div class="name">Player 2</div>
        </div>
      </div>
      <div id="area" class="game">
        <div id="player-1" class="player"></div>
        <div id="player-2" class="player"></div>
      </div>
    </body>
  </html>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #1d1d1d;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.health-container {
  width: 100%;
  position: absolute;
  top: 10px;
  display: flex;
  justify-content: space-between;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 10px;
  padding: 0 30px;
}

.info.player-1 {
  align-items: flex-start;
}

.info.player-2 {
  align-items: flex-end;
}

.health-bar {
  width: 300px;
  height: 20px;
  background-color: #555;
  border: white;
  transform: skew(-20deg);
}

.health {
  width: 100%;
  height: 100%;
  background-color: rgb(76, 221, 76);
  transition: width 0.3s ease-in-out;
}

.hp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-weight: bold;
}

.game {
  position: relative;
  min-width: 340px;
  min-height: 140px;
  width: 95%;
  height: 80%;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name {
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
}

.player {
  width: 50px;
  height: 50px;
  position: absolute;
  background-size: cover;
}

#player-1 {
  left: 100px;
  top: 150px;
  background-image: url("../img/marco.png");
}

#player-2 {
  left: 100px;
  top: 150px;
  background-image: url("../img/commando2.png");
}

.bala {
  width: 12px;
  height: 5px;
  position: absolute;
}
</style>
