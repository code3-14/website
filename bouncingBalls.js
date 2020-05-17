// Get the canvas where we will draw a grid of squares.
var canvas = document.getElementById('myCanvas');

// Get a 2-dimensional drawing context so we can draw using x and y coordinates.
var drawingContext2D = canvas.getContext('2d');

// Calculate the minimum of the browser window width and height.
const SIZE = Math.min(window.innerWidth, window.innerHeight) * 0.8;

// Set the canvas width and height so that it is square and fits the screen.
canvas.width  = SIZE;
canvas.height = SIZE;

class Ball {

  constructor(x, y, xV, yV) {
    this.xPosition = x;
    this.yPosition = y;
    this.xVelocity = xV;
    this.yVelocity = yV;
  }
}

var balls = new Array();

const numBalls = 100;
const ballRadius = 20;
const maxSpeed = 20;

createBalls();
window.requestAnimationFrame(drawBalls);

function createBalls() {

  for (i = 0; i < numBalls; i++ ) {
    var xPosition = Math.random() * (SIZE - 2 * ballRadius) + ballRadius;
    var yPosition = Math.random() * (SIZE - 2 * ballRadius) + ballRadius;
    var xVelocity = (Math.random() - 0.5) * maxSpeed;
    var yVelocity = (Math.random() - 0.5) * maxSpeed;

    var ball = new Ball(xPosition, yPosition, xVelocity, yVelocity);
    balls.push(ball);
  }
}

function drawBalls() {

  // Clear the canvas by drawing a huge white rectangle
  drawingContext2D.fillStyle = "white";
  drawingContext2D.fillRect(0, 0, SIZE, SIZE);

  // Is the gravity checkbox on?
  var gravityOn = document.getElementById('gravityCheckbox').checked;

  // Set a colour for our balls
  drawingContext2D.fillStyle = "black";

  // For each ball ...
  for (i = 0; i < balls.length; i++ ) {

    // Draw it
    drawingContext2D.beginPath();
    drawingContext2D.arc(balls[i].xPosition, balls[i].yPosition, ballRadius,
      0, 2 * Math.PI);
    drawingContext2D.stroke();

    if (gravityOn) {
      balls[i].yVelocity += 9.8 / 30; // y-axis is upside down. Assume 30 fps.
    }

    // Calculate its new position
    balls[i].xPosition = balls[i].xPosition + balls[i].xVelocity;
    balls[i].yPosition = balls[i].yPosition + balls[i].yVelocity;

    // Invert the velocity if the ball has reached edge of screen
    if (balls[i].xPosition - ballRadius <= 0
      || balls[i].xPosition + ballRadius > SIZE) {
      balls[i].xVelocity = -balls[i].xVelocity;
    }

    if (balls[i].yPosition - ballRadius <= 0
      || balls[i].yPosition + ballRadius > SIZE) {
      balls[i].yVelocity = -balls[i].yVelocity;
    }

  }

  window.requestAnimationFrame(drawBalls);
}
