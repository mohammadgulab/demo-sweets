/* Kesar Mithai Ghar: drawer, tabs, gift box, Diwali countdown. No libraries. */
(function(){
var $=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var cfg={t:{}};try{cfg=JSON.parse(document.getElementById('i18n').textContent)}catch(e){}
function hi(){return document.documentElement.lang==='hi'}
function tr(s){return hi()&&cfg.t[s]?cfg.t[s]:s}
var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* drawer */
var dr=document.getElementById('drawer'),sc=document.querySelector('.scrim'),mb=document.querySelector('.menu-btn');
function openD(o){dr.classList.toggle('open',o);dr.setAttribute('aria-hidden',!o);mb.setAttribute('aria-expanded',o);document.body.classList.toggle('locked',o);
 if(o){sc.hidden=false;requestAnimationFrame(function(){sc.classList.add('on')});var a=dr.querySelector('a');a&&a.focus()}
 else{sc.classList.remove('on');setTimeout(function(){sc.hidden=true},rm?0:300)}}
mb.addEventListener('click',function(){openD(true)});
sc.addEventListener('click',function(){openD(false)});
dr.querySelector('.drawer-x').addEventListener('click',function(){openD(false);mb.focus()});
$('a',dr).forEach(function(a){a.addEventListener('click',function(){openD(false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&dr.classList.contains('open')){openD(false);mb.focus()}});

/* header shadow */
var top=document.querySelector('.top');
function sh(){top.classList.toggle('scrolled',window.scrollY>10)}sh();window.addEventListener('scroll',sh,{passive:true});

/* price tabs */
var tabs=$('.tabs [role=tab]');
function sel(b){tabs.forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;
 var p=document.getElementById(x.getAttribute('aria-controls'));p.hidden=!on;if(on&&!rm){p.classList.remove('pop');void p.offsetWidth;p.classList.add('pop')}})}
tabs.forEach(function(b,i){b.tabIndex=i?-1:0;b.addEventListener('click',function(){sel(b)});
 b.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;e.preventDefault();var n=tabs[(i+d+tabs.length)%tabs.length];sel(n);n.focus()})});

/* gift box */
var chips=$('.chip'),slots=$('.slot'),picked=[],msg=document.querySelector('.chip-msg'),
 tot=document.getElementById('box-total'),cnt=document.getElementById('box-count'),ord=document.getElementById('box-order');
function name(c){return c.querySelector('span').dataset.i18nO||c.querySelector('span').textContent}
function render(){
 chips.forEach(function(c){var on=picked.indexOf(c)>-1;c.classList.toggle('on',on);c.setAttribute('aria-pressed',on)});
 slots.forEach(function(s,i){var c=picked[i];s.innerHTML='';s.classList.toggle('full',!!c);
  if(c){var b=document.createElement('button');b.type='button';b.className='sweet';b.style.setProperty('--c',c.dataset.c);
   b.innerHTML='<i></i><span></span>';b.querySelector('span').textContent=tr(name(c));b.setAttribute('aria-label',tr(name(c))+' x');
   b.addEventListener('click',function(){toggle(c)});s.appendChild(b)}
  else{s.innerHTML='<span class="ph">'+tr('Tap a sweet')+'</span>'}});
 var sum=picked.reduce(function(a,c){return a+(+c.dataset.p)},0);
 tot.textContent='₹'+sum.toLocaleString('en-IN');
 cnt.textContent=hi()?('4 में से '+picked.length+' चुनी'):(picked.length+' of 4 chosen');
 var ready=picked.length===4;ord.setAttribute('aria-disabled',!ready);ord.classList.toggle('dim',!ready);
 var txt='Hello Kesar Mithai Ghar, I would like a 1 kg gift box (4 x 250 g):\n'+picked.map(function(c){return '- '+name(c)+' (Rs '+c.dataset.p+')'}).join('\n')+'\nTotal: Rs '+sum;
 ord.href='https://wa.me/?text='+encodeURIComponent(txt);
}
function toggle(c){var i=picked.indexOf(c);msg.textContent='';
 if(i>-1)picked.splice(i,1);else if(picked.length<4)picked.push(c);else{msg.textContent=tr('Box is full. Tap a chosen sweet to take it out.');var bx=document.querySelector('.box');bx.classList.remove('shake');void bx.offsetWidth;if(!rm)bx.classList.add('shake')}
 render()}
chips.forEach(function(c){c.addEventListener('click',function(){toggle(c)})});
ord.addEventListener('click',function(e){if(picked.length<4){e.preventDefault();msg.textContent=tr('Pick 4 to order')}});
render();document.addEventListener('langchange',function(){setTimeout(render,0)});

/* Diwali countdown */
var cd=document.querySelector('.count');
if(cd){var end=Date.parse(cd.dataset.to);
 var u={d:cd.querySelector('[data-u=d]'),h:cd.querySelector('[data-u=h]'),m:cd.querySelector('[data-u=m]'),s:cd.querySelector('[data-u=s]')};
 var tick=function(){var ms=end-Date.now();if(ms<=0){cd.classList.add('done');cd.setAttribute('data-msg',tr('Happy Diwali!'));['d','h','m','s'].forEach(function(k){u[k].textContent='00'});return}
  var s=Math.floor(ms/1000);var p=function(n){return (n<10?'0':'')+n};
  u.d.textContent=p(Math.floor(s/86400));u.h.textContent=p(Math.floor(s%86400/3600));u.m.textContent=p(Math.floor(s%3600/60));u.s.textContent=p(s%60)};
 tick();setInterval(tick,1000)}
})();
