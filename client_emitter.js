(function() {
  var ClientEmitter;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  ClientEmitter = (function() {
    __extends(ClientEmitter, EventEmitter);
    function ClientEmitter(io) {
      this.trigger = __bind(this.trigger, this);;      this.socket = new io.Socket();
      this.socket.connect();
      this.socket.on('connect', function() {
        return {};
      });
      this.socket.on('message', __bind(function(event) {
        return this.trigger(event.name, event.args);
      }, this));
    }
    ClientEmitter.prototype.trigger = function() {
      var args, event;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.socket.send({
        trigger: event,
        args: args
      });
      return ClientEmitter.__super__.trigger.apply(this, arguments);
    };
    return ClientEmitter;
  })();
  window.ClientEmitter = ClientEmitter;
}).call(this);
