<template>
  <div class="body">
    <div class="carruseles">
      <!-- Player 1 Carousel -->
      <div class="carousel-container">
        <button @click="navigateCarousel(0, 'prev')" id="prev">Previous</button>
        <div class="limit">
          <div class="carousel" ref="carousel1"> <!-- Player 1 -->
            <img
              v-for="(character, index) in characters[0]"
              :key="`player1-${index}`"
              :src="getCharacterImage(character)"
              class="carousel-image"
            />
          </div>
        </div>
        <button @click="navigateCarousel(0, 'next')" id="next">Next</button>
      </div>
      <!-- Player 2 Carousel -->
      <div class="carousel-container">
        <button @click="navigateCarousel(1, 'prev')" id="prev">Previous</button>
        <div class="limit">
          <div class="carousel" ref="carousel2"> <!-- Player 2 -->
            <img
              v-for="(character, index) in characters[1]"
              :key="`player2-${index}`"
              :src="getCharacterImage(character)"
              class="carousel-image"
            />
          </div>
        </div>
        <button @click="navigateCarousel(1, 'next')" id="next">Next</button>
      </div>
    </div>
    <div class="inicioJuego">
      <!-- Player name inputs and start button -->
      <div class="nombres">
        <input
          type="text"
          id="player1-name"
          v-model="player1Name"
          placeholder="Player 1 Name"
        />
        <input
          type="text"
          id="player2-name"
          v-model="player2Name"
          placeholder="Player 2 Name"
        />
      </div>
      <button @click="startGame">Start playing!</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Player names
      player1Name: "",
      player2Name: "",
      // Track the current index for each carousel
      currentIndex: [0, 0],
      // Character names for each carousel
      characters: [
        ["commando", "marco", "tarma"], // Player 1 characters
        ["commando2", "marco2", "tarma2"], // Player 2 characters
      ],
      // Width of each image in pixels for the translate calculation
      imageWidth: 200,
    };
  },
  methods: {
    navigateCarousel(playerIndex, direction) {
      // Update currentIndex based on direction
      const totalImages = this.characters[playerIndex].length;
      if (direction === "prev") {
        this.currentIndex[playerIndex] =
          this.currentIndex[playerIndex] > 0
            ? this.currentIndex[playerIndex] - 1
            : totalImages - 1;
      } else {
        this.currentIndex[playerIndex] =
          this.currentIndex[playerIndex] < totalImages - 1
            ? this.currentIndex[playerIndex] + 1
            : 0;
      }
      this.updateCarousel(playerIndex);
    },
    updateCarousel(carouselIndex) {
      const carousel = this.$refs[`carousel${carouselIndex + 1}`];  // Corregir el nombre del ref
      const translateValue = this.currentIndex[carouselIndex] * -this.imageWidth;
      carousel.style.transform = `translateX(${translateValue}px)`; // Aplicar el estilo correctamente
    },
    getCharacterImage(character) {
      // Generate character image URL
      return new URL(`../assets/img/${character}.png`, import.meta.url).href;
    },
    startGame() {
      // Store player names and selected characters in localStorage
      const player1Character = this.characters[0][this.currentIndex[0]];
      const player2Character = this.characters[1][this.currentIndex[1]];

      localStorage.setItem("player1Name", this.player1Name);
      localStorage.setItem("player2Name", this.player2Name);
      localStorage.setItem("player1Character", player1Character);
      localStorage.setItem("player2Character", player2Character);

      // Redirect to the game page
      this.$router.push("/juego");
    },
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  flex-direction: row;
  align-items:start;
  width: 200px;
  height: auto;
}

.carousel-item img {
  max-width: 100%; /* Los sprites no se expanden más allá de su contenedor */
  height: auto;
}

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

.carruseles{
  display: flex;
  flex-direction: row;
  column-gap: 50px;
}

.limit{
  overflow: hidden;
}

.carousel-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;
  position: relative;
}

.inicioJuego{
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
}

.nombres{
  display: flex;
  column-gap: 30px;
}

.wrapper i.button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  width: 36px;
  border-radius: 50%;
  text-align: center;
  line-height: 36px;
  color: #fff;
  font-size: 15px;

  z-index: 100;
  cursor: pointer;
}

i#prev {
  left: 25px;
}
i#next {
  right: 25px;
}

.character-showcase {
  display: flex;
  overflow: hidden;
  width: 200px;
  height: 200px;
  position: relative;
}

.wrapper {
  display: flex;
  max-width: 200px;
  width: 100%;
  height: 400px;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.image-container {
  height: 320px;
  max-width: 500px;
  width: 100%;
  justify-content: center;
  overflow: hidden;
}
.image-container .carousel {
  display: flex;
  height: 100%;
  width: 100%;
  transition: all 0.4s ease;
}

.carousel img {
  min-width: 200px; /* Each image takes up 200px width */
  height: 200px; /* Ensure consistent height for the images */
  object-fit: cover;
  justify-self: center;
  border: 15px;
}

label {
  margin: 10px;
  font-size: 1em;
  align-items: center;
  align-self: center;
}

.name-input {
  width: 220px;
  height: 25px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  text-align: center;
}

button {
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
  z-index: 10; /* Asegura que el botón esté encima del carrusel */
}
</style>
