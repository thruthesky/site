(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{BCmB:function(n,t,l){"use strict";l.d(t,"a",function(){return e});var a=l("SLNq"),e=(l("Zmtf"),function(){function n(n,t,l){this.sanitizer=n,this.dialog=t,this.a=l,this.dialogRef=null}return n.prototype.sanitizeData=function(n){return n.ok||(n.ok=this.a.t("OK")),n.yes||(n.yes=this.a.t("Yes")),n.no||(n.no=this.a.t("No")),n.content&&(n.content=this.sanitizer.bypassSecurityTrustHtml(n.content)),n.maxWidth||(n.maxWidth="800px"),n.type||(n.type="alert"),n},n.prototype.alert=function(n){this.sanitizeData(n),this.dialogRef=this.dialog.open(a.a,{disableClose:!0,maxWidth:n.maxWidth,data:n}),this.dialogRef.afterClosed().subscribe(function(n){})},n.prototype.confirm=function(n){return n.type="confirm",this.sanitizeData(n),this.dialogRef=this.dialog.open(a.a,{disableClose:!0,maxWidth:n.maxWidth,data:n}),this.dialogRef.afterClosed()},n.prototype.close=function(){this.dialogRef&&this.dialogRef.close()},n}())},L4hN:function(n,t,l){"use strict";l.r(t);var a=l("CcnG"),e=l("Zmtf"),o=l("BCmB"),i=function(){function n(n,t,l,a,e){var o=this;this.sanitizer=t,this.http=l,this.a=a,this.modal=e,this.posts=[],this.slug="",this.title="",this.showLoader=!0,n.data.subscribe(function(n){o.slug=n.slug,"termsandconditions"===o.slug?o.title=o.a.ln.TERMS_AND_CONDITIONS:"student_reminders"===o.slug||"teacher_reminders"===o.slug?o.title=o.a.ln.REMINDER:"policy"===o.slug&&(o.title=o.a.ln.POLICY),o.loadPosts(n.slug)})}return n.prototype.ngOnInit=function(){},n.prototype.loadPosts=function(n){var t=this;this.showLoader=!0,this.http.get(this.a.urlBackend+"/wp-json/wp/v2/posts?categories="+this.a.environment.categories[n]).subscribe(function(n){if(n&&n.length){t.posts=n;for(var l=0,a=n;l<a.length;l++){var e=a[l];e.content.rendered=t.sanitizer.bypassSecurityTrustHtml(e.content.rendered)}}else t.modal.alert({content:t.a.ln.SLUG_IS_EMPTY});t.showLoader=!1},function(n){t.showLoader=!1})},n}(),r=function(){},u=l("xYTU"),s=l("t68o"),c=l("zbXB"),d=l("WqdR"),f=l("NvT6"),g=l("Blfk"),m=l("dWZg"),p=l("Ip0R"),h=l("ZYCi"),b=l("ZYjt"),O=l("t/Na"),k=a.Ma({encapsulation:0,styles:[["main[_ngcontent-%COMP%]{background:#fff}main[_ngcontent-%COMP%]   .loader[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}main[_ngcontent-%COMP%]   .loader[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%]{margin:.5em}main[_ngcontent-%COMP%]   .posts[_ngcontent-%COMP%]{padding:1em}main[_ngcontent-%COMP%]   .posts[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{padding:.5em}@media screen and (min-width:768px){main[_ngcontent-%COMP%]   .posts[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{padding:1em}}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]{border:1px solid rgba(125,125,125,.1);border-radius:2px}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{margin:0;padding:1em 1.2em .3em;display:flex;justify-content:space-between;align-items:center;font-size:1em}@media screen and (min-width:768px){main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{font-size:1.1em}}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:200}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-weight:500}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{display:flex;align-items:center;color:gray;font-size:.8em}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{height:1em;margin-left:.3em}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{margin:0;padding:0 1.5em 1em;font-weight:300;font-size:.9em;line-height:1.5em}@media screen and (min-width:768px){main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{font-size:.95em}}"]],data:{}});function W(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,4,"div",[["class","loader"]],null,null,null,null,null)),(n()(),a.Oa(1,0,null,null,1,"mat-spinner",[["class","mat-spinner mat-progress-spinner"],["mode","indeterminate"],["role","progressbar"]],[[4,"width","px"],[4,"height","px"]],null,null,f.b,f.a)),a.Na(2,49152,null,0,g.c,[a.k,m.a,[2,p.c]],{diameter:[0,"diameter"]},null),(n()(),a.Oa(3,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),a.gb(4,null,["",""]))],function(n,t){n(t,2,0,48)},function(n,t){var l=t.component;n(t,1,0,a.Ya(t,2).diameter,a.Ya(t,2).diameter),n(t,4,0,l.a.ln["IN LOADING"])})}function v(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,10,"div",[["class","spacer"]],null,null,null,null,null)),(n()(),a.Oa(1,0,null,null,9,"div",[["class","post"]],null,null,null,null,null)),(n()(),a.Oa(2,0,null,null,7,"a",[["class","header"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,t,l){var e=!0;return"click"===t&&(e=!1!==a.Ya(n,3).onClick(l.button,l.ctrlKey,l.metaKey,l.shiftKey)&&e),e},null,null)),a.Na(3,671744,null,0,h.p,[h.n,h.a,p.j],{routerLink:[0,"routerLink"]},null),(n()(),a.Oa(4,0,null,null,1,"span",[["class","title"]],null,null,null,null,null)),(n()(),a.gb(5,null,["",""])),(n()(),a.Oa(6,0,null,null,3,"span",[["class","icon"]],null,null,null,null,null)),(n()(),a.gb(-1,null,[" View "])),(n()(),a.Oa(8,0,null,null,1,":svg:svg",[["data-prefix","fas"],["role","img"],["viewBox","0 0 448 512"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(n()(),a.Oa(9,0,null,null,0,":svg:path",[["d","M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-64 47.111C384 109.929 370.071 96 352.889 96H220.667c-12.887 0-23.333 10.447-23.333 23.334v14.904c0 13.138 10.843 23.686 23.976 23.324l56.002-1.588L69.908 361.908c-7.858 7.802-7.88 20.504-.05 28.334l19.899 19.899c7.83 7.83 20.532 7.808 28.334-.05l205.935-207.404-1.588 56.003c-.362 13.133 10.186 23.976 23.324 23.976h14.904c12.887 0 23.334-10.447 23.334-23.333V127.111z"],["fill","currentColor"]],null,null,null,null,null)),(n()(),a.Oa(10,0,null,null,0,"div",[["class","content"]],[[8,"innerHTML",1]],null,null,null,null))],function(n,t){n(t,3,0,a.Qa(1,"/post/",t.context.$implicit.id,""))},function(n,t){n(t,2,0,a.Ya(t,3).target,a.Ya(t,3).href),n(t,5,0,t.context.$implicit.title.rendered),n(t,10,0,t.context.$implicit.content.rendered)})}function C(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,2,"div",[["class","posts"]],null,null,null,null,null)),(n()(),a.Fa(16777216,null,null,1,null,v)),a.Na(2,802816,null,0,p.m,[a.N,a.K,a.q],{ngForOf:[0,"ngForOf"]},null)],function(n,t){n(t,2,0,t.component.posts)},null)}function M(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,8,"main",[],null,null,null,null,null)),(n()(),a.Oa(1,0,null,null,2,"header",[],null,null,null,null,null)),(n()(),a.Oa(2,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),a.gb(3,null,["",""])),(n()(),a.Oa(4,0,null,null,4,"section",[],null,null,null,null,null)),(n()(),a.Fa(16777216,null,null,1,null,W)),a.Na(6,16384,null,0,p.n,[a.N,a.K],{ngIf:[0,"ngIf"]},null),(n()(),a.Fa(16777216,null,null,1,null,C)),a.Na(8,16384,null,0,p.n,[a.N,a.K],{ngIf:[0,"ngIf"]},null)],function(n,t){var l=t.component;n(t,6,0,l.showLoader),n(t,8,0,l.posts.length)},function(n,t){n(t,3,0,t.component.title)})}var _=a.Ka("forum-page",i,function(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,1,"forum-page",[],null,null,null,M,k)),a.Na(1,114688,null,0,i,[h.a,b.c,O.c,e.a,o.a],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),x=l("Wf4p"),P=l("M2Lx"),y=l("eDkP"),N=l("Fzqc"),w=l("uGex"),R=l("vARd"),I=l("lLAP"),Y=l("vGXY"),L=l("o3x0"),z=l("jQLj"),F=l("seP3"),K=l("/VYK"),q=l("b716"),X=l("UodH"),j=l("de3e"),S=l("4c35"),T=l("qAlS"),B=l("Z+uX"),D=l("9It4"),G=l("/wvI"),A=l("UO+G");l.d(t,"ForumPageModuleNgFactory",function(){return H});var H=a.La(r,[],function(n){return a.Va([a.Wa(512,a.j,a.Aa,[[8,[u.a,u.b,s.a,c.b,c.a,d.a,_]],[3,a.j],a.v]),a.Wa(4608,p.p,p.o,[a.s,[2,p.y]]),a.Wa(4608,O.m,O.s,[p.c,a.z,O.q]),a.Wa(4608,O.t,O.t,[O.m,O.r]),a.Wa(5120,O.a,function(n){return[n]},[O.t]),a.Wa(4608,O.p,O.p,[]),a.Wa(6144,O.n,null,[O.p]),a.Wa(4608,O.l,O.l,[O.n]),a.Wa(6144,O.b,null,[O.l]),a.Wa(4608,O.h,O.o,[O.b,a.p]),a.Wa(4608,O.c,O.c,[O.h]),a.Wa(4608,x.d,x.d,[]),a.Wa(4608,P.b,P.b,[]),a.Wa(4608,y.c,y.c,[y.i,y.e,a.j,y.h,y.f,a.p,a.x,p.c,N.b]),a.Wa(5120,w.a,w.b,[y.c]),a.Wa(4608,R.c,R.c,[y.c,I.g,a.p,Y.a,[3,R.c],R.b]),a.Wa(5120,L.c,L.d,[y.c]),a.Wa(4608,L.e,L.e,[y.c,a.p,[2,p.i],[2,L.b],L.c,[3,L.e],y.e]),a.Wa(4608,z.h,z.h,[]),a.Wa(4608,x.c,x.v,[[2,x.g],m.a]),a.Wa(4608,o.a,o.a,[b.c,L.e,e.a]),a.Wa(1073742336,p.b,p.b,[]),a.Wa(1073742336,h.q,h.q,[[2,h.v],[2,h.n]]),a.Wa(1073742336,O.e,O.e,[]),a.Wa(1073742336,O.d,O.d,[]),a.Wa(1073742336,F.d,F.d,[]),a.Wa(1073742336,m.b,m.b,[]),a.Wa(1073742336,K.c,K.c,[]),a.Wa(1073742336,q.c,q.c,[]),a.Wa(1073742336,N.a,N.a,[]),a.Wa(1073742336,x.l,x.l,[[2,x.e]]),a.Wa(1073742336,x.u,x.u,[]),a.Wa(1073742336,X.c,X.c,[]),a.Wa(1073742336,P.c,P.c,[]),a.Wa(1073742336,j.c,j.c,[]),a.Wa(1073742336,S.f,S.f,[]),a.Wa(1073742336,T.a,T.a,[]),a.Wa(1073742336,y.g,y.g,[]),a.Wa(1073742336,x.s,x.s,[]),a.Wa(1073742336,x.q,x.q,[]),a.Wa(1073742336,w.d,w.d,[]),a.Wa(1073742336,R.e,R.e,[]),a.Wa(1073742336,g.b,g.b,[]),a.Wa(1073742336,L.j,L.j,[]),a.Wa(1073742336,I.a,I.a,[]),a.Wa(1073742336,z.i,z.i,[]),a.Wa(1073742336,x.w,x.w,[]),a.Wa(1073742336,x.n,x.n,[]),a.Wa(1073742336,B.b,B.b,[]),a.Wa(1073742336,D.a,D.a,[]),a.Wa(1073742336,G.a,G.a,[]),a.Wa(1073742336,A.a,A.a,[]),a.Wa(1073742336,r,r,[]),a.Wa(256,O.q,"XSRF-TOKEN",[]),a.Wa(256,O.r,"X-XSRF-TOKEN",[]),a.Wa(256,x.f,x.i,[]),a.Wa(1024,h.l,function(){return[[{path:"",component:i}]]},[])])})},NvT6:function(n,t,l){"use strict";l.d(t,"a",function(){return e}),l.d(t,"b",function(){return o});var a=l("CcnG");l("Blfk"),l("Fzqc"),l("Wf4p"),l("dWZg"),l("Ip0R");var e=a.Ma({encapsulation:2,styles:[".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2s linear infinite}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4s;animation-timing-function:cubic-bezier(.35,0,.25,1);animation-iteration-count:infinite}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10s cubic-bezier(.87,.03,.33,1) infinite}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.60617px;transform:rotate(0)}12.5%{stroke-dashoffset:56.54867px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.60617px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.54867px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.60617px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.54867px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.60617px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.54867px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}"],data:{}});function o(n){return a.ib(2,[(n()(),a.Oa(0,0,null,null,1,":svg:svg",[["focusable","false"],["preserveAspectRatio","xMidYMid meet"]],[[4,"width","px"],[4,"height","px"],[1,"viewBox",0]],null,null,null,null)),(n()(),a.Oa(1,0,null,null,0,":svg:circle",[["cx","50%"],["cy","50%"]],[[1,"r",0],[4,"animation-name",null],[4,"stroke-dashoffset","px"],[4,"stroke-dasharray","px"],[4,"stroke-width","%"]],null,null,null,null))],null,function(n,t){var l=t.component;n(t,0,0,l.diameter,l.diameter,l._viewBox),n(t,1,0,l._circleRadius,"mat-progress-spinner-stroke-rotate-"+l.diameter,l._strokeDashOffset,l._strokeCircumference,l._circleStrokeWidth)})}},SLNq:function(n,t,l){"use strict";l.d(t,"a",function(){return a});var a=function(n,t){this.dialogRef=n,this.data=t}},"UO+G":function(n,t,l){"use strict";l.d(t,"a",function(){return a});var a=function(){}},WqdR:function(n,t,l){"use strict";var a=l("CcnG"),e=l("o3x0"),o=l("bujt"),i=l("UodH"),r=l("dWZg"),u=l("lLAP"),s=l("Ip0R"),c=l("SLNq");l.d(t,"a",function(){return b});var d=a.Ma({encapsulation:0,styles:[[""]],data:{}});function f(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,2,"h1",[["class","mat-dialog-title"],["mat-dialog-title",""]],[[8,"id",0]],null,null,null,null)),a.Na(1,81920,null,0,e.l,[[2,e.k],a.k,e.e],null,null),(n()(),a.gb(2,null,["",""]))],function(n,t){n(t,1,0)},function(n,t){var l=t.component;n(t,0,0,a.Ya(t,1).id),n(t,2,0,l.data.title)})}function g(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,3,"button",[["cdkFocusInitial",""],["mat-button",""],["type","button"]],[[8,"disabled",0],[1,"aria-label",0]],[[null,"click"]],function(n,t,l){var e=!0;return"click"===t&&(e=!1!==a.Ya(n,2).dialogRef.close(a.Ya(n,2).dialogResult)&&e),e},o.b,o.a)),a.Na(1,180224,null,0,i.b,[a.k,r.a,u.e],null,null),a.Na(2,606208,null,0,e.g,[[2,e.k],a.k,e.e],{dialogResult:[0,"dialogResult"]},null),(n()(),a.gb(3,0,["",""]))],function(n,t){n(t,2,0,!0)},function(n,t){var l=t.component;n(t,0,0,a.Ya(t,1).disabled||null,a.Ya(t,2).ariaLabel),n(t,3,0,l.data.ok)})}function m(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,3,"button",[["cdkFocusInitial",""],["mat-button",""],["type","button"]],[[8,"disabled",0],[1,"aria-label",0]],[[null,"click"]],function(n,t,l){var e=!0;return"click"===t&&(e=!1!==a.Ya(n,2).dialogRef.close(a.Ya(n,2).dialogResult)&&e),e},o.b,o.a)),a.Na(1,180224,null,0,i.b,[a.k,r.a,u.e],null,null),a.Na(2,606208,null,0,e.g,[[2,e.k],a.k,e.e],{dialogResult:[0,"dialogResult"]},null),(n()(),a.gb(3,0,["",""]))],function(n,t){n(t,2,0,!0)},function(n,t){var l=t.component;n(t,0,0,a.Ya(t,1).disabled||null,a.Ya(t,2).ariaLabel),n(t,3,0,l.data.yes)})}function p(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,3,"button",[["cdkFocusInitial",""],["mat-button",""],["type","button"]],[[8,"disabled",0],[1,"aria-label",0]],[[null,"click"]],function(n,t,l){var e=!0;return"click"===t&&(e=!1!==a.Ya(n,2).dialogRef.close(a.Ya(n,2).dialogResult)&&e),e},o.b,o.a)),a.Na(1,180224,null,0,i.b,[a.k,r.a,u.e],null,null),a.Na(2,606208,null,0,e.g,[[2,e.k],a.k,e.e],{dialogResult:[0,"dialogResult"]},null),(n()(),a.gb(3,0,["",""]))],function(n,t){n(t,2,0,!1)},function(n,t){var l=t.component;n(t,0,0,a.Ya(t,1).disabled||null,a.Ya(t,2).ariaLabel),n(t,3,0,l.data.no)})}function h(n){return a.ib(0,[(n()(),a.Fa(16777216,null,null,1,null,f)),a.Na(1,16384,null,0,s.n,[a.N,a.K],{ngIf:[0,"ngIf"]},null),(n()(),a.Oa(2,0,null,null,2,"div",[["class","mat-dialog-content"],["mat-dialog-content",""]],null,null,null,null,null)),a.Na(3,16384,null,0,e.i,[],null,null),(n()(),a.Oa(4,0,null,null,0,"p",[],[[8,"innerHTML",1]],null,null,null,null)),(n()(),a.Oa(5,0,null,null,7,"mat-dialog-actions",[["align","end"],["class","mat-dialog-actions"]],null,null,null,null,null)),a.Na(6,16384,null,0,e.f,[],null,null),(n()(),a.Fa(16777216,null,null,1,null,g)),a.Na(8,16384,null,0,s.n,[a.N,a.K],{ngIf:[0,"ngIf"]},null),(n()(),a.Fa(16777216,null,null,1,null,m)),a.Na(10,16384,null,0,s.n,[a.N,a.K],{ngIf:[0,"ngIf"]},null),(n()(),a.Fa(16777216,null,null,1,null,p)),a.Na(12,16384,null,0,s.n,[a.N,a.K],{ngIf:[0,"ngIf"]},null)],function(n,t){var l=t.component;n(t,1,0,null==l.data?null:l.data.title),n(t,8,0,"alert"==l.data.type),n(t,10,0,"confirm"==l.data.type),n(t,12,0,"confirm"==l.data.type)},function(n,t){n(t,4,0,t.component.data.content)})}var b=a.Ka("dialog-component",c.a,function(n){return a.ib(0,[(n()(),a.Oa(0,0,null,null,1,"dialog-component",[],null,null,null,h,d)),a.Na(1,49152,null,0,c.a,[e.k,e.a],null,null)],null,null)},{},{},[])}}]);