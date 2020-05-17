// Get the canvas where we will draw a grid of squares.
var canvas = document.getElementById('myCanvas');

// Get a 2-dimensional drawing context so we can draw using x and y coordinates.
var drawingContext2D = canvas.getContext('2d');

// Calculate the minimum of the browser window width and height.
const SIZE = Math.min(window.innerWidth, window.innerHeight);

// Set the canvas width and height so that it is square and fits the screen.
canvas.width  = SIZE;
canvas.height = SIZE;

const MAX_ITERATIONS = 64;

var realAxisMin = -1;
var imaginaryAxisMin = -1;
var axisSize = 2;
var screenToAxisScale = 1 / (SIZE / axisSize);

drawAxis();
document.getElementById("myCanvas").style.cursor = "crosshair";
canvas.addEventListener("mousemove", getComplexNumber, false);

function drawAxis() {
  // Draw horizontal real number axis
  drawingContext2D.beginPath();
  drawingContext2D.lineWidth = "2";
  drawingContext2D.strokeStyle = "green";
  drawingContext2D.moveTo(0, SIZE / 2);
  drawingContext2D.lineTo(SIZE, SIZE / 2);
  drawingContext2D.stroke();
  drawingContext2D.font = "20px Courier";
  drawingContext2D.fillText("-1", 0, SIZE / 2);
  drawingContext2D.fillText("1", SIZE - 10, SIZE / 2);

  // Draw vertical imaginary number axis
  drawingContext2D.beginPath();
  drawingContext2D.moveTo(SIZE / 2, 0);
  drawingContext2D.lineTo(SIZE / 2, SIZE);
  drawingContext2D.stroke();
  drawingContext2D.fillText("1", (SIZE / 2) - 20, 0 + 20);
  drawingContext2D.fillText("-1", (SIZE / 2) - 30, SIZE);
}

function getComplexNumber(event) {
  // Clear the canvas by drawing a huge white rectangle
  drawingContext2D.fillStyle = "white";
  drawingContext2D.fillRect(0, 0, SIZE, SIZE);
  drawingContext2D.fillStyle = "black";
  drawAxis();

  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  // Calculate complex number (cx is real part, cy is imaginary part) at
  // coordinates of click
  var cx = realAxisMin + (x * screenToAxisScale);
  var cy = imaginaryAxisMin + (y * screenToAxisScale);

  // Draw complex number at coordinates on canvas
  drawingContext2D.beginPath();
  drawingContext2D.strokeStyle = "red";

  var zx = 0;
  var zy = 0;
  var iteration = 0;

  var canvasX = undefined;
  var canvasY = undefined;

  do {
    // Now calculate z_n ^ 2 + c
    // z_n ^ 2 + c = (zx + zyi) ^ 2 + c where i ^ 2 = -1
    // = (zx + zyi) * (zx + zyi) + c
    // = zx ^ 2 + 2 * zx * zyi + zyi ^ 2 + c
    // = zx ^ 2 + 2 * zx * zyi - zy + c because i ^ 2 = -1
    var xt = zx * zy;
    zx = zx * zx - zy * zy + cx;
    zy = 2 * xt + cy;
    iteration++;

    canvasX = ((zx - realAxisMin) / axisSize) * SIZE;
    canvasY = ((zy - imaginaryAxisMin) / axisSize) * SIZE;

    // Draw line to coordinates on canvas
    drawingContext2D.lineTo(canvasX, canvasY);
    drawingContext2D.stroke();

  } while (iteration < MAX_ITERATIONS);

}
