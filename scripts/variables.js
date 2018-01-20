/**
* Game variables
*/
let layout,
    route,
    startPosition,
    item,
    didWin;
    
const levels = [
  {
    "name": "example",
    "layout": [
      [1, 1, 0, 0, 0]
    ],
    "startPosition": {
      x: 0,
      y: 0,
    }
  }, {
    "name": "example_2",
    "layout": [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ],
    "startPosition": {
      x: 0,
      y: 0,
    }
  }, {
    "name": "example_3",
    "layout": [
      [1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1]
    ],
    "startPosition": {
      x: 0,
      y: 0,
    }
  }, {
    "name": "example_4",
    "layout": [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    "startPosition": {
      x: 0,
      y: 0,
    }
  }, {
    "name": "example_5",
    "layout": [
      [1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ],
    "startPosition": {
      x: 0,
      y: 3,
    }
  }, {
    "name": "example_6",
    "layout": [
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1]
    ],
    "startPosition": {
      x: 0,
      y: 3,
    }
  }
];

/**
* Logger variables
*/
const END_COMMAND = 'End of command';
const TITLE_STYLE = 'color: green; font-weight: bold;';
const DESC_STYLE = 'color: blue; font-weight: bold;';
const BOLD_STYLE = 'font-weight: bold;';