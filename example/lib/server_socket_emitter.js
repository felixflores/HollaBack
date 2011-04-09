(function() {
  var HollaBack, ServerSocketEmitter, util;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  util = require('util');
  HollaBack = require('holla_back');
  ServerSocketEmitter = (function() {
    __extends(ServerSocketEmitter, HollaBack);
    function ServerSocketEmitter(io, server) {
      this.socket = new io.listen(server);
      this.socket.on('connection', __bind(function(client) {
        this.trigger("connection.new.client", {
          client: client.sessionId
        });
        client.on('message', __bind(function(_event) {
          return this.trigger(_event.trigger, _event.args);
        }, this));
        return client.on('disconnect', __bind(function() {
          return this.trigger('disconnect.client', {
            client: client.sessionId
          });
        }, this));
      }, this));
      ServerSocketEmitter.__super__.constructor.apply(this, arguments);
    }
    ServerSocketEmitter.prototype.trigger = function() {
      var args, _event;
      _event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.socket.broadcast({
        trigger: _event,
        args: args
      });
      return ServerSocketEmitter.__super__.trigger.apply(this, arguments);
    };
    return ServerSocketEmitter;
  })();
  module.exports = ServerSocketEmitter;
}).call(this);
