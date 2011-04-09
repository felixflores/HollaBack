(function() {
  var EventEmitter, funcA, funcB, invocations, obj, util;
  util = require('util');
  EventEmitter = require('./event_emitter.js');
  obj = new EventEmitter;
  invocations = [];
  funcA = function() {
    return invocations.push('trigger_a');
  };
  funcB = function() {
    return invocations.push('trigger_b');
  };
  obj.bind('explode.world', funcA);
  obj.bind('click.world', funcA);
  obj.bind('click', funcB);
  obj.unbind('.world');
  obj.trigger('click');
  console.log('\n');
  console.log(util.inspect(obj.events));
  console.log('\n');
  console.log(util.inspect(invocations));
  console.log('\n');
}).call(this);
