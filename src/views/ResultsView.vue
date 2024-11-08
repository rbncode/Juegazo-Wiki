<template>
  <div class="body">
    <h1>Resultados:</h1>
    <br />
    <div>
      <button @click="startGame">Volver a jugar</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      this.$router.push("/selector");
    },
  },
};
</script>

<style scoped>
.body {
  font-family: Arial, sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  row-gap: 40px;
}
h1 {
  margin: 20px;
}

button {
  top: 100px;
  display: flex;
  flex-direction: column;
  background-color: #bbeff4;
  border: none;
  border-radius: 20px;
  width: 100px;
  height: 30px;
  justify-content: center;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
</style>
