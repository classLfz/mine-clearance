export const McOperatorBehavior = {
  properties: {
    inGame: {
      type: Boolean,
      value: true
    },
    blockArray: {
      type: Array
    },
    cacheArray: {
      type: Array,
      value: []
    },
    leftNumber: {
      type: Number
    }
  },

  // handle mouse click mine block item
  blockClick(e) {
    if (this.inGame) {
      let mcBlock = e.target;
      let mineNumber = mcBlock.mineNumber;
      let btnNum = e.button;

      // first click, get blcok DOM array data
      if (!this.blockArray) {
        this._getBlockArray();
      }

      // left button
      if (btnNum === 0 && !mcBlock.isMark) {
        // show mine number
        mcBlock.isOpen = true;

        // end game
        if (mineNumber === -1) {
          this.inGame = false;
          this.openFailTipper();
          return;
        }

        // items around this item's mineNumber is zero
        if (mineNumber === 0) {
          this.exposeZeroAroundBlock(mcBlock.blockXy);
        }

        if (this.judgeTheGameIsEnd()) {
          this.leftNumber = 0;
          this.inGame = false;
          this.openVictoryTipper();
        }
      }

      // right button click, add the mark sign
      if (btnNum === 2 && !mcBlock.isOpen) {
        mcBlock.markStatus++;
        return mcBlock.markStatus === 1 ? --this.leftNumber : ++this.leftNumber;
      }
    }
  },

  // get block array data
  _getBlockArray() {
    this.blockArray = this.$.table.querySelectorAll('mc-block');
  },

  exposeZeroAroundBlock(blockXy: {x: number, y: number}) {
    if (this.inGame) {
      this._getBlockArray();
      let x = blockXy.x;
      let y = blockXy.y;
      let xy = x * this.width + y;

      for (var m = x - 1; m <= (x + 1); m++) {
        for (var n = y - 1; n <= (y + 1); n++) {
          if (m > -1 && n > -1 && n < this.width) {
            var k = m * this.width + n;
            if (m >= 0 && m < this.height && n >= 0 && n < this.width && k != xy) {
              if (!this.blockArray[k].isOpen) {
                this.blockArray[k].isOpen = true;
              }
            }
          }
        }
        n = y - 1;
      }
    }
  },

  exposeAroundBlock(blockXy: { x: number, y: number }) {
    if (this.inGame) {
      let x = blockXy.x;
      let y = blockXy.y;
      let xy = x * this.width + y;

      for (var m = x - 1; m <= (x + 1); m++) {
        for (var n = y - 1; n <= (y + 1); n++) {
          if (m > -1 && n > -1 && n < this.width) {
            var k = m * this.width + n;
            if (m >= 0 && m < this.height && n >= 0 && n < this.width && k != xy && !this.blockArray[k].isMark) {
              this.blockArray[k].isOpen = true;
              if (this.blockArray[k].mineNumber === -1) {
                this.isGame = false;
                this.openFailTipper();
              }
            }
          }
        }
        n = y - 1;
      }
    }
  },
  
  // reset game
  reset() {
    for (let key in this.blockArray) {
      if (this.blockArray.hasOwnProperty(key)) {
        this.blockArray[key].isOpen = false;
        this.blockArray[key].isMark = false;
        this.blockArray[key].markStatus = 0;
      }
    }
    this.inGame = true;
    this.leftNumber = this.mineNumber;
  },

  judgeTheGameIsEnd: function(): boolean {
    if (this.inGame) {
      let blockArray = this.blockArray;
      let total = this.width * this.height;
      let count = 0;

      for (let key in this.blockArray) {
        if (blockArray.hasOwnProperty(key)) {
          if (blockArray[key].isOpen) {
            count++;
          }
        }
      }

      if (count + this.mineNumber === total) {
        return true;
      }

      return false;
    }
  },

  openVictoryTipper: function(): void {
    this.$.victoryTipper.open();
  },

  openFailTipper: function(): void {
    this.$.failTipper.open();
  }
}
