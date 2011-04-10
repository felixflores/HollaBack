$ = jQuery

app = new SocketEmitter(io)

$('#new-message').submit (e) ->
  e.preventDefault()

  payload = { body: $(this).find('input[type=text]').val() }
  app.trigger "message.new.client", payload

  return null

app.bind "message.new", (message) ->
  console.log message

app.bind "message.new.client", (message) ->
  console.log message
