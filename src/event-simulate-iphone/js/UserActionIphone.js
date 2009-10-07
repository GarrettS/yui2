
/**
 * DOM event simulation utility
 * @module event-simulate-iphone
 * @namespace YAHOO.util
 * @requires yahoo
 */

/**
 * Augment UserAction with iphone events.
 * @namespace YAHOO.util
 * @class UserAction
 * @see http://developer.apple.com/safari/library/documentation/AppleApplications/Reference/SafariJSRef/GestureEvent/GestureEvent.html
 */
if(typeof document.createTouchList !== "undefined") {
    (function(){
        // Public export.
        YAHOO.util.UserActionIphone = {
            /* @param {Node} target an HTMLElement or Document.
             * @param {Object} options see 
             * http://developer.apple.com/safari/library/documentation/AppleApplications/Reference/SafariJSRef/DocumentAdditions/DocumentAdditions.html 
             */
            touchstart : function(target, options) {
                return fireTouchEvent("touchstart", target, options);
            },
            touchmove : function(target, options) {
                return fireTouchEvent("touchmove", target, options);
            },
            touchend : function(target, options) {
                return fireTouchEvent("touchend", target, options);
            },
            touchcancel : function(target, options) {
                return fireTouchEvent("touchcancel", target, options);
            }
        };
        
        // Private static methods.
        function createTouchList(touchObjectDataArray) {
            var i, 
                len = touchObjectDataArray.length,
                doc,
                target,
                touch,
                touches = [],
                touchList;
            if(!len) {
                if("target" in touchObjectDataArray) {
                    target = touchObjectDataArray.target;
                    touchObjectDataArray = [touchObjectDataArray];
                    len = 1;
                } else {
                    throw TypeError("createTouchList called with incompatible argument.");
                }
            }
            for(i = 0; i < len; i++) {
                touchObjectData = touchObjectDataArray[i];
                target = touchObjectData.target;
                doc = target.ownerDocument || target.document || target;
                touch = doc.createTouch(
                        doc.defaultView,
                        target,
                        touchObjectData.identifier||0,
                        touchObjectData.pageX||0,
                        touchObjectData.pageY||0,
                        touchObjectData.screenX||0,
                        touchObjectData.screenY||0);
                touches.push(touch);
            }

            // Invoke document.createTouchList [[Call]] indirectly ("Host" object).
            var fnApply = simulateTouchEvent.apply;
            touchList = fnApply.apply(doc.createTouchList, [doc, touches]);
            return touchList;
        }
    
        function fireTouchEvent(type, target, options){
            var c = new TouchEventData(target, options),
                doc = target.ownerDocument || target.document || target;
            //setup default values.

            if (!doc || !doc.createTouch) {
                throw TypeError("simulateTouchEvent(): Invalid target.");
            }

            return simulateTouchEvent(doc,
                    target, type, c.bubbles, c.cancelable, c.view,
                    c.detail,  // Not sure what this does in "touch" event.
                    c.screenX, c.screenY, c.pageX, c.pageY,
                    c.ctrlKey, c.altKey, c.shiftKey, c.metaKey,
                    c.touches, c.targetTouches, c.changedTouches, c.scale, c.rotation);
        }
        
        function simulateTouchEvent(doc, target, type, bubbles, cancelable, view,
                detail, screenX, screenY, pageX, pageY, ctrlKey, altKey,
                shiftKey, metaKey, touches, targetTouches, changedTouches,
                                                            scale, rotation) {
            var canceled = false, touchEvent;

            // check event type
            type = "" + type.toLowerCase();

            touchEvent = doc.createEvent("TouchEvent");
            if (typeof touchEvent.initTouchEvent == "function") {
                touchEvent.initTouchEvent(type, bubbles, cancelable, view,
                        detail, screenX, screenY, pageX, pageY, ctrlKey,
                        altKey, shiftKey, metaKey, touches, targetTouches,
                        changedTouches, scale, rotation);
                // fire the event
                canceled = target.dispatchEvent(touchEvent);
            }
            return canceled;
        }
        
        function TouchEventData(target, options) {
            if(options) {
                YAHOO.lang.augmentObject(this, options);
            }
            var doc = target.ownerDocument || target.document || target;
            this.target = target;
            this.bubbles = ("bubbles" in this) ? !!this.bubbles : true; 
            this.cancelable = ("cancelable" in this) ? !!this.cancelable : true;
            this.view = this.view||doc.defaultView;
            this.detail = +this.detail||1;  // Not sure what this does in "touch" event.
            this.screenX = +this.screenX||0;
            this.screenY = +this.screenY||0;
            this.pageX = +this.pageX||0;
            this.pageY = +this.pageY||0;
            this.ctrlKey = ("ctrlKey" in this) ? !!this.ctrlKey : false;
            this.altKey = ("altKey" in this) ? !!this.altKey : false;
            this.shiftKey = ("shiftKey" in this) ? !!this.shiftKey : false;
            this.metaKey = ("metaKey" in this) ? !!this.metaKey : false;
            this.scale = +this.scale||1;
            this.rotation = +this.rotation||0;
            this.touches = createTouchList(this.touches||this);
            this.targetTouches = createTouchList(this.targetTouches||this);
            this.changedTouches = createTouchList(this.changedTouches||this);
        }
    })();
}