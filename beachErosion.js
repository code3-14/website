// Get the canvas where we will draw a grid of squares.
var canvas = document.getElementById('myCanvas');

// Get a 2-dimensional drawing context so we can draw using x and y coordinates.
var drawingContext2D = canvas.getContext('2d');

// Calculate the minimum of the browser window width and height.
const SIZE = Math.min(window.innerWidth, window.innerHeight);

// Set the canvas width and height so that it is square and fits the screen.
canvas.width  = SIZE;
canvas.height = SIZE;

var beach = undefined;
var raindropsPerFrame = 100;


initialiseBeach();
drawBeach();

function initialiseBeach() {

  // Create a SIZE*SIZE array for beach
  beach = new Array(SIZE);
  for (var i = 0; i < SIZE; i++) {
    beach[i] = new Array(SIZE);
  }

  // Set raindrop count to 0 for each location in beach array
  for (var i = 0; i < SIZE; i++) {
    for (var j = 0; j < SIZE; j++) {
      beach[i][j] = 0;
    }
  }
}

function drawBeach() {

  // Draw sandy beach
  drawingContext2D.fillStyle = "MOCCASIN";
  drawingContext2D.fillRect(0, 0, canvas.width, canvas.height);
  drawingContext2D.beginPath();

  // Create some rain on the beach
  for (var i = 0; i < raindropsPerFrame; i++) {
    let x = Math.floor(Math.random() * SIZE);
    let y = Math.floor(Math.random() * SIZE);
    beach[x][y]++;
  }


  // For each position on the beach ...
  drawingContext2D.fillStyle = "LIGHTSKYBLUE";
  var raindrops = new Array();
  for (var row = 0; row < SIZE; row++) {
    for (var col = 0; col < SIZE; col++) {

      // ... if there is a raindrop here then ...
      if (beach[row][col] > 0) {

        // Draw raindrop
        drawingContext2D.fillRect(row, col, 2, 2);

        // Store raindrop in list of raindrops
        let raindrop = {x:row, y:col, drops:beach[row][col]};
        raindrops.push(raindrop);
      };
    }
  }

  // Iterate through list of raindrops
  for (var i = 0; i < raindrops.length; i++) {
    let raindrop = raindrops[i];

    if (raindrop.drops >= 2) {


      // Move one drop to left or right with 33% probability
      let rand = Math.random();
      if (rand < 0.33) {

        // Move a drop left
        beach[raindrop.x == 0 ? SIZE - 1 : raindrop.x - 1][raindrop.y]++;
        beach[raindrop.x][raindrop.y]--;
      } else if (rand < 0.66) {

        // Move a drop right
        beach[raindrop.x == SIZE - 1 ? 0 : raindrop.x + 1][raindrop.y]++;
        beach[raindrop.x][raindrop.y]--;
      }
    }

    // Trickle towards sea
    beach[raindrop.x][raindrop.y + 1]++;
    beach[raindrop.x][raindrop.y]--;
  }

  window.requestAnimationFrame(drawBeach);
}
