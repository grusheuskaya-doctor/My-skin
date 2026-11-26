/* My Skin — анимация первого экрана (GSAP 3). Один раз при загрузке + медленное движение узоров */
(function(){
var root=document.getElementById('mskh');if(!root)return;
var q=function(s,all){return all?root.querySelectorAll(s):root.querySelector(s)};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function off(){root.className=root.className.replace(' mskh--js','')}
function start(){
 var g=window.gsap;if(reduce||!g)return off();
 var mobile=matchMedia('(max-width:899px)').matches;
 var pats=[].slice.call(q('.mskh-pat',1));
 var prods=['foam','toner','cream'].map(function(n){return q('.mskh-p--'+n+' .mskh-in')});
 var glints=['foam','cream','toner'].map(function(n){return q('.mskh-p--'+n+' .mskh-glint')});
 glints.forEach(function(el){var im=el.previousElementSibling,u='url("'+(im.currentSrc||im.src)+'")';el.style.webkitMaskImage=u;el.style.maskImage=u});
 /* Этап 1: узоры — органическое перетекание */
 var tw=[],t=document.getElementById('mskh-t'),o={v:0},n=0;
 if(!mobile)pats.forEach(function(p){p.style.filter='url(#mskh-f)'});
 tw.push(g.to(o,{v:1,duration:16,ease:'sine.inOut',repeat:-1,yoyo:true,onUpdate:function(){
  if(mobile||(n++%3))return;
  t.setAttribute('baseFrequency',(0.008+0.005*o.v).toFixed(4)+' '+(0.011+0.005*o.v).toFixed(4))}}));
 pats.forEach(function(p,i){tw.push(g.to(p,{x:(i%2?-1:1)*22,y:(i-1)*14,rotation:(i-1)*1.4,duration:11+i*3,ease:'sine.inOut',repeat:-1,yoyo:true}))});
 g.to(pats,{opacity:1,duration:1.8,stagger:.25,ease:'power1.out'});
 /* Этапы 2–3: продукция по очереди, затем блик */
 var tl=g.timeline({delay:.2,defaults:{ease:'power2.out'}});
 prods.forEach(function(el,i){
  tl.fromTo(el,{opacity:0,y:34,scale:.985,transformOrigin:'50% 100%'},{opacity:1,y:0,scale:1,duration:1.15,clearProps:'transform'},.1+i*.6)});
 glints.forEach(function(el,i){var s=2.7+i*.25;
  tl.set(el,{opacity:1},s).fromTo(el,{backgroundPosition:'100% 0%'},{backgroundPosition:'0% 0%',duration:1.1,ease:'sine.inOut'},s).set(el,{opacity:0},s+1.1)});
 /* Этап 4: узоры почти замирают */
 tl.call(function(){tw.forEach(function(x){g.to(x,{timeScale:.3,duration:2.5})})},null,4.3);
 if('IntersectionObserver'in window)new IntersectionObserver(function(e){tw.forEach(function(x){e[0].isIntersecting?x.resume():x.pause()})}).observe(root);
}
if(window.gsap)start();else window.addEventListener('load',start);
})();
