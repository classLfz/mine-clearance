export const McCreateBehavior = {
  properties: {
    mineArray: {
      type: Array,
      value: []
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    mineNumber: {
      type: Number
    },
    leftNumber: {
      type: Number
    }
  },

  connectedCallback() {
    this.leftNumber = this.mineNumber;
    this.mineInit(this.width, this.height, this.mineNumber);
  },

  mineInit(x: number, y: number, mine: number) {
    let outArray: object[] = new Array();

    // initial array
    for (let i = 0; i < y; i++) {
      outArray[i] = new Array;

      for (let j = 0; j < x; j++) {
        outArray[i][j] = {
          mineNumber: 0,
          blockCoordinate: {
            x: i,
            y: j
          }
        };
      }
    }

    outArray = this._arrangementMine(x, y, mine, outArray);

    outArray = this._calculateMine(x, y, outArray);

    this.mineArray = outArray;

    let mineStr: string = '';
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        mineStr += ' ' + outArray[i][j];
      }
      mineStr += '\n';
    }
  },

  // arrange mine in array
  _arrangementMine(x: number, y: number, mine: number, mineArray: object[]): object[] {
    while(mine > 0) {
      let i = Math.ceil(Math.random() * y) - 1;
      let j = Math.ceil(Math.random() * x) - 1;

      if (mineArray[i][j] !== undefined) {
        if (mineArray[i][j].mineNumber !== -1) {
          mineArray[i][j].mineNumber = -1;
          mine--;
        }
      }
    }
    return mineArray;
  },

  _calculateMine(x: number, y: number, mineArray: object[]): object[] {
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        if (mineArray[i][j].mineNumber === -1) {
          mineArray = this._addMine(i, j, mineArray);
        }
      }
    }
    return mineArray;
  },

  _addMine(i: number, j: number, mineArray: object[]): object[] {
    for (var m = i -1; m <= (i + 1); m++) {
      for (var n = j -1; n <= (j + 1); n++) {
        if (m > -1 && m > -1 && n < this.width) {
          if (mineArray[m] && mineArray[m][n]) {
            if (mineArray[m][n].mineNumber !== -1) {
              mineArray[m][n].mineNumber++;
            }
          }
        }
      }
      n = j - 1;
    }
    return mineArray;
  }
}
