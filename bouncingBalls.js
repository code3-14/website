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

const numBalls = 50;
const ballRadius = SIZE / 50;
const maxSpeed = 8;

createBalls();
drawBalls();

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

  // Set a colour for our balls
  drawingContext2D.fillStyle = "black";

  // Is the gravity checkbox on?
  var gravityOn = document.getElementById('gravityCheckbox').checked;

  // Is the friction checkbox on?
  var frictionOn = document.getElementById('frictionCheckbox').checked;

  // For each ball ...
  for (i = 0; i < balls.length; i++ ) {

    // Draw it
    drawingContext2D.beginPath();
    drawingContext2D.arc(balls[i].xPosition, balls[i].yPosition, ballRadius,
      0, 2 * Math.PI);
    drawingContext2D.stroke();

    // If ball is outside left of canvas and is moving further outside
    // then reverse its velocity
    if (balls[i].xPosition <= ballRadius && balls[i].xVelocity < 0) {
      balls[i].xVelocity = -balls[i].xVelocity;

    // If ball is outside right of canvas and is moving further outside
    // then reverse its velocity
  } else if (balls[i].xPosition + ballRadius >= SIZE && balls[i].xVelocity > 0) {
      balls[i].xVelocity = -balls[i].xVelocity;
    }

    // If ball is above top of canvas and is moving further above
    // then reverse its velocity
    if (balls[i].yPosition <= ballRadius && balls[i].yVelocity < 0) {
      balls[i].yVelocity = -balls[i].yVelocity;

    // If ball is below bottom of canvas and is moving further below
    // then reverse its velocity
  } else if (balls[i].yPosition + ballRadius >= SIZE && balls[i].yVelocity > 0) {
      balls[i].yVelocity = -balls[i].yVelocity;

      // If friction checkbox is on then reduce velocity by 20% and fill
      // ball with colour
      if (frictionOn) {
        balls[i].xVelocity *= 0.8;
        balls[i].yVelocity *= 0.8;

        drawingContext2D.fill();
      }
    }

    // Calculate its new position
    balls[i].xPosition += balls[i].xVelocity;
    balls[i].yPosition += balls[i].yVelocity;

    // Simulate gravity if required and only if ball is above ground
    if (gravityOn && balls[i].yPosition + ballRadius < SIZE) {
      balls[i].yVelocity += 9.8 / 30; // y-axis is upside down. Assume 30 fps.
    }
  }

  window.requestAnimationFrame(drawBalls);
}

function resetBalls() {

  // Clear the balls array
  balls = new Array();

  // Uncheck the checkboxes
  document.getElementById('gravityCheckbox').checked = false;
  document.getElementById('frictionCheckbox').checked = false;

  createBalls();
}
