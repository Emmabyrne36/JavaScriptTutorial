//  Part 1

function User(name) {
  this.name = name;
  this.isAdmin = false;
  //// console.log(this);
  //// console.log(new.target);
}

function Calculator() {
  this.read = function() {
    this.x = +prompt("Input x");
    this.y = +prompt("Input y");
  };
  this.sum = function() {
    return this.x + this.y;
  };

  this.mul = function() {
    return this.x * this.y;
  };
}

// let calc = new Calculator();
// calc.read();
//// console.log(calc.sum());
//// console.log(calc.mul());

function Accumulator(startingValue) {
  this.value = startingValue;
  this.read = function() {
    this.value += +prompt("Enter a number");
  };
}

// let accumulator = new Accumulator(1); // initial value 1
// accumulator.read(); // adds the user-entered value
// accumulator.read(); // adds the user-entered value
// alert(accumulator.value); // shows the sum of these values

function Calculator() {
  let operations = {
    "+": function(x, y) {
      return x + y;
    },

    // '-': function(x,y) {
    //     return x - y;
    //}
    "-": (x, y) => x - y
  };

  this.calculate = function(str) {
    let resArr = str.split(" "),
      operator = resArr[1];
    x = +resArr[0];
    y = +resArr[2];

    //// console.log(resArr);
    if (!operations[operator] || isNaN(x) || isNaN(y)) {
      return NaN;
    }

    return operations[operator](x, y);
  };

  this.addMethod = function(name, func) {
    operations[name] = func;
  };
}

//=============================== Statements =================================================
/*
    let user = new User("Emma");
    //// console.log(user.name);
    //// console.log(user.isAdmin);
    //// console.log("===============================");


    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);
    powerCalc.addMethod("%", (a,b) => a % b);

    let result = powerCalc.calculate("2 ** 3");
    //alert( result ); // 8

    let res2 = powerCalc.calculate("6 / 2");
    //// console.log(res2);
    //// console.log(powerCalc.calculate("9 ** 2"));
    //// console.log(powerCalc.calculate("11 % 5"));
    //// console.log(powerCalc.calculate("11 - 5"));
    */
// ==============================================================================================

// ============================================================================================================================
// Strings
/*
    //// console.log(ucFirst("emma"));
    //// console.log(truncate("What I'd like to tell on this topic is:", 20));
    //// console.log(truncate("Hi everyone!", 20));
    //// console.log(extractCurrencyValue('$120'));
    //// console.log(extractCurrencyValue('$120') === 120 );
    //// console.log(extractCurrencyValue("€150") === 150);
    */

function ucFirst(input) {
  if (input[0] != null) {
    let result = input[0].toUpperCase() + input.slice(1);
    return result;
  } else {
    return "";
  }
}

function truncate(str, maxlength) {
  // let strLength = str.length;
  // if (strLength > maxlength){
  //     let subStr = str.slice(0,maxlength-1);
  //     subStr += '\u2026';
  //     return subStr;
  // } else {
  //     return str;
  // }

  // alternatively
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "\u2026" : str;
}

function extractCurrencyValue(amount) {
  return +amount.slice(1);
}

// ============================================================================================================================
// Arrays

// let styles = ["Jazz", "Blues"];
//// console.log(styles);
// styles.push("Rock-n-Roll");
//// console.log(styles);
// styles[Math.floor((styles.length - 1) / 2)] = "Classics";
//// console.log(styles);
//// console.log(styles.shift());
// styles.unshift("Rap");
// styles.unshift("Reggae");
//// console.log(styles);
//// console.log(sumInput());

//// console.log(getMaxSubSum([1,2,4,7,-99,50]));

function sumInput() {
  let arr = [];
  let val = -1;
  while (!isNaN(val) && val != null && val != "") {
    val = +prompt("Enter a number");
    arr.push(val);
  }

  return arr.reduce((a, b) => a + b); // this sums up the values in the array
}

function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) {
    // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

// ============================================================================================================================
// Array methods

//// console.log(camelize("test-test-test-test-test"),
camelize("background-colour"),
  camelize("list-style-image"),
  camelize("-webkit-transition");

let arr = [100, 1, 15, 2, 37, 99, 87, 64, 12];
arr.sort((a, b) => +a > +b);
//// console.log(arr);

// Better as works for all types:
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

function camelize(str) {
  let arr = str.split("-");
  // ignore first item of the array and make first letter capital in the rest
  let newResult = arr
    .slice(1)
    .map((item, index) => item[0].toUpperCase() + item.slice(1));
  arr = arr[0] + newResult.join("");
  return arr;

  // alternative approach, probably better as doesn't store in variable
  //// console.log(str  .split('-')
  // .map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1))
  // .join(''));
}

function filterRange(arr, a, b) {
  // returns array of elems between a and b
  // not in an order, input numbers and return numbers between a and b
  // let newArr = arr.map(i => i >= a && i <= b ? i : null)
  // .filter(item => item != null);
  // return newArr;

  // no need for map here, which actually makes sense
  return arr.filter(item => item >= a && item <= b);
}

let arr2 = [5, 3, 8, 1];
// let f = filterRange(arr2, 1,4);
//// console.log(arr2,f);
//// console.log(filterRange([1,2,7,9,45,63,21], 9, 100));

function filterRangeInPlace(arr, a, b) {
  // remove values between a and b
  // modify existing array, don't make new one. No map
  // find and remove?
  //// console.log("in the method");
  // return arr.find(item => item >= a && item <= b);
  //// console.log(arr);
  arr.forEach((item, index) => {
    if (a <= item || b >= item) {
      // let index = arr.indexOf(item);
      //// console.log(index);
      arr.splice(index, 1);
    }
  });
}

// filterRangeInPlace(arr2,1,4);
//// console.log(arr2);

let arr3 = [5, 2, 1, -10, 8];
function sortRevOrder(arr) {
  return arr.sort().reverse();
  // also, without using built in reverse
  // arr.sort((a,b) => b-a);
}

//// console.log(sortRevOrder(arr3));

function copySorted(arr) {
  // Returns copy of arr, sorted
  let copyArr = arr.map(i => i).sort();
  return copyArr;

  // also use arr.slice().sort();
}

let arr4 = ["HTML", "JavaScript", "CSS"];
//// console.log(copySorted(arr4));
//// console.log(arr4);

function mapToNames(arr) {
  return arr.map(item => item.name);
}

function mapToObjects(arr) {
  return arr.map(item => ({
    fullname: item.name + " " + item.surname,
    id: item.id
  }));
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users1 = [john, pete, mary];
//// console.log(mapToNames(users1));

john = { name: "John", surname: "Smith", id: 1 };
pete = { name: "Pete", surname: "Hunt", id: 2 };
mary = { name: "Mary", surname: "Key", id: 3 };

let users2 = [john, pete, mary];
//// console.log(mapToObjects(users2));

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  return array;
}

//// console.log(shuffle([1,2,3]));

john = { name: "John", age: 25 };
pete = { name: "Pete", age: 30 };
mary = { name: "Mary", age: 29 };
let arr5 = [john, pete, mary];

function getAverageAge(arr) {
  return arr.reduce((prev, user) => prev + user.age, 0) / arr.length;
}

//// console.log(getAverageAge(arr5));

function unique(arr) {
  //// console.log();
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  let unique = arr.filter(function(elem, index, self) {
    //// console.log(index === self.indexOf(elem));
    return index === self.indexOf(elem);
  });
  //// console.log(unique);
  return unique;

  //return result;

  //return arr.filter(a => a == "Hare");
}

let strings = [
  "Hare",
  "Krishna",
  "Hare",
  "Krishna",
  "Krishna",
  "Krishna",
  "Hare",
  "Hare",
  ":-O"
];

//// console.log(unique(strings));

// =========================================================================================
// Map and Set

// console.log(unique2(strings));
// console.log(aClean(["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"]));

function unique2(arr) {
  // Converts set to array
  return Array.from(new Set(arr));
}

function aClean(arr) {
  // Returns array clean from anagrams
  let map = new Map();
  for (let word of arr) {
    let sorted = word
      .toLowerCase()
      .split("")
      .sort()
      .join("");
    // Over-riding the original key that was there
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

// =========================================================================================
// Object keys, values and entries
// =========================================================================================
let salaries = {
  John: 100,
  Pete: 250,
  Mary: 300
};

let user = {
  name: "John",
  age: 30
};

// console.log(sumSalaries(salaries));
// console.log(count(user));

function sumSalaries(salaries) {
  let sumVals = 0;
  for (let sal of Object.values(salaries)) {
    sumVals += sal;
  }

  return sumVals;
}

function count(obj) {
  return Object.keys(obj).length;
}

let u = {
  name: "John",
  years: 30
};

let { name, years: age, isAdmin = false } = u;
// console.log(name);
// console.log(age)
// console.log(isAdmin);

let sals = {
  John: 100,
  Pete: 300,
  Mary: 250
};

function topSalary1(sals) {
  // This returns the highest value
  return Object.keys(sals).length !== 0
    ? Math.max(...Object.values(sals))
    : null;
}

function topSalary2(sals) {
  if (Object.keys(sals).length === 0) {
    return null;
  }

  let topPerson;
  let topSal = 0;
  for (let [key, value] of Object.entries(sals)) {
    if (topSal < value) {
      topSal = value;
      topPerson = key;
    }
  }

  return topPerson;
}

// console.log(topSalary1(sals));
// console.log(topSalary2(sals));

// ============================================================================
// Date and time
// ============================================================================

let date = new Date(2015, 0, 2);
// console.log('Days ago: ' + getDateAgo(date,2));

function getWeekDay(date) {
  let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return days[date.getDay()];
}

function getLocalDay(date) {
  let days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  return days[date.getDay() - 1];
}

function getDateAgo(date, days) {
  // Returns day of the month 'days' ago from the date
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

function getSecondsToTomorrow() {
  let now = new Date();

  // create an object using the current day/month/year
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // make seconds
}

// console.log(getSecondsToTomorrow());

// ========================================================================
// Json methods
// ========================================================================

let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{ name: "John" }, { name: "Alice" }],
  place: room
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

/*
    console.log( JSON.stringify(meetup, function replacer(key, value) {
        return (key != "" && value == meetup) ? undefined : value;
    }));
    */

// ===========================================================================
// Recursion
// ===========================================================================

//console.log(sumToN(10)); // 55

function sumToN(n) {
  // Sums numbers up to the input number - using recursion
  if (n === 1) {
    return n;
  } else {
    return n + sumToN(n - 1);
  }

  // Faster method using the formula: n*(n-1)/2
  // return n *(n-1)/2
}

// console.log(factorial(3)); // 6
function factorial(n) {
  if (n === 1) {
    return n;
  } else {
    return n * (n - 1);
  }
}

// console.log(fib(10));
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

//printList(list);
function printList(list) {
  console.log(list.value);
  if (list.next) {
    printList(list.next); // do the same for the rest of the list
  }
}

//console.log("");
//printListReversed(list);
function printListReversed(list) {
  if (list.next) {
    printListReversed(list.next);
  }
  console.log(list.value);
}

// ===========================================================================
// Closures
// ===========================================================================

function sum(a) {
  return function(b) {
    return a + b;
  };
}

// console.log(sum(1)(2));

function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}

let testArr = [1, 2, 3, 4, 5, 6, 7];
//console.log(testArr.filter(inBetween(3, 6))); // 3,4,5
//console.log(testArr.filter(inArray([1,2,10]))); // 1,2

function byField(param) {
  return (a, b) => (a[param] > b[param] ? 1 : -1);
}

let testUsers = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

testUsers.sort(byField("name"));
// testUsers.forEach(user => alert(user.name)) // Ann, John, Pete

function makeArmy() {
  let shooters = [];

  for (let i = 0; i < 10; i++) {
    let shooter = function() {
      alert(i);
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

//console.log(army[0]());
//console.log(army[5]());

// ===========================================================================
// Function objects
// ===========================================================================

function makeCounter() {
  // instead of:
  let count = 0;

  function counter() {
    return count++;
  }

  counter.set = value => (count = value);
  counter.decrease = () => count--;

  return counter;
}

let counter = makeCounter();
//   console.log( counter() ); // 0
//   console.log( counter() ); // 1
//   console.log(counter.set(5));

function sum(a) {
  let currentSum = a;
  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

// alert( sum(1)(2) ); // 3
// alert( sum(5)(-1)(2) ); // 6
// alert( sum(6)(-1)(-2)(-3) ); // 0
// alert( sum(0)(1)(2)(3)(4)(5) ); // 15


// ==============================================================================
// Currying
// ==============================================================================

function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}
  
let user_Curry = {
  name: 'John',
  
  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};
  
// askPassword(user_Curry.login.bind(user_Curry, true), user_Curry.login.bind(user_Curry, false)); // ?

// ===============================================================================
// Prototypal inheritance
// ===============================================================================
// use the keyword __proto__: <class/object you want to inherit from>

let head = {
  glasses: 1
};

let table = {
  __proto__: head,
  pen: 3
};

let bed = {
  __proto__: table,
  sheet: 1,
  pillow: 2
};

let pockets = {
  __proto__: bed,
  money: 2000
};


let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  stomach: [],
  __proto__: hamster

};
let lazy = {
  stomach: [],
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
console.log( speedy.stomach ); // apple

// This one also has it, why? fix please.
console.log( lazy.stomach ); // apple
// fixed by giving each hamster their own stomach