require.paths.unshift('./lib')
require.paths.unshift('./public/javascripts/lib')

express = require('express')
io      = require('socket.io')
util    = require('util')

SocketEmitter = require('server_socket_emitter')
server = module.exports = express.createServer()

server.configure ->
  server.set 'views', __dirname + '/views'
  server.set 'view engine', 'jade'
  server.use express.bodyParser()
  server.use express.methodOverride()
  server.use express.cookieParser()
  server.use express.session({ secret: 'GSBgtlYYCOMkPynSwIt3tzawqzdLSBJutYkNYYgqMOM4ukVkP' })
  server.use express.compiler({ src: __dirname + '/public', enable: ['sass'] })
  server.use server.router
  server.use express.static(__dirname + '/public')

server.configure 'development', ->
  server.use express.errorHandler({ dumpExceptions: true, showStack: true })

server.configure 'production', ->
  server.use express.errorHandler()

# Routes
server.get '/', (req, res) ->
  res.render 'index', { title: 'Example' }

# Socket
socket = new SocketEmitter(io, server)


# Events from client side gets propagated into server

socket.bind 'message.new', (message) ->
  console.log util.inspect(message)

socket.bind 'connection.client.new', (client) ->
  console.log util.inspect(client)




# Only listen on $ node app.js
if !module.parent
  server.listen 3000
  console.log "Express server listening on port %d", server.address().port
