let img;
let cells = [];

function preload() {
  img = loadImage('150.jpg');
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  background(255);
  imageMode(CENTER);
  image(img, width / 2, height / 2);
  c.drop(gotFile);

  fill(0);
  noStroke();
  textSize(width/36);
  textAlign(CENTER);
  text('Drag an image file onto the canvas.', width / 2, height * 0.1);

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

function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    const img = createImg(file.data).hide();
    // Draw the image onto the canvas
    if (width <  height/img.height*img.width){
      image(img, width/2, height/2, width * 0.9, width/img.width*img.height * 0.9);
      }
    else{
      image(img, width/2, height/2, height/img.height*img.width * 0.9, height * 0.9);}
  } else {
    console.log('Not an image file!');
  }
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
