/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
var __awaiter=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(r,i){function s(e){try{l(n.next(e))}catch(e){i(e)}}function a(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){e.done?r(e.value):new o(function(t){t(e.value)}).then(s,a)}l((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var o,n,r,i,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,n&&(r=n[2&i[0]?"return":i[0]?"throw":"next"])&&!(r=r.call(n,i[1])).done)return r;switch(n=0,r&&(i=[0,r.value]),i[0]){case 0:case 1:r=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(r=(r=s.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){s.label=i[1];break}if(6===i[0]&&s.label<r[1]){s.label=r[1],r=i;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(i);break}r[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{o=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Ionic.loadBundle("ngcdrzy6",["exports","./chunk-0f94cb1c.js","./chunk-d492bf7f.js","./chunk-6006667b.js"],function(e,t,o,n){var r=window.Ionic.h;function i(e,t,o){var n="top",r="left",i=t.querySelector(".popover-content"),a=i.getBoundingClientRect(),l=a.width,p=a.height,c=window.innerWidth,d=window.innerHeight,u=o&&o.target&&o.target.getBoundingClientRect(),m=u&&"top"in u?u.top:d/2-p/2,f=u&&"left"in u?u.left:c/2,h=u&&u.width||0,v=u&&u.height||0,y=t.querySelector(".popover-arrow"),b=y.getBoundingClientRect(),g=b.width,w=b.height;u||(y.style.display="none");var P={top:m+v,left:f+h/2-g/2},D={top:m+v+(w-1),left:f+h/2-l/2},S=!1,k=!1;D.left<s+25?(S=!0,D.left=s):l+s+D.left+25>c&&(k=!0,D.left=c-l-s,r="right"),m+v+p>d&&m-p>0?(P.top=m-(w+1),console.log(P),console.log(m),console.log(p),D.top=m-p-(w-1),t.className=t.className+" popover-bottom",n="bottom"):m+v+p>d&&(i.style.bottom=s+"%"),y.style.top=P.top+"px",y.style.left=P.left+"px",i.style.top=D.top+"px",i.style.left=D.left+"px",S&&(CSS.supports("left","constant(safe-area-inset-left)")?i.style.left="calc("+D.left+"px + constant(safe-area-inset-left)":CSS.supports("left","env(safe-area-inset-left)")&&(i.style.left="calc("+D.left+"px + env(safe-area-inset-left)")),k&&(CSS.supports("right","constant(safe-area-inset-right)")?i.style.left="calc("+D.left+"px - constant(safe-area-inset-right)":CSS.supports("right","env(safe-area-inset-right)")&&(i.style.left="calc("+D.left+"px - env(safe-area-inset-right)")),i.style.transformOrigin=n+" "+r;var E=new e,C=new e;C.addElement(t.querySelector("ion-backdrop")),C.fromTo("opacity",.01,.08);var x=new e;return x.addElement(t.querySelector(".popover-wrapper")),x.fromTo("opacity",.01,1),Promise.resolve(E.addElement(t).easing("ease").duration(100).add(C).add(x))}var s=5;function a(e,t){var o=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".popover-wrapper")),r.fromTo("opacity",.99,0),n.fromTo("opacity",.08,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(n).add(r))}function l(e,t,o){var n="top",r="left",i=t.querySelector(".popover-content"),s=i.getBoundingClientRect(),a=s.width,l=s.height,c=window.innerWidth,d=window.innerHeight,u=o&&o.target&&o.target.getBoundingClientRect(),m=u&&"top"in u?u.top:d/2-l/2,f=u&&"left"in u?u.left:c/2-a/2,h=u&&u.height||0,v={top:m,left:f};v.left<p?v.left=p:a+p+v.left>c&&(v.left=c-a-p,r="right"),m+h+l>d&&m-l>0?(v.top=m-l,t.className=t.className+" popover-bottom",n="bottom"):m+h+l>d&&(i.style.bottom=p+"px"),i.style.top=v.top+"px",i.style.left=v.left+"px",i.style.transformOrigin=n+" "+r;var y=new e,b=new e;b.addElement(t.querySelector("ion-backdrop")),b.fromTo("opacity",.01,.08);var g=new e;g.addElement(t.querySelector(".popover-wrapper")),g.fromTo("opacity",.01,1);var w=new e;w.addElement(t.querySelector(".popover-content")),w.fromTo("scale",.001,1);var P=new e;return P.addElement(t.querySelector(".popover-viewport")),P.fromTo("opacity",.01,1),Promise.resolve(y.addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).add(b).add(g).add(w).add(P))}var p=12;function c(e,t){var o=new e,n=new e;n.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".popover-wrapper")),r.fromTo("opacity",.99,0),n.fromTo("opacity",.08,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(n).add(r))}var d=function(){function e(){this.presented=!1,this.keyboardClose=!0,this.enableBackdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.willAnimate=!0}return e.prototype.componentDidLoad=function(){this.ionPopoverDidLoad.emit()},e.prototype.componentDidUnload=function(){this.ionPopoverDidUnload.emit()},e.prototype.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),this.dismiss()},e.prototype.onBackdropTap=function(){this.dismiss(null,o.BACKDROP)},e.prototype.lifecycle=function(e){var t=this.usersElement,o=u[e.type];if(t&&o){var n=new CustomEvent(o,{bubbles:!1,cancelable:!1,detail:e.detail});t.dispatchEvent(n)}},e.prototype.present=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r;return __generator(this,function(s){switch(s.label){case 0:if(this.presented)return[2];if(!(e=this.el.querySelector(".popover-content")))throw new Error("container is undefined");return t=Object.assign({},this.componentProps,{popover:this.el}),r=this,[4,n.attachComponent(this.delegate,e,this.component,["popover-viewport"],t)];case 1:return r.usersElement=s.sent(),[2,o.present(this,"popoverEnter",i,l,this.ev)]}})})},e.prototype.dismiss=function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(r){switch(r.label){case 0:return[4,o.dismiss(this,e,t,"popoverLeave",a,c,this.ev)];case 1:return r.sent(),[4,n.detachComponent(this.delegate,this.usersElement)];case 2:return r.sent(),[2]}})})},e.prototype.onDidDismiss=function(e){return o.eventMethod(this.el,"ionPopoverDidDismiss",e)},e.prototype.onWillDismiss=function(e){return o.eventMethod(this.el,"ionPopoverWillDismiss",e)},e.prototype.hostData=function(){var e=this.translucent?t.createThemedClasses(this.mode,this.color,"popover-translucent"):{};return{style:{zIndex:1e4+this.overlayId},"no-router":!0,class:Object.assign({},e,t.getClassMap(this.cssClass))}},e.prototype.render=function(){var e=t.createThemedClasses(this.mode,this.color,"popover-wrapper");return[r("ion-backdrop",{tappable:this.enableBackdropDismiss}),r("div",{class:e},r("div",{class:"popover-arrow"}),r("div",{class:"popover-content"}))]},Object.defineProperty(e,"is",{get:function(){return"ion-popover"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{theme:"popover"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{animationCtrl:{connect:"ion-animation-controller"},color:{type:String,attr:"color"},component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},delegate:{type:"Any",attr:"delegate"},dismiss:{method:!0},el:{elementRef:!0},enableBackdropDismiss:{type:Boolean,attr:"enable-backdrop-dismiss"},enterAnimation:{type:"Any",attr:"enter-animation"},ev:{type:"Any",attr:"ev"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},mode:{type:String,attr:"mode"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayId:{type:Number,attr:"overlay-id"},present:{method:!0},showBackdrop:{type:Boolean,attr:"show-backdrop"},translucent:{type:Boolean,attr:"translucent"},willAnimate:{type:Boolean,attr:"will-animate"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionPopoverDidLoad",method:"ionPopoverDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverDidUnload",method:"ionPopoverDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPopoverDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"ionDismiss",method:"onDismiss"},{name:"ionBackdropTap",method:"onBackdropTap"},{name:"ionPopoverDidPresent",method:"lifecycle"},{name:"ionPopoverWillPresent",method:"lifecycle"},{name:"ionPopoverWillDismiss",method:"lifecycle"},{name:"ionPopoverDidDismiss",method:"lifecycle"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-popover{left:0;right:0;top:0;bottom:0;position:absolute;z-index:1000;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.popover-wrapper{z-index:10;opacity:0}.popover-content{position:absolute;z-index:10;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;overflow:auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.popover-content ion-content,.popover-content ion-scroll{contain:none}.popover-content ion-scroll{position:relative}ion-popover-controller{display:none}.popover-md .popover-content{border-radius:2px;-webkit-transform-origin:left top;transform-origin:left top;width:250px;min-width:0;min-height:0;max-height:90%;color:var(--ion-text-md-color,var(--ion-text-color,#000));background:var(--ion-background-md-color,var(--ion-background-color,#fff));-webkit-box-shadow:0 3px 12px 2px rgba(0,0,0,.3);box-shadow:0 3px 12px 2px rgba(0,0,0,.3)}.popover-md .popover-viewport{-webkit-transition-delay:.1s;transition-delay:.1s}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),e}(),u={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillDismiss",ionPopoverDidDismiss:"ionViewDidDismiss"},m=function(){function e(){this.popovers=new Map}return e.prototype.popoverWillPresent=function(e){this.popovers.set(e.target.overlayId,e.target)},e.prototype.popoverWillDismiss=function(e){this.popovers.delete(e.target.overlayId)},e.prototype.escapeKeyUp=function(){o.removeLastOverlay(this.popovers)},e.prototype.create=function(e){return o.createOverlay(this.doc.createElement("ion-popover"),e)},e.prototype.dismiss=function(e,t,n){return void 0===n&&(n=-1),o.dismissOverlay(e,t,this.popovers,n)},e.prototype.getTop=function(){return o.getTopOverlay(this.popovers)},Object.defineProperty(e,"is",{get:function(){return"ion-popover-controller"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"body:ionPopoverWillPresent",method:"popoverWillPresent"},{name:"body:ionPopoverWillDismiss",method:"popoverWillDismiss"},{name:"body:ionPopoverDidUnload",method:"popoverWillDismiss"},{name:"body:keyup.escape",method:"escapeKeyUp"}]},enumerable:!0,configurable:!0}),e}();e.IonPopover=d,e.IonPopoverController=m,Object.defineProperty(e,"__esModule",{value:!0})});