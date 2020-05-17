// Get the canvas where we will draw a grid of squares.
var canvas = document.getElementById('myCanvas');

// Get a 2-dimensional drawing context so we can draw using x and y coordinates.
var drawingContext2D = canvas.getContext('2d');

// Calculate the minimum of the browser window width and height.
const SIZE = Math.min(window.innerWidth, window.innerHeight);

// Set the canvas width and height so that it is square and fits the screen.
canvas.width  = SIZE;
canvas.height = SIZE;

// Get the maximum value from the range slider
const maxRange = document.getElementById('myRangeSlider').max;

// Calculate the width of each square to be drawn
const squareWidth = SIZE / maxRange;

// This function is only executed when the range slider value is changed.
function drawSquares() {

  // First clear the drawing area and get ready to draw
  drawingContext2D.clearRect(0, 0, canvas.width, canvas.height);
  drawingContext2D.beginPath();

  // Get the value of x from the range slider
  var x = document.getElementById('myRangeSlider').value;

  // Set the label text under the range slider
  document.getElementById('myLabel').innerHTML = "x = " + x
    + " and x * x = " + x * x;

  // Set colours for each square and for the border of each square
  drawingContext2D.fillStyle = "lavender";
  drawingContext2D.strokeStyle = "white";

  // Now create a grid of x rows and x columns
  for (var row = 0; row < x; row++) {
    for (var column = 0; column < x; column++) {

      // Draw a square at each grid location
      drawingContext2D.rect(row * squareWidth, column * squareWidth,
        squareWidth, squareWidth);

      // Fill the square with our chosen colour
      drawingContext2D.fill();

      // Set the border with our chosen colour
      drawingContext2D.stroke();
    }
  }

}
