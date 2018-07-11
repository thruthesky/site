/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:e}=window.Ionic;import{a as t,b as n,c as s,d as o,e as i,f as a,g as c,h as r,i as l}from"./chunk-3b0e1c7b.js";import{a as d,b as h}from"./chunk-e901a817.js";function m(e,t){const n=new e,s=new e;s.addElement(t.querySelector("ion-backdrop"));const o=new e;o.addElement(t.querySelector(".action-sheet-wrapper")),s.fromTo("opacity",.01,.4),o.fromTo("translateY","100%","0%");const i=n.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(400).add(s).add(o);return Promise.resolve(i)}function u(e,t){const n=new e,s=new e;s.addElement(t.querySelector("ion-backdrop"));const o=new e;o.addElement(t.querySelector(".action-sheet-wrapper")),s.fromTo("opacity",.4,0),o.fromTo("translateY","0%","100%");const i=n.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(450).add(s).add(o);return Promise.resolve(i)}function p(e,t){const n=new e,s=new e;s.addElement(t.querySelector("ion-backdrop"));const o=new e;o.addElement(t.querySelector(".action-sheet-wrapper")),s.fromTo("opacity",.01,.26),o.fromTo("translateY","100%","0%");const i=n.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(400).add(s).add(o);return Promise.resolve(i)}function b(e,t){const n=new e,s=new e;s.addElement(t.querySelector("ion-backdrop"));const o=new e;o.addElement(t.querySelector(".action-sheet-wrapper")),s.fromTo("opacity",.26,0),o.fromTo("translateY","0%","100%");const i=n.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(450).add(s).add(o);return Promise.resolve(i)}class y{constructor(){this.presented=!1,this.keyboardClose=!0,this.enableBackdropDismiss=!0,this.translucent=!1,this.willAnimate=!0}componentDidLoad(){this.ionActionSheetDidLoad.emit()}componentDidUnload(){this.ionActionSheetDidUnload.emit()}onBackdropTap(){this.dismiss(null,t)}dispatchCancelHandler(e){const t=e.detail.role;if(o(t)){const e=this.buttons.find(e=>"cancel"===e.role);this.callButtonHandler(e)}}present(){return i(this,"actionSheetEnter",m,p)}dismiss(e,t){return n(this,e,t,"actionSheetLeave",u,b)}onDidDismiss(e){return s(this.el,"ionActionSheetDidDismiss",e)}onWillDismiss(e){return s(this.el,"ionActionSheetWillDismiss",e)}buttonClick(e){const t=e.role;o(t)?this.dismiss(void 0,t):this.callButtonHandler(e)&&this.dismiss(void 0,e.role)}callButtonHandler(e){return!e||!e.handler||!1!==e.handler()}hostData(){const e=this.translucent?d(this.mode,this.color,"action-sheet-translucent"):{};return{style:{zIndex:2e4+this.overlayId},class:Object.assign({},e,h(this.cssClass))}}render(){const t=this.buttons.map(e=>("string"==typeof e&&(e={text:e}),e.cssClass||(e.cssClass=""),e)),n=t.find(e=>"cancel"===e.role),s=t.filter(e=>"cancel"!==e.role);return[e("ion-backdrop",{tappable:this.enableBackdropDismiss}),e("div",{class:"action-sheet-wrapper",role:"dialog"},e("div",{class:"action-sheet-container"},e("div",{class:"action-sheet-group"},this.header?e("div",{class:"action-sheet-title"},this.header,this.subHeader?e("div",{class:"action-sheet-sub-title"},this.subHeader):null):null,s.map(t=>e("button",{class:S(t),onClick:()=>this.buttonClick(t)},e("span",{class:"action-sheet-button-inner"},t.icon?e("ion-icon",{name:t.icon,class:"action-sheet-icon"}):null,t.text)))),n?e("div",{class:"action-sheet-group action-sheet-group-cancel"},e("button",{class:S(n),onClick:()=>this.buttonClick(n)},e("span",{class:"action-sheet-button-inner"},n.icon?e("ion-icon",{name:n.icon,class:"action-sheet-icon"}):null,n.text))):null))]}static get is(){return"ion-action-sheet"}static get host(){return{theme:"action-sheet"}}static get properties(){return{animationCtrl:{connect:"ion-animation-controller"},buttons:{type:"Any",attr:"buttons"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},dismiss:{method:!0},el:{elementRef:!0},enableBackdropDismiss:{type:Boolean,attr:"enable-backdrop-dismiss"},enterAnimation:{type:"Any",attr:"enter-animation"},header:{type:String,attr:"header"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayId:{type:Number,attr:"overlay-id"},present:{method:!0},subHeader:{type:String,attr:"sub-header"},translucent:{type:Boolean,attr:"translucent"},willAnimate:{type:Boolean,attr:"will-animate"}}}static get events(){return[{name:"ionActionSheetDidLoad",method:"ionActionSheetDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionActionSheetDidUnload",method:"ionActionSheetDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionActionSheetDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionActionSheetWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionActionSheetWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionActionSheetDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"ionBackdropTap",method:"onBackdropTap"},{name:"ionActionSheetWillDismiss",method:"dispatchCancelHandler"}]}static get style(){return"ion-action-sheet{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;position:fixed;z-index:1000;display:block;-ms-touch-action:none;touch-action:none}.action-sheet-wrapper{left:0;right:0;top:0;bottom:0;margin:auto;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);position:absolute;z-index:10;display:block;width:100%;max-width:500px;pointer-events:none}.action-sheet-button{width:100%;border:0;font-family:inherit}.action-sheet-button:active,.action-sheet-button:focus{outline:0}.action-sheet-button-inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.action-sheet-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column;-ms-flex-flow:column;flex-flow:column;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;height:100%;max-height:100%}.action-sheet-group{overflow:scroll;-ms-scroll-chaining:none;overscroll-behavior:contain;-webkit-flex-shrink:2;-ms-flex-negative:2;flex-shrink:2;pointer-events:all}.action-sheet-group-cancel{overflow:hidden;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.action-sheet-ios{text-align:center;font-family:-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Roboto,sans-serif}.action-sheet-ios .action-sheet-wrapper{margin:constant(safe-area-inset-top) auto constant(safe-area-inset-bottom);margin:env(safe-area-inset-top) auto env(safe-area-inset-bottom)}.action-sheet-ios .action-sheet-container{padding:0 10px}.action-sheet-ios .action-sheet-group{border-radius:13px;margin-bottom:8px;background:var(--ion-overlay-ios-background-color,var(--ion-overlay-background-color,#f9f9f9))}.action-sheet-ios .action-sheet-group:first-child{margin-top:10px}.action-sheet-ios .action-sheet-group:last-child{margin-bottom:10px}.action-sheet-translucent-ios .action-sheet-group{background:rgba(var(--ion-background-ios-color-rgb,var(--ion-background-color-rgb,255,255,255)),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.action-sheet-ios .action-sheet-title{padding:14px 14px 13px;text-align:center;border-bottom:.55px solid rgba(var(--ion-text-ios-color-rgb,var(--ion-text-color-rgb,0,0,0)),.2);font-size:13px;font-weight:400;color:var(--ion-text-ios-color-step-600,var(--ion-text-color-step-600,#999))}.action-sheet-ios .action-sheet-sub-title{padding:15px 0 0;font-size:12px}.action-sheet-ios .action-sheet-button{margin:0;padding:18px;height:56px;border-bottom:.55px solid rgba(var(--ion-text-ios-color-rgb,var(--ion-text-color-rgb,0,0,0)),.2);font-size:20px;color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));background:0 0;contain:strict}.action-sheet-ios .action-sheet-button .action-sheet-icon{margin-top:-10px;padding-right:.1em;height:.7em;font-size:1.4em}.action-sheet-ios .action-sheet-button:last-child{border-bottom-color:transparent}.action-sheet-ios .action-sheet-button.activated{margin-top:-.55px;border-top:.55px solid rgba(var(--ion-text-ios-color-rgb,var(--ion-text-color-rgb,0,0,0)),.1);border-bottom-color:rgba(var(--ion-text-ios-color-rgb,var(--ion-text-color-rgb,0,0,0)),.1);background:rgba(var(--ion-text-ios-color-rgb,var(--ion-text-color-rgb,0,0,0)),.1)}.action-sheet-ios .action-sheet-selected{font-weight:700;background:var(--ion-background-ios-color,var(--ion-background-color,#fff))}.action-sheet-ios .action-sheet-destructive{color:var(--ion-color-ios-danger,var(--ion-color-danger,#f04141))}.action-sheet-ios .action-sheet-cancel{font-weight:600;background:var(--ion-background-ios-color,var(--ion-background-color,#fff))}"}static get styleMode(){return"ios"}}function S(e){const t=Object.assign({"action-sheet-button":!0},h(e.cssClass));return e.role&&(t[`action-sheet-${e.role}`]=!0),t}class D{constructor(){this.actionSheets=new Map}actionSheetWillPresent(e){this.actionSheets.set(e.target.overlayId,e.target)}actionSheetWillDismiss(e){this.actionSheets.delete(e.target.overlayId)}escapeKeyUp(){l(this.actionSheets)}create(e){return a(this.doc.createElement("ion-action-sheet"),e)}dismiss(e,t,n=-1){return c(e,t,this.actionSheets,n)}getTop(){return r(this.actionSheets)}static get is(){return"ion-action-sheet-controller"}static get properties(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}}static get listeners(){return[{name:"body:ionActionSheetWillPresent",method:"actionSheetWillPresent"},{name:"body:ionActionSheetWillDismiss",method:"actionSheetWillDismiss"},{name:"body:ionActionSheetDidUnload",method:"actionSheetWillDismiss"},{name:"body:keyup.escape",method:"escapeKeyUp"}]}}export{y as IonActionSheet,D as IonActionSheetController};