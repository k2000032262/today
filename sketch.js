let shapes = [];
let currentShape = [];

function setup() {
  createCanvas(600, 400);
  background(255);

  // Retrieve shapes data from localStorage on page load
  let storedShapes = localStorage.getItem('storedShapes');
  if (storedShapes) {
    shapes = JSON.parse(storedShapes);
    redrawShapes();
  }
}

function draw() {
  if (mouseIsPressed) {
    let point = {
      x: mouseX + random(-5, 5), // Add some random vibration to x-coordinate
      y: mouseY + random(-5, 5), // Add some random vibration to y-coordinate
      size: random(10, 50),
      color: color(random(255), random(255), random(255), 100)
    };
    currentShape.push(point);
  } else if (currentShape.length > 0) {
    shapes.push(currentShape);
    currentShape = [];

    // Save shapes data to localStorage whenever a new shape is added
    localStorage.setItem('storedShapes', JSON.stringify(shapes));
  }

  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    beginShape();
    for (let j = 0; j < shape.length; j++) {
      let { x, y, size, color } = shape[j];
      fill(color);
      ellipse(x, y, size, size);
    }
    endShape(CLOSE);
  }
}

function shareOnTwitter() {
  let url = "https://twitter.com/intent/tweet?url=https://example.com&text=Check%20out%20my%20generative%20art%21";
  window.open(url, '_blank');
}

function shareOnFacebook() {
  let url = "https://www.facebook.com/sharer/sharer.php?u=https://example.com";
  window.open(url, '_blank');
}

function clearCanvas() {
  clear();
  background(255);
  shapes = [];
  localStorage.removeItem('storedShapes');
}

function refreshCanvas() {
  clearCanvas(); // Clear the drawing without affecting stored shapes
}

function saveImage() {
  saveCanvas(canvas, 'generative_art', 'png'); 
}

function redrawShapes() {
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    beginShape();
    for (let j = 0; j < shape.length; j++) {
      let { x, y, size, color } = shape[j];
      fill(color);
      ellipse(x, y, size, size);
    }
    endShape(CLOSE);
  }
}
