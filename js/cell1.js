class Cell {
  constructor(x, y, z, r, g, b) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.growZ = 0;

    this.rValue = r;
    this.gValue = g;
    this.bValue = b;

    this.growR = 0;
    this.growG = 0;
    this.growB = 0;

    this.cellProperty();

    //==========================================================================

    let material = new THREE.MeshBasicMaterial({
      color: 'white'
    });
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

    this.cube = new THREE.Mesh(geometry, material);
    this.setCellCube();

    //==========================================================================

    scene.add(this.cube);
  }

  setCellCube() {
    this.cube.position.set(this.x, this.y, this.z);
    this.setCellColor(this.rValue, this.gValue, this.bValue);
  }

  setCellColor(r, g, b) {
    this.cube.material.color.setRGB(r, g, b);
  }

  readyToMitosis() {
    if (Math.random() < 0.01 && this.cellEnergy >= 7) {
      this.growZ += 1;
      this.growR += (Math.random() - 0.5) / 5;
      this.growG += (Math.random() - 0.5) / 5;
      this.growB += (Math.random() - 0.5) / 5;

      this.cellEnergy /= 2;
      return true;
    } else {
      return false;
    }
  }

  mitosis(x, y) {
    return new Cell(x, y, this.z + this.growZ, this.rValue + this.growR, this.gValue + this.growG, this.bValue + this.growB);
    // console.log(this.growZ);
  }

  newCellColor() {

  }

  //==============================================================================

  cellProperty() {
    this.cellEnergy = getRandomArbitrary(0, 500);

    this.activate = false;

    this.byProductR = 0;
    this.byProductG = 0;
    this.byProductB = 0;

    this.cellDie = false;
    this.countDown = getRandomArbitrary(100, 1000);

    this.setCellCharacteristicVariable();
    // this.setByProductColor();
  }

  setCellCharacteristicVariable() {
    //essential elements except carbon and nitrogen
    this.elementsValueNeed = getRandomInt(0, 100);
    this.elementsValueGet = 0;
    this.elementsType = getRandomInt(3);

    //oxygen
    this.oxygenValueNeed = getRandomInt(0, 15);
    this.oxygenValueNeed_G = 0;
    this.oxygenValueNeed_B = 0;
    this.oxygenType = getRandomInt(2);

    //light
    this.lightValueNeed = getRandomInt(0, 15);
    this.lightValueNeed_R = 0;
    this.lightValueNeed_G = 0;
    this.lightType = getRandomInt(2);

    //ph
    this.phValueNeedMin = getRandomArbitrary(0, 80);
    this.phValueNeedMax = getRandomArbitrary(160, 255);

    //temperature
    this.tempValueNeedMin = getRandomArbitrary(0, 20);
    this.tempValueNeedMax = getRandomArbitrary(230, 255);

    //water
    this.waterValueNeed = getRandomArbitrary(0, 15);

    //carbon
    this.carbonValueNeed = getRandomInt(5, 30);
    this.carbonValueNeed_R = this.carbonValueNeed;
    this.carbonValueNeed_B = this.carbonValueNeed;

    //nitrogen
    this.nitroValueNeed = getRandomInt(5, 10);
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
}