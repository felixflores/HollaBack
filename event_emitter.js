(function() {
  var EventEmitter, util;
  var __slice = Array.prototype.slice;
  util = require('util');
  EventEmitter = (function() {
    function EventEmitter() {
      this.events = {};
    }
    EventEmitter.prototype.bind = function(events, func) {
      var event, splitEvents, _i, _len, _ref, _results;
      if (!func) {
        throw "MissingHandler";
      }
      splitEvents = function(events) {
        var event, i, nameParts, names, _i, _len, _ref, _ref2;
        names = [];
        _ref = events.split(' ');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          nameParts = event.split('.');
          for (i = 0, _ref2 = nameParts.length - 1; (0 <= _ref2 ? i <= _ref2 : i >= _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
            if (i === 0) {
              names.push(nameParts[i]);
            } else {
              names.push(nameParts[0] + "." + nameParts[i]);
            }
          }
        }
        return names;
      };
      _ref = splitEvents(events);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        if (!(this.events[event] != null)) {
          this.events[event] = [];
        }
        _results.push(this.events[event].push(func));
      }
      return _results;
    };
    EventEmitter.prototype.unbind = function(identifiers, func) {
      var event, eventList, handlerToBeDeleted, _i, _len, _ref, _results;
      eventList = function() {

      var eventnames = []
      for(eventname in this.events) {
        eventnames.push(eventname)
      }
      ;        return eventnames;
      };
      identifiers = identifiers.split(' ');
      _ref = eventList();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        _results.push(func != null ? (handlerToBeDeleted = this.events[identifiers].indexOf(func), handlerToBeDeleted !== -1 ? this.events[identifiers].splice(handlerToBeDeleted, 1) : void 0) : delete this.events[identifiers]);
      }
      return _results;
    };
    EventEmitter.prototype.trigger = function() {
      var args, event, func, _i, _len, _ref, _results;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.events[event]) {
        _ref = this.events[event];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          func = _ref[_i];
          _results.push((function(func) {
            return func.apply(this, args);
          })(func));
        }
        return _results;
      }
    };
    return EventEmitter;
  })();
  if (typeof window != "undefined" && window !== null) {
    window.EventEmitter = EventEmitter;
  } else {
    module.exports = EventEmitter;
  }
}).call(this);
