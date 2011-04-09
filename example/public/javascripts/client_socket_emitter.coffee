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

