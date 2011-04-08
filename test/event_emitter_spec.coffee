vows = require('vows')
assert = require('assert')
util = require('util')

EventEmitter = require('../event_emitter.js')
vows.describe('EventEmitter').addBatch({
  'Binding events':
    topic: new EventEmitter

    "throws an exception if the event handler is missing": (object) ->
      erroneousBinding = -> object.bind('click')
      assert.throws erroneousBinding, "MissingHandler"

  'Simple triggers':
    topic: new EventEmitter

    "can be triggered": (object) ->
      object.bind('click', -> return "Hello")
      assert.equal object.trigger('click'), "Hello"

    "does nothing if an event is triggered with no event listeners": (object) ->
      assert.deepEqual object.trigger('does-not-exists'), undefined

  'Namespacing':
    topic: new EventEmitter

    "can be namespaced": (object) ->
      object.bind('click.server', -> return "Hello")
      assert.equal object.trigger('click.server'), "Hello"

    "triggers only namespaced events and ignores listeners outside the namespace": (object) ->
      invocations = []
      handler = -> invocations.push('trigger')

      object.bind('click.server', handler)
      object.bind('click', handler)
      object.trigger('click.server')

      assert.equal(invocations.length, 1)

    "triggers all events with the same event name regardless of namespace if namespace is not specified": (object) ->
      invocations = []
      handler = -> invocations.push('trigger')

      object.bind('click.server', handler)
      object.bind('click.client', handler)
      object.bind('click', -> handler)
      object.trigger('click')

      assert.equal(invocations.length, 3)

    "triggers all events with the same event name regardless of namespace if namespace is not specified": (object) ->
      invocations = []
      handler = -> invocations.push('trigger')

      object.bind('click.server', handler)
      object.bind('click.client', handler)
      object.bind('click', handler)
      object.trigger('click')

      assert.equal(invocations.length, 3)

    # "namespaces does not have hierarchy": (object) ->
    #   invocations = []
    #   handler = -> invocations.push('trigger')

    #   object.bind('click.server.client', handler)
    #   object.bind('click.client.server', handler)
    #   object.trigger('click.server.client')

    #   assert.equal(invocations.length, 3)


}).export(module)

  # obj.bind('event-name', function)
  # obj.bind('event-name.namespace', function)
  # obj.bind('event-name1 event-name2', function)
  #
  # These are equivalent
  # obj.bind('event-name.namespace1.namespace2', function)
  # obj.bind('event-name.namespace2.namespace1', function)

  # obj.unbind('.namespace')
  # obj.unbind('event-name')
  # obj.unbind('event-name1 event-name2')
  # obj.unbind('event-name.namespace')
  # obj.unbind('.namespace1 .namespace1')
  # all accepts handler matching

