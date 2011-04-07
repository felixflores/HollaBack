class ClientEmitter extends EventEmitter
  constructor: (io) ->
    @socket = new io.Socket()
    @socket.connect()
    @socket.on 'connect', -> {}
    @socket.on 'message', (event) =>
      this.trigger(event.name, event.args)

  trigger: (event, args...) =>
    @socket.send { trigger: event, args: args }
    super

window.ClientEmitter = ClientEmitter
