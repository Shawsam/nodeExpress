﻿; (function () {

    // 事件代理
    function Event() {
        this.events = {};
    }

    Event.prototype = {
        on: function (eventType, handler) {

            if (eventType == null)
                throw new Error('Event::eventType undefine');

            if (eventType.indexOf(',') > -1) {
                var that = this,
                    eventTypeList = eventType.split(',');

                eventTypeList.forEach(function (name) {
                    if ((name = name.trim()) !== '') that.on(name, handler);
                });
            } else {
                if (!(eventType in this.events))
                    this.events[eventType] = [];

                if ($.isFunction(handler))
                    this.events[eventType].push(handler);
            }
            return this;
        },
        off: function (eventType, handler) {

            if (!(eventType in this.events))
                return;

            if (handler == null) {
                delete this.events[eventType];
                return; 
            }

            var i, l, h, handlers = this.events[eventType];

            for (i = 0, l = handlers.length; i < l; i++) {

                if ((h = handlers[i]) == handler)
                    handlers.splice(i, 1);
            }
            return this;
        },
        trigger: function (eventType, data) {

            if (eventType == null)
                throw new Error('Event::eventType undefine');

            this.currentEventType = eventType;

            var i, l, returnValue, handlers = this.events[eventType];
            console.log('trigger ' + eventType);

            if (handlers) {
                for (i = 0, l = handlers.length; i < l; i++) {
                    returnValue = handlers[i].apply(this, data);

                    if (returnValue != null && returnValue !== true)
                        return returnValue;
                }
            }
            return this;
        }
    };

    if (typeof window.define !== 'undefined') {
        define(function (require, exports, module) {
            module.exports = exports = Event;
        });
    } else {
        window.EventProxy = Event;
    }
})();
