# HollaBack

HollaBack is an event emitter written in Coffee Script. All examples are written in Coffee Script.

## Usage

To include in browser

    <script src="holla_back.js"></script>

To include in nodejs

    HollaBack = require('./holla_back')

Then you can create a class which extends HollaBack

HollaBack = require('./holla_back')

    class SomethingAwesome extends HollaBack

    obj = new SomethingAwesome
    obj.bind 'myEvent', -> 1 + 1
    obj.trigger 'myEvent'
    obj.unbind 'myEvent'


See test cases for more examples

