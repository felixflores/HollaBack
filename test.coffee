EventEmitter = require('./event_emitter.js')

class MyClass extends EventEmitter
  constructor: (name) ->
    @name = name
    super

myClass = new MyClass("awesome")
handler = -> 1 + 1

myClass.bind 'click', handler
myClass.bind 'click.server', handler
myClass.bind 'click.client', handler
myClass.bind 'mouseover.client', handler

