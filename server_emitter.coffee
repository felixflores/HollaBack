HollaBack = require('./holla_back')

class ServerEmitter extends HollaBack
  constructor: (io, server) ->
    @socket = new io.listen(server)

    @socket.on 'connection', (client) =>
      this.trigger('new-connection', client)
      console.log(client.sessionId + " connected")

      client.on 'message', (event) =>
        this.trigger(event.name, event.args)

  trigger: (event, args...) =>
    @socket.send { trigger: event, args: args }
    super

exports.HollaBack = HollaBack
