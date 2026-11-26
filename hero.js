/* My Skin — видео первого экрана: играет один раз, остаётся на последнем кадре */
(function(){
var root=document.getElementById('mskh');if(!root)return;
var v=root.querySelector('.mskh-video'),mq=matchMedia('(max-width:899px)');
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function off(){root.className=root.className.replace(' mskh--js','')}
if(reduce||!v)return off();
function load(){v.className='mskh-video';v.src=root.getAttribute(mq.matches?'data-m':'data-d');v.muted=true;
 var p=v.play();if(p&&p.catch)p.catch(off)}
v.addEventListener('playing',function(){v.className='mskh-video is-on'});
v.addEventListener('error',off);
load();
(mq.addEventListener?mq.addEventListener('change',load):mq.addListener(load));
})();
