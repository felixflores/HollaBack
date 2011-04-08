(function() {
  var EventEmitter, assert, vows;
  vows = require('vows');
  assert = require('assert');
  EventEmitter = require('../event_emitter.js');
  vows.describe('EventEmitter').addBatch({
    'Binding events': {
      topic: new EventEmitter,
      "throws an exception if the event handler is missing": function(obj) {
        var erroneousBinding;
        erroneousBinding = function() {
          return obj.bind('click');
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
      "throws an exception if event name is felixIsAwesome": function(obj) {
        var erroneousBinding;
        erroneousBinding = function() {
          return obj.bind('felixIsAwesome', function() {
            return 1;
          });
        };
        return assert.throws(erroneousBinding, "EventNameUnacceptable");
      },
      "throws an exception if event name begins with a number": function(obj) {
        var erroneousBinding;
        erroneousBinding = function() {
          return obj.bind('123click', function() {
            return 1;
          });
        };
        return assert.throws(erroneousBinding, "EventNameUnacceptable");
      }
    },
    'Simple triggers': {
      topic: new EventEmitter,
      "can be triggered": function(obj) {
        var invocations;
        invocations = [];
        obj.bind('click', function() {
          return invocations.push("trigger");
        });
        obj.trigger('click');
        return assert.equal(invocations.length, 1);
      },
      "does nothing if an event is triggered with no event listeners": function(obj) {
        return assert.equal(obj.trigger('does-not-exists'), null);
      }
    },
    'Simple unbinding': {
      topic: new EventEmitter,
      "unbind a single event": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('click', handler);
        obj.unbind('click');
        obj.trigger('click');
        return assert.equal(invocations.length, 1);
      },
      "unbiding a namespace": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('click.client', handler);
        obj.bind('explode.client', handler);
        obj.unbind('.client', handler);
        console.log(util.inspect(obj.events));
        obj.trigger('click');
        obj.trigger('explode');
        return assert.equal(invocations.length, 0);
      }
    },
    'Namespacing': {
      topic: new EventEmitter,
      "can be namespaced": function(obj) {
        var invocations;
        invocations = [];
        obj.bind('click.server', function() {
          return "Hello";
        });
        obj.bind('click.server', function() {
          return invocations.push("trigger");
        });
        obj.trigger('click.server');
        return assert.equal(invocations.length, 1);
      },
      "triggers only namespaced events and ignores listeners outside the namespace": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('click.server', handler);
        obj.bind('click', handler);
        obj.trigger('click.server');
        return assert.equal(invocations.length, 1);
      },
      "triggers all events with the same event name regardless of namespace if namespace is not specified": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('click.server', handler);
        obj.bind('click.client', handler);
        obj.bind('click', function() {
          return handler;
        });
        obj.trigger('click');
        return assert.equal(invocations.length, 3);
      },
      "triggers all events with the same event name regardless of namespace if namespace is not specified": function(obj) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        obj.bind('click.server', handler);
        obj.bind('click.client', handler);
        obj.bind('click', handler);
        obj.trigger('click');
        return assert.equal(invocations.length, 3);
      }
    }
  })["export"](module);
}).call(this);
