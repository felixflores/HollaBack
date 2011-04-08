(function() {
  var EventEmitter, assert, obj, util, vows;
  vows = require('vows');
  assert = require('assert');
  util = require('util');
  EventEmitter = require('../event_emitter.js');
  obj = new EventEmitter;
  obj.bind('hello.world', function() {
    return 1;
  });
  obj.bind('click.world', function() {
    return 1;
  });
  obj.bind('explode.server.world', function() {
    return 1;
  });
  obj.bind('hello', function() {
    return 1;
  });
  obj.bind('world', function() {
    return 1;
  });
  console.log('\n');
  console.log(util.inspect(obj.events));
  console.log('\n');
  console.log(util.inspect(obj.namespacedEvents));
}).call(this);
