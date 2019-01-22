// End of part 1 and start of part 2

// ===============================================================================
// Native prototypes
// ===============================================================================
function nativePrototypes() {
  function f1() {
    console.log("Hello!");
  }

  Function.prototype.defer1 = function(ms) {
    setTimeout(this, ms);
  };

  f1.defer1(1000); // shows "Hello!" after 1 second

  // Using a wrapper instead of the above method
  Function.prototype.defer2 = function(ms) {
    let f = this;
    return function(...args) {
      setTimeout(() => f.apply(this, args), ms);
    };
  };

  function f2(a, b) {
    console.log(a + b);
  }

  f2.defer2(1000)(1, 2);
}

// nativePrototypes();

// ===============================================================================
// Methods for Prototypes
// ===============================================================================

function methodsForPrototypes() {
  let dictionary = Object.create(null, {
    toString: {
      // define toString property
      value() {
        // the value is a function
        return Object.keys(this).join();
      }
    }
  });

  // your code to add dictionary.toString method
  dictionary.toString = function() {
    console.log(this);
  };

  // add some data
  dictionary.apple = "Apple";
  dictionary.__proto__ = "test"; // __proto__ is a regular property key here

  // only apple and __proto__ are in the loop
  for (let key in dictionary) {
    console.log(key); // "apple", then "__proto__"
  }

  // your toString in action
  console.log(dictionary); // "apple,__proto__"

  // Task 2
  function Rabbit(name) {
    this.name = name;
  }
  Rabbit.prototype.sayHi = function() {
    console.log(this.name);
  };

    let rabbit = new Rabbit("Rabbit");
    
    rabbit.sayHi();
    Rabbit.prototype.sayHi(); // undefined
    Object.getPrototypeOf(rabbit).sayHi(); // undefined
    rabbit.__proto__.sayHi(); // undefined

    // Reason for the above result:
    /*
    The first call has this == rabbit, the other ones have this equal to Rabbit.prototype, because it’s actually the object before the dot.
    So only the first call shows Rabbit, other ones show undefined:
    */
}

// methodsForPrototypes();
