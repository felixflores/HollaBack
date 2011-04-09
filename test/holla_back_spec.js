(function() {
  var HollaBack, assert, vows;
  vows = require('vows');
  assert = require('assert');
  HollaBack = require('../holla_back.js');
  vows.describe('EventEmitter').addBatch({
    'Binding events': {
      topic: new HollaBack,
      "throws an exception if the event handler is missing": function(obj) {
        var erroneousBinding;
        erroneousBinding = function() {
          return obj.bind('change');
        };
        return assert.throws(erroneousBinding, "BindMissingEventHandler");
      },
      "throws an exception if event name contains a dot (.)": function(obj) {
        var erroneousBinding;
        erroneousBinding = function() {
          return obj.bind('.event', function() {
            return 1;
          });
        };
        return assert.throws(erroneousBinding, "EventNameUnacceptable");
      },
      "throws an exception if event name begins with a number": function(obj) {
        var erroneousBinding;
        erroneousBinding = function() {
          return obj.bind('123change', function() {
            return 1;
          });
        };
        return assert.throws(erroneousBinding, "EventNameUnacceptable");
      }
    },
    'Simple triggers': {
      topic: new HollaBack,
      "can be triggered": function(obj) {
        var invocations;
        invocations = [];
        obj.bind('change', function() {
          return invocations.push("trigger");
        });
        obj.trigger('change');
        return assert.equal(invocations.length, 1);
      },
      "does nothing if an event is triggered with no event listeners": function(obj) {
        return assert.equal(obj.trigger('does-not-exists'), null);
      }
    },
    'Simple unbinding': {
      topic: new HollaBack,
      "a single event": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('change', handler);
        obj.unbind('change');
        obj.trigger('change');
        return assert.equal(invocations.length, 0);
      },
      "a namespace": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('change.client', handler);
        obj.bind('explode.client', handler);
        obj.unbind('.client', handler);
        obj.trigger('change');
        obj.trigger('explode');
        return assert.equal(invocations.length, 0);
      },
      "a handler of an event": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('change', handler);
        obj.bind('change', function() {
          return invocations.push('awesome');
        });
        obj.unbind('change', handler);
        obj.trigger('change');
        return assert.equal(invocations[0], 'awesome');
      },
      "a handler of a namespace": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('change.world.hello', handler);
        obj.bind('change.world', handler);
        obj.bind('change.world', function() {
          return invocations.push('awesome');
        });
        obj.unbind('.world', handler);
        obj.trigger('change');
        return assert.equal(invocations[0], 'awesome');
      }
    },
    'Multi Namespaced Unbinding': {
      topic: new HollaBack,
      "unbinds an event if it matches a namespace": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('change.the.world', handler);
        obj.unbind('.the', handler);
        obj.trigger('change');
        return assert.equal(invocations.length, 0);
      }
    },
    'Simple Namespacing': {
      topic: new HollaBack,
      "can be namespaced": function(obj) {
        var invocations;
        invocations = [];
        obj.bind('change.server', function() {
          return invocations.push("trigger");
        });
        obj.trigger('change.server');
        return assert.equal(invocations.length, 1);
      },
      "triggers only namespaced events and ignores listeners outside the namespace": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('change.server', handler);
        obj.bind('change', handler);
        obj.trigger('change.server');
        return assert.equal(invocations.length, 1);
      },
      "triggers all events with the same event name regardless of namespace if namespace is not specified": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('change.server', handler);
        obj.bind('change.client', handler);
        obj.bind('change', handler);
        obj.trigger('change');
        return assert.equal(invocations.length, 3);
      }
    },
    'Multi Namespaced Trigger': {
      topic: new HollaBack,
      "namespaces does not have hierarchy": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('change.server.client', handler);
        obj.bind('change.client.server', handler);
        obj.trigger('change.server.client');
        return assert.equal(invocations.length, 2);
      }
    }
  })["export"](module);
}).call(this);
