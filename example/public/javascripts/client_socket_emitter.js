(function() {
  var ClientSocketEmitter;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  ClientSocketEmitter = (function() {
    __extends(ClientSocketEmitter, HollaBack);
    function ClientSocketEmitter(io) {
      this.socket = new io.Socket();
      this.socket.connect();
      this.socket.on('connect', function() {
        return {};
      });
      this.socket.on('message', __bind(function(_event) {
        return this.trigger(_event.name, _event.args);
      }, this));
      ClientSocketEmitter.__super__.constructor.apply(this, arguments);
    }
    ClientSocketEmitter.prototype.trigger = function() {
      var args, _event;
      _event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.socket.send({
        trigger: _event,
        args: args
      });
      return ClientSocketEmitter.__super__.trigger.apply(this, arguments);
    };
    return ClientSocketEmitter;
  })();
  window.SocketEmitter = ClientSocketEmitter;
}).call(this);
