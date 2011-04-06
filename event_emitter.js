(function() {
  var EventEmitter, util;
  var __slice = Array.prototype.slice;
  util = require('util');
  EventEmitter = (function() {
    function EventEmitter() {
      this.namespaces = {};
      this.events = {};
      this.functions = [];
    }
    EventEmitter.prototype.bind = function(events, func) {
      var event, eventNameSpace, eventname, namespace, namespaces, _i, _j, _len, _len2;
      events = events.split(' ');
      if (this.functions.indexOf(func) === -1) {
        this.functions.push(func);
      }
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        event = events[_i];
        eventNameSpace = event.split('.');
        if (eventNameSpace.length > 1) {
          eventname = eventNameSpace[0];
          namespaces = eventNameSpace.slice(1, (eventNameSpace.length + 1) || 9e9);
        } else {
          eventname = eventNameSpace;
        }
        if (!(this.events[eventname] != null)) {
          this.events[eventname] = [];
        }
        this.events[eventname].push(this.functions.indexOf(func));
        if (namespaces != null) {
          for (_j = 0, _len2 = namespaces.length; _j < _len2; _j++) {
            namespace = namespaces[_j];
            if (!(this.namespaces[namespace] != null)) {
              this.namespaces["." + namespace] = [];
            }
            this.namespaces["." + namespace].push(eventname);
          }
        }
      }
      util.log("functions: " + util.inspect(this.functions));
      util.log("events: " + util.inspect(this.events));
      util.log("namespaces: " + util.inspect(this.namespaces));
      return false;
    };
    EventEmitter.prototype.unbind = function(identifier, func) {
      var event, events, _i, _j, _len, _len2, _ref;
      if (identifier[0] === '.') {
        if (!(this.namespaces[identifier] != null)) {
          return;
        }
        _ref = this.namespaces[identifier];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          events = _ref[_i];
          for (_j = 0, _len2 = events.length; _j < _len2; _j++) {
            event = events[_j];
            this.events[event];
          }
        }
        return delete this.namespaces[identifier];
      } else {
        if (!(this.events[identifier] != null)) {
          ;
        }
      }
    };
    EventEmitter.prototype.trigger = function() {
      var args, event, func, _i, _len, _ref, _results;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!(this.events[event] != null)) {
        return;
      }
      _ref = this.events[event];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        func = _ref[_i];
        _results.push((function(func) {
          return func.apply.apply(func, [this].concat(__slice.call(args)));
        })(func));
      }
      return _results;
    };
    return EventEmitter;
  })();
  if (typeof window != "undefined" && window !== null) {
    window.EventEmitter = EventEmitter;
  } else {
    module.exports = EventEmitter;
  }
}).call(this);
