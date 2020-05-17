// Get the canvas where we will draw a grid of squares.
var canvas = document.getElementById('myCanvas');

// Get a 2-dimensional drawing context so we can draw using x and y coordinates.
var drawingContext2D = canvas.getContext('2d');

// Calculate the minimum of the browser window width and height.
const SIZE = Math.min(window.innerWidth, window.innerHeight);

// Set the canvas width and height so that it is square and fits the screen.
canvas.width  = SIZE;
canvas.height = SIZE;

const MAX_COLOURS = 256;
const MAX_ITERATIONS = 1024;

var colours = new Array();
var realAxisMin = -2;
var imaginaryAxisMin = -2;
var axisSize = 4;
var screenToAxisScale = 1 / (SIZE / axisSize);

initialiseColours();
drawMandelbrot();

// Run zoomIn() function when mouse click is detected on canvas
canvas.addEventListener("click", zoomIn, false);

function initialiseColours(){
  var red, green, blue = undefined;
  var colourString = undefined;

  for (var i = 0; i < MAX_COLOURS; i++) {
    red = i;
    green = 0;
    blue = i;

    colourString = "rgb(" + red + "," + green + "," + blue + ")";
    colours.push(colourString);
  }
}

function drawMandelbrot() {
  var iteration;
  var cx, cy; // Complex number (cx is real part, cy is imaginary part)

  for (var x_pixel = 0; x_pixel < SIZE; x_pixel++) {
    for (var y_pixel = 0; y_pixel < SIZE; y_pixel++) {

      iteration = 0;

      // Set complex number real part
      cx = realAxisMin + x_pixel * screenToAxisScale;

      // Set complex number imaginary part
      cy = imaginaryAxisMin + y_pixel * screenToAxisScale;

      // Mandelbrot set equation is z_n+1 = z_n ^ 2 + c
      zx = 0; // Initialize z complex number real part
      zy = 0; // Initialize z complex number imaginary part

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
      } while (iteration < MAX_ITERATIONS && (zx * zx + zy * zy) < 4);

    drawingContext2D.beginPath();
    drawingContext2D.rect(x_pixel, y_pixel, 1, 1);
    drawingContext2D.fillStyle = colours[(iteration % MAX_COLOURS)];
    drawingContext2D.fill();
    }
  }
}

function zoomIn(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  // Calculate complex number (cx is real part, cy is imaginary part) at
  // coordinates of click
  var cx = realAxisMin + (x * screenToAxisScale);
  var cy = imaginaryAxisMin + (y * screenToAxisScale);

  axisSize = axisSize / 2;
  realAxisMin = cx - axisSize / 2;
  imaginaryAxisMin = cy - axisSize / 2;
  screenToAxisScale = screenToAxisScale / 2;

  drawMandelbrot();
}

function zoomOut() {
  realAxisMin = realAxisMin - axisSize / 2;
  imaginaryAxisMin = imaginaryAxisMin - axisSize / 2;
  axisSize = axisSize * 2;
  screenToAxisScale = screenToAxisScale * 2;

  drawMandelbrot();
}

function resetMandelbrot() {
  realAxisMin = -2;
  imaginaryAxisMin = -2;
  axisSize = 4;
  screenToAxisScale = 1 / (SIZE / axisSize);

  drawMandelbrot();
}
