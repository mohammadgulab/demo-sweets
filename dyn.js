/* Live bits: open now badge, filter tabs, WhatsApp booking form, counters. */
(function(){
var $=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var L={en:{open:'Open now',closed:'Closed now',closes:'closes',opens:'opens at'},ar:{open:'مفتوح الآن',closed:'مغلق الآن',closes:'يغلق',opens:'يفتح'},hi:{open:'अभी खुला है',closed:'अभी बंद है',closes:'बंद होगा',opens:'खुलेगा'}};
function lang(){var l=document.documentElement.lang;return L[l]?l:'en'}
function fmt(h){var hh=h%24,ap=hh<12?'am':'pm',x=hh%12||12;return x+ap}
function badge(){ $('[data-open]').forEach(function(b){
  var o=+b.dataset.from,c=+b.dataset.to,tz=b.dataset.tz,now;
  try{now=+new Intl.DateTimeFormat('en-GB',{hour:'numeric',minute:'numeric',hour12:false,timeZone:tz}).format(new Date()).replace(':','.')}catch(e){now=new Date().getHours()}
  var cc=c<=o?c+24:c,n=now<o&&c<=o?now+24:now,isOpen=n>=o&&n<cc,t=L[lang()];
  b.classList.toggle('is-open',isOpen);b.classList.toggle('is-closed',!isOpen);
  b.innerHTML='<i></i>'+(isOpen?t.open+' · '+t.closes+' '+fmt(c):t.closed+' · '+t.opens+' '+fmt(o));
 })}
badge();setInterval(badge,60000);document.addEventListener('langchange',function(){setTimeout(badge,0)});
$('[data-filters]').forEach(function(w){var g=document.getElementById(w.dataset.filters);
 $('button',w).forEach(function(b){b.addEventListener('click',function(){
  $('button',w).forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});
  var f=b.dataset.f;$('[data-cat]',g).forEach(function(it){var show=f==='all'||it.dataset.cat.split(' ').indexOf(f)>-1;it.hidden=!show;if(show){it.classList.remove('pop');void it.offsetWidth;it.classList.add('pop')}})})})});
$('form[data-wa]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();
 var lines=[f.dataset.wa];$('input,select,textarea',f).forEach(function(i){if(i.value&&i.name)lines.push(i.name+': '+i.value)});
 var url='https://wa.me/'+(f.dataset.num||'')+'?text='+encodeURIComponent(lines.join('\n'));
 var out=f.querySelector('.wa-out');if(out){out.hidden=false;out.querySelector('a').href=url}
 window.open(url,'_blank','noopener')})});
var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var cs=$('[data-count]');
function run(c){var to=+c.dataset.count,t0=null,d=1200;if(rm){c.textContent=to;return}
 function st(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/d);c.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(st)}requestAnimationFrame(st)}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})},{threshold:.5});cs.forEach(function(c){io.observe(c)})}else cs.forEach(run);
$('[data-rail]').forEach(function(r){if(!('IntersectionObserver' in window))return;var o=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('mid',e.intersectionRatio>.9)})},{root:r,threshold:[.5,.9,1]});$('.hang',r).forEach(function(h){o.observe(h)})});
})();
