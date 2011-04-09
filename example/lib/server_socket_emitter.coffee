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
