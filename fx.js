/* Scroll effects. Light, no libraries. Respects reduced motion. */
(function(){
var d=document.documentElement;d.classList.add('fx-js');
var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s){return [].slice.call(document.querySelectorAll(s))};
var rv=$('[data-reveal]');
if(rm||!('IntersectionObserver' in window)){rv.forEach(function(e){e.classList.add('in')})}
else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});rv.forEach(function(e){io.observe(e)})}
var zs=$('.zoom-stage'),sp=$('.spin3d'),tk=0;
function upd(){var vh=window.innerHeight;
 zs.forEach(function(s){var r=s.getBoundingClientRect(),p=-r.top/Math.max(1,r.height-vh);p=Math.min(1,Math.max(0,p));s.style.setProperty('--p',p.toFixed(3))});
 sp.forEach(function(s){var r=s.getBoundingClientRect(),p=1-(r.top+r.height/2)/vh;p=Math.min(1,Math.max(0,p));s.style.setProperty('--s',p.toFixed(3))});
 tk=0}
if(rm){zs.forEach(function(s){s.style.setProperty('--p',1)})}
else{window.addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(upd)}},{passive:true});window.addEventListener('resize',upd);upd()}
$('.swap').forEach(function(s,i){s.addEventListener('click',function(){s.classList.toggle('on')});
 if(!rm){setInterval(function(){var r=s.getBoundingClientRect();if(r.bottom>0&&r.top<window.innerHeight)s.classList.toggle('on')},2800+i*500)}});
$('video[data-hero]').forEach(function(v){if(rm){v.removeAttribute('autoplay');v.pause()}else{var p=v.play&&v.play();if(p&&p.catch)p.catch(function(){})}});
})();
