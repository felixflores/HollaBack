(function() {
  var EventEmitter, util;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  util = require('util');
  EventEmitter = (function() {
    function EventEmitter() {
      this.events = {};
    }
    EventEmitter.prototype.bind = function(events, func) {
      var addEvent, eventName, functionNameSpaceSet, i, identifiers, _event, _i, _len, _ref, _ref2, _ref3;
      addEvent = __bind(function(label, functionNameSpaceSet) {
        if (this.events[label] == null) {
          this.events[label] = [];
        }
        this.events[label].push(functionNameSpaceSet);
        return null;
      }, this);
      if (!func) {
        throw "BindMissingEventHandler";
      }
      _ref = events.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _event = _ref[_i];
        identifiers = _event.split('.');
        eventName = '';
        functionNameSpaceSet = [func];
        for (i = 0, _ref2 = identifiers.length - 1; (0 <= _ref2 ? i <= _ref2 : i >= _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
          if (identifiers[i].match(/^\.|^add$|^remove$|^[0-9]|^$/)) {
            throw "EventNameUnacceptable";
          }
          if (i === 0) {
            eventName = identifiers[i];
          } else {
            functionNameSpaceSet.push(identifiers[i]);
          }
        }
        addEvent(eventName, functionNameSpaceSet);
        if (functionNameSpaceSet.length > 1) {
          for (i = 1, _ref3 = functionNameSpaceSet.length - 1; (1 <= _ref3 ? i <= _ref3 : i >= _ref3); (1 <= _ref3 ? i += 1 : i -= 1)) {
            addEvent(eventName + '.' + functionNameSpaceSet[i], [func]);
          }
        }
      }
      return null;
    };
    EventEmitter.prototype.unbind = function(events, func) {
      return null;
    };
    EventEmitter.prototype.trigger = function() {
      var args, event, events, func, _i, _j, _len, _len2, _ref, _ref2;
      events = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      _ref = events.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        if (event[0] === '.') {
          throw 'IllegalTrigger';
        }
        if (this.events[event] != null) {
          _ref2 = this.events[event];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            func = _ref2[_j];
            func[0].apply(this, args);
          }
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
