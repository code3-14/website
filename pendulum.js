// Get the canvas where we will draw a grid of squares.
var canvas = document.getElementById('myCanvas');

// Get a 2-dimensional drawing context so we can draw using x and y coordinates.
var drawingContext2D = canvas.getContext('2d');

// Calculate the minimum of the browser window width and height.
const SIZE = Math.min(window.innerWidth, window.innerHeight);

// Set the canvas width and height so that it is square and fits the screen.
canvas.width  = SIZE;
canvas.height = SIZE;

// Set the pendulum rod origin to a fixed point
const originX = SIZE / 2;
const originY = 0;

var length, angle, angularVelocity, angularAcceleration = undefined;


initialisePendulum();
drawPendulum();

function initialisePendulum(){

  // Get the value from the range slider and set length as percentage
  // of canvas size
  length = document.getElementById('myRangeSlider').value / 100 * SIZE;

  angle = 0.25 * Math.PI;
  angularVelocity = 0;
  angularAcceleration = 0;
}

function drawPendulum() {

  // First clear the drawing area and get ready to draw
  drawingContext2D.clearRect(0, 0, canvas.width, canvas.height);
  drawingContext2D.beginPath();

  // Calculate position of the pendulum bob
  var bobX = originX + length * Math.sin(angle);
  var bobY = originY + length * Math.cos(angle);

  // Draw the penulum rod
  drawingContext2D.beginPath();
  drawingContext2D.lineWidth = "2";
  drawingContext2D.strokeStyle = "blue";
  drawingContext2D.fillStyle = "lavender";
  drawingContext2D.moveTo(originX, originY);
  drawingContext2D.lineTo(bobX, bobY);
  drawingContext2D.stroke();

  // Draw the pendulm bob
  drawingContext2D.beginPath();
  drawingContext2D.arc(bobX, bobY, 10, 0, 2 * Math.PI);
  drawingContext2D.stroke();
  drawingContext2D.fill();

  // Calculate new angle
  angularAcceleration = -1 * Math.sin(angle) / length;
  angularVelocity += angularAcceleration;
  angle += angularVelocity;

  window.requestAnimationFrame(drawPendulum);
}
