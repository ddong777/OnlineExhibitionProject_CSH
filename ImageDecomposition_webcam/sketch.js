let img;
let cells = [];

let capture;
let pg;

function preload() {
  img = loadImage('120.jpg');
}

function setup() {
  // imageMode(CENTER);
  background(0);
  // imgSetup();
  createCanvas(1200, 900);
  videoSetup();
  pg = createGraphics(width, height);

  if (width > height) {
    for (let i = 0; i < width * 2; i++) {
      cells[i] = new Cell(createVector(random(20, width - 20), random(20, height - 20)));
    }
  } else {
    for (let i = 0; i < height * 2; i++) {
      cells[i] = new Cell(createVector(random(20, width - 20), random(20, height - 20)));
    }
  }

  print(width, height);
}

function videoSetup() {
  capture = createCapture(VIDEO);
  capture.size(width, height);
  tint(255, 255);
  capture.hide();
}

function imgSetup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
}

function draw() {
  // image(img, 0, 0);

  videoDraw();
  image(pg, 0, 0, width, height);

  if (width > height) {
    if (cells.length <= width * 10) {
      division();
    }
  } else {
    if (cells.length <= height * 10) {
      division();
    }
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].update();
    cells[i].display();

    if (cells[i].cellDie == true) {
      cells.splice(i, 1);
      print("number" + i + "die");
    }
  }

  //자동저장
  // for (let i = 0; i < 6; i++) {
  //   if (minute() == i * 10 && second() == 0 && frameRate % 60 == 0) {
  //     save();
  //   }
  // }
}

function videoDraw() {
  if (frameCount % 3 == 0) {
    push();
    tint(255, 230, 180);
    if (capture.loadedmetadata) {
    var c = capture.get(width*0.2, 0, width*0.6, height);
    image(c, width*0.2, 0);
  }
    pop();
  }
  // if (random() <= 0.1) {
  //   tint(255, 30);
  //   image(capture, 0, 0, capture.x, capture.y);
  //   tint(255, 255);
  // }
  // if (frameCount % 30 == 0) {
  //   pg1.tint(170, 30);
  //   pg1.image(capture, 0, 0, capture.x, capture.y);
  //   // pg.tint(255, 255);
  // }
}

function division() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].readyToDivision == true) {
      cells.push(cells[i].mitosis());
      print(cells.length);
    }
  }
  if (mouseIsPressed) {
    cells.push(new Cell(createVector(mouseX, mouseY)));
    print(cells.length);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    save();
  }
  if (keyCode === RIGHT_ARROW) {
    pg.clear();
    cells.splice(0, cells.length);

    if (width > height) {
      for (let i = 0; i < width * 2; i++) {
        cells[i] = new Cell(createVector(random(20, width - 20), random(20, height - 20)));
      }
    } else {
      for (let i = 0; i < height * 2; i++) {
        cells[i] = new Cell(createVector(random(20, width - 20), random(20, height - 20)));
      }
    }
  }
  if (keyCode === UP_ARROW) {
    capture.pause();
  }
  if (keyCode === DOWN_ARROW) {
    capture.loop();
  }
}

function mousePressed() {
  
}