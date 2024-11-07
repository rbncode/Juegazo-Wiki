<template>
  <div class="game">
    <div id="area" ref="area">
      <div id="player-1" class="player" ref="player1"></div>
      <div id="player-2" class="player" ref="player2"></div>
    </div>
  </div>
</template>

<script>
import Player from "./Player.js";
import Bullet from "./Bullet.js";

export default {
  data() {
    return {
      juego: true,
      balas: [],
      shotCooldown: 333,
      player1: null,
      player2: null,
      ultimoDisparoP1: 0,
      ultimoDisparoP2: 0,
      playerSpeed: 5,
      keys: {},
    };
  },
  mounted() {
    this.initializePlayers();
    this.setupEventListeners();
    this.update();
  },
  methods: {
    initializePlayers() {
      const area = this.$refs.area;
      const player1Name = localStorage.getItem("player1Name");
      const player2Name = localStorage.getItem("player2Name");

      this.player1 = new Player(
        player1Name,
        150,
        5,
        area.offsetWidth / 10 - 25,
        area.offsetHeight / 2 - 25
      );
      this.player2 = new Player(
        player2Name,
        150,
        5,
        area.offsetWidth - area.offsetWidth / 10 - 25,
        area.offsetHeight / 2 - 25
      );

      this.$refs.player1.style.backgroundImage = `url(${this.getPlayerImage(
        "player1Character"
      )})`;
      this.$refs.player2.style.backgroundImage = `url(${this.getPlayerImage(
        "player2Character"
      )})`;
    },
    getPlayerImage(player) {
      const character = localStorage.getItem(player);
      return character === "commando"
        ? "img/commando.png"
        : character === "marco"
        ? "img/marco.png"
        : "img/tarma.png";
    },
    setupEventListeners() {
      window.addEventListener("keydown", (e) => {
        this.keys[e.key.toLowerCase()] = true;
      });
      window.addEventListener("keyup", (e) => {
        this.keys[e.key.toLowerCase()] = false;
      });
    },
    update() {
      if (!this.juego) return;

      const area = this.$refs.area;

      // Player 1 movement
      if (this.keys["w"] && this.player1.y > 0) {
        this.player1.y -= this.playerSpeed;
      }
      if (this.keys["s"] && this.player1.y < area.offsetHeight - 52) {
        this.player1.y += this.playerSpeed;
      }
      if (this.keys["a"] && this.player1.x > 0) {
        this.player1.x -= this.playerSpeed;
      }
      if (this.keys["d"] && this.player1.x < area.offsetWidth / 2 - 60) {
        this.player1.x += this.playerSpeed;
      }
      if (this.keys["f"]) {
        this.ultimoDisparoP1 = this.disparo(
          this.player1,
          1,
          "../img/BulletP1.png",
          this.ultimoDisparoP1
        );
      }

      // Player 2 movement
      if (this.keys["i"] && this.player2.y > 0) {
        this.player2.y -= this.playerSpeed;
      }
      if (this.keys["k"] && this.player2.y < area.offsetHeight - 52) {
        this.player2.y += this.playerSpeed;
      }
      if (this.keys["j"] && this.player2.x > area.offsetWidth / 2 + 10) {
        this.player2.x -= this.playerSpeed;
      }
      if (this.keys["l"] && this.player2.x < area.offsetWidth - 52) {
        this.player2.x += this.playerSpeed;
      }
      if (this.keys["h"]) {
        this.ultimoDisparoP2 = this.disparo(
          this.player2,
          -1,
          "../img/BulletP2.png",
          this.ultimoDisparoP2
        );
      }

      // Update player positions in DOM
      this.$refs.player1.style.left = `${this.player1.x}px`;
      this.$refs.player1.style.top = `${this.player1.y}px`;
      this.$refs.player2.style.left = `${this.player2.x}px`;
      this.$refs.player2.style.top = `${this.player2.y}px`;

      requestAnimationFrame(this.update);
    },
    disparo(player, direction, sprite, lastShotTime) {
      const currentTime = Date.now();
      if (currentTime - lastShotTime >= this.shotCooldown) {
        // Bullet creation logic
        const xBullet = player.x + (direction === 1 ? 50 : -10);
        const yBullet = player.y + 20;
        const bullet = new Bullet(xBullet, yBullet, direction, sprite);
        const bulletElement = bullet.mostrar();
        this.balas.push({ bullet, element: bulletElement });

        return currentTime; // Update last shot time
      }
      return lastShotTime;
    },
    verificarColision(bala, jugador) {
      const jugadorWidth = 50;
      const jugadorHeight = 50;

      return (
        bala.x < jugador.x + jugadorWidth &&
        bala.x + 12 > jugador.x &&
        bala.y < jugador.y + jugadorHeight &&
        bala.y + 5 > jugador.y
      );
    },
    mostrarExplosion(posX, posY) {
      const explosion = document.createElement("img");
      explosion.src = "../img/explosion.gif";
      explosion.classList.add("explosion");
      explosion.style.position = "fixed";
      explosion.style.left = `${posX - 56}px`;
      explosion.style.top = `${posY - 63}px`;
      document.querySelector(".game").appendChild(explosion);

      setTimeout(() => {
        explosion.remove();
      }, 1700);
    },
    limpiarBalas() {
      this.balas.forEach((balaObj) => {
        balaObj.element.remove();
      });
      this.balas = [];
    },
    verificarSiJugadorMuere(jugador) {
      if (!jugador.isAlive()) {
        this.juego = false;
        this.limpiarBalas();
        this.mostrarExplosion(jugador.x, jugador.y);
        setTimeout(() => {
          alert(`${jugador.getName()} Ha Muerto.`);
          window.location.href = "../index.html";
        }, 1750);
      }
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.game {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

#area {
  width: 80vw;
  height: 70vh;
  background-color: #333;
  border: 3px solid #111;
  position: relative;
}

.player {
  width: 50px;
  height: 50px;
  position: absolute;
  background-size: cover;
}

.bala {
  width: 12px;
  height: 5px;
  position: absolute;
}
</style>
