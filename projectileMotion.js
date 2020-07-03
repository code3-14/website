// Get the canvas where we will draw a grid of squares.
var canvas = document.getElementById('myCanvas');

// Get a 2-dimensional drawing context so we can draw using x and y coordinates.
var drawingContext2D = canvas.getContext('2d');

// Calculate the minimum of the browser window width and height.
const SIZE = Math.min(window.innerWidth, window.innerHeight);

// Set the canvas width and height so that it fits the screen.
canvas.width  = window.innerWidth;
canvas.height = SIZE;

var xPosition, yPosition, xVelocity, yVelocity, xVelocityWind = undefined;

initialise();
drawProjectile();

function initialise(){
  // Set the projectile initial values
  xPosition = 0;
  yPosition = SIZE - 1;
  xVelocity = (SIZE * 0.2) / 30;
  //yVelocity = -(SIZE * 0.7) / 30;
  yVelocity = -0.7 * Math.sqrt(SIZE);


  // Set a random wind speed
  xVelocityWind = (Math.random() - 0.5) * 10;
}

function drawProjectile() {

  // First clear the drawing area and get ready to draw
  drawingContext2D.clearRect(0, 0, canvas.width, canvas.height);
  drawingContext2D.beginPath();

  // Draw triangles to show wind direction and speed
  drawingContext2D.fillStyle = "lightcyan";
  var yPositionWindTriangle = 0;
  drawingContext2D.beginPath();
  while (yPositionWindTriangle < SIZE) {
    drawingContext2D.moveTo(SIZE / 2, yPositionWindTriangle);
    drawingContext2D.lineTo(SIZE / 2 + xVelocityWind * SIZE / 10, yPositionWindTriangle + SIZE / 40);
    drawingContext2D.lineTo(SIZE / 2, yPositionWindTriangle + SIZE / 20);
    drawingContext2D.lineTo(SIZE / 2, yPositionWindTriangle);
    drawingContext2D.fill();
    yPositionWindTriangle += SIZE / 5;
  }

  // Draw wind text
  drawingContext2D.font = "30px Courier";
  drawingContext2D.fillStyle = "lightblue";
  var windString = "Wind speed " + xVelocityWind;
  drawingContext2D.fillText(windString.slice(0,15), 0, SIZE / 2, SIZE);

  // Draw the projectile
  drawingContext2D.beginPath();
  drawingContext2D.lineWidth = "2";
  drawingContext2D.strokeStyle = "green";
  drawingContext2D.fillStyle = "palegreen";
  drawingContext2D.arc(xPosition, yPosition, 10, 0, 2 * Math.PI);
  drawingContext2D.stroke();
  drawingContext2D.fill();

  // Calculate effect of gravity
  yVelocity += 9.8 / 30; // y-axis is upside down. Assume 30 fps.

  // Calculate effect of wind
  xVelocity += xVelocityWind / 30;

  // Calculate new projectile position
  xPosition += xVelocity;
  yPosition += yVelocity;

  window.requestAnimationFrame(drawProjectile);

  // Only calculate projectile motion if it is above the ground
  if (yPosition > SIZE * 3) initialise();
}
