(function(){
  var toast=document.getElementById('toast'),timer;
  function show(ok){
    toast.querySelector('span').textContent=ok?'تم النسخ بنجاح!':'تعذر النسخ، انسخ النص يدويًا';
    toast.classList.add('show');
    clearTimeout(timer);
    timer=setTimeout(function(){toast.classList.remove('show')},2200);
  }
  function fallback(text){
    var ta=document.createElement('textarea');
    ta.value=text;ta.setAttribute('readonly','');
    ta.style.cssText='position:fixed;top:0;left:0;opacity:0;font-size:16px;direction:ltr';
    document.body.appendChild(ta);
    ta.focus();ta.select();ta.setSelectionRange(0,text.length);
    var ok=false;
    try{ok=document.execCommand('copy')}catch(e){}
    document.body.removeChild(ta);
    return ok;
  }
  function copy(text){
    if(navigator.clipboard&&window.isSecureContext){
      navigator.clipboard.writeText(text).then(function(){show(true)},function(){show(fallback(text))});
    }else{show(fallback(text))}
  }
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){copy(b.getAttribute('data-copy'))});
  });
})();
