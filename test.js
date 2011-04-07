(function() {
  var EventEmitter, EventEmitterDebug, handler, myClass, util;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  util = require('util');
  EventEmitter = require('./event_emitter.js');
  EventEmitterDebug = (function() {
    function EventEmitterDebug() {
      EventEmitterDebug.__super__.constructor.apply(this, arguments);
    }
    __extends(EventEmitterDebug, EventEmitter);
    EventEmitterDebug.prototype.status = function() {
      console.log('\n');
      console.log(util.inspect(this.events));
      console.log('\n');
      console.log(util.inspect(this.namespaces));
      return console.log('\n');
    };
    return EventEmitterDebug;
  })();
  myClass = new EventEmitterDebug;
  handler = function() {
    return 1 + 1;
  };
  myClass.bind('click.server mouse.server focus', handler);
  myClass.bind('click.server', function(message) {
    return console.log(message);
  });
  myClass.bind('click.random', function() {
    return 3;
  });
  myClass.bind('click', function() {
    return 2;
  });
  myClass.unbind('click', handler);
  myClass.unbind('.random');
  myClass.unbind('click.server', handler);
  myClass.trigger('click.server', ['hello world']);
}).call(this);
