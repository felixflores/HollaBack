(function() {
  var EventEmitter, assert, util, vows;
  vows = require('vows');
  assert = require('assert');
  util = require('util');
  EventEmitter = require('./event_emitter.js');
  vows.describe('EventEmitter').addBatch({
    'Binding events': {
      topic: new EventEmitter,
      "throws an exception if the event handler is missing": function(object) {
        var erroneousBinding;
        erroneousBinding = function() {
          return object.bind('click');
        };
        return assert.throws(erroneousBinding, "MissingHandler");
      }
    },
    'Simple triggers': {
      topic: new EventEmitter,
      "can be triggered": function(object) {
        object.bind('click', function() {
          return "Hello";
        });
        return assert.equal(object.trigger('click'), "Hello");
      },
      "does nothing if an event is triggered with no event listeners": function(object) {
        return assert.deepEqual(object.trigger('does-not-exists'), void 0);
      }
    },
    'Namespacing': {
      topic: new EventEmitter,
      "can be namespaced": function(object) {
        object.bind('click.server', function() {
          return "Hello";
        });
        return assert.equal(object.trigger('click.server'), "Hello");
      },
      "triggers only namespaced events and ignores listeners outside the namespace": function(object) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        object.bind('click.server', handler);
        object.bind('click', handler);
        object.trigger('click.server');
        return assert.equal(invocations.length, 1);
      },
      "triggers all events with the same event name regardless of namespace if namespace is not specified": function(object) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        object.bind('click.server', handler);
        object.bind('click.client', handler);
        object.bind('click', function() {
          return handler;
        });
        object.trigger('click');
        return assert.equal(invocations.length, 3);
      },
      "triggers all events with the same event name regardless of namespace if namespace is not specified": function(object) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        object.bind('click.server', handler);
        object.bind('click.client', handler);
        object.bind('click', handler);
        object.trigger('click');
        return assert.equal(invocations.length, 3);
      },
      "namespaces does not have hierarchy": function(object) {
        var handler, invocations;
        invocations = [];
        handler = function() {
          return invocations.push('trigger');
        };
        object.bind('click.server.client', handler);
        object.bind('click.client.server', handler);
        object.trigger('click.server.client');
        return assert.equal(invocations.length, 3);
      }
    }
  })["export"](module);
}).call(this);
