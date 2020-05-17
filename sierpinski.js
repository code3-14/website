// Get the canvas where we will draw a grid of squares.
var canvas = document.getElementById('myCanvas');

// Get a 2-dimensional drawing context so we can draw using x and y coordinates.
var drawingContext2D = canvas.getContext('2d');

// Calculate the minimum of the browser window width and height.
const SIZE = Math.min(window.innerWidth, window.innerHeight);

// Set the canvas width and height so that it is square and fits the screen.
canvas.width  = SIZE;
canvas.height = SIZE;

// Define x and y coordinates for our triangle's three corners
const top_corner = [SIZE / 2, 0];
const left_corner = [0, SIZE - 1];
const right_corner = [SIZE - 1, SIZE - 1];

// This function is only executed when a button is pressed. A Sierpinski
// triangle is drawn using the 'Chaos Game' technique (see wikipedia link).
function drawSierpinski(iterations){

  // Clear the canvas by drawing a huge white rectangle
  drawingContext2D.fillStyle = "white";
  drawingContext2D.fillRect(0, 0, SIZE, SIZE);

  // Set a colour for our triangle
  drawingContext2D.fillStyle = "blue";

  // Draw a pixel at the top, left and right corners
  drawingContext2D.fillRect(top_corner[0], top_corner[1], 1, 1);
  drawingContext2D.fillRect(left_corner[0], left_corner[1], 1, 1);
  drawingContext2D.fillRect(right_corner[0], right_corner[1], 1, 1);

  // Pick random x and y coordinates between 0 and SIZE - 1
  var x = Math.floor(Math.random() * SIZE);
  var y = Math.floor(Math.random() * SIZE);

  var random_corner = undefined;

  for (i = 0; i < iterations; i++ ) {
    // Pick a random number 1, 2 or 3 so that we can choose a corner
    random_corner = Math.floor(Math.random() * 3) + 1;

    // Move the x and y coordinates to halfway between current position
    // and a random corner
    if (random_corner == 1) {
      // Pick top corner
      x += (top_corner[0] - x) / 2;
      y += (top_corner[1] - y) / 2;

    } else if (random_corner == 2) {
      // Pick left corner
      x += (left_corner[0] - x) / 2;
      y += (left_corner[1] - y) / 2;

    } else if (random_corner == 3) {
      // Pick right corner
      x += (right_corner[0] - x) / 2;
      y += (right_corner[1] - y) / 2;
    }

    if (iterations <= 1000) {
      // Draw a 5 pixel wide square at new coordinates.
      drawingContext2D.fillRect(x, y, 5, 5);

    } else {
      // Draw a pixel at new coordinates.
      drawingContext2D.fillRect(x, y, 1, 1);
    }
  }
}
