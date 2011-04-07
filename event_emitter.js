(function() {
  var EventEmitter, util;
  var __slice = Array.prototype.slice;
  util = require('util');
  EventEmitter = (function() {
    function EventEmitter() {
      this.events = {};
    }
    EventEmitter.prototype.bind = function(events, func) {
      var event, i, identifier, identifiers, _i, _len, _results;
      if (!func) {
        throw "MissingHandler";
      }
      events = events.split(' ');
      _results = [];
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        event = events[_i];
        identifiers = event.split('.');
        _results.push((function() {
          var _ref, _results;
          _results = [];
          for (i = 0, _ref = identifiers.length - 1; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
            if (i === 0) {
              identifier = identifiers[i];
            } else {
              identifier = identifiers[0] + "." + identifiers[i];
            }
            if (!(this.events[identifier] != null)) {
              this.events[identifier] = [];
            }
            _results.push(this.events[identifier].push(func));
          }
          return _results;
        }).call(this));
      }
      return _results;
    };
    EventEmitter.prototype.unbind = function(identifiers, func) {
      var event, handlerToBeDeleted, _i, _len, _ref, _results;
      identifiers = identifiers.split(' ');
      _ref = this.eventList();
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
    EventEmitter.prototype.eventList = function() {

    var eventnames = []
    for(eventname in this.events) {
      eventnames.push(eventname)
    }
    ;      return eventnames;
    };
    return EventEmitter;
  })();
  if (typeof window != "undefined" && window !== null) {
    window.EventEmitter = EventEmitter;
  } else {
    module.exports = EventEmitter;
  }
}).call(this);
