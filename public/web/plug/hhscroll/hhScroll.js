
// ==============================================
//  jQuery Plugin
//  Author : Eric
//  Version : 1.0.0
//  Copyright : www.houheaven.com
//  Date : 2013-08-09
//
//  功能说明：图片切换器，支持移动端手指滑动切换
// ==============================================

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	// t: current time, b: begInnIng value, c: change In value, d: duration

	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});




// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){

	var // Number of pixels a pressed pointer travels before movestart
	    // event is fired.
	    threshold = 6,
	
	    add = jQuery.event.add,
	
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    // Shim for requestAnimationFrame, falling back to timer. See:
	    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    requestFrame = (function(){
	    	return (
	    		window.requestAnimationFrame ||
	    		window.webkitRequestAnimationFrame ||
	    		window.mozRequestAnimationFrame ||
	    		window.oRequestAnimationFrame ||
	    		window.msRequestAnimationFrame ||
	    		function(fn, element){
	    			return window.setTimeout(function(){
	    				fn();
	    			}, 25);
	    		}
	    	);
	    })(),
	    
	    ignoreTags = {
	    	textarea: true,
	    	input: true,
	    	select: true,
	    	button: true
	    },
	    
	    mouseevents = {
	    	move: 'mousemove',
	    	cancel: 'mouseup dragstart',
	    	end: 'mouseup'
	    },
	    
	    touchevents = {
	    	move: 'touchmove',
	    	cancel: 'touchend',
	    	end: 'touchend'
	    };


	// Constructors
	
	function Timer(fn){
		var callback = fn,
		    active = false,
		    running = false;
		
		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}
		
		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};
		
		this.end = function(fn) {
			var cb = callback;
			
			if (!fn) { return; }
			
			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } : 
					fn ;
				
				active = true;
			}
		};
	}


	// Functions
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function preventDefault(e) {
		e.preventDefault();
	}
	
	function preventIgnoreTags(e) {
		// Don't prevent interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }
		
		e.preventDefault();
	}

	function isLeftButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}
		
		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...
		
		i = -1;
		l = touchList.length;
		
		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered
	
	function mousedown(e){
		var data;

		if (!isLeftButton(e)) { return; }

		data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: e.timeStamp
		};

		add(document, mouseevents.move, mousemove, data);
		add(document, mouseevents.cancel, mouseend, data);
	}

	function mousemove(e){
		var data = e.data;

		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e) {
		removeMouse();
	}

	function removeMouse() {
		remove(document, mouseevents.move, mousemove);
		remove(document, mouseevents.cancel, mouseend);
	}

	function touchstart(e) {
		var touch, template;

		// Don't get in the way of interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		touch = e.changedTouches[0];
		
		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		template = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		};

		// Use the touch identifier as a namespace, so that we can later
		// remove handlers pertaining only to this touch.
		add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
		add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
	}

	function touchmove(e){
		var data = e.data,
		    touch = changedTouch(e, data);

		if (!touch) { return; }

		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e) {
		var template = e.data,
		    touch = identifiedTouch(e.changedTouches, template.identifier);

		if (!touch) { return; }

		removeTouch(template.identifier);
	}

	function removeTouch(identifier) {
		remove(document, '.' + identifier, touchmove);
		remove(document, '.' + identifier, touchend);
	}


	// Logic for deciding when to trigger a movestart.

	function checkThreshold(e, template, touch, fn) {
		var distX = touch.pageX - template.startX,
		    distY = touch.pageY - template.startY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, template, touch, distX, distY, fn);
	}

	function handled() {
		// this._handled should return false once, and after return true.
		this._handled = returnTrue;
		return false;
	}

	function flagAsHandled(e) {
		e._handled();
	}

	function triggerStart(e, template, touch, distX, distY, fn) {
		var node = template.target,
		    touches, time;

		touches = e.targetTouches;
		time = e.timeStamp - template.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		template.type = 'movestart';
		template.distX = distX;
		template.distY = distY;
		template.deltaX = distX;
		template.deltaY = distY;
		template.pageX = touch.pageX;
		template.pageY = touch.pageY;
		template.velocityX = distX / time;
		template.velocityY = distY / time;
		template.targetTouches = touches;
		template.finger = touches ?
			touches.length :
			1 ;

		// The _handled method is fired to tell the default movestart
		// handler that one of the move events is bound.
		template._handled = handled;
			
		// Pass the touchmove event so it can be prevented if or when
		// movestart is handled.
		template._preventTouchmoveDefault = function() {
			e.preventDefault();
		};


		// Trigger the movestart event.
		trigger(template.target, template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(template.identifier);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e) {
		var timer = e.data.timer;

		e.data.touch = e;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeMouseend(e) {
		var event = e.data.event,
		    timer = e.data.timer;
		
		removeActiveMouse();

		endEvent(event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				remove(event.target, 'click', returnFalse);
			}, 0);
		});
	}

	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove);
		remove(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		e.data.touch = touch;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeTouchend(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(event);
		endEvent(event, timer);
	}

	function removeActiveTouch(event) {
		remove(document, '.' + event.identifier, activeTouchmove);
		remove(document, '.' + event.identifier, activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;

		event.type = 'move';
		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;
		
		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;
	}

	function endEvent(event, timer, fn) {
		timer.end(function(){
			event.type = 'moveend';

			trigger(event.target, event);
			
			return fn && fn();
		});
	}



	// jQuery special event definition


	function setup(data, namespaces, eventHandle) {
		// Stop the node from being dragged
		//add(this, 'dragstart.move drag.move', preventDefault);
		
		// Prevent text selection and touch interface scrolling
		//add(this, 'mousedown.move', preventIgnoreTags);
		
		// Tell movestart default handler that we've handled this
		add(this, 'movestart.move', flagAsHandled);

		// Don't bind to the DOM. For speed.
		return true;
	}
	
	
	function teardown(namespaces) {
		remove(this, 'dragstart drag', preventDefault);
		remove(this, 'mousedown touchstart', preventIgnoreTags);
		remove(this, 'movestart', flagAsHandled);
		
		// Don't bind to the DOM. For speed.
		return true;
	}
	
	
	function addMethod(handleObj) {
		// We're not interested in preventing defaults for handlers that
		// come from internal move or moveend bindings
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		// Stop the node from being dragged
		add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);
		
		// Prevent text selection and touch interface scrolling
		add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
	}
	
	
	
	function removeMethod(handleObj) {
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
		remove(this, 'mousedown.' + handleObj.guid);
	}
	
	
	
	
	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,
		add: addMethod,
		remove: removeMethod,

		_default: function(e) {
			var event, data;
			
			
			// If no move events were bound to any ancestors of this
			// target, high tail it out of here.
			if (!e._handled()) { return; }


			function update(time) {
				updateEvent(event, data.touch, data.timeStamp);
				trigger(e.target, event);
			}


			event = {
				target: e.target,
				startX: e.startX,
				startY: e.startY,
				pageX: e.pageX,
				pageY: e.pageY,
				distX: e.distX,
				distY: e.distY,
				deltaX: e.deltaX,
				deltaY: e.deltaY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				timeStamp: e.timeStamp,
				identifier: e.identifier,
				targetTouches: e.targetTouches,
				finger: e.finger
			};

			data = {
				event: event,
				timer: new Timer(update),
				touch: undefined,
				timeStamp: undefined
			};
			
			if (e.identifier === undefined) {
				// We're dealing with a mouse
				// Stop clicks from propagating during a move
				add(e.target, 'click', returnFalse);
				add(document, mouseevents.move, activeMousemove, data);
				add(document, mouseevents.end, activeMouseend, data);
			}
			else {
				// We're dealing with a touch. Stop touchmove doing
				// anything defaulty.
				e._preventTouchmoveDefault();
				add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
				add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
			}
		}
	};


	jQuery.event.special.move = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.move', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.move', jQuery.noop);
		}
	};
	
	jQuery.event.special.moveend = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.moveend', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.moveend', jQuery.noop);
		}
	};


	add(document, 'mousedown.move', mousedown);
	add(document, 'touchstart.move', touchstart);


	// Make jQuery copy touch event properties over to the jQuery event
	// object, if they are not already listed. But only do the ones we
	// really need. IE7/8 do not have Array#indexOf(), but nor do they
	// have touch events, so let's assume we can ignore them.
	if (typeof Array.prototype.indexOf === 'function') {
		(function(jQuery, undefined){
			var props = ["changedTouches", "targetTouches"],
			    l = props.length;
			
			while (l--) {
				if (jQuery.event.props.indexOf(props[l]) === -1) {
					jQuery.event.props.push(props[l]);
				}
			}
		})(jQuery);
	};
});



// =========================================================================================================

function Slider(container,option)
{
	// 参数设置
	opt={
		width:900,			// 宽度，默认 400px
		height:400,			// 高度，默认 200px
		shadowX:0,			// 阴影效果
		shadowY:0,
		shadowWidth:3,
		shadowColor:"rgba(0,0,0,0.3)",
		borderWidth:5,		// 边框效果
		borderStyle:"solid",
		borderColor:"#fff",
		borderRadius:3,
		enableSwipe:false,	// 手指滑动，默认 false
		autoScroll:true,	// 自动切换，默认 true
		scrollTime:500,		// 切换时间，默认 0.5s
		scrollLife:3500,	// 切换周期，默认 3.5s
		scrollEase:"",		// 切换效果，默认 无
		debug:false,		// 调试功能，默认 关闭
		navbar:true,		// 导航栏显示，默认 显示
		navbarPosX:"right",	// 导航栏水平方向位置，默认 右边
		navbarHeight:30,	// 导航栏高度
		navbarColor:"",		// 导航栏颜色
		navbarStyle:"img01",// 导航栏样式设置，默认 圆点
		navbarOuter:false,	// 导航栏是否外凸，默认 内嵌
		controlor:true,		// 控制栏设置
		controlorOuter:false,
		controlorStyle:"ctrl01"
	};
	$.extend(opt,option);
	
	var img_num;
	var img_pidx;
	var img_cidx=0;
	var img_nidx;
	var timer;
	var autoScroll=opt.autoScroll;
	var scrolltime=opt.scrollTime;
	var scrolllife=opt.scrollLife;
	var scrollEase=opt.scrollEase;
	var slides,btnPrev,btnNext;


	// ========================================================================================
	
	
	// 初始化一：切换器的根元素样式
	$(container).addClass("hhscroll");
	$(container).css({"width":(opt.width+opt.borderWidth*2)+"px","height":(opt.height+opt.borderWidth*2)+"px",});
	
	
	// 错误检测一：切换器里必须有图片
	img_num=$(container).children("div").length;
	if(img_num==0)
	{
		$(container).append("<div class='hhError'><img src='http://www.houheaven.com/home/portrait_60x60.png' />出错，检测不到图片！</div>");
		$(container).find(".hhError").css({lineHeight:opt.height+"px"});
		return;
	}
	
	
	
	// 初始化二：切换器的图片样式
	$(container).children().wrapAll("<div class='hhWrapper'></div>");
	$(container).find(".hhWrapper").css({
		"width":opt.width+"px","height":opt.height+"px",
		"borderRadius":opt.borderRadius+"px",
		"boxShadow":opt.shadowX+"px "+opt.shadowY+"px "+opt.shadowWidth+"px "+opt.shadowColor,
		"border":opt.borderWidth+"px "+opt.borderStyle+" "+opt.borderColor});
	slides=$(container).children(".hhWrapper").children("div");
	slides.css({left:"100%"}).eq(0).css({left:"0"});
	
	// 为图片绑定事件：鼠标、手指左右滑动
	$(document).on("dragstart",function(){return false;});	// 防止图片拖动
	if(opt.enableSwipe)
	{
		slides.bind("movestart",function(e){});
		slides.bind("moveend",function(e){
			Pause();
			Index=$(this).index();
			if(e.distX<-100)
			{
				if(Index==img_num-1)
					scrollto(0);
				else
					scrollto(Index+1);
			}
			if(e.distX>100)
			{
				if(Index==0)
					scrollto(img_num-1);
				else
					scrollto(Index-1);
			}
			if(autoScroll) Start();
		});
	}
	
	
	
	// 错误检测二：切换器里只有一张图片，取消切换
	if(img_num==1) return;
	
	// 错误检测三：切换器里只有两张图片
	if(img_num==2) return;
	
	
	
	// 初始化三：切换器的导航滑块
	if(opt.navbar)
	{
		$(container).append("<div class='hhNavbar'><ul></ul></div>");
		var navbarWrap=$(container).find(".hhNavbar");
		var navbar=navbarWrap.find("ul");
		for(i=0;i<img_num;i++)
			navbar.append("<li>"+(i+1)+"</li>");
		navbar.find("li").eq(0).addClass("selected");
		navbar.find("li").click(function(){
			Pause();
			scrollto($(this).index());
			if(autoScroll) Start();
		});
		if(opt.navbarStyle=="num03")
		{
			navbar.find("li").unbind("click");
			navbarWrap.append("<span class='line'>/</span><span class='img_nums'>"+img_num+"</span>");
		}
		
		// 导航栏的位置
		switch(true)
		{
			case opt.navbarPosX =="left" : navbarWrap.addClass("horLeft"); break;
			case opt.navbarPosX =="right" : navbarWrap.addClass("horRight"); break;
			case opt.navbarPosX =="center" : navbarWrap.addClass("horCenter"); break;
			default: navbarWrap.addClass("horRight");
		}
		
		// 导航栏的样式
		switch(true)
		{
			case opt.navbarStyle =="img01" : navbarWrap.addClass("img01"); break;
			case opt.navbarStyle =="img02" : navbarWrap.addClass("img02"); break;
			case opt.navbarStyle =="img03" : navbarWrap.addClass("img03"); break;
			case opt.navbarStyle =="img04" : navbarWrap.addClass("img04"); break;
			case opt.navbarStyle =="num01" : navbarWrap.addClass("num01"); opt.navbarHeight=30; break;
			case opt.navbarStyle =="num02" : navbarWrap.addClass("num02"); opt.navbarHeight=40; break;
			case opt.navbarStyle =="num03" : navbarWrap.addClass("num03"); opt.navbarHeight=60; break;
			default: navbarWrap.addClass("img01");
		}
		
		// 导航栏外凸
		navbarHeight=navbarWrap.find("ul").height();
		navbarWrap.find("ul").css({margin:(opt.navbarHeight-navbarHeight)/2});
		navbarWrap.css({width:opt.width,height:opt.navbarHeight,left:opt.borderWidth,background:opt.navbarColor});
		if(opt.navbarOuter)
			navbarWrap.css({bottom:-opt.navbarHeight});
		else
			navbarWrap.css({bottom:opt.borderWidth});
	}
	
	
	
	// 初始化四：切换器的控制面板
	if(opt.controlor)
	{
		$(container).append("<div class='hhPrev'></div>");
		$(container).append("<div class='hhNext'></div>");
		btnPrev=$(container).find(".hhPrev");
		btnNext=$(container).find(".hhNext");
		btnPrev.click(function(){ Pause(); Prev(); if(autoScroll) Start(); });
		btnNext.click(function(){ Pause(); Next(); if(autoScroll) Start(); });
		
		// 添加样式
		switch(true)
		{
			case opt.controlorStyle=="ctrl01": btnPrev.addClass("ctrl01"); btnNext.addClass("ctrl01"); break;
			case opt.controlorStyle=="ctrl02": btnPrev.addClass("ctrl02"); btnNext.addClass("ctrl02"); break;
			case opt.controlorStyle=="ctrl03": btnPrev.addClass("ctrl03"); btnNext.addClass("ctrl03"); break;
			default: btnPrev.addClass("ctrl01"); btnNext.addClass("ctrl01");
		}
		
		// 设置位置
		if(opt.controlorOuter)
		{
			$(container).on("mouseenter",function(){ btnPrev.stop().animate({opacity:1,left:-60}); btnNext.stop().animate({opacity:1,right:-60}); });
			$(container).on("mouseleave",function(){ btnPrev.stop().animate({opacity:0,left:0}); btnNext.stop().animate({opacity:0,right:0}); });
		}
		else
		{
			$(container).on("mouseenter",function(){ btnPrev.stop().animate({opacity:1,left:10}); btnNext.stop().animate({opacity:1,right:10}); });
			$(container).on("mouseleave",function(){ btnPrev.stop().animate({opacity:0,left:-20}); btnNext.stop().animate({opacity:0,right:-20}); });
		}
	}
	
	
	
	// 调试功能
	if(opt.debug)
	{
		$(container).append("<div class='hhDebug'></div>");
		debuginfo("Image Index: "+img_cidx);
	}
	
	function debuginfo(str)
	{
		$(container).find(".hhDebug").text(str);
	}
	
	
	
	// 开启自动切换功能	
	if(opt.autoScroll){	Start(); }
	
	
	// ========================================================================================
	
	
	function Start(){ timer=setInterval(Next,scrolllife); }
	function Pause(){ clearInterval(timer); }
	function Prev(){ Scroll("right"); }
	function Next(){ Scroll("left"); }
	
	function Scroll(dir)
	{
		dir=dir||"left";
		img_pidx=img_cidx-1;
		img_nidx=img_cidx+1;
		
		if(dir=="left")
		{			
			if(img_cidx==0) img_pidx=img_num-1;
			if(img_cidx==img_num-1) img_nidx=0;
			
			slides.eq(img_cidx).animate({left:"-100%"},scrolltime,scrollEase);
			slides.eq(img_nidx).css({left:"100%"}).animate({left:"0%"},scrolltime,scrollEase);
			img_cidx++;
			
			if(img_cidx==img_num){img_cidx=0;}
		}
		if(dir=="right")
		{			
			if(img_cidx==0)	img_pidx=img_num-1;
			if(img_cidx==img_num-1) img_nidx=0;
			
			slides.eq(img_pidx).css({left:"-100%"}).animate({left:"0%"},scrolltime,scrollEase);
			slides.eq(img_cidx).animate({left:"100%"},scrolltime,scrollEase);
			
			img_cidx--;
			if(img_cidx==-1) img_cidx=img_num-1;
		}
		
		$(container).find(".hhDebug").text(img_cidx);
		$(container).find(".hhNavbar>ul>li").removeClass("selected").eq(img_cidx).addClass("selected");
	}
	
	
	function scrollto(idx)
	{
		img_cidx=idx;
		$(container).find(".hhNavbar>ul>li").removeClass("selected").eq(idx).addClass("selected");
		
		$(container).find(".hhWrapper>div:eq("+idx+")").animate({left:"0"},scrolltime,scrollEase);
		$(container).find(".hhWrapper>div:gt("+idx+")").animate({left:"100%"},scrolltime,scrollEase);
		$(container).find(".hhWrapper>div:lt("+idx+")").animate({left:"-100%"},scrolltime,scrollEase);
	}
	
	
	// ====================================================================================
}

$.fn.hhscroll=function(opt){ return this.each(function(){ new Slider(this,opt); }); }