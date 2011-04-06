(function() {
  var EventEmitter, MyClass, handler, myClass;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  EventEmitter = require('./event_emitter.js');
  MyClass = (function() {
    __extends(MyClass, EventEmitter);
    function MyClass(name) {
      this.name = name;
      MyClass.__super__.constructor.apply(this, arguments);
    }
    return MyClass;
  })();
  myClass = new MyClass("awesome");
  handler = function() {
    return 1 + 1;
  };
  myClass.bind('click', handler);
  myClass.bind('click.server', handler);
  myClass.bind('click.client', handler);
  myClass.bind('mouseover.client', handler);
}).call(this);
