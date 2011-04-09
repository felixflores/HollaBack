vows = require('vows')
assert = require('assert')

HollaBack = require('../holla_back.js')


vows.describe('EventEmitter').addBatch({
  'Binding events':
    topic: new HollaBack

    "throws an exception if the event handler is missing": (obj) ->
      erroneousBinding = -> obj.bind('click')
      assert.throws erroneousBinding, "BindMissingEventHandler"

    "throws an exception if event name contains a dot (.)": (obj) ->
      erroneousBinding = -> obj.bind('.event', -> 1)
      assert.throws erroneousBinding, "EventNameUnacceptable"

    "throws an exception if event name begins with a number": (obj) ->
      erroneousBinding = -> obj.bind('123click', -> 1)
      assert.throws erroneousBinding, "EventNameUnacceptable"



  'Simple triggers':
    topic: new HollaBack

    "can be triggered": (obj) ->
      invocations = []
      obj.bind 'click', -> invocations.push("trigger")
      obj.trigger('click')

      assert.equal invocations.length, 1

    "does nothing if an event is triggered with no event listeners": (obj) ->
      assert.equal obj.trigger('does-not-exists'), null


  'Simple unbinding':
    topic: new HollaBack

    "a single event": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('click', handler)
      obj.unbind('click')
      obj.trigger('click')

      assert.equal invocations.length, 0

    "a namespace": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('click.client', handler)
      obj.bind('explode.client', handler)
      obj.unbind('.client', handler)

      obj.trigger('click')
      obj.trigger('explode')

      assert.equal invocations.length, 0

    "a handler or an event": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind 'click', handler
      obj.bind 'click', -> invocations.push('awesome')
      obj.unbind 'click', handler
      obj.trigger('click')

      assert.equal invocations[0], 'awesome'

    "a handler in a namespace": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind 'click.world.hello', handler
      obj.bind 'explode.world', handler
      obj.bind 'click.world', -> invocations.push('awesome')
      obj.unbind '.world', handler
      obj.trigger('click')

      assert.equal invocations[0], 'awesome'



  'Namespacing':
    topic: new HollaBack

    "can be namespaced": (obj) ->
      invocations = []
      obj.bind('click.server', -> return "Hello")
      obj.bind 'click.server', -> invocations.push("trigger")
      obj.trigger('click.server')

      assert.equal invocations.length, 1

    "triggers only namespaced events and ignores listeners outside the namespace": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('click.server', handler)
      obj.bind('click', handler)
      obj.trigger('click.server')

      assert.equal(invocations.length, 1)

    "triggers all events with the same event name regardless of namespace if namespace is not specified": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('click.server', handler)
      obj.bind('click.client', handler)
      obj.bind('click', -> handler)
      obj.trigger('click')

      assert.equal(invocations.length, 3)

    "triggers all events with the same event name regardless of namespace if namespace is not specified": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('click.server', handler)
      obj.bind('click.client', handler)
      obj.bind('click', handler)
      obj.trigger('click')

      assert.equal(invocations.length, 3)

    "namespaces does not have hierarchy": (obj) ->
      invocations = []
      handler = -> invocations.push('trigger')

      obj.bind('click.server.client', handler)
      obj.bind('click.client.server', handler)
      obj.trigger('click.server.client')

      assert.equal(invocations.length, 2)


}).export(module)
