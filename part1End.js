// End of part 1 and start of part 2

// ===============================================================================
// Native prototypes
// ===============================================================================
function nativePrototypes() {
  function f1() {
    console.log("Hello!");
  }

  Function.prototype.defer1 = function (ms) {
    setTimeout(this, ms);
  };

  f1.defer1(1000); // shows "Hello!" after 1 second

  // Using a wrapper instead of the above method
  Function.prototype.defer2 = function (ms) {
    let f = this;
    return function (...args) {
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
  dictionary.toString = function () {
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
  Rabbit.prototype.sayHi = function () {
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

// ===============================================================================
// Class Patterns
// ===============================================================================
// Prototype-based classes are the most used and best way the write a class in JS
// This way is more memory efficient - all methods are in User.prototype which is shared between all User objects
function classPatterns() {
  function User(name, birthday) {
    this._name = name;
    this._birthday = birthday;
  }

  User.prototype._calcAge = function () {
    return new Date().getFullYear() - this._birthday.getFullYear();
  };

  User.prototype.sayHi = function () {
    console.log(`${this._name}, age:${this._calcAge()}`);
  };

  let user = new User('Jarvis', new Date(2000, 0, 1));
  user.sayHi();
}

// classPatterns();

// Task 2
function classPatternsTask2() {
  function Clock({template}) {
    this._template = template;
  }

  Clock.prototype._render = function () {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this._template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  };

  Clock.prototype.stop = function () {
    clearInterval(this._timer);
  };

  Clock.prototype.start = function () {
    this._render();
    this._timer = setInterval(() => this._render(), 100);
  };

  let clock = new Clock({
    template: 'h:m:s'
  });
  clock.start();
}

// classPatternsTask2();


// ===============================================================================
// Classes
// ===============================================================================
// The “class” construct allows to define prototype-based classes with a clean, nice-looking syntax.
// The class syntax is just a special form of a function with prototype definition
// User prototype class above re-written:
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }
}

// let user = new User('Jarvis');
// user.sayHi();

function classesTask() {
  class Clock {
    constructor({template}) {
      this._template = template;
    }
  
    _render() {
      let date = new Date();
  
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
  
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
  
      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
  
      let output = this._template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
  
      console.log(output);
    }
  
    stop() {
      clearInterval(this.timer);
    }
  
    start() {
      this._render();
      this.timer = setInterval(() => this._render(), 1000);
    }
  }
  
  let clock = new Clock({template: 'h:m:s'});
  clock.start();
}

// classesTask();

// ===============================================================================
// Class Inheritance, Super
// ===============================================================================
// Use the extends keyword


// ===============================================================================
// Mixins
// ===============================================================================
function mixinExample() {
  // mixin
  let sayHiMixin = {
    sayHello() {
      console.log(`Hello ${this.name}`);
    },
    sayBye() {
      console.log(`Bye ${this.name}`);
    }
  };

  // usage:
  class User2 {
    constructor(name) {
      this.name = name;
    }
  }

  // copy the methods
  Object.assign(User2.prototype, sayHiMixin);

  // now User can say hi
  new User2("Dude").sayHello(); // Hello Dude!
}

mixinExample();

function mixinExampleWithEvents() {
  let eventMixin = {
    /**
     * Subscribe to event, usage:
     *  menu.on('select', function(item) { ... }
    */
    on(eventName, handler) {
      if (!this._eventHandlers) this._eventHandlers = {};
      if (!this._eventHandlers[eventName]) {
        this._eventHandlers[eventName] = [];
      }
      this._eventHandlers[eventName].push(handler);
    },
  
    /**
     * Cancel the subscription, usage:
     *  menu.off('select', handler)
     */
    off(eventName, handler) {
      let handlers = this._eventHandlers && this._eventHandlers[eventName];
      if (!handlers) return;
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          handlers.splice(i--, 1);
        }
      }
    },
  
    /**
     * Generate the event and attach the data to it
     *  this.trigger('select', data1, data2);
     */
    trigger(eventName, ...args) {
      if (!this._eventHandlers || !this._eventHandlers[eventName]) {
        return; // no handlers for that event name
      }
  
      // call the handlers
      this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    }
  };


  // Usage

  // Make a class
  class Menu {
    choose(value) {
      this.trigger("select", value);
    }
  }
  // Add the mixin
  Object.assign(Menu.prototype, eventMixin);

  let menu = new Menu();

  // call the handler on selection:
  menu.on("select", value => console.log(`Value selected: ${value}`));

  // triggers the event => shows Value selected: 123
  menu.choose("123"); // value selected
}

// mixinExampleWithEvents();