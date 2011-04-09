(function() {
  socket.bind('message.new', function(message) {
    return console.log(util.inspect(message));
  });
  socket.bind('connection.client.new', function(client) {
    return console.log(util.inspect(client));
  });
}).call(this);
