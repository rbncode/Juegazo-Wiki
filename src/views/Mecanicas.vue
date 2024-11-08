<script>

</script>

<template>
  <div class="mechanics">
    <h1 class="titulo">Personajes y Controles</h1>
    <h2 class="subtitulo">Controles</h2>
    <div class="seccion">
      <div class="jugador1">
        <h3>Jugador 1</h3>
        <p>WASD - movimiento</p>
        <p>F - disparo</p>
      </div>
      <hr>
      <div class="jugador2">
        <h3>Jugador 2</h3>
        <p>IJKL - movimiento</p>
        <p>H - disparo</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .mechanics{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    row-gap: 10px;
  }
  .seccion{
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 20px;
  }
  hr{
    height: 60px;
  }
</style>