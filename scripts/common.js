/**
* Logger
*/
const log = (...args) => console.log(...args);

const logMany = (...args) => [...args].forEach(arg => log(arg));

/**
* Deep clone array without (no refer orig)
* NOTE: Only for array cloning.
*/
const clone = (arr) => {
  if(Array.isArray(arr)) {
    let copy = arr.slice(0);
    for(let i = 0; i < copy.length; i++ ) {
      copy[i] = clone( copy[i] );
    }
    return copy;
  } else if (typeof arr === 'object') {
    throw new Error('Cannot clone array containing an object!');
  } else {
    return arr;
  }
}

/**
* JSON compare
* NOTE: Only works with comparisons without Objects with functions.
*/
const JSONcompare = (arr, arr2) => {
  return JSON.stringify(arr) === JSON.stringify(arr2);
}

/**
* Bind arguments to function (ease of use)
*/
const bind = (fn, ...args) => fn.bind(null, ...args);

/**
* Do a function N times
*/
const loop = (fn, times, ...args) => {
  let i = 0;
  while (i < times) {
    bind(fn, ...args)();
    i++;
  }
  return "Starting loop";
};

/**
* Convert {y, x} object to [y, x] array
*/
const convertXYToArr = (obj) => {
  return [obj.y, obj.x];
}
