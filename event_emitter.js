(function() {
  var EventEmitter;
  var __slice = Array.prototype.slice;
  EventEmitter = (function() {
    function EventEmitter() {
      this.events = {};
    }
    EventEmitter.prototype.bind = function(event, func) {
      if (!(this.events[event] != null)) {
        this.events[event] = [];
      }
      return this.events[event].push(func);
    };
    EventEmitter.prototype.unbind = function(event, func) {
      if (!(this.events[event] != null)) {
        return;
      }
      if ((func != null) && this.events[event] === func) {
        return delete this.event[event];
      } else {
        return delete this.events[event];
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
  if ((typeof module != "undefined" && module !== null) && ("exports" in module)) {
    module.exports = EventEmitter;
  }
}).call(this);
