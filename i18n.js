/* Language switch: swaps text by matching the English text. No libraries. */
(function(){
var el=document.getElementById('i18n');if(!el)return;var cfg=JSON.parse(el.textContent);
var btn=document.createElement('button');btn.className='lang-btn';btn.type='button';document.body.appendChild(btn);
var SEL='h1,h2,h3,h4,h5,h6,p,a,span,li,button:not(.lang-btn),label,small,figcaption,strong,em,option,div.small,th,td';
var cur='en';
function apply(l){
 var t=l==='en'?null:cfg.t;
 [].slice.call(document.querySelectorAll(SEL)).forEach(function(n){
  if(n.dataset.i18nO===undefined){var k=n.innerHTML.trim();if(!(k in cfg.t))return;n.dataset.i18nO=k}
  var o=n.dataset.i18nO;n.innerHTML=t?(t[o]||o):o});
 [].slice.call(document.querySelectorAll('[placeholder]')).forEach(function(n){if(n.dataset.i18nP===undefined)n.dataset.i18nP=n.placeholder;var o=n.dataset.i18nP;n.placeholder=t&&t[o]?t[o]:o});
 document.documentElement.lang=l==='en'?'en':cfg.lang;document.documentElement.dir=l==='en'?'ltr':(cfg.dir||'ltr');
 btn.textContent=l==='en'?cfg.label:'English';btn.setAttribute('aria-label',l==='en'?'Switch language to '+cfg.name:'Switch language to English');
 cur=l;try{localStorage.setItem('demo-lang-'+location.pathname,l)}catch(e){}
 document.dispatchEvent(new CustomEvent('langchange',{detail:l}));
}
btn.addEventListener('click',function(){apply(cur==='en'?'alt':'en')});
var saved=null;try{saved=localStorage.getItem('demo-lang-'+location.pathname)}catch(e){}
apply(saved==='alt'?'alt':'en');
})();
