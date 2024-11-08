<template>
  <div class="health-container">
    <!-- Player 1 Health Info -->
    <div class="info player-1">
      <div class="health-bar">
        <div
          class="health"
          :style="{ width: player1HealthPercentage + '%' }"
        ></div>
        <div class="hp">{{ player1Health }} / {{ maxHealth }}</div>
      </div>
      <div class="name">{{ player1Name }}</div>
    </div>

    <!-- Player 2 Health Info -->
    <div class="info player-2">
      <div class="health-bar">
        <div
          class="health"
          :style="{ width: player2HealthPercentage + '%' }"
        ></div>
        <div class="hp">{{ player2Health }} / {{ maxHealth }}</div>
      </div>
      <div class="name">{{ player2Name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player1Health: Number,
    player2Health: Number,
    player1Name: String,
    player2Name: String,
  },
  data() {
    return {
      maxHealth: 100,
    };
  },
  computed: {
    player1HealthPercentage() {
      return (this.player1Health / this.maxHealth) * 100;
    },
    player2HealthPercentage() {
      return (this.player2Health / this.maxHealth) * 100;
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
  position: relative;
}

.health {
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
  color: white;
}

.name {
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
}
</style>
