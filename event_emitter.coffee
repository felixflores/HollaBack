class EventEmitter
  constructor: () ->
    @events = {}

  bind: (event, func) ->
    @events[event] = [] if not @events[event]?
    @events[event].push func

  unbind: (event, func) ->
    return if not @events[event]?

    if func? and @events[event] == func
      delete @event[event]
    else
      delete @events[event]

  trigger: (event, args...) ->
    return if not @events[event]?

    for func in @events[event]
      do (func) ->
        func.apply(this, args...)

module.exports = EventEmitter if module? and ("exports" of module)
