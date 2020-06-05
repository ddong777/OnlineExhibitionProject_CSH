class Cell {
  constructor(cellPos) {
    this.pos = createVector(cellPos.x, cellPos.y);
    this.cellWeight = random(1, 3);

    this.cellEnergy = random(10, 30);
    this.energyUseValue = random(0.1, 0.5);
    this.divisionEnergy = random(30, 100);

    this.cellDensity = random(150, 255);

    this.readyToDivision = false;
    this.activate = false;

    this.setColorSensor();
    this.setCellCharacteristicVariable();
    this.setByProductColor();

    this.byProductR = 0;
    this.byProductG = 0;
    this.byProductB = 0;
    this.byProductA = 0;

    this.cellDie = false;
    this.countDown = 60;
  }

  setColorSensor() {
    this.colorSensor = createVector(0, 0);

    if (int(random(4)) == 0) {
      this.colorSensor.x = -1 * this.cellWeight;
    } else if (int(random(4)) == 1) {
      this.colorSensor.x = this.cellWeight;
    } else if (int(random(4)) == 2) {
      this.colorSensor.y = -1 * this.cellWeight;
    } else {
      this.colorSensor.y = this.cellWeight;
    }

    this.rValue = 0;
    this.gValue = 0;
    this.bValue = 0;

    this.addR = 0;
    this.addG = 0;
    this.addB = 0;
  }

  setCellCharacteristicVariable() {
    //essential elements except carbon and nitrogen

    this.elementsValueNeed = random(10, 100);
    this.elementsValueGet = 0;
    this.elementsType = int(random(3));

    //oxygen

    this.oxygenValueNeed = random(1, 10);
    this.oxygenValueNeed_G = 0;
    this.oxygenValueNeed_B = 0;
    this.oxygenType = int(random(2));

    //light

    this.lightValueNeed = random(1, 20);
    this.lightValueNeed_R = 0;
    this.lightValueNeed_G = 0;
    this.lightType = int(random(2));

    //ph

    this.phValueNeedMin = random(0, 100);
    this.phValueNeedMax = random(200, 300);

    //temperature

    this.tempValueNeedMin = random(0, 20);
    this.tempValueNeedMax = random(230, 300);

    //water

    this.waterValueNeed = random(1, 5);

    //carbon

    this.carbonValueNeed = random(10, 80);
    this.carbonValueNeed_R = this.carbonValueNeed;
    this.carbonValueNeed_B = this.carbonValueNeed;

    //nitrogen

    this.nitroValueNeed = random(5, 20);
    this.nitroValueNeed_R = this.nitroValueNeed;
    this.nitroValueNeed_G = this.nitroValueNeed / 2;
  }

  setCellCharacteristic() {

    //elements

    if (this.elementsType == 0) {
      this.elementsValueGet = this.rValue;
    } else if (this.elementsType == 1) {
      this.elementsValueGet = this.gValue;
    } else {
      this.elementsValueGet = this.bValue;
    }

    //oxygen

    this.oxygenValueGet_G = this.gValue;
    this.oxygenValueGet_B = this.bValue;

    if (this.oxygenType == 0) {
      this.oxygenValueNeed_G = this.oxygenValueNeed / 2;
      this.oxygenValueNeed_B = this.oxygenValueNeed;
    } else {
      this.oxygenValueNeed_G = 0;
      this.oxygenValueNeed_B = 0;
    }

    //light

    this.lightValueGet_R = this.gValue;
    this.lightValueGet_G = this.bValue;

    if (this.lightType == 0) {
      this.lightValueNeed_R = this.lightValueNeed;
      this.lightValueNeed_G = this.lightValueNeed;
    } else {
      this.lightValueNeed_R = 0;
      this.lightValueNeed_G = 0;
    }

    //ph

    this.phValueGet_R = this.rValue;
    this.phValueGet_B = this.bValue;
    this.phValueGet_G = this.gValue;

    //temperature

    this.tempValueGet_R = this.rValue;
    this.tempValueGet_B = this.bValue;

    //water

    this.waterValueGet = this.bValue;

    //carbon

    this.carbonValueGet_R = this.rValue;
    this.carbonValueGet_B = this.bValue;

    //nitrogen    
    this.nitroValueGet_R = this.rValue;
    this.nitroValueGet_G = this.gValue;
  }

  checkEnvirment() {
    this.yesCount = 0;

    //elements
    this.elementsYes = 0;

    if (this.elementsValueGet >= this.elementsValueNeed) {
      this.elementsYes = 1;
    } else {
      this.elementsYes = 0;
    }

    //oxygen
    this.oxygenYes = 0;

    if (this.oxygenValueGet_G >= this.oxygenValueNeed_G && this.oxygenValueGet_B >= this.oxygenValueNeed_B) {
      this.oxygenYes = 1;
    } else {
      this.oxygenYes = 0;
    }

    //light
    this.lightYes = 0;

    if (this.lightValueGet_R >= this.lightValueNeed_R && this.lightValueGet_G >= this.lightValueNeed_G) {
      this.lightYes = 1;
    } else {
      this.lightYes = 0;
    }

    //ph
    this.phYes = 0;

    if (this.phValueGet_G >= this.phValueNeedMin && this.phValueGet_G <= this.phValueNeedMax && this.phValueGet_R >= abs(this.phValueNeedMax - 255) && this.phValueGet_R <= abs(this.phValueNeedMin - 255) && this.phValueGet_B >= abs(this.phValueNeedMax - 255) && this.phValueGet_B <= abs(this.phValueNeedMin - 255)) {
      this.phYes = 1;
    } else {
      this.phYes = 0;
    }

    //temperature
    this.tempYes = 0;

    if (this.tempValueGet_R >= this.tempValueNeedMin && this.tempValueGet_R <= this.tempValueNeedMax && this.tempValueGet_B >= abs(this.tempValueNeedMax - 255) && this.tempValueGet_B <= abs(this.tempValueNeedMin - 255)) {
      this.tempYes = 1;
    } else {
      this.tempYes = 0;
    }

    //water
    this.waterYes = 0;

    if (this.waterValueGet >= this.waterValueNeed) {
      this.waterYes = 1;
    } else {
      this.waterYes = 0;
    }

    //carbon
    this.carbonYes = 0;

    if (this.carbonValueGet_R >= this.carbonValueNeed_R && this.carbonValueGet_B >= this.carbonValueNeed_B) {
      this.carbonYes = 1;
    } else {
      this.carbonYes = 0;
    }

    //nitrogen
    this.nitroYes = 0;

    if (this.nitroValueGet_R >= this.nitroValueNeed_R && this.nitroValueGet_G >= this.nitroValueNeed_G) {
      this.nitroYes = 1;
    } else {
      this.nitroYes = 0;
    }

    this.yesCount = this.elementsYes + this.oxygenYes + this.lightYes + this.phYes + this.tempYes + this.waterYes + this.carbonYes + this.nitroYes;

    if (this.yesCount >= 8) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    this.getC = get(this.pos.x + this.colorSensor.x, this.pos.y + this.colorSensor.y);

    this.rValue = red(this.getC);
    this.gValue = green(this.getC);
    this.bValue = blue(this.getC);

    this.setCellCharacteristic();

    if (this.checkEnvirment() == true) {
      this.activate = false;
      if (this.cellEnergy > 0) {
        this.activate = true;
      }
    } else {
      this.countDown -= 0.1;
      if (this.countDown <= 0) {
        this.cellDie = true;
      }
    }

      if (this.activate == true) {
        this.metabolism();
      }
    }

    metabolism() {
      this.move();
      this.edge();
      this.division();
      this.makeByProduct();
      this.getEnergy();
      this.useEnergy();

      this.addR = 0;
      this.addG = 0;
      this.addB = 0;
    }

    setByProductColor() {
      this.usingElements = random(-10, -5); //R or G or B
      this.makingElements = random(5, 30);

      this.usingOxygen = random(-10, -1); //G1B2
      this.makingOxygne = random(3, 15);

      this.makingAcid = random(-0.1, 0.1); //G
      this.makingBase = random(-0.1, 0.1); //RB

      this.usingWater = random(-12, -3); //B
      this.makingWater = random(3, 10);

      this.usingCarbon = random(-10, -5); //RB
      this.makingCarbon = random(5, 9);

      this.usingNitro = random(-15, -1); //R2G1
      this.makingNitro = random(1, 14);
    }

    addByProductValues(r, g, b) {
      this.rr = r;
      this.gg = g;
      this.bb = b;

      this.addR += this.rr;
      this.addG += this.gg;
      this.addB += this.bb;

      this.byProductR = this.rValue + this.addR / 3;
      this.byProductG = this.gValue + this.addG / 3;
      this.byProductB = this.bValue + this.addB / 3;

      this.addR = 0;
      this.addG = 0;
      this.addB = 0;
    }

    makeByProduct() {
      this.byProductA = this.cellDensity;

      this.addByProductValues(random(-5, 20), random(-5, 10), 0);

      //elements
      if (this.elementsType == 0) {
        this.addByProductValues(this.usingElements + this.makingElements, 0, 0);
      } else if (this.elementsType == 1) {
        this.addByProductValues(0, this.usingElements + this.makingElements, 0);
      } else {
        this.addByProductValues(0, 0, this.usingElements + this.makingElements);
      }

      //     fill(this.byProductR, this.byProductG, this.byProductB);
      //     text(this.elementsType, this.pos.x, this.pos.y);

      //oxygen
      if (this.oxygenType == 0) {
        this.addByProductValues(0, this.usingOxygen / 2, this.usingOxygen);
      } else {
        this.addByProductValues(0, 0, 0);
      }

      //light
      if (this.lightType == 0) {
        this.addByProductValues(0, this.makingOxygen / 2, this.makingOxygen + this.makingWater);
      } else {
        this.addByProductValues(0, 0, 0);
      }

      //ph
      this.addByProductValues(this.makingBase, this.makingAcid, this.makingBase);

      //water
      this.addByProductValues(0, 0, this.usingWater);

      //carbon
      this.addByProductValues(this.usingCarbon + this.makingCarbon, 0, this.usingCarbon + this.makingCarbon);

      //nitrogen
      this.addByProductValues(this.usingNitro * 2 + this.makingNitro * 2, this.usingNitro + this.makingNitro, 0);
    }

    getEnergy() {
      this.cellEnergyGet = (this.rValue / -1000) + (this.usingElements + this.usingCarbon * 2 + this.usingNitro + this.usingOxygen + this.usingWater) / 10000;

      this.cellEnergy += this.cellEnergyGet * -1;
    }

    useEnergy() {
      this.cellEnergy -= this.energyUseValue;
    }

    mitosis() {
      let daughterCell = new Cell(this.pos);
      return daughterCell;
    }

    division() {
      if (this.cellEnergy >= this.divisionEnergy) {
        this.readyToDivision = true;
        this.cellEnergy /= 2;
      } else {
        this.readyToDivision = false;
      }
    }

    move() {
      this.vel = p5.Vector.random2D();
      this.pos.add(this.vel);
    }

    edge() {
      if (this.pos.x >= width - 1) this.pos.x -= 1;
      if (this.pos.x <= 1) this.pos.x += 1;
      if (this.pos.y >= height - 1) this.pos.y -= 1;
      if (this.pos.y <= 1) this.pos.y += 1;
    }

    display() {
      pg.strokeWeight(this.cellWeight);
      pg.stroke(this.byProductR, this.byProductG, this.byProductB, this.byProductA);
      pg.point(this.pos.x, this.pos.y);
    }

  }