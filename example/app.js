(function() {
  var SocketEmitter, express, io, server, socket, util;
  require.paths.unshift('./lib');
  require.paths.unshift('./public/javascripts/lib');
  express = require('express');
  io = require('socket.io');
  util = require('util');
  SocketEmitter = require('server_socket_emitter');
  server = module.exports = express.createServer();
  server.configure(function() {
    server.set('views', __dirname + '/views');
    server.set('view engine', 'jade');
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(express.cookieParser());
    server.use(express.session({
      secret: 'GSBgtlYYCOMkPynSwIt3tzawqzdLSBJutYkNYYgqMOM4ukVkP'
    }));
    server.use(express.compiler({
      src: __dirname + '/public',
      enable: ['sass']
    }));
    server.use(server.router);
    return server.use(express.static(__dirname + '/public'));
  });
  server.configure('development', function() {
    return server.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  server.configure('production', function() {
    return server.use(express.errorHandler());
  });
  server.get('/', function(req, res) {
    return res.render('index', {
      title: 'Example'
    });
  });
  socket = new SocketEmitter(io, server);
  socket.bind('message.new', function(message) {
    return console.log(util.inspect(message));
  });
  socket.bind('connection.client.new', function(client) {
    return console.log(util.inspect(client));
  });
  if (!module.parent) {
    server.listen(3000);
    console.log("Express server listening on port %d", server.address().port);
  }
}).call(this);
