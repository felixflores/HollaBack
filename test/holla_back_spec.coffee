vows = require('vows')
assert = require('assert')

HollaBack = require('../holla_back.js')


vows.describe('EventEmitter').addBatch({
  'Binding events':
    topic: new HollaBack

    "throws an exception if the event handler is missing": (obj) ->
      erroneousBinding = -> obj.bind('change')
      assert.throws erroneousBinding, "BindMissingEventHandler"

    "throws an exception if event name contains a dot (.)": (obj) ->
      erroneousBinding = -> obj.bind('.event', -> 1)
      assert.throws erroneousBinding, "EventNameUnacceptable"

    "throws an exception if event name begins with a number": (obj) ->
      erroneousBinding = -> obj.bind('123change', -> 1)
      assert.throws erroneousBinding, "EventNameUnacceptable"



  'Simple triggers':
    topic: new HollaBack

    "can be triggered": (obj) ->
      invocations = []
      obj.bind 'change', -> invocations.push("trigger")
      obj.trigger('change')

      assert.equal invocations.length, 1

    "does nothing if an event is triggered with no event listeners": (obj) ->
      assert.equal obj.trigger('does-not-exists'), null



  'Simple unbinding':
    topic: new HollaBack

    "a single event": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('change', handler)
      obj.unbind('change')
      obj.trigger('change')

      assert.equal invocations.length, 0

    "a namespace": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('change.client', handler)
      obj.bind('explode.client', handler)
      obj.unbind('.client', handler)

      obj.trigger('change')
      obj.trigger('explode')

      assert.equal invocations.length, 0

    "a handler of an event": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind 'change', handler
      obj.bind 'change', -> invocations.push('awesome')
      obj.unbind 'change', handler
      obj.trigger('change')

      assert.equal invocations[0], 'awesome'

    "a handler of a namespace": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind 'change.world.hello', handler
      obj.bind 'change.world', handler
      obj.bind 'change.world', -> invocations.push('awesome')
      obj.unbind '.world', handler
      obj.trigger('change')

      assert.equal invocations[0], 'awesome'

  'Multi Namespaced Unbinding':
    topic: new HollaBack

    "unbinds an event if it matches a namespace": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind 'change.the.world', handler
      obj.unbind '.the', handler
      obj.trigger 'change'

      assert.equal invocations.length, 0



  'Simple Namespacing':
    topic: new HollaBack

    "can be namespaced": (obj) ->
      invocations = []
      obj.bind 'change.server', -> invocations.push("trigger")
      obj.trigger('change.server')

      assert.equal invocations.length, 1

    "triggers only namespaced events and generically bound events if a namespaced event is triggered": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('change.server', handler)
      obj.bind('change', handler)
      obj.trigger('change.server')

      assert.equal(invocations.length, 2)

    "triggers all events with the same event name regardless of namespace if namespace is not specified": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('change.server', handler)
      obj.bind('change.client', handler)
      obj.bind('change', handler)
      obj.trigger('change')

      assert.equal(invocations.length, 3)



  'Multi Namespaced Trigger':
    topic: new HollaBack

    "does not have hierarchy": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('change.server.client', handler)
      obj.bind('change.client.server', handler)
      obj.trigger('change.server.client')

      assert.equal(invocations.length, 2)

    "must match all trigger namespaces in order to be triggered": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('change.server.client', handler)
      obj.bind('change.client', handler)
      obj.trigger('change.server.client')

      assert.equal(invocations.length, 1)


}).export(module)
