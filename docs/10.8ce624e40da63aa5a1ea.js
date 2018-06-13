(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{BCmB:function(n,t,a){"use strict";a.d(t,"a",function(){return e});var l=a("SLNq"),e=(a("Zmtf"),function(){function n(n,t,a){this.sanitizer=n,this.dialog=t,this.a=a,this.dialogRef=null}return n.prototype.sanitizeData=function(n){return n.ok||(n.ok=this.a.t("OK")),n.yes||(n.yes=this.a.t("Yes")),n.no||(n.no=this.a.t("No")),n.content&&(n.content=this.sanitizer.bypassSecurityTrustHtml(n.content)),n.maxWidth||(n.maxWidth="800px"),n.type||(n.type="alert"),n},n.prototype.alert=function(n){this.sanitizeData(n),this.dialogRef=this.dialog.open(l.a,{disableClose:!0,maxWidth:n.maxWidth,data:n}),this.dialogRef.afterClosed().subscribe(function(n){})},n.prototype.confirm=function(n){return n.type="confirm",this.sanitizeData(n),this.dialogRef=this.dialog.open(l.a,{disableClose:!0,maxWidth:n.maxWidth,data:n}),this.dialogRef.afterClosed()},n.prototype.close=function(){this.dialogRef&&this.dialogRef.close()},n}())},L4hN:function(n,t,a){"use strict";a.r(t);var l=a("CcnG"),e=a("Zmtf"),o=a("BCmB"),i=function(){function n(n,t,a,l,e){var o=this;this.sanitizer=t,this.http=a,this.a=l,this.modal=e,this.posts=[],this.slug="",this.title="",this.showLoader=!0,n.data.subscribe(function(n){o.slug=n.slug,"termsandconditions"===o.slug?o.title=o.a.ln.TERMS_AND_CONDITIONS:"student_reminders"===o.slug||"teacher_reminders"===o.slug?o.title=o.a.ln.REMINDER:"policy"===o.slug&&(o.title=o.a.ln.POLICY),o.loadPosts(n.slug)})}return n.prototype.ngOnInit=function(){},n.prototype.loadPosts=function(n){var t=this;this.showLoader=!0,this.http.get(this.a.urlBackend+"/wp-json/wp/v2/posts?categories="+this.a.environment.categories[n]).subscribe(function(n){if(n&&n.length){t.posts=n;for(var a=0,l=n;a<l.length;a++){var e=l[a];e.content.rendered=t.sanitizer.bypassSecurityTrustHtml(e.content.rendered)}}else t.modal.alert({content:t.a.ln.SLUG_IS_EMPTY});t.showLoader=!1},function(n){t.showLoader=!1})},n}(),r=function(){},s=a("xYTU"),u=a("t68o"),c=a("zbXB"),d=a("WqdR"),m=a("NvT6"),f=a("Blfk"),g=a("dWZg"),p=a("Ip0R"),h=a("wFw1"),b=a("ZYCi"),O=a("ZYjt"),k=a("t/Na"),W=l.Ma({encapsulation:0,styles:[["main[_ngcontent-%COMP%]{background:#fff}main[_ngcontent-%COMP%]   .loader[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}main[_ngcontent-%COMP%]   .loader[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%]{margin:.5em}main[_ngcontent-%COMP%]   .posts[_ngcontent-%COMP%]{padding:1em}main[_ngcontent-%COMP%]   .posts[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{padding:.5em}@media screen and (min-width:768px){main[_ngcontent-%COMP%]   .posts[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{padding:1em}}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]{border:1px solid rgba(125,125,125,.1);border-radius:2px}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{margin:0;padding:1em 1.2em .3em;display:flex;justify-content:space-between;align-items:center;font-size:1em}@media screen and (min-width:768px){main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{font-size:1.1em}}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:200}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-weight:500}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{display:flex;align-items:center;color:gray;font-size:.8em}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{height:1em;margin-left:.3em}main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{margin:0;padding:0 1.5em 1em;font-weight:300;font-size:.9em;line-height:1.5em}@media screen and (min-width:768px){main[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{font-size:.95em}}"]],data:{}});function _(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,4,"div",[["class","loader"]],null,null,null,null,null)),(n()(),l.Oa(1,0,null,null,1,"mat-spinner",[["class","mat-spinner mat-progress-spinner"],["mode","indeterminate"],["role","progressbar"]],[[2,"_mat-animation-noopable",null],[4,"width","px"],[4,"height","px"]],null,null,m.b,m.a)),l.Na(2,49152,null,0,f.d,[l.k,g.a,[2,p.c],[2,h.a],f.a],{diameter:[0,"diameter"]},null),(n()(),l.Oa(3,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),l.gb(4,null,["",""]))],function(n,t){n(t,2,0,48)},function(n,t){var a=t.component;n(t,1,0,"NoopAnimations"===l.Ya(t,2)._animationMode,l.Ya(t,2).diameter,l.Ya(t,2).diameter),n(t,4,0,a.a.ln["IN LOADING"])})}function M(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,10,"div",[["class","spacer"]],null,null,null,null,null)),(n()(),l.Oa(1,0,null,null,9,"div",[["class","post"]],null,null,null,null,null)),(n()(),l.Oa(2,0,null,null,7,"a",[["class","header"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,t,a){var e=!0;return"click"===t&&(e=!1!==l.Ya(n,3).onClick(a.button,a.ctrlKey,a.metaKey,a.shiftKey)&&e),e},null,null)),l.Na(3,671744,null,0,b.p,[b.n,b.a,p.j],{routerLink:[0,"routerLink"]},null),(n()(),l.Oa(4,0,null,null,1,"span",[["class","title"]],null,null,null,null,null)),(n()(),l.gb(5,null,["",""])),(n()(),l.Oa(6,0,null,null,3,"span",[["class","icon"]],null,null,null,null,null)),(n()(),l.gb(-1,null,[" View "])),(n()(),l.Oa(8,0,null,null,1,":svg:svg",[["data-prefix","fas"],["role","img"],["viewBox","0 0 448 512"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(n()(),l.Oa(9,0,null,null,0,":svg:path",[["d","M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-64 47.111C384 109.929 370.071 96 352.889 96H220.667c-12.887 0-23.333 10.447-23.333 23.334v14.904c0 13.138 10.843 23.686 23.976 23.324l56.002-1.588L69.908 361.908c-7.858 7.802-7.88 20.504-.05 28.334l19.899 19.899c7.83 7.83 20.532 7.808 28.334-.05l205.935-207.404-1.588 56.003c-.362 13.133 10.186 23.976 23.324 23.976h14.904c12.887 0 23.334-10.447 23.334-23.333V127.111z"],["fill","currentColor"]],null,null,null,null,null)),(n()(),l.Oa(10,0,null,null,0,"div",[["class","content"]],[[8,"innerHTML",1]],null,null,null,null))],function(n,t){n(t,3,0,l.Qa(1,"/post/",t.context.$implicit.id,""))},function(n,t){n(t,2,0,l.Ya(t,3).target,l.Ya(t,3).href),n(t,5,0,t.context.$implicit.title.rendered),n(t,10,0,t.context.$implicit.content.rendered)})}function v(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,2,"div",[["class","posts"]],null,null,null,null,null)),(n()(),l.Fa(16777216,null,null,1,null,M)),l.Na(2,802816,null,0,p.m,[l.N,l.K,l.q],{ngForOf:[0,"ngForOf"]},null)],function(n,t){n(t,2,0,t.component.posts)},null)}function C(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,8,"main",[],null,null,null,null,null)),(n()(),l.Oa(1,0,null,null,2,"header",[],null,null,null,null,null)),(n()(),l.Oa(2,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),l.gb(3,null,["",""])),(n()(),l.Oa(4,0,null,null,4,"section",[],null,null,null,null,null)),(n()(),l.Fa(16777216,null,null,1,null,_)),l.Na(6,16384,null,0,p.n,[l.N,l.K],{ngIf:[0,"ngIf"]},null),(n()(),l.Fa(16777216,null,null,1,null,v)),l.Na(8,16384,null,0,p.n,[l.N,l.K],{ngIf:[0,"ngIf"]},null)],function(n,t){var a=t.component;n(t,6,0,a.showLoader),n(t,8,0,a.posts.length)},function(n,t){n(t,3,0,t.component.title)})}var x=l.Ka("forum-page",i,function(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,1,"forum-page",[],null,null,null,C,W)),l.Na(1,114688,null,0,i,[b.a,O.c,k.c,e.a,o.a],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),P=a("Wf4p"),N=a("M2Lx"),y=a("eDkP"),w=a("Fzqc"),R=a("uGex"),Y=a("vARd"),I=a("lLAP"),L=a("vGXY"),z=a("o3x0"),F=a("jQLj"),K=a("seP3"),j=a("/VYK"),q=a("b716"),X=a("UodH"),S=a("de3e"),A=a("4c35"),T=a("qAlS"),B=a("Z+uX"),D=a("9It4"),G=a("/wvI"),H=a("UO+G");a.d(t,"ForumPageModuleNgFactory",function(){return Z});var Z=l.La(r,[],function(n){return l.Va([l.Wa(512,l.j,l.Aa,[[8,[s.a,s.b,u.a,c.b,c.a,d.a,x]],[3,l.j],l.v]),l.Wa(4608,p.p,p.o,[l.s,[2,p.z]]),l.Wa(4608,k.m,k.s,[p.c,l.z,k.q]),l.Wa(4608,k.t,k.t,[k.m,k.r]),l.Wa(5120,k.a,function(n){return[n]},[k.t]),l.Wa(4608,k.p,k.p,[]),l.Wa(6144,k.n,null,[k.p]),l.Wa(4608,k.l,k.l,[k.n]),l.Wa(6144,k.b,null,[k.l]),l.Wa(4608,k.h,k.o,[k.b,l.p]),l.Wa(4608,k.c,k.c,[k.h]),l.Wa(4608,P.d,P.d,[]),l.Wa(4608,N.c,N.c,[]),l.Wa(4608,y.c,y.c,[y.i,y.e,l.j,y.h,y.f,l.p,l.x,p.c,w.b]),l.Wa(5120,y.j,y.k,[y.c]),l.Wa(5120,R.a,R.b,[y.c]),l.Wa(4608,Y.c,Y.c,[y.c,I.g,l.p,L.a,[3,Y.c],Y.b]),l.Wa(5120,z.c,z.d,[y.c]),l.Wa(4608,z.e,z.e,[y.c,l.p,[2,p.i],[2,z.b],z.c,[3,z.e],y.e]),l.Wa(4608,F.i,F.i,[]),l.Wa(5120,F.a,F.b,[y.c]),l.Wa(4608,P.c,P.v,[[2,P.g],g.a]),l.Wa(4608,o.a,o.a,[O.c,z.e,e.a]),l.Wa(1073742336,p.b,p.b,[]),l.Wa(1073742336,b.q,b.q,[[2,b.v],[2,b.n]]),l.Wa(1073742336,k.e,k.e,[]),l.Wa(1073742336,k.d,k.d,[]),l.Wa(1073742336,K.d,K.d,[]),l.Wa(1073742336,g.b,g.b,[]),l.Wa(1073742336,j.c,j.c,[]),l.Wa(1073742336,q.c,q.c,[]),l.Wa(1073742336,w.a,w.a,[]),l.Wa(1073742336,P.l,P.l,[[2,P.e]]),l.Wa(1073742336,P.u,P.u,[]),l.Wa(1073742336,X.c,X.c,[]),l.Wa(1073742336,N.d,N.d,[]),l.Wa(1073742336,S.c,S.c,[]),l.Wa(1073742336,A.f,A.f,[]),l.Wa(1073742336,T.a,T.a,[]),l.Wa(1073742336,y.g,y.g,[]),l.Wa(1073742336,P.s,P.s,[]),l.Wa(1073742336,P.q,P.q,[]),l.Wa(1073742336,R.d,R.d,[]),l.Wa(1073742336,Y.f,Y.f,[]),l.Wa(1073742336,f.c,f.c,[]),l.Wa(1073742336,z.k,z.k,[]),l.Wa(1073742336,I.a,I.a,[]),l.Wa(1073742336,F.j,F.j,[]),l.Wa(1073742336,P.w,P.w,[]),l.Wa(1073742336,P.n,P.n,[]),l.Wa(1073742336,B.b,B.b,[]),l.Wa(1073742336,D.a,D.a,[]),l.Wa(1073742336,G.a,G.a,[]),l.Wa(1073742336,H.a,H.a,[]),l.Wa(1073742336,r,r,[]),l.Wa(256,k.q,"XSRF-TOKEN",[]),l.Wa(256,k.r,"X-XSRF-TOKEN",[]),l.Wa(256,P.f,P.i,[]),l.Wa(1024,b.l,function(){return[[{path:"",component:i}]]},[])])})},NvT6:function(n,t,a){"use strict";a.d(t,"a",function(){return e}),a.d(t,"b",function(){return o});var l=a("CcnG");a("Blfk"),a("Fzqc"),a("Wf4p"),a("dWZg"),a("Ip0R"),a("wFw1");var e=l.Ma({encapsulation:2,styles:[".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2s linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4s;animation-timing-function:cubic-bezier(.35,0,.25,1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10s cubic-bezier(.87,.03,.33,1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.60617px;transform:rotate(0)}12.5%{stroke-dashoffset:56.54867px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.60617px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.54867px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.60617px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.54867px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.60617px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.54867px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}"],data:{}});function o(n){return l.ib(2,[(n()(),l.Oa(0,0,null,null,1,":svg:svg",[["focusable","false"],["preserveAspectRatio","xMidYMid meet"]],[[4,"width","px"],[4,"height","px"],[1,"viewBox",0]],null,null,null,null)),(n()(),l.Oa(1,0,null,null,0,":svg:circle",[["cx","50%"],["cy","50%"]],[[1,"r",0],[4,"animation-name",null],[4,"stroke-dashoffset","px"],[4,"stroke-dasharray","px"],[4,"stroke-width","%"]],null,null,null,null))],null,function(n,t){var a=t.component;n(t,0,0,a.diameter,a.diameter,a._viewBox),n(t,1,0,a._circleRadius,"mat-progress-spinner-stroke-rotate-"+a.diameter,a._strokeDashOffset,a._strokeCircumference,a._circleStrokeWidth)})}},SLNq:function(n,t,a){"use strict";a.d(t,"a",function(){return l});var l=function(n,t){this.dialogRef=n,this.data=t}},"UO+G":function(n,t,a){"use strict";a.d(t,"a",function(){return l});var l=function(){}},WqdR:function(n,t,a){"use strict";var l=a("CcnG"),e=a("o3x0"),o=a("bujt"),i=a("UodH"),r=a("dWZg"),s=a("lLAP"),u=a("wFw1"),c=a("Ip0R"),d=a("SLNq");a.d(t,"a",function(){return O});var m=l.Ma({encapsulation:0,styles:[[""]],data:{}});function f(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,2,"h1",[["class","mat-dialog-title"],["mat-dialog-title",""]],[[8,"id",0]],null,null,null,null)),l.Na(1,81920,null,0,e.m,[[2,e.l],l.k,e.e],null,null),(n()(),l.gb(2,null,["",""]))],function(n,t){n(t,1,0)},function(n,t){var a=t.component;n(t,0,0,l.Ya(t,1).id),n(t,2,0,a.data.title)})}function g(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,3,"button",[["cdkFocusInitial",""],["mat-button",""],["type","button"]],[[8,"disabled",0],[2,"_mat-animation-noopable",null],[1,"aria-label",0]],[[null,"click"]],function(n,t,a){var e=!0;return"click"===t&&(e=!1!==l.Ya(n,2).dialogRef.close(l.Ya(n,2).dialogResult)&&e),e},o.b,o.a)),l.Na(1,180224,null,0,i.b,[l.k,r.a,s.e,[2,u.a]],null,null),l.Na(2,606208,null,0,e.g,[[2,e.l],l.k,e.e],{dialogResult:[0,"dialogResult"]},null),(n()(),l.gb(3,0,["",""]))],function(n,t){n(t,2,0,!0)},function(n,t){var a=t.component;n(t,0,0,l.Ya(t,1).disabled||null,"NoopAnimations"===l.Ya(t,1)._animationMode,l.Ya(t,2).ariaLabel),n(t,3,0,a.data.ok)})}function p(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,3,"button",[["cdkFocusInitial",""],["mat-button",""],["type","button"]],[[8,"disabled",0],[2,"_mat-animation-noopable",null],[1,"aria-label",0]],[[null,"click"]],function(n,t,a){var e=!0;return"click"===t&&(e=!1!==l.Ya(n,2).dialogRef.close(l.Ya(n,2).dialogResult)&&e),e},o.b,o.a)),l.Na(1,180224,null,0,i.b,[l.k,r.a,s.e,[2,u.a]],null,null),l.Na(2,606208,null,0,e.g,[[2,e.l],l.k,e.e],{dialogResult:[0,"dialogResult"]},null),(n()(),l.gb(3,0,["",""]))],function(n,t){n(t,2,0,!0)},function(n,t){var a=t.component;n(t,0,0,l.Ya(t,1).disabled||null,"NoopAnimations"===l.Ya(t,1)._animationMode,l.Ya(t,2).ariaLabel),n(t,3,0,a.data.yes)})}function h(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,3,"button",[["cdkFocusInitial",""],["mat-button",""],["type","button"]],[[8,"disabled",0],[2,"_mat-animation-noopable",null],[1,"aria-label",0]],[[null,"click"]],function(n,t,a){var e=!0;return"click"===t&&(e=!1!==l.Ya(n,2).dialogRef.close(l.Ya(n,2).dialogResult)&&e),e},o.b,o.a)),l.Na(1,180224,null,0,i.b,[l.k,r.a,s.e,[2,u.a]],null,null),l.Na(2,606208,null,0,e.g,[[2,e.l],l.k,e.e],{dialogResult:[0,"dialogResult"]},null),(n()(),l.gb(3,0,["",""]))],function(n,t){n(t,2,0,!1)},function(n,t){var a=t.component;n(t,0,0,l.Ya(t,1).disabled||null,"NoopAnimations"===l.Ya(t,1)._animationMode,l.Ya(t,2).ariaLabel),n(t,3,0,a.data.no)})}function b(n){return l.ib(0,[(n()(),l.Fa(16777216,null,null,1,null,f)),l.Na(1,16384,null,0,c.n,[l.N,l.K],{ngIf:[0,"ngIf"]},null),(n()(),l.Oa(2,0,null,null,2,"div",[["class","mat-dialog-content"],["mat-dialog-content",""]],null,null,null,null,null)),l.Na(3,16384,null,0,e.j,[],null,null),(n()(),l.Oa(4,0,null,null,0,"p",[],[[8,"innerHTML",1]],null,null,null,null)),(n()(),l.Oa(5,0,null,null,7,"mat-dialog-actions",[["align","end"],["class","mat-dialog-actions"]],null,null,null,null,null)),l.Na(6,16384,null,0,e.f,[],null,null),(n()(),l.Fa(16777216,null,null,1,null,g)),l.Na(8,16384,null,0,c.n,[l.N,l.K],{ngIf:[0,"ngIf"]},null),(n()(),l.Fa(16777216,null,null,1,null,p)),l.Na(10,16384,null,0,c.n,[l.N,l.K],{ngIf:[0,"ngIf"]},null),(n()(),l.Fa(16777216,null,null,1,null,h)),l.Na(12,16384,null,0,c.n,[l.N,l.K],{ngIf:[0,"ngIf"]},null)],function(n,t){var a=t.component;n(t,1,0,null==a.data?null:a.data.title),n(t,8,0,"alert"==a.data.type),n(t,10,0,"confirm"==a.data.type),n(t,12,0,"confirm"==a.data.type)},function(n,t){n(t,4,0,t.component.data.content)})}var O=l.Ka("dialog-component",d.a,function(n){return l.ib(0,[(n()(),l.Oa(0,0,null,null,1,"dialog-component",[],null,null,null,b,m)),l.Na(1,49152,null,0,d.a,[e.l,e.a],null,null)],null,null)},{},{},[])}}]);