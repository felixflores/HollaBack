vows = require('vows')
assert = require('assert')
util = require('util')

EventEmitter = require('../event_emitter.js')
vows.describe('EventEmitter').addBatch({
  'Binding events':
    topic: new EventEmitter

    "throws an exception if the event handler is missing": (obj) ->
      erroneousBinding = -> obj.bind('click')
      assert.throws erroneousBinding, "BindMissingEventHandler"

  'Simple triggers':
    topic: new EventEmitter

    "can be triggered": (obj) ->
      invocations = []
      obj.bind 'click', -> invocations.push("trigger")
      obj.trigger('click')

      assert.equal invocations.length, 1

    "does nothing if an event is triggered with no event listeners": (obj) ->
      assert.equal obj.trigger('does-not-exists'), null

  'Simple unbinding':
    topic: new EventEmitter

    "unbind a single event": (obj) ->
      handler = -> return true

      obj.bind('click', handler)
      obj.unbind('click')

      assert.notEqual obj.trigger('click'), true

    "unbind a single event": (obj) ->
      handler = -> return true

      obj.bind('click', handler)
      obj.bind('click', handler)
      obj.unbind('click')

      assert.notEqual obj.trigger('click'), true

  'Namespacing':
    topic: new EventEmitter

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

    # "namespaces does not have hierarchy": (obj) ->
    #   invocations = []
    #   handler = -> invocations.push('trigger')

    #   obj.bind('click.server.client', handler)
    #   obj.bind('click.client.server', handler)
    #   obj.trigger('click.server.client')

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

