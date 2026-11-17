(function(){'use strict';
  var grid=document.getElementById('productGrid');
  function render(filter){
    var list=Atelier.products.filter(function(p){return filter==='全部'||p.category===filter;});
    grid.innerHTML=list.map(function(p,i){return '<article class="product-card" style="animation-delay:'+i*55+'ms"><a class="product-card__image" href="product.html?id='+p.id+'" aria-label="查看'+p.name+'"><img src="'+p.image+'" alt="'+p.name+'，'+p.material+'" loading="lazy"><span class="product-card__number">0'+Atelier.products.indexOf(p)+' / '+p.category+'</span><span class="product-card__view" aria-hidden="true">↗</span></a><div class="product-card__body"><div><h2><a href="product.html?id='+p.id+'">'+p.name+'</a></h2><p class="product-card__subtitle">'+p.en+' · '+p.material+'</p></div><p class="product-card__price">'+Atelier.money(p.price)+'</p></div><button class="product-card__add" type="button" data-add-product="'+p.id+'">快速加入 · M 码 ＋</button></article>';}).join('');
    document.getElementById('productCount').textContent=String(list.length).padStart(2,'0')+' 件作品';
  }
  document.querySelectorAll('[data-filter]').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('[data-filter]').forEach(function(b){b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});render(btn.dataset.filter);});});
  render('全部');
})();
