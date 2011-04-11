(function() {
  var HollaBack;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  HollaBack = (function() {
    function HollaBack() {
      this.events = {};
    }
    HollaBack.prototype.bind = function(events, func) {
      var addEvent, eventName, handlerWithNamspace, identifiers, _event, _i, _len, _ref;
      if (!func) {
        throw "BindMissingEventHandler";
      }
      addEvent = __bind(function(_event, handlerWithNamspace) {
        if (_event.match(/^\.|^[0-9]|^$/)) {
          throw "EventNameUnacceptable";
        }
        if (this.events[_event] == null) {
          this.events[_event] = [];
        }
        this.events[_event].push(handlerWithNamspace);
        return null;
      }, this);
      _ref = events.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _event = _ref[_i];
        identifiers = _event.split('.');
        eventName = identifiers.shift();
        if (identifiers.length === 0) {
          handlerWithNamspace = [func];
        } else {
          handlerWithNamspace = [func].concat(identifiers);
        }
        addEvent(eventName, handlerWithNamspace);
      }
      return null;
    };
    HollaBack.prototype.unbind = function(events, func) {
      var eventList, eventName, eventNames, i, identifiers, matchFunction, matchNamespace, name, namespacedFunc, namespaces, _event, _i, _j, _len, _len2, _ref, _ref2;
      eventList = __bind(function() {

      var eventnames = []
      for(eventname in this.events) {
        eventnames.push(eventname);
      }
      ;        return eventnames;
      }, this);
      _ref = events.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _event = _ref[_i];
        if (_event[0] === '.') {
          namespaces = _event.split('.');
          namespaces.shift();
          eventName = '';
        } else {
          identifiers = _event.split('.');
          eventName = identifiers.shift();
          namespaces = identifiers;
        }
        if (eventName !== '' && !(func != null) && namespaces.length === 0) {
          delete this.events[eventName];
        } else {
          eventNames = eventName === '' ? eventList() : [eventName];
          for (_j = 0, _len2 = eventNames.length; _j < _len2; _j++) {
            name = eventNames[_j];
            for (i = 0, _ref2 = this.events[name].length - 1; (0 <= _ref2 ? i <= _ref2 : i >= _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
              namespacedFunc = this.events[name].shift();
              matchNamespace = this.functionInNamepspace(namespacedFunc, namespaces);
              if (func != null) {
                matchFunction = namespacedFunc[0] === func;
              } else {
                matchFunction = true;
              }
              if (!(matchNamespace && matchFunction)) {
                this.events[name].push(namespacedFunc);
              }
            }
            if (this.events[name].length === 0) {
              delete this.events[name];
            }
          }
        }
      }
      return null;
    };
    HollaBack.prototype.trigger = function() {
      var args, eventName, funcNamespace, identifiers, namespaces, _event, _i, _len, _ref;
      _event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (_event != null) {
        if (_event[0] === '.' || _event.indexOf(' ') > -1) {
          throw 'IllegalTrigger';
        }
        identifiers = _event.split('.');
        eventName = identifiers[0];
        namespaces = identifiers.slice(1, (identifiers.length - 1 + 1) || 9e9);
        if (this.events[eventName] != null) {
          _ref = this.events[eventName];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            funcNamespace = _ref[_i];
            if (this.functionInNamepspace(funcNamespace, namespaces, true)) {
              funcNamespace[0].apply(this, args);
            }
          }
        }
      }
      return null;
    };
    HollaBack.prototype.functionInNamepspace = function(listenerFunction, namespaces, strict) {
      var i, isInNameSpace;
      if (namespaces.length === 0 || listenerFunction.length === 1) {
        return true;
      }
      if (strict) {
        i = 1;
        isInNameSpace = true;
        while (i < listenerFunction.length) {
          isInNameSpace = namespaces.indexOf(listenerFunction[i]) > -1;
          if (isInNameSpace) {
            i++;
          } else {
            i = listenerFunction.length;
          }
        }
      } else {
        i = 0;
        isInNameSpace = false;
        while (i < namespaces.length && !isInNameSpace) {
          isInNameSpace = listenerFunction.indexOf(namespaces[i]) > -1;
          i++;
        }
      }
      return isInNameSpace;
    };
    return HollaBack;
  })();
  if (typeof window != "undefined" && window !== null) {
    window.HollaBack = HollaBack;
  } else {
    module.exports = HollaBack;
  }
}).call(this);
