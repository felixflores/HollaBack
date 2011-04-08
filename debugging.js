(function() {
  var EventEmitter, funcA, invocations, obj, util;
  util = require('util');
  EventEmitter = require('./event_emitter.js');
  obj = new EventEmitter;
  invocations = [];
  funcA = function() {
    return invocations.push('trigger');
  };
  obj.bind('click.world.server.hi', funcA);
  obj.bind('click.world', funcA);
  obj.trigger('click');
  console.log('\n');
  console.log(util.inspect(obj.events));
  console.log('\n');
  console.log(util.inspect(invocations));
  console.log('\n');
}).call(this);
