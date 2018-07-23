/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{d as e,f as s,c as i}from"./chunk-7f93bab0.js";class a{constructor(){this.hasFocus=!1,this.valA=0,this.valB=0,this.ratioA=0,this.ratioB=0,this.ticks=[],this.activeB=!1,this.pressed=!1,this.pressedA=!1,this.pressedB=!1,this.debounce=0,this.name="",this.dualKnobs=!1,this.max=100,this.min=0,this.pin=!1,this.snaps=!1,this.step=1,this.disabled=!1}debounceChanged(){this.ionChange=s(this.ionChange,this.debounce)}disabledChanged(){this.emitStyle()}valueChanged(t){this.inputUpdated(),this.emitStyle(),this.ionChange.emit({value:t})}componentWillLoad(){this.ionStyle=i(this.ionStyle),this.inputUpdated(),this.createTicks(),this.debounceChanged(),this.emitStyle()}emitStyle(){this.ionStyle.emit({"range-disabled":this.disabled})}fireBlur(){this.hasFocus&&(this.hasFocus=!1,this.ionBlur.emit(),this.emitStyle())}fireFocus(){this.hasFocus||(this.hasFocus=!0,this.ionFocus.emit(),this.emitStyle())}inputUpdated(){const t=this.value;this.dualKnobs?(this.valA=t.lower,this.valB=t.upper,this.ratioA=this.valueToRatio(t.lower),this.ratioB=this.valueToRatio(t.upper)):(this.valA=t,this.ratioA=this.valueToRatio(t)),this.updateBar()}updateBar(){const t=this.ratioA,e=this.ratioB;this.dualKnobs?(this.barL=`${100*Math.min(t,e)}%`,this.barR=`${100-100*Math.max(t,e)}%`):(this.barL="",this.barR=`${100-100*t}%`),this.updateTicks()}createTicks(){if(this.snaps){for(let t=this.min;t<=this.max;t+=this.step){const e=this.valueToRatio(t);this.ticks.push({ratio:e,left:`${100*e}%`})}this.updateTicks()}}updateTicks(){const t=this.ticks,e=this.ratio;if(this.snaps&&t)if(this.dualKnobs){const s=this.ratioUpper();t.forEach(t=>{t.active=t.ratio>=e&&t.ratio<=s})}else t.forEach(t=>{t.active=t.ratio<=e})}valueToRatio(t){return t=Math.round((t-this.min)/this.step)*this.step,t/=this.max-this.min,e(0,t,1)}ratioToValue(t){return t=Math.round((this.max-this.min)*t),t=Math.round(t/this.step)*this.step+this.min,e(this.min,t,this.max)}update(t,s,i){let a=e(0,(t.x-s.left)/s.width,1);const n=this.ratioToValue(a);this.snaps&&(a=this.valueToRatio(n)),this.pressed=i;let r,o=!1;return this.activeB?(this.pressedB=i,this.pressedA=!1,this.ratioB=a,o=n===this.valB,this.valB=n):(this.pressedA=i,this.pressedB=!1,this.ratioA=a,o=n===this.valA,this.valA=n),this.updateBar(),!o&&(r=this.dualKnobs?{lower:Math.min(this.valA,this.valB),upper:Math.max(this.valA,this.valB)}:this.valA,this.value=r,!0)}ratio(){return this.dualKnobs?Math.min(this.ratioA,this.ratioB):this.ratioA}ratioUpper(){return this.dualKnobs?Math.max(this.ratioA,this.ratioB):null}keyChng(t){const s=this.step;"knobB"===t.detail.knob?(t.detail.isIncrease?this.valB+=s:this.valB-=s,this.valB=e(this.min,this.valB,this.max),this.ratioB=this.valueToRatio(this.valB)):(t.detail.isIncrease?this.valA+=s:this.valA-=s,this.valA=e(this.min,this.valA,this.max),this.ratioA=this.valueToRatio(this.valA)),this.updateBar()}onDragStart(t){if(this.disabled)return!1;this.fireFocus();const s={x:t.currentX,y:t.currentY},i=this.el.querySelector(".range-slider").getBoundingClientRect();this.rect=i;const a=e(0,(s.x-i.left)/i.width,1);return this.activeB=this.dualKnobs&&Math.abs(a-this.ratioA)>Math.abs(a-this.ratioB),this.update(s,i,!0),!0}onDragEnd(t){this.disabled||(this.update({x:t.currentX,y:t.currentY},this.rect,!1),this.fireBlur())}onDragMove(t){if(this.disabled)return;const e={x:t.currentX,y:t.currentY};this.update(e,this.rect,!0)}hostData(){return{class:{"range-disabled":this.disabled,"range-pressed":this.pressed,"range-has-pin":this.pin}}}render(){return[t("slot",{name:"start"}),t("ion-gesture",{disableScroll:!0,onStart:this.onDragStart.bind(this),onMove:this.onDragMove.bind(this),onEnd:this.onDragEnd.bind(this),disabled:this.disabled,gestureName:"range",gesturePriority:30,direction:"x",threshold:0},t("div",{class:"range-slider"},this.ticks.map(e=>t("div",{style:{left:e.left},role:"presentation",class:{"range-tick":!0,"range-tick-active":!!e.active}})),t("div",{class:"range-bar",role:"presentation"}),t("div",{class:"range-bar range-bar-active",role:"presentation",style:{left:this.barL,right:this.barR}}),t("ion-range-knob",{class:"range-knob-handle",knob:"knobA",pressed:this.pressedA,ratio:this.ratioA,val:this.valA,pin:this.pin,min:this.min,max:this.max}),this.dualKnobs?t("ion-range-knob",{class:"range-knob-handle",knob:"knobB",pressed:this.pressedB,ratio:this.ratioB,val:this.valB,pin:this.pin,min:this.min,max:this.max}):null)),t("slot",{name:"end"})]}static get is(){return"ion-range"}static get host(){return{theme:"range"}}static get properties(){return{activeB:{state:!0},barL:{state:!0},barR:{state:!0},color:{type:String,attr:"color"},debounce:{type:Number,attr:"debounce",watchCallbacks:["debounceChanged"]},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},dualKnobs:{type:Boolean,attr:"dual-knobs"},el:{elementRef:!0},max:{type:Number,attr:"max"},min:{type:Number,attr:"min"},mode:{type:String,attr:"mode"},name:{type:String,attr:"name"},pin:{type:Boolean,attr:"pin"},pressed:{state:!0},pressedA:{state:!0},pressedB:{state:!0},ratio:{method:!0},ratioA:{state:!0},ratioB:{state:!0},ratioUpper:{method:!0},rect:{state:!0},snaps:{type:Boolean,attr:"snaps"},step:{type:Number,attr:"step"},ticks:{state:!0},valA:{state:!0},valB:{state:!0},value:{type:"Any",attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}}static get events(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"ionIncrease",method:"keyChng"},{name:"ionDecrease",method:"keyChng"}]}static get style(){return".item ion-range .item-inner{overflow:visible;width:100%}.item ion-range .input-wrapper{overflow:visible;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%}.item ion-range{width:100%}.item ion-range ion-label{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}ion-range{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}ion-range ion-label{-webkit-box-flex:initial;-webkit-flex:initial;-ms-flex:initial;flex:initial}ion-range ion-icon{font-size:24px}ion-range .range-slider,ion-range ion-gesture{position:relative;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;cursor:pointer}.range-pin{-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle:active,.range-knob-handle:focus{outline:0}.range-ios{padding:8px 16px;font-family:-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Roboto,sans-serif}.range-ios [range-left]{margin:0 20px 0 0}.range-ios [range-right]{margin:0 0 0 20px}.range-ios.range-has-pin{padding-top:20px}.range-ios .range-slider{height:42px}.range-ios .range-bar{left:0;top:21px;border-radius:1px;position:absolute;width:100%;height:1px;background:var(--ion-background-ios-color-step-250,var(--ion-background-color-step-250,#bfbfbf));pointer-events:none}.range-ios.range-pressed .range-bar-active{will-change:left,right}.range-ios.range-pressed .range-knob-handle{will-change:left}.range-ios .range-bar-active{bottom:0;width:auto;background:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.range-ios .range-knob-handle{left:0;top:21px;margin-left:-21px;margin-top:-21px;text-align:center;position:absolute;width:42px;height:42px}.range-ios .range-knob{left:7px;top:7px;border-radius:50%;position:absolute;width:28px;height:28px;background:var(--ion-background-ios-color,var(--ion-background-color,#fff));-webkit-box-shadow:0 3px 1px rgba(0,0,0,.1),0 4px 8px rgba(0,0,0,.13),0 0 0 1px rgba(0,0,0,.02);box-shadow:0 3px 1px rgba(0,0,0,.1),0 4px 8px rgba(0,0,0,.13),0 0 0 1px rgba(0,0,0,.02);pointer-events:none}.range-ios .range-tick{margin-left:-.5px;border-radius:0;position:absolute;top:17.5px;width:1px;height:8px;background:var(--ion-background-ios-color-step-250,var(--ion-background-color-step-250,#bfbfbf));pointer-events:none}.range-ios .range-tick-active{background:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.range-ios .range-pin{text-align:center;border-radius:50px;-webkit-transform:translate3d(0,28px,0) scale(.01);transform:translate3d(0,28px,0) scale(.01);padding:8px;position:relative;top:-20px;display:inline-block;min-width:28px;font-size:12px;color:var(--ion-text-ios-color,var(--ion-text-color,#000));background:0 0;-webkit-transition:-webkit-transform 120ms ease;transition:-webkit-transform 120ms ease;transition:transform 120ms ease;transition:transform 120ms ease,-webkit-transform 120ms ease}.range-ios .range-knob-pressed .range-pin{-webkit-transform:translate3d(0,0,0) scale(1);transform:translate3d(0,0,0) scale(1)}.range-ios.range-disabled{opacity:.5}.range-ios-primary .range-bar-active,.range-ios-primary .range-tick-active{background:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.range-ios-secondary .range-bar-active,.range-ios-secondary .range-tick-active{background:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8))}.range-ios-tertiary .range-bar-active,.range-ios-tertiary .range-tick-active{background:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#7044ff))}.range-ios-success .range-bar-active,.range-ios-success .range-tick-active{background:var(--ion-color-ios-success,var(--ion-color-success,#10dc60))}.range-ios-warning .range-bar-active,.range-ios-warning .range-tick-active{background:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00))}.range-ios-danger .range-bar-active,.range-ios-danger .range-tick-active{background:var(--ion-color-ios-danger,var(--ion-color-danger,#f04141))}.range-ios-light .range-bar-active,.range-ios-light .range-tick-active{background:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8))}.range-ios-medium .range-bar-active,.range-ios-medium .range-tick-active{background:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2))}.range-ios-dark .range-bar-active,.range-ios-dark .range-tick-active{background:var(--ion-color-ios-dark,var(--ion-color-dark,#222428))}"}static get styleMode(){return"ios"}}class n{constructor(){this.pressed=!1,this.pin=!1,this.disabled=!1}handleKeyBoard(t){const e=t.keyCode;e===r||e===l?(this.ionDecrease.emit({isIncrease:!1,knob:this.knob}),t.preventDefault(),t.stopPropagation()):e!==h&&e!==o||(this.ionIncrease.emit({isIncrease:!0,knob:this.knob}),t.preventDefault(),t.stopPropagation())}leftPos(t){return`${100*t}%`}hostData(){return{class:{"range-knob-pressed":this.pressed,"range-knob-min":this.val===this.min||void 0===this.val,"range-knob-max":this.val===this.max},style:{left:this.leftPos(this.ratio)},role:"slider",tabindex:this.disabled?-1:0,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-disabled":this.disabled,"aria-labelledby":this.labelId,"aria-valuenow":this.val}}render(){return this.pin?[t("div",{class:"range-pin",role:"presentation"},this.val),t("div",{class:"range-knob",role:"presentation"})]:t("div",{class:"range-knob",role:"presentation"})}static get is(){return"ion-range-knob"}static get properties(){return{disabled:{type:Boolean,attr:"disabled"},knob:{type:String,attr:"knob"},labelId:{type:String,attr:"label-id"},max:{type:Number,attr:"max"},min:{type:Number,attr:"min"},pin:{type:Boolean,attr:"pin"},pressed:{type:Boolean,attr:"pressed"},ratio:{type:Number,attr:"ratio"},val:{type:Number,attr:"val"}}}static get events(){return[{name:"ionIncrease",method:"ionIncrease",bubbles:!0,cancelable:!0,composed:!0},{name:"ionDecrease",method:"ionDecrease",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"keydown",method:"handleKeyBoard"}]}}const r=37,o=38,h=39,l=40;export{a as IonRange,n as IonRangeKnob};