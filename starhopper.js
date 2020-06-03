// Get the canvas where we will draw a grid of squares.
var canvas = document.getElementById('myCanvas');

// Get a 2-dimensional drawing context so we can draw using x and y coordinates.
var drawingContext2D = canvas.getContext('2d');

// Calculate the minimum of the browser window width and height.
const SIZE = Math.min(window.innerWidth, window.innerHeight) * 0.8;

// Set the canvas width and height so that it is square and fits the screen.
canvas.width  = SIZE;
canvas.height = SIZE;

const gravity = 9.81;

// Set Starhopper parameters
const bodyWidth = SIZE / 20;
const bodyHeight = bodyWidth * 6 / 5;

var xPosition = bodyWidth / 2;
var yPosition = SIZE - bodyHeight * 3;

var xVelocity = 0;
var yVelocity = 0;

var flightPlan = new Array(
  Math.floor(SIZE * 0.5),
  Math.floor(SIZE * 0.25),
  Math.floor(SIZE * 0.75),
  0, -1);
var flightPlanIndex = 0;


drawStarhopper();

function drawStarhopper() {

  // Clear the canvas by drawing a huge white rectangle
  drawingContext2D.fillStyle = "WHITE";
  drawingContext2D.fillRect(0, 0, SIZE, SIZE);

  // Draw body
  drawingContext2D.fillStyle = "LIGHTSTEELBLUE";
  drawingContext2D.fillRect(xPosition, yPosition, bodyWidth, bodyHeight);

  // Draw left wing
  drawingContext2D.strokeStyle = "LIGHTSTEELBLUE";
  drawingContext2D.lineWidth = 2;
  drawingContext2D.lineJoin = "bevel";
  drawingContext2D.moveTo(xPosition, yPosition);
  drawingContext2D.lineTo(xPosition - bodyWidth / 2, yPosition + bodyHeight * 1.4);
  drawingContext2D.lineTo(xPosition, yPosition + bodyHeight);
  drawingContext2D.closePath();
  drawingContext2D.stroke();

  // Draw right wing
  drawingContext2D.moveTo(xPosition + bodyWidth, yPosition);
  drawingContext2D.lineTo(xPosition + bodyWidth + bodyWidth / 2, yPosition + bodyHeight * 1.4);
  drawingContext2D.lineTo(xPosition + bodyWidth, yPosition + bodyHeight);
  drawingContext2D.closePath();
  drawingContext2D.stroke();

  // Draw rounded top
  drawingContext2D.beginPath();
  drawingContext2D.moveTo(xPosition, yPosition);
  drawingContext2D.bezierCurveTo(xPosition, yPosition - bodyWidth / 2, xPosition + bodyWidth, yPosition - bodyWidth / 2, xPosition + bodyWidth, yPosition);
  drawingContext2D.closePath();
  drawingContext2D.stroke();
  drawingContext2D.fill();

  // Draw engine thrust
  drawingContext2D.beginPath();
  drawingContext2D.moveTo(xPosition + bodyWidth * 0.25, yPosition + bodyHeight);
  drawingContext2D.lineTo(xPosition + bodyWidth * 0.5, yPosition + bodyHeight * 2);
  drawingContext2D.lineTo(xPosition + bodyWidth * 0.75, yPosition + bodyHeight);
  drawingContext2D.lineWidth = 10;
  drawingContext2D.strokeStyle = "YELLOW";
  drawingContext2D.fillStyle = "GOLD"
  drawingContext2D.stroke();
  drawingContext2D.fill();


  // Simulate gravity if required and only if starhopper is above ground
  if (yPosition + bodyHeight * 1.4 < SIZE) {
    yVelocity += gravity / 30; // y-axis is upside down. Assume 30 fps.

  // If Starhopper is below bottom of canvas and is moving further below
  // then reverse its velocity
  } else if (yPosition + bodyHeight * 1.4 >= SIZE && yVelocity > 0) {
    yVelocity = -yVelocity * 0.4; // Damping
    console.log("Grounded!");
  }

  if (flightPlan[flightPlanIndex] == -1) {
    // Engine off - do nothing.
  } else {
    moveToAltitude(flightPlan[flightPlanIndex]);
  }

  // Calculate its new position
  xPosition += xVelocity;
  yPosition += yVelocity;

  window.requestAnimationFrame(drawStarhopper);
}


function setVelocity(targetVelocity){

  // If too fast ...
  if (yVelocity < targetVelocity) {
    //yVelocity += -gravity * 0.1 / 30;
  // console.log("TOO FAST " + yVelocity + ", " + targetVelocity);
  // Else if at targetVelocity ...
  } else if (Math.floor(yVelocity) == targetVelocity) {
    yVelocity += -gravity / 30;
    // console.log("OK " + yVelocity + ", " + targetVelocity);

  // Else if too slow ...
  } else if (yVelocity > targetVelocity) {

    yVelocity += -gravity * 1.05 / 30;
    // console.log("TOO SLOW " + yVelocity + ", " + targetVelocity);
  }
}

function getAltitude(){
  return SIZE - (yPosition + bodyHeight * 1.4);
}

function moveToAltitude(targetAltitude){
  var altitude = getAltitude();

  // If too low ...
  if (altitude < targetAltitude) {
    setVelocity(-5);
    console.log("Below targetAltitude " + altitude + ", " + targetAltitude +  ", " + flightPlanIndex);

  // Else if at targetAltitude ...
  } else if (Math.floor(altitude) == targetAltitude) {
    setVelocity(0);
    if (flightPlanIndex < flightPlan.length - 1) { flightPlanIndex++; }
    console.log("At targetAltitude " + altitude + ", " + targetAltitude +  ", " + flightPlanIndex);

  // Else if too high ...
  } else if (altitude > targetAltitude) {
    setVelocity(1);
    console.log("Above targetAltitude " + altitude + ", " + targetAltitude +  ", " + flightPlanIndex);
  }
}
