(function() {
  var EventEmitter, util;
  var __slice = Array.prototype.slice;
  util = require('util');
  EventEmitter = (function() {
    function EventEmitter() {
      this.events = {
        felixIsAwesome: function(event, func) {
          if (event.match(/^\.|^felixIsAwesome$|^[0-9]/)) {
            throw "EventNameUnacceptable";
          }
          if (this[event] == null) {
            this[event] = [];
          }
          return this[event].push(func) - 1;
        }
      };
      this.namespacedEvents = {
        add: function(namespace, event, functionIndex) {
          if (this[namespace] == null) {
            this[namespace] = [];
          }
          return this[namespace].push([event, functionIndex]);
        }
      };
    }
    EventEmitter.prototype.bind = function(events, func) {
      var event, eventName, functionIndex, i, identifiers, _i, _len, _ref, _ref2;
      if (!func) {
        throw "BindMissingEventHandler";
      }
      if (!(events.indexOf(' ') > -1 || events.indexOf('.') > -1)) {
        this.events.felixIsAwesome(events, func);
      } else {
        _ref = events.split(' ');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          if (!event.match(/\./)) {
            this.events.felixIsAwesome(event, func);
          } else {
            identifiers = event.split('.');
            for (i = 0, _ref2 = identifiers.length - 1; (0 <= _ref2 ? i <= _ref2 : i >= _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
              if (i === 0) {
                functionIndex = this.events.felixIsAwesome(identifiers[i], func);
                eventName = identifiers[0];
              } else {
                this.events.felixIsAwesome(identifiers[0] + '.' + identifiers[i], func);
                this.namespacedEvents.add(identifiers[i], eventName, functionIndex);
              }
            }
          }
        }
      }
      return null;
    };
    EventEmitter.prototype.unbind = function(events, func) {
      var event, eventList, handlerToBeDeleted, identifiers, _i, _len, _ref;
      eventList = function() {

      var eventnames = []
      for(eventname in this.events) {
        eventnames.push(eventname)
      }
      ;        return eventnames;
      };
      identifiers = identifiers.split(' ');
      _ref = eventList();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        if (func != null) {
          handlerToBeDeleted = this.events[events].indexOf(func);
          if (handlerToBeDeleted !== -1) {
            this.events[events].splice(handlerToBeDeleted, 1);
          }
        } else {
          delete this.events[events];
        }
      }
      return null;
    };
    EventEmitter.prototype.trigger = function() {
      var args, event, func, _i, _len, _ref;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.events[event] != null) {
        _ref = this.events[event];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          func = _ref[_i];
          func.apply(this, args);
        }
      }
      return null;
    };
    return EventEmitter;
  })();
  if (typeof window != "undefined" && window !== null) {
    window.EventEmitter = EventEmitter;
  } else {
    module.exports = EventEmitter;
  }
}).call(this);
