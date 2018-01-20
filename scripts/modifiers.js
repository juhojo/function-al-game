/**
* Clone a same size array as layout but fill it with zeros (not-visited value)
*/
const clearLayout = (selectedLayout) => clone(selectedLayout).map(row => row.fill(0));

/**
* Trace route on move.
*/
const trace = (arr, to, [y, x]) => {
  if(arr && to) {
    arr[y][x] = 1;
    if (JSONcompare(arr, to)) {
      didWin = true;
      arr = clearLayout(to);
    }
  }
}

/**
* Align tooltip's position on view
*/
const alignTooltip = ($elem, callback) => {
  const $under = document.getElementById($elem.dataset.under);
  
  $elem.style.left = `${ $under.getBoundingClientRect().left + ($under.offsetWidth / 2) - 100 }px`;
  callback();
}

/**
* Update item position (on initial load and after each move)
*/
const update = ($game, pos) => {
  const $elem = $game ? $game : document.getElementById("game");
  const $row = $elem.children[pos.y];
  const $cell = $row.children[pos.x];
  $cell.style.backgroundColor = 'green';
}

/**
* When game is restarted reset game area
*/
const clear = ($elem, pos, layout, callback) => {
  Array.from($elem.children).forEach((row, i) => {
     Array.from(row.children).forEach((cell, j) => {
       cell.style.backgroundColor = layout[i][j] === 1 ? '#222' : '#000';
     });
  });
  callback($elem, pos);
}

const setup = () => {
  const $elem = document.getElementById("game");
  item = Object.assign({}, startPosition);
  didWin = false;
  clear($elem, item, layout, update);
}

/**
* Restart level
*/
const restart = () => {
	log('%cLevel was restarted.', DESC_STYLE);
  setup();
	return END_COMMAND;
};

/**
* Fetch JSON
*/
function loadJSON(url, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
        // .open will NOT return a value but simply returns undefined in async mode so use a callback
        callback(xobj.responseText);
    }
  }
  xobj.send(null);
}

const drawLevel = ($elem, callback = () => {}) => {
  /**
  * Draw level layout after all scripts loaded
  */
  setTimeout(() => {
    // Clear previous childNodes.
    $elem.innerHTML = '';
    const height = $elem.offsetHeight / layout.length;
    const width = $elem.offsetWidth / layout[0].length;
    layout.forEach((row) => {
      let $row = document.createElement('div');
      row.forEach((col) => {
        let $cell = document.createElement('div');
        $cell.classList.add('cell');
        $cell.style.width = width;
        $cell.style.height = height;
        $cell.style.backgroundColor = !!col && '#222';
        $row.appendChild($cell);
      });
      $elem.appendChild($row);
    });
    update($elem, startPosition);
    callback();
  }, 0);
}

/**
* Load level
*/
const load = (name) => {
  /*
  loadJSON('./levels.json', (data) => {
    console.log(data);
  });
  */

  // Remove later and load JSON properly from levels.json
  const json = JSON.stringify(levels);
  
  // When level is loaded set it uncompleted
  didWin = false;
  
  if (name && name.length) {
    const level = JSON.parse(json).filter(level => level.name === name)[0];
    if (level) {     
      layout = level.layout;
      startPosition = level.startPosition;  
      route = clearLayout(layout);
    }
  }
  
  const $elem = document.getElementById("game");
  
  // Set start location of level as visited by default
  trace(route, layout, convertXYToArr(startPosition));

  if ($elem) {
    drawLevel($elem, setup);
  }
};