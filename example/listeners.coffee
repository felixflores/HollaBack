socket.bind 'message.new', (message) ->
  console.log util.inspect(message)

socket.bind 'connection.client.new', (client) ->
  console.log util.inspect(client)


