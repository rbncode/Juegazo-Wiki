<script>const prevButtons = document.querySelectorAll("#prev");
const nextButtons = document.querySelectorAll("#next");
const carousels = document.querySelectorAll(".carousel");

// Track the current image index for each carousel (both players)
let currentIndex = [0, 0]; // Start with the first image for both carousels

// Total number of images in each carousel
const totalImages = 3; // Set this to the total number of images

// Track the character names corresponding to the images for both players
const characters = [
  ["commando", "marco", "tarma"], // Characters for Player 1
  ["commando2", "marco2", "tarma2"], // Characters for Player 2
];

prevButtons.forEach((prevButton, index) => {
  prevButton.addEventListener("click", () => {
    // Move to the previous image, or wrap around to the last one if at the start
    currentIndex[index] =
      currentIndex[index] > 0 ? currentIndex[index] - 1 : totalImages - 1;
    updateCarousel(index);
  });
});

nextButtons.forEach((nextButton, index) => {
  nextButton.addEventListener("click", () => {
    // Move to the next image, or wrap around to the first one if at the end
    currentIndex[index] =
      currentIndex[index] < totalImages - 1 ? currentIndex[index] + 1 : 0;
    updateCarousel(index);
  });
});

function updateCarousel(carouselIndex) {
  const imageWidth = 200; // The width of each image in pixels
  const translateValue = currentIndex[carouselIndex] * -imageWidth; // Shift based on the current image index
  carousels[carouselIndex].style.transform = `translateX(${translateValue}px)`; // Apply the transformation
}

// Function to get player data when the "Start playing!" button is clicked
document.querySelector("button").addEventListener("click", () => {
  // Get player names from input fields
  const player1Name = document.getElementById("player1-name").value;
  const player2Name = document.getElementById("player2-name").value;

  // Get selected characters based on the current index for each player
  const player1Character = characters[0][currentIndex[0]];
  const player2Character = characters[1][currentIndex[1]];

  // Store the names and characters in local storage
  localStorage.setItem("player1Name", player1Name);
  localStorage.setItem("player2Name", player2Name);
  localStorage.setItem("player1Character", player1Character);
  localStorage.setItem("player2Character", player2Character);

  // Redirect to the game page (juego.html)
  window.location.href = "juego.html";
});
</script>
<template><!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="styles/index.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        />
      </head>
      <body>
        <main></main>
    
        <div class="container">
          <div class="character-container">
            <div class="selection player1">
              <section class="wrapper">
                <i class="fa-solid fa-arrow-left button" id="prev"></i>
                <div class="image-container">
                  <div class="carousel">
                  </div>
                  <i class="fa-solid fa-arrow-right button" id="next"></i>
                </div>
              </section>
              <label for="">Player 1</label>
              <input id="player1-name" class="name-input" type="text" value="" />
            </div>
            <div class="selection player2">
              <section class="wrapper">
                <i class="fa-solid fa-arrow-left button" id="prev"></i>
                <div class="image-container">
                  <div class="carousel">
                  </div>
                  <i class="fa-solid fa-arrow-right button" id="next"></i>
                </div>
              </section>
              <label for="">Player 2</label>
              <input id="player2-name" class="name-input" type="text" />
            </div>
          </div>
          <button type="submit" onclick="location.href='juego.html'">
            Start playing!
          </button>
        </div>
    
      </body>
    </html>
    </template>
<style>body {
    font-family: Arial, sans-serif;
    background-color: #1d1d1d;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    padding: 20px;
  }
  
  .character-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 30px;
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
    width: 150px;
    height: 30px;
    justify-content: center;
    text-align: center;
  }
  </style>