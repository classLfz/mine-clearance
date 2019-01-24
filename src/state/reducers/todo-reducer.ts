let checkedCoordinate: Array<string> = [];
let foundNum: number = 0;

/**
 * initialize mine matrix
 * @param width matrix width number
 * @param height matrix height number
 * @param mine matrix mine number
 * @returns new mine matrix array
 */
const mineInit = function(width: number, height: number, mine: number): object[] {
  // initialize check arguments
  checkedCoordinate = [];
  foundNum = 0;
  let outArray: object[] = new Array();

  // initial array
  for (let i = 0; i < height; i++) {
    outArray[i] = new Array;

    for (let j = 0; j < width; j++) {
      outArray[i][j] = {
        mineNumber: 0,
        open: false,
        mark: false,
        blockCoordinate: {
          x: i,
          y: j
        }
      };
    }
  }
  outArray = arrangementMine(width, height, mine, outArray);

  outArray = calculateMine(width, height, mine, outArray);

  return outArray;
}

/**
 * mine arrangement
 * @param width matrix width number
 * @param height matrix height number
 * @param mine matrix mine number
 * @param mineArray new mine matrix array with mine(-1)
 */
const arrangementMine = function(width: number, height: number, mine: number, mineArray: object[]): object[] {
  while(mine > 0) {
    let i = Math.ceil(Math.random() * height) - 1;
    let j = Math.ceil(Math.random() * width) - 1;

    if (mineArray[i][j] !== undefined) {
    if (mineArray[i][j].mineNumber !== -1) {
      mineArray[i][j].mineNumber = -1;
      mine--;
    }
    }
  }
  return mineArray;
}

/**
 * calculate mine number
 * @param width mine matrix width number
 * @param height mine matrix height number
 * @param mine matrix mine number
 * @param mineArray mine matrix array
 * @returns mine matrix array data with mine number count in every point.
 */
const calculateMine = function(width: number, height: number, mine: number, mineArray: object[]): object[] {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (mineArray[i][j].mineNumber === -1) {
        mineArray = countMine(i, j, mine, mineArray);
      }
    }
  }
  return mineArray;
}

/**
 * calculate mine function based, count the mine number
 * @param x two-dimensional coordinates: x
 * @param y two-dimensional coordinates: y
 * @param mine mine number
 * @param mineArray mine matrix array
 * @returns mine matrix array data with mine number count
 */
const countMine = function(x: number, y: number, mine: number, mineArray: object[]): object[] {
  for (var m = x - 1; m <= (x + 1); m++) {
    for (var n = y -1; n <= (y + 1); n++) {
      if (m > -1 && m > -1 && n < mine) {
        if (mineArray[m] && mineArray[m][n]) {
          if (mineArray[m][n].mineNumber !== -1) {
            mineArray[m][n].mineNumber++;
          }
        }
      }
    }
    n = y - 1;
  }
  return mineArray;
}

/**
 * handle block click diffuse
 * @param x two-dimensional coordinates: x
 * @param y two-dimensional coordinates: y
 * @param mineArray mine matrix array
 * @returns new mine matrix array data
 */
const resolve = function(x: number, y: number, mineArray: object[]): object[] {
  if (mineArray[x][y].mineNumber === 0) {
    if (checkedCoordinate.indexOf(`${x}:${y}`) > 0) return mineArray;
    checkedCoordinate.push(`${x}:${y}`);
    if (!mineArray[x][y].open) {
      mineArray[x][y].open = true;
      foundNum++;
    }
    if (mineArray[x - 1]) {
      if (mineArray[x - 1][y - 1]) {
        mineArray = resolve(x - 1, y - 1, mineArray);
      }
      if (mineArray[x - 1][y]) {
        mineArray = resolve(x - 1, y, mineArray);
      }
      if (mineArray[x - 1][y + 1]) {
        mineArray = resolve(x - 1, y + 1, mineArray);
      }
    }
    if (mineArray[x]) {
      if (mineArray[x][y + 1]) {
        mineArray = resolve(x, y + 1, mineArray);
      }
      if (mineArray[x][y - 1]) {
        mineArray = resolve(x, y - 1, mineArray);
      }
    }
    if (mineArray[x + 1]) {
      if (mineArray[x + 1][y - 1]) {
        mineArray = resolve(x + 1, y - 1, mineArray);
      }
      if (mineArray[x + 1][y]) {
        mineArray = resolve(x + 1, y, mineArray);
      }
      if (mineArray[x + 1][y + 1]) {
        mineArray = resolve(x + 1, y + 1, mineArray);
      }
    }
  } else if (!mineArray[x][y].open) {
    mineArray[x][y].open = true;
    foundNum++;
  }
  return JSON.parse(JSON.stringify(mineArray));
}

/**
 * handle block component dblclick
 * @param x two-dimensional coordinates: x
 * @param y two-dimensional coordinates: y
 * @param mineArray mine matrix array
 */
const handleDblclick = function(x: number, y: number, mineArray: object[]) {
  let newGameOver = false
  let mineObj;
  if (mineArray[x - 1]) {
    mineObj = mineArray[x - 1][y - 1];
    if (mineObj && !mineObj.mark && !mineObj.open) {
      mineObj.open = true;
      foundNum++;
      if (mineObj.mineNumber === 0) mineArray = resolve(x - 1, y - 1, mineArray);
      if (mineObj.mineNumber === -1) newGameOver = true;
    }
    mineObj = mineArray[x - 1][y];
    if (mineObj && !mineObj.mark && !mineObj.open) {
      mineObj.open = true;
      foundNum++;
      if (mineObj.mineNumber === 0) mineArray = resolve(x - 1, y, mineArray);
      if (mineObj.mineNumber === -1) newGameOver = true
    }
    mineObj = mineArray[x - 1][y + 1];
    if (mineObj && !mineObj.mark && !mineObj.open) {
      mineObj.open = true;
      foundNum++;
      if (mineObj.mineNumber === 0) mineArray = resolve(x - 1, y + 1, mineArray);
      if (mineObj.mineNumber === -1) newGameOver = true
    }
  }
  if (mineArray[x]) {
    mineObj = mineArray[x][y + 1];
    if (mineObj && !mineObj.mark && !mineObj.open) {
      mineObj.open = true;
      foundNum++;
      if (mineObj.mineNumber === 0) mineArray = resolve(x, y + 1, mineArray);
      if (mineObj.mineNumber === -1) newGameOver = true
    }
    mineObj = mineArray[x][y - 1];
    if (mineObj && !mineObj.mark && !mineObj.open) {
      mineObj.open = true;
      foundNum++;
      if (mineObj.mineNumber === 0) mineArray = resolve(x, y - 1, mineArray);
      if (mineObj.mineNumber === -1) newGameOver = true
    }
  }
  if (mineArray[x + 1]) {
    mineObj = mineArray[x + 1][y - 1];
    if (mineObj && !mineObj.mark && !mineObj.open) {
      mineObj.open = true;
      foundNum++;
      if (mineObj.mineNumber === 0) mineArray = resolve(x + 1, y - 1, mineArray);
      if (mineObj.mineNumber === -1) newGameOver = true
    }
    mineObj = mineArray[x + 1][y];
    if (mineObj && !mineObj.mark && !mineObj.open) {
      mineObj.open = true;
      foundNum++;
      if (mineObj.mineNumber === 0) mineArray = resolve(x + 1, y, mineArray);
      if (mineObj.mineNumber === -1) newGameOver = true
    }
    mineObj = mineArray[x + 1][y + 1];
    if (mineObj && !mineObj.mark && !mineObj.open) {
      mineObj.open = true;
      foundNum++;
      if (mineObj.mineNumber === 0) mineArray = resolve(x + 1, y + 1, mineArray);
      if (mineObj.mineNumber === -1) newGameOver = true
    }
  }

  return {
    gameOver: newGameOver,
    mineArray: JSON.parse(JSON.stringify(mineArray))
  }
}

const initialState = {
  gameOver: false,
  victory: false,
  mineArray: mineInit(9, 9, 10),
  width: 9,
  height: 9,
  mineNumber: 10,
  markNumber: 0
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      let width = action.payload.width;
      let height = action.payload.height;
      let mineNumber = action.payload.mineNumber;
      return {
        ...state,
        gameOver: false,
        victory: false,
        width: width,
        height: height,
        mineNumber: mineNumber,
        markNumber: 0,
        mineArray: mineInit(width, height, mineNumber)
      };
    }
    case 'BLOCK-CLICK': {
      let x = action.payload.x;
      let y = action.payload.y;
      let newMineArray = resolve(x, y, state.mineArray)
      let newGameOver = newMineArray[x][y].mineNumber === -1
      let newVictory = (state.width * state.height - state.mineNumber) <= foundNum;
      return {
        ...state,
        gameOver: newGameOver,
        victory: newVictory,
        mineArray: newMineArray
      };
    }
    case 'BLOCK-DBLCLICK': {
      let x = action.payload.x;
      let y = action.payload.y;
      let { gameOver, mineArray } = handleDblclick(x, y, state.mineArray);
      let newVictory = (state.width * state.height - state.mineNumber) <= foundNum;
      return {
        ...state,
        gameOver: gameOver,
        victory: newVictory,
        mineArray: mineArray
      }
    }
    case 'TOOGLE-MARK': {
      let x = action.payload.x;
      let y = action.payload.y;
      let newMineArray = JSON.parse(JSON.stringify(state.mineArray));
      let newMarkNumber = state.markNumber;
      newMineArray[x][y].mark = !newMineArray[x][y].mark;
      newMineArray[x][y].mark ? newMarkNumber++ : newMarkNumber--;
      return {
        ...state,
        markNumber: newMarkNumber,
        mineArray: newMineArray
      };
    }
    default:
      return initialState;
  }
};

export { todoReducer };
