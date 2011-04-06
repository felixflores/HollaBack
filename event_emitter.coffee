util = require('util')

class EventEmitter
  constructor: () ->
    @namespaces = {}
    @events = {}
    @functions = []

  # obj.bind('event-name', function)
  # obj.bind('event-name.namespace', function)
  # obj.bind('event-name1 event-name2', function)
  #
  # These are equivalent
  # obj.bind('event-name.namespace1.namespace2', function)
  # obj.bind('event-name.namespace2.namespace1', function)
  bind: (events, func) ->
    events = events.split(' ')

    # push function into function array if it has not yet been defined
    @functions.push func if @functions.indexOf(func) is -1

    # reference function in event array
    for event in events
      eventNameSpace = event.split('.')

      if eventNameSpace.length > 1
        eventname = eventNameSpace[0]
        namespaces = eventNameSpace[1..eventNameSpace.length]
      else
        eventname = eventNameSpace

      @events[eventname] = [] if not @events[eventname]?
      @events[eventname].push(@functions.indexOf(func))

      # namespace
      if namespaces?
        for namespace in namespaces
          @namespaces["." + namespace] = [] if not @namespaces[namespace]?
          @namespaces["." + namespace].push eventname

    util.log("functions: " + util.inspect(@functions))
    util.log("events: " + util.inspect(@events))
    util.log("namespaces: " + util.inspect(@namespaces))

    return false


  # obj.unbind('.namespace')
  # obj.unbind('event-name')
  # obj.unbind('event-name1 event-name2')
  # obj.unbind('.event-name', function)
  unbind: (identifier, func) ->
    if identifier[0] is '.'
      return if not @namespaces[identifier]?

      for events in @namespaces[identifier]
        for event in events
          @events[event]

      delete @namespaces[identifier]
    else
      return if not @events[identifier]?

    # if func? and func in @events[event]
    #   delete @event[event]
    # else
    #   delete @events[event]


  # obj.trigger('event-name', [args...])
  # obj.trigger('event-name.namespace', [args...])
  # obj.trigger('event-name.namespace1 event-name.namespace2', [args...])
  trigger: (event, args...) ->
    return if not @events[event]?

    for func in @events[event]
      do (func) ->
        func.apply(this, args...)

if window?
  window.EventEmitter = EventEmitter
else
  module.exports = EventEmitter
