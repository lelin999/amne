let fs = require('fs');

let contiguousOutputFinder = (num, sign) => {
  let sum = 0;
  for (let i = num - 1; i > 0; i--) {
    sum += i;
  }
  return sign === 'positive' ? sum : (-1 * sum);
};

let contiguityCheck = (arr) => {
  //only conditions that pass are inc/dec in length=2 and contiguous length=infinity
  if (arr[0] === arr[arr.length - 1]) {
    return 0;
  }
  if (arr.length === 2) {
    return arr[1] > arr[0] ? 1 : -1;
  } else {
    let sign = 'positive';
    if (arr[arr.length - 1] < arr[0]) {
      sign = 'negative';
    }
    return contiguousOutputFinder(arr.length, sign);
  }
};

let trendCheck = (num1, num2) => {
  if (num1 === num2) {
    return 'equal';
  } else if (num2 > num1) {
    return 'increasing';
  } else {
    return 'decreasing';
  }
};

let arrCheck = (arr) => {
  let count = 0;
  let tempIdx = 0;
  let trend = trendCheck(arr[0], arr[1]);

  for (let i = 0; i < arr.length; i++) {
    // for (let j = i; j < arr.length - 1; j++) {
    if ((trend !== trendCheck(arr[i], arr[i + 1])) || (i === arr.length - 1)) {
      //add up everything before that which is contiguous, i+1 because slice excludes the value itself
      //needs to account for the 1st elem
      let tempRange = arr.slice(tempIdx, i + 1);
      count += contiguityCheck(tempRange);
      //set up the conflict value index
      tempIdx = i;
      trend = trendCheck(arr[i], arr[i+1]);
    }
  }
  return count;
};

let windowOutput = (data) => {
  let newData = data.split('\n');
  let line1 = newData[0].split(' ');
  let windowSize = parseInt(line1[1]);
  let line2 = newData[1].split(' ');
  let range = windowSize - 1;

  for (let i = 0; i < line2.length - range; i++) {
    console.log(arrCheck(line2.slice(i, windowSize + i)));
  }
};

fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err); 
  }
  windowOutput(data);
});