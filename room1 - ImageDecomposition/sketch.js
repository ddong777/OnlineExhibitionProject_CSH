let img;
let cells = [];

function preload() {
  img = loadImage('150.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  background(255);
  imageMode(CENTER);
  image(img, width / 2, height / 2);

  if ( width > height ) {
    for (let i = 0; i < width*5; i++) {
      cells[i] = new Cell(createVector(random(20, width - 20), random(20, height - 20)));
    }
  } else {
    for (let i = 0; i < height*5; i++) {
      cells[i] = new Cell(createVector(random(20, width - 20), random(20, height - 20)));
    }
  }

  // print(img.width, img.height);
}

function draw() {
  // image(img, width / 2, height / 2);
  if ( width > height ) {
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
    if (cells[i].cellDie == true){
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
}
