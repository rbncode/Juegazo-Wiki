<template>
  <div class="health-container">
    <div class="info player-1">
      <div class="health-bar">
        <div id="p1-health-bar" class="health"></div>
        <div id="p1-health-value" class="hp"></div>
      </div>
      <div class="name">{{ player1Name }}</div>
    </div>
    <div class="info player-2">
      <div class="health-bar">
        <div id="p2-health-bar" class="health"></div>
        <div id="p2-health-value" class="hp"></div>
      </div>
      <div class="name">{{ player2Name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player1Name: localStorage.getItem("player1Name") || "Player 1",
      player2Name: localStorage.getItem("player2Name") || "Player 2",
    };
  },
  methods: {
    updateHealth(player, healthBarId, healthTextId) {
      const healthBar = document.getElementById(healthBarId);
      const healthText = document.getElementById(healthTextId);
      const healthPercentage = (player.health / player.maxhealth) * 100;
      healthBar.style.width = healthPercentage + "%";
      healthText.innerHTML = `${player.health}/${player.maxhealth}`;
    },
  },
};
</script>

<style scoped>
.health-container {
  width: 100%;
  position: absolute;
  top: 90px;
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
</style>
