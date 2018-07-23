/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("6rgsypmp",["exports","./chunk-4dee52e3.js"],function(t,e){window.Ionic.h;var n="$ionRelocated";function i(t,e,i,o){if(void 0===o&&(o=0),t[n]!==i){if(e.value,i){!function(t,e){var n,i,o=t.parentElement,r=t.ownerDocument;if(t&&o){var s=t.offsetTop,a=t.offsetLeft,l=t.offsetWidth,c=t.offsetHeight,u=r.createElement("div"),d=u.style;(n=u.classList).add.apply(n,Array.from(t.classList)),u.classList.add("cloned-input"),u.setAttribute("aria-hidden","true"),d.pointerEvents="none",d.position="absolute",d.top=s+"px",d.left=a+"px",d.width=l+"px",d.height=c+"px";var f=r.createElement("input");(i=f.classList).add.apply(i,Array.from(e.classList)),f.value=e.value,f.type=e.type,f.placeholder=e.placeholder,f.tabIndex=-1,u.appendChild(f),o.appendChild(u),t.style.pointerEvents="none"}e.style.transform="scale(0)"}(t,e);var r="rtl"===t.ownerDocument.dir?9999:-9999;e.style.transform="translate3d("+r+"px,"+o+"px,0)"}else!function(t,e){if(t&&t.parentElement){for(var n=t.parentElement.querySelectorAll(".cloned-input"),i=0;i<n.length;i++)n[i].remove();t.style.pointerEvents=""}e.style.transform="",e.style.opacity=""}(t,e);t[n]=i}}function o(t){return t===t.ownerDocument.activeElement}var r=["INPUT","TEXTAREA","ION-INPUT","ION-TEXTAREA"],s=.3;function a(t,n,r,a){var l,c=function(t){l=e.pointerCoord(t),t.type},u=function(c){if(c.type,l){var u=e.pointerCoord(c);(function(t,e,n){if(e&&n){var i=e.x-n.x,o=e.y-n.y;return i*i+o*o>36}return!1})(0,l,u)||o(n)||(c.preventDefault(),c.stopPropagation(),function(t,e,n,o){var r=function(t,e,n){return e?function(t,e,n,i){var o=t.top,r=t.bottom,a=e.top+10,l=Math.min(e.bottom,i-n)/2-r,c=a-o,u=Math.round(l<0?-l:c>0?-c:0),d=Math.abs(u)/s;return{scrollAmount:u,scrollDuration:Math.min(400,Math.max(150,d)),scrollPadding:n,inputSafeY:4-(o-a)}}((t.closest("ion-item,[ion-item]")||t).getBoundingClientRect(),e.getBoundingClientRect(),n,window.innerHeight):{scrollAmount:0,scrollPadding:0,scrollDuration:0,inputSafeY:0}}(t,n,o);Math.abs(r.scrollAmount)<4?e.focus():(i(t,e,!0,r.inputSafeY),e.focus(),n.scrollByPoint(0,r.scrollAmount,r.scrollDuration,function(){i(t,e,!1,r.inputSafeY),e.focus()}))}(t,n,r,a))}};return t.addEventListener("touchstart",c,!0),t.addEventListener("touchend",u,!0),function(){t.removeEventListener("touchstart",c,!0),t.removeEventListener("touchend",u,!0)}}var l="$ionPaddingTimer";function c(t,e){if("INPUT"===t.tagName&&(!t.parentElement||"ION-INPUT"!==t.parentElement.tagName)){var n=t.closest(".scroll-inner");if(n){var i=n[l];i&&clearTimeout(i),e>0?n.style.paddingBottom=e+"px":n[l]=setTimeout(function(){n.style.paddingBottom=""},120)}}}var u=function(){function t(){this.didLoad=!1,this.hideCaret=!1,this.scrollAssist=!1,this.keyboardHeight=0,this.hideCaretMap=new WeakMap,this.scrollAssistMap=new WeakMap}return t.prototype.componentDidLoad=function(){this.keyboardHeight=this.config.getNumber("keyboardHeight",290),this.scrollAssist=this.config.getBoolean("scrollAssist",!0),this.hideCaret=this.config.getBoolean("hideCaretOnScroll",!0),this.config.getBoolean("inputBlurring",!0)&&function(t){var e=!0,n=!1;t.addEventListener("ionScrollStart",function(){n=!0}),t.addEventListener("focusin",function(){e=!0},!0),t.addEventListener("touchend",function(i){if(n)n=!1;else{var o=t.activeElement;if(o&&-1!==r.indexOf(o.tagName)){var s=i.target;s!==o&&(r.indexOf(s.tagName)>=0||s.classList.contains("input-cover")||(e=!1,setTimeout(function(){e||o.blur()},50)))}}},!1)}(this.doc),this.config.getBoolean("scrollPadding",!0)&&function(t,e){t.addEventListener("focusin",function(t){c(t.target,e)}),t.addEventListener("focusout",function(t){c(t.target,0)})}(this.doc,this.keyboardHeight);for(var t=0,e=Array.from(this.doc.querySelectorAll("ion-input"));t<e.length;t++){var n=e[t];this.registerInput(n)}this.didLoad=!0},t.prototype.onInputDidLoad=function(t){this.didLoad&&this.registerInput(t.target)},t.prototype.onInputDidUnload=function(t){this.didLoad&&this.unregisterInput(t.target)},t.prototype.registerInput=function(t){var e=t.querySelector("input"),n=t.closest("ion-scroll"),r=t.closest("ion-content");if(e){if(n&&this.hideCaret&&!this.hideCaretMap.has(t)){var s=function(t,e,n){if(!n||!e)return function(){};var r=function(n){o(e)&&i(t,e,n)},s=function(){return i(t,e,!1)},a=function(){return r(!0)},l=function(){return r(!1)};return n&&n.addEventListener("ionScrollStart",a),n&&n.addEventListener("ionScrollEnd",l),e.addEventListener("blur",s),function(){n.removeEventListener("ionScrollStart",a),n.removeEventListener("ionScrollEnd",l),e.addEventListener("ionBlur",s)}}(t,e,n);this.hideCaretMap.set(t,s)}r&&this.scrollAssist&&!this.scrollAssistMap.has(t)&&(s=a(t,e,r,this.keyboardHeight),this.scrollAssistMap.set(t,s))}},t.prototype.unregisterInput=function(t){var e;this.hideCaret&&((e=this.hideCaretMap.get(t))&&e(),this.hideCaretMap.delete(t)),this.scrollAssist&&((e=this.scrollAssistMap.get(t))&&e(),this.scrollAssistMap.delete(t))},Object.defineProperty(t,"is",{get:function(){return"ion-input-shims"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{config:{context:"config"},doc:{context:"document"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"body:ionInputDidLoad",method:"onInputDidLoad"},{name:"body:ionInputDidUnload",method:"onInputDidUnload"}]},enumerable:!0,configurable:!0}),t}();t.IonInputShims=u,Object.defineProperty(t,"__esModule",{value:!0})});