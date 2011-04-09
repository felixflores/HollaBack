(function() {
  var $, app;
  $ = jQuery;
  app = new SocketEmitter(io);
  $('#new-message').submit(function(e) {
    var payload;
    e.preventDefault();
    payload = {
      body: $(this).find('input[type=text]').val()
    };
    app.trigger("message.new.client", payload);
    return null;
  });
  app.bind("message.new", function(message) {
    return console.log(message);
  });
  app.bind("message.new.client", function(message) {
    return console.log(message + 'crap');
  });
}).call(this);
