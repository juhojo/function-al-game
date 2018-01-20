/**
* Drawing
*/

let frameCount = 0;

const afterDraw = () => {
  if (didWin) {
    log('You managed to solve the level!');
  } else {
    log('Try again!');
  }
  didWin = false;
}

const draw = (after = () => {}) => {
  const pos = Object.assign({}, item);
  frameCount += 1;
  setTimeout(() => {
    // Call DOM update method
    update(null, pos);
    frameCount -= 1;
    if (!frameCount) {
        after();
    }
  }, frameCount * 700);
}

/**
* Moving
*/

const move = (done = () => {}) => (axis) => (direction) => (item) => {
  const n = item[axis] + direction >= 0; // not negative
  let o = false;
  let t = false;
  if (axis === 'y') {
    o = (item[axis] + direction < layout.length) &&
        (item[axis] + direction >= 0); // not overflow y
    log(item[axis] + direction)
    if (o) {
  	  t = layout[item.y + direction][item.x] === 1; // on track y
    }
  }
  if (axis === 'x') {
  	o = (item[axis] + direction < layout[item.y].length) &&
        (item[axis] + direction >= 0); // not overflow x
    if (o) {
  		t = layout[item.y][item.x + direction] === 1; // on track x
    }
  }
  const allowMove = n && o && t;
  if (allowMove) { // Move is allowed
    item[axis] = item[axis] + direction;
    trace(route, layout, [item.y, item.x]);
  }
  done();
};

const onMove = move(bind(draw, afterDraw));

const moveX = onMove('x');
const moveY = onMove('y');

const moveRight = moveX(1);
const moveLeft = moveX(-1);

const moveDown = moveY(1);
const moveUp = moveY(-1);


/**
* Instantiate game variables
*/

load("example");
item = Object.assign({}, startPosition);