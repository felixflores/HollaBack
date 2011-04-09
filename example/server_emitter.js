(function() {
  var HollaBack, ServerEmitter;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  HollaBack = require('./holla_back');
  ServerEmitter = (function() {
    __extends(ServerEmitter, HollaBack);
    function ServerEmitter(io, server) {
      this.trigger = __bind(this.trigger, this);;      this.socket = new io.listen(server);
      this.socket.on('connection', __bind(function(client) {
        this.trigger('new-connection', client);
        console.log(client.sessionId + " connected");
        return client.on('message', __bind(function(event) {
          return this.trigger(event.name, event.args);
        }, this));
      }, this));
    }
    ServerEmitter.prototype.trigger = function() {
      var args, event;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.socket.send({
        trigger: event,
        args: args
      });
      return ServerEmitter.__super__.trigger.apply(this, arguments);
    };
    return ServerEmitter;
  })();
  exports.HollaBack = HollaBack;
}).call(this);
