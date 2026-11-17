(function(){'use strict';
  var container=document.getElementById('cartItems'),layout=document.getElementById('cartLayout');
  function validItems(){return Atelier.bag.read().filter(function(x){return Atelier.products.some(function(p){return p.id===x.id;})&&x.qty>0;});}
  function render(){
    var items=validItems();
    if(!items.length){layout.innerHTML='<div class="cart-empty"><p class="eyebrow">A little space for something beautiful</p><h2>购物袋还空着。</h2><p>去展厅里看看，也许会遇见喜欢的轮廓。</p><a class="text-link" href="products.html">浏览全部作品 <span>→</span></a></div>';return;}
    var subtotal=0;
    container.innerHTML=items.map(function(item){var p=Atelier.products.find(function(x){return x.id===item.id;});subtotal+=p.price*item.qty;return '<article class="cart-item"><a href="product.html?id='+p.id+'"><img class="cart-item__image" src="'+p.image+'" alt="'+p.name+'"></a><div><h2><a href="product.html?id='+p.id+'">'+p.name+'</a></h2><p class="cart-item__meta">'+p.en+'<br>尺码：'+item.size+'<br>'+p.material+'</p><button class="cart-item__remove" type="button" data-remove="'+item.id+'" data-size="'+item.size+'">移除</button></div><div class="cart-item__end"><p class="cart-item__price">'+Atelier.money(p.price*item.qty)+'</p><div class="quantity"><button type="button" data-quantity="-1" data-id="'+item.id+'" data-size="'+item.size+'" aria-label="减少'+p.name+'数量">−</button><span>'+item.qty+'</span><button type="button" data-quantity="1" data-id="'+item.id+'" data-size="'+item.size+'" aria-label="增加'+p.name+'数量">＋</button></div></div></article>';}).join('');
    document.getElementById('subtotal').textContent=Atelier.money(subtotal);document.getElementById('total').textContent=Atelier.money(subtotal);
  }
  container.addEventListener('click',function(e){var remove=e.target.closest('[data-remove]'),change=e.target.closest('[data-quantity]');var items=validItems();if(remove){Atelier.bag.write(items.filter(function(x){return !(x.id===remove.dataset.remove&&x.size===remove.dataset.size);}));Atelier.toast('已从购物袋移除');}if(change){var item=items.find(function(x){return x.id===change.dataset.id&&x.size===change.dataset.size;});if(item){item.qty=Math.max(1,Math.min(9,item.qty+Number(change.dataset.quantity)));Atelier.bag.write(items);}}});
  document.addEventListener('bagchange',render);
  document.getElementById('checkout').addEventListener('click',function(){if(!validItems().length){return;}Atelier.bag.write([]);layout.innerHTML='<section class="checkout-success"><p class="eyebrow">The end of this little journey</p><h2>谢谢你的喜欢。</h2><p>这是课程设计演示，未产生真实订单或支付。<br>你的购物袋已清空，展厅随时欢迎再次到访。</p><a class="text-link" href="index.html">回到展厅 <span>↗</span></a></section>';});
  render();
})();
