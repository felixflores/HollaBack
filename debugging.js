(function() {
  var EventEmitter, handler, invocations, obj, util;
  util = require('util');
  EventEmitter = require('./holla_back.js');
  obj = new EventEmitter;
  invocations = [];
  handler = function() {
    return invocations.push('trigger');
  };
  obj.bind('change.client', handler);
  obj.bind('explode.client', handler);
  obj.unbind('.client', handler);
  console.log('\n');
  console.log(util.inspect(obj.events));
}).call(this);
