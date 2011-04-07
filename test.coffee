util = require('util')

EventEmitter = require('./event_emitter.js')

class EventEmitterDebug extends EventEmitter
  status: ->
    console.log('\n')
    console.log(util.inspect(@events))
    console.log('\n')
    console.log(util.inspect(@namespaces))
    console.log('\n')


myClass = new EventEmitterDebug
handler = -> 1 + 1

myClass.bind 'click.server mouse.server focus', handler
myClass.bind 'click.server', (message) -> console.log(message)
myClass.bind 'click.random', -> 3
myClass.bind 'click', -> 2
myClass.unbind 'click', handler
myClass.unbind '.random'
myClass.unbind 'click.server', handler
myClass.trigger 'click.server', ['hello world']
