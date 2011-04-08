util = require('util')

EventEmitter = require('./event_emitter.js')

obj = new EventEmitter

invocations = []

funcA = -> invocations.push('trigger')
obj.bind 'click.world.server.hi', funcA
obj.bind 'click.world', funcA
obj.trigger 'click.world.server'

console.log('\n')
console.log util.inspect(obj.events)
console.log('\n')
console.log util.inspect(invocations)
console.log('\n')
