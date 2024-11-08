<template>
  <div class="game">
    <audio ref="backgroundMusic" loop autoplay>
      <source
        src="@/assets/audio/Heaven Pierce Her - Versus.mp3"
        type="audio/mp3"
      />
      Your browser does not support the audio element.
    </audio>

    <div id="area" ref="area">
      <div id="player-1" class="player" ref="player1"></div>
      <div id="player-2" class="player" ref="player2"></div>
    </div>

    <!-- Health Bar Section -->
    <HealthBar
      :player1Health="player1Health"
      :player2Health="player2Health"
      :player1Name="player1Name"
      :player2Name="player2Name"
    />
  </div>
</template>

<script>
import HealthBar from "./HealthBar.vue"; // Import health bar component
import Player from "./Player.js";
import Bullet from "./Bullet.js";

export default {
  components: {
    HealthBar,
  },
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
      player1Health: 100, // Starting health for player 1
      player2Health: 100, // Starting health for player 2
      player1Name: localStorage.getItem("player1Name") || "Player 1",
      player2Name: localStorage.getItem("player2Name") || "Player 2",
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

      this.player1 = new Player(
        this.player1Name,
        100,
        5,
        area.offsetWidth / 10 - 25,
        area.offsetHeight / 2 - 25
      );

      this.player2 = new Player(
        this.player2Name,
        100,
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
      const playerSuffix = player === "player2Character" ? "2" : "";
      const imagePath =
        character === "commando"
          ? new URL(
              `../assets/img/commando${playerSuffix}.png`,
              import.meta.url
            ).href
          : character === "marco"
          ? new URL(`../assets/img/marco${playerSuffix}.png`, import.meta.url)
              .href
          : new URL(`../assets/img/tarma${playerSuffix}.png`, import.meta.url)
              .href;

      console.log(`Image path for ${player}:`, imagePath);
      return imagePath;
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
          new URL("@/assets/img/BulletP1.png", import.meta.url).href,
          this.ultimoDisparoP1
        );
      }

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
          new URL("@/assets/img/BulletP2.png", import.meta.url).href,
          this.ultimoDisparoP2
        );
      }

      if (!this.player1.isAlive()) {
        this.juego = false;
        this.verificarSiJugadorMuere(this.player1);
      } else if (!this.player2.isAlive()) {
        this.juego = false;
        this.verificarSiJugadorMuere(this.player2);
      }

      this.$refs.player1.style.left = `${this.player1.x}px`;
      this.$refs.player1.style.top = `${this.player1.y}px`;
      this.$refs.player2.style.left = `${this.player2.x}px`;
      this.$refs.player2.style.top = `${this.player2.y}px`;

      this.updateBullets();

      requestAnimationFrame(this.update);
    },

    disparo(player, direction, sprite, lastShotTime) {
      const currentTime = Date.now();
      if (currentTime - lastShotTime >= this.shotCooldown) {
        const xBullet = player.x + (direction === 1 ? 50 : -10);
        const yBullet = player.y + 20;
        const bullet = new Bullet(xBullet, yBullet, direction, sprite);
        const bulletElement = bullet.mostrar();
        this.balas.push({ bullet, element: bulletElement });

        return currentTime;
      }
      return lastShotTime;
    },

    verificarColision(bala, jugador) {
      const jugadorWidth = 50;
      const jugadorHeight = 50;

      if (
        bala.x < jugador.x + jugadorWidth &&
        bala.x + 12 > jugador.x &&
        bala.y < jugador.y + jugadorHeight &&
        bala.y + 5 > jugador.y
      ) {
        return true;
      }

      return false;
    },

    updateBullets() {
      this.balas.forEach((bulletObj, index) => {
        bulletObj.bullet.move();
        bulletObj.element.style.left = `${bulletObj.bullet.x}px`;
        bulletObj.element.style.top = `${bulletObj.bullet.y}px`;

        if (this.verificarColision(bulletObj.bullet, this.player1)) {
          this.handleBulletCollision(
            bulletObj.bullet,
            bulletObj.element,
            this.player1
          );
        } else if (this.verificarColision(bulletObj.bullet, this.player2)) {
          this.handleBulletCollision(
            bulletObj.bullet,
            bulletObj.element,
            this.player2
          );
        }

        if (bulletObj.bullet.isOffScreen()) {
          bulletObj.element.remove();
          this.balas.splice(index, 1);
        }
      });
    },

    handleBulletCollision(bullet, bulletElement, player) {
      bulletElement.remove();
      const bulletIndex = this.balas.findIndex((b) => b.bullet === bullet);
      if (bulletIndex > -1) {
        this.balas.splice(bulletIndex, 1);
      }
      if (player === this.player1) {
        this.player1Health = Math.max(0, this.player1Health - 10);
      } else {
        this.player2Health = Math.max(0, this.player2Health - 10);
      }
      console.log(player1.health);

      this.verificarSiJugadorMuere(player);
    },
    mostrarExplosion(posX, posY) {
      const explosion = document.createElement("img");
      explosion.src = new URL(
        "@/assets/img/explosion.gif",
        import.meta.url
      ).href;
      explosion.classList.add("explosion");
      explosion.style.position = "absolute";
      explosion.style.left = `${posX - 56}px`;
      explosion.style.top = `${posY - 63}px`;
      document.querySelector(".game").appendChild(explosion);

      setTimeout(() => {
        explosion.remove();
      }, 1700);
    },

    verificarSiJugadorMuere(jugador) {
      console.log(
        "Checking death for:",
        jugador.getName(),
        "Alive?",
        jugador.isAlive()
      );
      if (jugador.isAlive() == false) {
        this.juego = false;
        this.limpiarBalas();
        this.mostrarExplosion(jugador.x, jugador.y);

        setTimeout(() => {
          alert(`${jugador.getName()} Ha Muerto.`);
          setTimeout(() => {
            this.$router.push("/selector");
          }, 500);
        }, 1750);
      }
    },
  },
};
</script>

<style scoped>
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
