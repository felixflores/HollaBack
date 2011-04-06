EventEmitter = require('./event_emitter.js')

class MyClass extends EventEmitter
  constructor: (name) ->
    @name = name
    super

myClass = new MyClass("awesome")

myClass.bind 'event', -> console.log('custom event')
myClass.trigger('event')
myClass.unbind('event')
myClass.trigger('event')
