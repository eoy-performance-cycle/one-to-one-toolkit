/* The Performance One-to-One Toolkit: shared practice engine.
   Each activity page defines window.ACT (content) and loads config.js, then this file. */
(function(){
"use strict";
var A = window.ACT, CFG = window.SBI_CONFIG || {};
var DOMAIN = (CFG.emailDomain || "floward.com").toLowerCase();
var TRACK = (CFG.trackUrl || "").replace(/\/$/,"");
var LIVE = !!TRACK, lang = "en";

var CSS = ':root{--teal:#00677F;--teal6:#005063;--teal7:#003C4A;--teal50:#E6F0F2;--teal100:#C2DBE0;--ivory:#FFFBF5;--ivory200:#F7F0E6;--ivory300:#EDE3D4;--char:#181817;--char4:#5C5C56;--char2:#A4A4A0;--char1:#C8C8C5;--orange:#FD622A;--mag:#E31C79;--mag50:#FDEAF2;--display:"Playfair Display",Georgia,serif;--body:"Inter","Helvetica Neue",Arial,sans-serif}'
+'html[lang="ar"]{--display:"Tajawal","Noto Sans Arabic",Tahoma,sans-serif;--body:"Noto Sans Arabic",Tahoma,sans-serif}'
+'*{box-sizing:border-box;margin:0;padding:0}html,body{background:var(--ivory)}'
+'body{font-family:var(--body);color:var(--char);font-size:17px;line-height:1.6;letter-spacing:-.011em;-webkit-font-smoothing:antialiased;min-height:100vh}html[lang="ar"] body{letter-spacing:0}'
+'button,input{font:inherit;color:inherit;letter-spacing:inherit}h1,h2{font-family:var(--display);font-weight:400}html[lang="ar"] h1,html[lang="ar"] h2{font-weight:500;letter-spacing:0;line-height:1.35}'
+'h1{font-size:40px;line-height:1.08;letter-spacing:-.015em}h2{font-size:28px;line-height:1.18;letter-spacing:-.01em}'
+'.eyebrow{font-weight:500;font-size:12px;line-height:1.4;letter-spacing:.14em;text-transform:uppercase;color:var(--char4)}html[lang="ar"] .eyebrow{letter-spacing:0;font-size:14px;text-transform:none}'
+'.muted{color:var(--char4)}.small{font-size:15px;line-height:1.5}'
+'.top{position:sticky;top:0;z-index:5;background:var(--teal);color:var(--ivory)}.top-in{max-width:680px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:14px 20px;gap:12px}'
+'.wordmark{width:112px;height:auto;display:block;color:var(--ivory)}.lang{display:flex;border:1px solid rgba(255,251,245,.5);border-radius:999px;overflow:hidden}'
+'.lang button{background:none;border:0;color:var(--ivory);padding:6px 14px;font-size:14px;cursor:pointer;min-height:36px}.lang button[aria-pressed="true"]{background:var(--ivory);color:var(--teal);font-weight:500}'
+'.prog{max-width:680px;margin:0 auto;padding:16px 20px 0;display:flex;align-items:center;gap:6px}.prog[hidden]{display:none}.prog i{flex:1;height:4px;border-radius:4px;background:var(--char1)}.prog i.done{background:var(--teal)}.prog i.on{background:var(--mag)}.prog span{font-size:13px;color:var(--char4);margin-inline-start:8px;white-space:nowrap}'
+'main{max-width:680px;margin:0 auto;padding:24px 20px 56px}.screen{display:none}.screen.active{display:block}.stack>*+*{margin-top:16px}.section{margin-top:28px}'
+'.hero{background:var(--teal);color:var(--ivory);margin:-24px -20px 0;padding:32px 20px 36px}.hero .eyebrow{color:var(--ivory);opacity:.85}.hero h1{font-size:46px;margin-top:10px}html[lang="ar"] .hero h1{font-size:40px}.hero p{margin-top:12px;font-weight:300;font-size:19px;max-width:30em}html[lang="ar"] .hero p{font-weight:400}'
+'.how{list-style:none;display:grid;gap:12px;counter-reset:h}.how li{display:flex;gap:14px;align-items:flex-start;font-size:16px;line-height:1.5}.how li::before{counter-increment:h;content:counter(h);flex:none;width:32px;height:32px;border-radius:50%;border:1.5px solid var(--teal);color:var(--teal);display:flex;align-items:center;justify-content:center;font-family:"Playfair Display",Georgia,serif;font-size:17px}'
+'.field label{display:block;font-weight:500;font-size:15px;margin-bottom:8px}input[type=email]{width:100%;background:#fff;border:1.5px solid var(--char1);border-radius:10px;padding:14px 16px;font-size:17px;outline:none;direction:ltr;text-align:start}html[lang="ar"] input[type=email]{text-align:right}input[type=email]:focus{border-color:var(--teal)}input[aria-invalid="true"]{border-color:var(--orange)}'
+'.err{display:none;color:var(--char);font-size:15px;margin-top:8px}.err.show{display:block}.hint{font-size:14px;color:var(--char4);margin-top:6px}'
+'.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:12px 24px;border-radius:999px;border:1.5px solid var(--teal);background:var(--teal);color:var(--ivory);font-weight:500;font-size:16px;cursor:pointer;text-decoration:none}.btn:hover{background:var(--teal6)}.btn:disabled{opacity:.4;cursor:not-allowed}.btn.ghost{background:transparent;color:var(--teal)}.btn.ghost:hover{background:var(--teal50)}.btn.block{width:100%}'
+':focus-visible{outline:3px solid var(--teal);outline-offset:2px}.top :focus-visible{outline-color:var(--ivory)}'
+'.dates{display:flex;gap:10px;align-items:center;background:var(--ivory200);border-radius:12px;padding:12px 14px;font-size:15px}.dates b{font-weight:500}.lead{font-size:16px;color:var(--char4);margin-top:8px}'
+'.card{background:#fff;border:1px solid var(--ivory300);border-radius:14px;padding:14px 16px}.list{list-style:none;display:grid;gap:10px}'
+'.who{display:flex;gap:12px;align-items:center}.av{width:40px;height:40px;border-radius:50%;background:var(--teal);color:var(--ivory);display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:18px;flex:none}.who b{font-weight:500;display:block;line-height:1.3}.who small{display:block;font-size:13px;color:var(--char4)}'
+'.case .t{font-size:16px;line-height:1.5;margin-top:10px}.seg{display:flex;gap:8px;margin-top:12px}.seg button{flex:1;min-height:42px;border-radius:999px;border:1.5px solid var(--char1);background:var(--ivory);font-size:14px;cursor:pointer;padding:6px 10px}.seg button[aria-pressed="true"]{background:var(--mag);border-color:var(--mag);color:var(--ivory)}.seg button:disabled{cursor:default}.seg button.rec{box-shadow:0 0 0 2px var(--teal)}'
+'.fb{font-size:15px;line-height:1.5;margin-top:10px;padding:10px 12px;border-radius:10px;background:var(--ivory200)}.tag{display:inline-block;font-size:12px;font-weight:500;padding:2px 9px;border-radius:999px;margin-inline-end:6px;vertical-align:1px}.tag.ok{background:var(--teal);color:var(--ivory)}.tag.no{background:var(--ivory);color:var(--char);border:1px solid var(--char2)}.tag.you{background:var(--mag);color:var(--ivory)}'
+'.ord{display:flex;align-items:center;gap:12px}.ord .n{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--teal);color:var(--teal);display:flex;align-items:center;justify-content:center;font-family:"Playfair Display",Georgia,serif;flex:none}.ord .t{flex:1;font-size:16px;line-height:1.4}.ord .k{font-size:12px;font-weight:500;color:var(--teal);display:block}'
+'.mv{display:flex;flex-direction:column;gap:4px}.mv button{width:36px;height:30px;border-radius:8px;border:1px solid var(--char1);background:var(--ivory);cursor:pointer;display:flex;align-items:center;justify-content:center}.mv button:disabled{opacity:.3;cursor:default}.ord.good .n{background:var(--teal);color:var(--ivory)}.ord .want{font-size:13px;color:var(--char4)}'
+'.say{background:var(--ivory300);border-radius:16px;border-end-start-radius:4px;padding:14px 18px;font-family:var(--display);font-size:21px;line-height:1.4;margin-top:10px;display:inline-block}html[lang="ar"] .say{font-size:19px;line-height:1.7}.prev{font-size:15px;color:var(--char4);border-inline-start:3px solid var(--teal100);padding-inline-start:12px;margin-top:14px}'
+'.pick{display:flex;gap:12px;align-items:flex-start;width:100%;background:#fff;border:1.5px solid var(--char1);border-radius:14px;padding:14px 16px;cursor:pointer;text-align:start;font-size:16px;line-height:1.45}.pick .box{width:22px;height:22px;border-radius:50%;border:1.5px solid var(--char2);flex:none;margin-top:1px;display:flex;align-items:center;justify-content:center}'
+'.pick[aria-pressed="true"]{border-color:var(--mag);box-shadow:inset 0 0 0 1px var(--mag)}.pick[aria-pressed="true"] .box{background:var(--mag);border-color:var(--mag)}.pick[aria-pressed="true"] .box::after{content:"";width:8px;height:8px;border-radius:50%;background:#fff}.pick:disabled{cursor:default}.pick.rec{border-color:var(--teal);box-shadow:inset 0 0 0 1px var(--teal)}.pick .w{display:block;font-size:14px;color:var(--char4);margin-top:8px}.row2{display:grid;gap:10px}'
+'.done-hero{background:var(--teal);color:var(--ivory);border-radius:16px;padding:26px 22px}.done-hero .eyebrow{color:var(--ivory);opacity:.85}.res{list-style:none;display:grid;gap:10px}.res li{display:flex;justify-content:space-between;align-items:center;gap:12px;background:#fff;border:1px solid var(--ivory300);border-radius:12px;padding:12px 14px;font-size:15px}.res .v{font-family:"Playfair Display",Georgia,serif;font-size:22px;color:var(--teal);white-space:nowrap}'
+'.take{list-style:none;display:grid;gap:10px}.take li{display:flex;gap:10px;font-size:16px;line-height:1.5}.take li::before{content:"";flex:none;width:8px;height:8px;border-radius:50%;background:var(--teal);margin-top:9px}'
+'.toast{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%) translateY(20px);background:var(--char);color:var(--ivory);padding:10px 18px;border-radius:999px;font-size:15px;opacity:0;transition:opacity .25s,transform .25s;pointer-events:none;z-index:20}.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}'
+'.preview{position:fixed;inset-inline-end:12px;bottom:12px;font-size:12px;background:var(--ivory300);color:var(--char4);padding:4px 10px;border-radius:999px;z-index:15}.reveal{animation:up .45s ease both}@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}@media (min-width:700px){.hero{border-radius:0 0 20px 20px}}';

var WM='<svg class="wordmark" viewBox="370 724 1660 309" fill="currentColor" role="img" aria-label="Floward"><path d="M595.67,1027.52v-301.43h-26.41v305.54h150.61v-28.01c-39.47,15.79-81.59,23.9-124.1,23.9h-.11,0ZM370.2,1031.63h26.41v-181.71h.11c42.51,0,84.63,8.11,124.1,23.9v-28.01h-124.2v-115.61h.11c42.51,0,84.63,8.11,124.1,23.9v-28.01h-150.61v305.54h-.02,0ZM859.25,724.49c-84.76-.4-153.95,68.72-154.18,154.02-.24,85.34,68.09,154.26,153.15,154.48,84.43.22,153.84-69.22,154-154.05.16-85.12-68.12-154.06-152.97-154.46h0ZM985.58,939.56c-9.21,36.63-30.47,63.45-67.03,75.79-24.22,8.17-48.84,6.99-73.11-.87-28.4-9.19-51.86-25.83-71.5-48.03-23.38-26.42-38.37-56.99-44.2-91.84-1.37-8.16-1.67-16.49-2.11-21.06.37-32.44,7.57-58.93,26.35-81.2,18.39-21.79,42.21-33.56,70.72-35.26,38.6-2.29,71.53,11.75,100.43,36.23,26.63,22.57,45.24,50.74,56.07,83.92,8.81,27,11.36,54.58,4.39,82.31h-.01ZM1696.82,934.14c-27.93-18.7-64.04-33.05-65.89-69.11h48.73c32.36,0,71.96-18.71,71.96-68.23,0-59.13-52.51-70.71-80.59-70.71h-99.87v305.54h26.39v-302.29h59.3c88.09,0,87.58,132.44,4.77,132.45h-33.96c0,92.81,110.55,93.71,109.97,169.7h29.06c0-55.07-37.34-75.56-69.87-97.35h0ZM1883.46,726.05h-73.81v305.58h65.18c106.03,0,154.95-86.31,154.95-155.56,0-63.72-50.61-148.67-146.32-150.02h0ZM1877.19,1028.38h-41.15v-299.05h42.26c53.44,0,119.31,54.76,119.31,144.94,0,97.24-60.85,154.11-120.42,154.11h0ZM1332.85,726.09l-66.49,264.09-1.68-3.32-68.9-260.77h-18.91c0,20.03-2.23,39.99-6.65,59.52l-46.6,205.88-72.2-265.4h-29.9l84.09,305.54h19.67c0-22.7,2.54-45.32,7.58-67.45l45.07-198,1.54,3.11,67.04,262.34h21.13c0-22.68,2.8-45.28,8.34-67.27l60.03-238.27h-3.16,0ZM1408.94,726.09c0,28.51-4.75,56.83-14.04,83.79l-76.48,221.75h3.77l34.78-102.9,3.07-3.31h109.08l2.92,3.02,38.61,103.19h29.06l-118.68-305.54h-12.11.02ZM1359.48,922.26l51.09-147.96,58.96,147.96h-110.05,0Z"/></svg>';

var T={
en:{how:"How it works",email:"Your Floward email",privacy:"We record your email and choices to track participation in this practice. The people in it are fictional, so please do not enter real employee details.",
 start:"Start",dates:"1:1 meetings run <b>29 Nov to 5 Dec</b>.",e_empty:"Please enter your Floward email.",e_format:"That doesn't look like an email address.",e_domain:"Please use your @floward.com email.",
 step:"Step {n} of {t}",check:"See the recommendation",cont:"Continue",finish:"See my summary",reco:"Recommended",you:"Your choice",up:"Move up",down:"Move down",
 match:"{n} of {t} match the recommendation.",inplace:"{n} of {t} in the recommended place.",recpos:"Recommended position {n}",
 dn_eb:"Your practice",dn_t:"Summary",dn_note:"The numbers show how closely your choices match the recommendation. They are not a pass or fail score.",dn_take:"Take this into your 1:1 meeting",hub:"Back to the series",
 saveFail:"We couldn't save your progress. You can keep going.",pickone:"Choose one"},
ar:{how:"كيف يعمل التمرين",email:"بريدك الإلكتروني في فلاورد",privacy:"نسجّل بريدك الإلكتروني واختياراتك لمتابعة المشاركة في هذا التمرين. الأشخاص هنا افتراضيون، لذا يُرجى عدم إدخال بيانات موظفين حقيقيين.",
 start:"ابدأ",dates:"تُعقد الاجتماعات الفردية <b>من 29 نوفمبر إلى 5 ديسمبر</b>.",e_empty:"يُرجى إدخال بريدك الإلكتروني في فلاورد.",e_format:"يبدو أن هذا ليس بريدًا إلكترونيًا صحيحًا.",e_domain:"يُرجى استخدام بريدك المنتهي بـ ‎@floward.com",
 step:"الخطوة {n} من {t}",check:"اعرض التوصية",cont:"متابعة",finish:"اعرض الملخص",reco:"التوصية",you:"اختيارك",up:"إلى الأعلى",down:"إلى الأسفل",
 match:"{n} من {t} تتوافق مع التوصية.",inplace:"{n} من {t} في المكان الموصى به.",recpos:"الموضع الموصى به {n}",
 dn_eb:"تمرينك",dn_t:"الملخص",dn_note:"الأرقام توضّح مدى توافق اختياراتك مع التوصية، وليست درجة نجاح أو رسوب.",dn_take:"خذ هذا معك إلى اجتماعك الفردي",hub:"العودة إلى السلسلة",
 saveFail:"تعذّر حفظ تقدمك. يمكنك المتابعة.",pickone:"اختر إجابة واحدة"}};

/* ---------- helpers ---------- */
function $(s,c){ return (c||document).querySelector(s); }
function $$(s,c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function fmt(s,o){ return s.replace(/\{(\w+)\}/g,function(_,k){return o[k];}); }
function L(o){ return o==null?"":(typeof o==="string"?o:(o[lang]||o.en)); }
function by(l,id){ return l.filter(function(x){return x.id===id;})[0]; }
function ids(l){ return l.map(function(x){return x.id;}); }
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var x=a[i];a[i]=a[j];a[j]=x; } return a; }
function scrambled(l){ var o; do{ o=shuffle(l); } while(l.length>1 && o.join()===l.join()); return o; }
function toast(m){ var t=$("#toast"); t.textContent=m; t.classList.add("show"); clearTimeout(toast._t); toast._t=setTimeout(function(){t.classList.remove("show");},2400); }
function ini(n){ return (n||"?").trim().charAt(0); }
var ARW={up:'<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" fill="none" stroke="#00677F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 dn:'<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="#00677F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};

/* ---------- state ---------- */
var N=A.steps.length;
function fresh(){ var s={ session:null, email:"", startedAt:null, screen:"welcome", idx:0, a:{} };
  A.steps.forEach(function(p){ var a={done:false};
    if(p.type==="binary"){ a.v={}; a.order=shuffle(ids(p.items)); }
    if(p.type==="order"){ a.order=scrambled(ids(p.items)); }
    if(p.type==="choice"){ a.v=null; a.order=shuffle(ids(p.opts)); }
    s.a[p.id]=a; }); return s; }
var st=fresh();
function cur(){ return A.steps[st.idx]; }

/* ---------- data layer (insert-only, never blocks) ---------- */
function uuid(){ if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=Math.random()*16|0;return (c==="x"?r:(r&3|8)).toString(16);}); }
var warned=false, sessionReady=Promise.resolve();
function post(table,row){
  if(!LIVE){ if(window.console) console.info("[Preview, not saved]",table,row); return Promise.resolve(true); }
  return fetch(TRACK+"/"+table,{ method:"POST", keepalive:true, headers:{ "Content-Type":"text/plain;charset=UTF-8" }, body:JSON.stringify(row) })
    .then(function(r){ if(!r.ok) throw new Error(r.status); return true; })
    .catch(function(e){ if(!warned){ warned=true; toast(T[lang].saveFail); } if(window.console) console.warn("Save failed",table,e); return false; });
}
function track(type,step,payload){ if(!st.session) return;
  var row={ session_id:st.session, activity_id:A.id, event_type:type, step:step||null, payload:payload||{}, lang:lang };
  sessionReady.then(function(){ post("events",row); }); }
function startSession(step){
  st.session=uuid(); st.startedAt=new Date().toISOString();
  sessionReady=post("sessions",{ id:st.session, activity_id:A.id, email:st.email, lang:lang, user_agent:(navigator.userAgent||"").slice(0,300) });
  sessionReady.then(function(){ post("events",{ session_id:st.session, activity_id:A.id, event_type:"session_started", step:step, payload:{}, lang:lang }); });
}

/* ---------- scoring ---------- */
function score(p){ var a=st.a[p.id];
  if(p.type==="binary"){ var n=0; p.items.forEach(function(it){ if(a.v[it.id]===it.rec) n++; }); return [n,p.items.length]; }
  if(p.type==="order"){ var m=0, rl=ids(p.items); a.order.forEach(function(id,i){ if(rl[i]===id) m++; }); return [m,p.items.length]; }
  var o=a.v&&by(p.opts,a.v); return [o&&o.rec?1:0,1]; }
function ready(p){ var a=st.a[p.id];
  if(p.type==="binary") return Object.keys(a.v).length===p.items.length;
  if(p.type==="choice") return !!a.v; return true; }

/* ---------- render ---------- */
function whoHTML(w){ if(!w) return ""; return '<div class="who"><div class="av" aria-hidden="true">'+esc(ini(L(w.name)))+'</div><div><b>'+esc(L(w.name))+'</b><small>'+esc(L(w.role))+'</small></div></div>'; }
function renderStep(){
  var p=cur(), a=st.a[p.id], t=T[lang], done=a.done, h='';
  h+='<div class="eyebrow">'+esc(fmt(t.step,{n:st.idx+1,t:N}))+'</div><h2 id="st-h" style="margin-top:6px">'+esc(L(p.title))+'</h2>';
  if(p.lead) h+='<p class="lead">'+esc(L(p.lead))+'</p>';
  if(p.type==="binary"){
    h+='<ul class="list section">'+a.order.map(function(id){ var it=by(p.items,id), v=a.v[id];
      var r='<li class="card case">'+whoHTML(it.who)+'<div class="t">'+esc(L(it.text))+'</div><div class="seg" role="group">'+p.opts.map(function(o){
        return '<button type="button" data-bin="'+id+'" data-v="'+o.id+'" aria-pressed="'+(v===o.id)+'"'+(done&&it.rec===o.id?' class="rec"':'')+(done?' disabled':'')+'>'+esc(L(o))+'</button>'; }).join("")+'</div>';
      if(done){ var ro=by(p.opts,it.rec); r+='<div class="fb reveal"><span class="tag '+(v===it.rec?'ok':'no')+'">'+esc(t.reco)+': '+esc(L(ro))+'</span>'+esc(L(it.why))+'</div>'; }
      return r+'</li>'; }).join("")+'</ul>';
    if(done){ var s=score(p); h+='<div class="dates section"><b>'+esc(fmt(t.match,{n:s[0],t:s[1]}))+'</b></div>'; }
  }
  if(p.type==="order"){
    var rl=ids(p.items);
    if(p.context) h+='<div class="card section">'+whoHTML(p.context.who)+'<p class="small muted" style="margin-top:8px">'+esc(L(p.context.text))+'</p></div>';
    h+='<ol class="list section">'+a.order.map(function(id,i){ var x=by(p.items,id), good=done&&rl[i]===id;
      return '<li class="card ord'+(good?' good':'')+'"><div class="n">'+(i+1)+'</div><div class="t">'+(done&&x.k?'<span class="k">'+esc(L(x.k))+'</span>':'')+esc(L(x))+(done&&!good?'<div class="want">'+esc(fmt(t.recpos,{n:rl.indexOf(id)+1}))+'</div>':'')+'</div>'
       +(done?'':'<div class="mv"><button type="button" data-mv="'+i+'" data-d="-1" aria-label="'+esc(t.up+": "+L(x))+'"'+(i===0?' disabled':'')+'>'+ARW.up+'</button><button type="button" data-mv="'+i+'" data-d="1" aria-label="'+esc(t.down+": "+L(x))+'"'+(i===a.order.length-1?' disabled':'')+'>'+ARW.dn+'</button></div>')+'</li>'; }).join("")+'</ol>';
    if(done){ var s2=score(p); h+='<div class="card section reveal"><div class="eyebrow" style="color:var(--teal)">'+esc(t.reco)+'</div><p style="margin-top:8px;font-family:var(--display);font-size:19px;line-height:1.5">'+esc(p.items.map(function(x){return L(x);}).join(" "))+'</p><p class="small muted" style="margin-top:10px">'+esc(L(p.why))+'</p></div><div class="dates section"><b>'+esc(fmt(t.inplace,{n:s2[0],t:s2[1]}))+'</b></div>'; }
  }
  if(p.type==="choice"){
    h+='<div class="section">';
    if(p.prev) h+='<div class="prev">'+esc(L(p.prev))+'</div>';
    h+='<div style="margin-top:14px">'+whoHTML(p.who)+'</div><div class="say"'+(p.act?' style="font-style:italic"':'')+'>'+(p.act?'':'&ldquo;')+esc(L(p.said))+(p.act?'':'&rdquo;')+'</div></div>';
    h+='<div class="section"><div style="font-weight:500;margin-bottom:12px">'+esc(L(p.ask))+'</div><div class="row2" role="radiogroup">'+a.order.map(function(id){ var o=by(p.opts,id), on=a.v===id;
      var r='<button type="button" class="pick'+(done&&o.rec?' rec':'')+'" data-ch="'+id+'" role="radio" aria-checked="'+on+'" aria-pressed="'+on+'"'+(done?' disabled':'')+'><span class="box"></span><span>&ldquo;'+esc(L(o))+'&rdquo;';
      if(done) r+='<span class="w">'+(o.rec?'<span class="tag ok">'+esc(t.reco)+'</span>':'')+(on&&!o.rec?'<span class="tag you">'+esc(t.you)+'</span>':'')+'<span class="tag no">'+esc(L(o.tag))+'</span> '+esc(L(o.why))+'</span>';
      return r+'</span></button>'; }).join("")+'</div></div>';
  }
  if(!done) h+='<button class="btn block section" id="chk"'+(ready(p)?'':' disabled')+'>'+esc(t.check)+'</button>';
  else h+='<button class="btn block section" id="next">'+esc(st.idx<N-1?t.cont:t.finish)+'</button>';
  $("#scr-step").innerHTML=h;
}
function renderDone(){
  var t=T[lang], h='<div class="done-hero"><div class="eyebrow">'+esc(t.dn_eb)+'</div><h1 id="dn-h" style="margin-top:8px">'+esc(L(A.doneTitle)||t.dn_t)+'</h1></div><ul class="res section">';
  A.steps.forEach(function(p){ var s=score(p); h+='<li><span>'+esc(L(p.label))+'</span><span class="v">'+s[0]+'/'+s[1]+'</span></li>'; });
  h+='</ul><p class="small muted" style="margin-top:10px">'+esc(t.dn_note)+'</p>';
  h+='<div class="section"><div class="eyebrow">'+esc(t.dn_take)+'</div><ul class="take" style="margin-top:12px">'+(A.take[lang]||A.take.en).map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul></div>';
  h+='<div class="section stack">'+(A.other?'<a class="btn block" href="'+A.other.href+(lang==="ar"?"?lang=ar":"")+'">'+esc(L(A.other))+'</a>':'')+'<a class="btn ghost block" href="../'+(lang==="ar"?"?lang=ar":"")+'">'+esc(t.hub)+'</a></div>';
  $("#scr-done").innerHTML=h;
}
function renderWelcome(){
  var t=T[lang];
  $("#w-eb").textContent=L(A.kit); $("#w-h").textContent=L(A.title); $("#w-l").textContent=L(A.lead);
  $("#w-how-h").textContent=t.how; $("#w-how").innerHTML=(A.how[lang]||A.how.en).map(function(x){return '<li>'+esc(x)+'</li>';}).join("");
  $("#w-em").textContent=t.email; $("#w-pr").textContent=t.privacy; $("#startBtn").textContent=t.start; $("#w-dt").innerHTML=t.dates+" "+esc(L(A.time));
  document.title=L(A.title)+" | "+L(A.kit);
}
function renderProg(){
  var pr=$("#prog"), on=st.screen==="step"; pr.hidden=!on; if(!on) return;
  var s=""; for(var i=0;i<N;i++) s+='<i class="'+(i<st.idx?'done':(i===st.idx?'on':''))+'"></i>';
  pr.innerHTML=s+'<span>'+esc(fmt(T[lang].step,{n:st.idx+1,t:N}))+'</span>';
}
function show(name,opts){
  st.screen=name; $$(".screen").forEach(function(s){ s.classList.remove("active"); });
  if(name==="step") renderStep(); if(name==="done") renderDone(); if(name==="welcome") renderWelcome();
  $("#scr-"+name).classList.add("active"); renderProg();
  if(!(opts&&opts.keep)) window.scrollTo(0,0);
  if(!(opts&&opts.silent)){ $("#main").focus({preventScroll:true}); track("step_viewed",name==="step"?cur().id:name,{}); }
}
function setLang(l){
  if(l===lang) return; lang=l; document.documentElement.lang=l; document.documentElement.dir=l==="ar"?"rtl":"ltr";
  $$(".lang button").forEach(function(b){ b.setAttribute("aria-pressed",String(b.getAttribute("data-lang")===l)); });
  renderWelcome(); show(st.screen,{silent:true}); track("lang_changed",st.screen,{lang:l});
}
function submit(){
  var now=new Date(), items={}, parts=[];
  A.steps.forEach(function(p){ var a=st.a[p.id], s=score(p); items[p.id]={ match:s[0], of:s[1], answer:p.type==="binary"?a.v:(p.type==="order"?a.order:a.v) }; parts.push(p.id+" "+s[0]+"/"+s[1]); });
  var row={ session_id:st.session, activity_id:A.id, email:st.email, lang:lang, final_statement:parts.join(", ").slice(0,6000), quiz:items,
    started_at:st.startedAt, duration_seconds:Math.max(0,Math.min(86400,Math.round((now-new Date(st.startedAt))/1000))) };
  sessionReady.then(function(){ post("submissions",row); track("completed","done",{}); });
}

/* ---------- build page ---------- */
document.documentElement.lang="en"; document.documentElement.dir="ltr";
var stEl=document.createElement("style"); stEl.textContent=CSS; document.head.appendChild(stEl);
var fl=document.createElement("link"); fl.rel="stylesheet"; fl.href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400&family=Tajawal:wght@500&family=Noto+Sans+Arabic:wght@400;500&display=swap"; document.head.appendChild(fl);
document.body.innerHTML='<header class="top"><div class="top-in">'+WM+'<div class="lang" role="group" aria-label="Language"><button type="button" data-lang="en" aria-pressed="true">EN</button><button type="button" data-lang="ar" aria-pressed="false">العربية</button></div></div></header>'
 +'<div class="prog" id="prog" hidden aria-hidden="true"></div><main id="main" tabindex="-1">'
 +'<section class="screen active" id="scr-welcome" aria-labelledby="w-h"><div class="hero"><div class="eyebrow" id="w-eb"></div><h1 id="w-h"></h1><p id="w-l"></p></div>'
 +'<div class="section"><div class="eyebrow" id="w-how-h"></div><ol class="how" id="w-how" style="margin-top:12px"></ol></div>'
 +'<div class="section stack"><div class="field"><label for="email" id="w-em"></label><input id="email" type="email" inputmode="email" autocomplete="email" placeholder="name@floward.com"><div class="err" id="emailErr" role="alert"></div></div>'
 +'<p class="small muted" id="w-pr"></p><button class="btn block" id="startBtn"></button><div class="dates"><span id="w-dt"></span></div></div></section>'
 +'<section class="screen" id="scr-step" aria-labelledby="st-h"></section><section class="screen" id="scr-done" aria-labelledby="dn-h"></section></main>'
 +'<div class="toast" id="toast" role="status" aria-live="polite"></div>';

/* ---------- events ---------- */
function validEmail(v){ var t=T[lang]; v=v.trim().toLowerCase();
  if(!v) return [false,t.e_empty]; if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return [false,t.e_format];
  if(v.split("@")[1]!==DOMAIN) return [false,t.e_domain]; return [true,v]; }
$("#startBtn").addEventListener("click",function(){
  var inp=$("#email"), r=validEmail(inp.value);
  if(!r[0]){ inp.setAttribute("aria-invalid","true"); $("#emailErr").textContent=r[1]; $("#emailErr").classList.add("show"); inp.focus(); return; }
  inp.removeAttribute("aria-invalid"); $("#emailErr").classList.remove("show");
  st.email=r[1]; startSession("welcome"); show("step");
});
$("#email").addEventListener("keydown",function(e){ if(e.key==="Enter") $("#startBtn").click(); });
$("#email").addEventListener("input",function(){ this.removeAttribute("aria-invalid"); $("#emailErr").classList.remove("show"); });
function rerender(){ var y=window.scrollY; renderStep(); window.scrollTo(0,y); }
document.addEventListener("click",function(e){
  var b=e.target.closest("button"); if(!b||b.disabled) return; var p=cur(), a=p&&st.a[p.id];
  if(b.hasAttribute("data-lang")){ setLang(b.getAttribute("data-lang")); return; }
  if(b.hasAttribute("data-bin")){ a.v[b.getAttribute("data-bin")]=b.getAttribute("data-v"); rerender(); return; }
  if(b.hasAttribute("data-ch")){ a.v=b.getAttribute("data-ch"); rerender(); return; }
  if(b.hasAttribute("data-mv")){ var i=+b.getAttribute("data-mv"), d=+b.getAttribute("data-d"), j=i+d, o=a.order, x=o[i]; o[i]=o[j]; o[j]=x; rerender();
    var nb=$('[data-mv="'+j+'"][data-d="'+d+'"]')||$('[data-mv="'+j+'"]'); if(nb) nb.focus({preventScroll:true}); return; }
  if(b.id==="chk"){ a.done=true; var s=score(p);
    track(p.type==="order"||p.type==="binary"?"sort_checked":"choice_answered",p.id,{ answer:p.type==="choice"?a.v:(p.type==="order"?a.order:a.v), match:s[0], of:s[1] });
    rerender(); return; }
  if(b.id==="next"){ track("step_completed",p.id,{}); if(st.idx<N-1){ st.idx++; show("step"); } else { show("done"); submit(); } return; }
});

/* ---------- init ---------- */
renderWelcome();
if(/^ar\b/i.test(new URLSearchParams(location.search).get("lang")||"")) setLang("ar");
if(!LIVE){ var pv=document.createElement("div"); pv.className="preview"; pv.textContent="Preview mode: not saving"; document.body.appendChild(pv); }
})();
