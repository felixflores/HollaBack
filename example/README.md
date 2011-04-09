Here is a sample express app where event trigger from the client
can be listened to client side and server side. Events triggered from
the server can be listened to server side and client side.


This is possible because if this:

    /lib/server_socket_emitter.coffee

    util = require('util')
    HollaBack = require('holla_back')

    class ServerSocketEmitter extends HollaBack
      constructor: (io, server) ->
        @socket = new io.listen(server)

        @socket.on 'connection', (client) =>
          this.trigger "connection.new.client", {client: client.sessionId}

          client.on 'message', (_event) =>
            this.trigger _event.trigger, _event.args

          client.on 'disconnect', =>
            this.trigger 'disconnect.client', {client: client.sessionId}

        super

      trigger: (_event, args...) ->
        @socket.broadcast { trigger: _event, args: args }
        super

    module.exports = ServerSocketEmitter

And

    /lib/client_socket_emitter.coffee

    class ClientSocketEmitter extends HollaBack
      constructor: (io) ->
        @socket = new io.Socket()
        @socket.connect()
        @socket.on 'connect', -> {}
        @socket.on 'message', (_event) =>
          this.trigger(_event.name, _event.args)

        super

      trigger: (_event, args...) ->
        @socket.send { trigger: _event, args: args }
        super

    window.SocketEmitter = ClientSocketEmitter


