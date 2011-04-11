util = require('util')

EventEmitter = require('./holla_back.js')

obj = new EventEmitter

invocations = []

handler = -> invocations.push('trigger')

obj.bind('change.client.server', handler)
obj.bind('change.client', handler)
obj.bind('explode', handler)

console.log('\n')
console.log util.inspect(obj.events)
