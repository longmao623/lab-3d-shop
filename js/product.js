(function(){'use strict';
  var id=new URLSearchParams(location.search).get('id')||'coat-camel';
  var index=Atelier.products.findIndex(function(x){return x.id===id;});if(index<0){index=0;}
  var p=Atelier.products[index];
  document.title=p.name+' — 2515240104';
  ['breadcrumbName','productName'].forEach(function(k){document.getElementById(k).textContent=p.name;});
  var img=document.getElementById('productImage');img.src=p.image;img.alt=p.name+'，'+p.material;
  document.getElementById('productRoom').textContent=p.room+' · '+p.en;
  document.getElementById('productPrice').textContent=Atelier.money(p.price);
  document.getElementById('productDescription').textContent=p.description;
  document.getElementById('productMaterial').textContent=p.material;
  document.getElementById('productDetail').textContent=p.detail;
  document.getElementById('addToBag').addEventListener('click',function(){var size=document.querySelector('input[name="size"]:checked').value;Atelier.bag.add(p.id,size,1);});
  function navigation(element,item,label){var a=document.getElementById(element);a.href='product.html?id='+item.id;a.innerHTML='<small>'+label+'</small>'+item.name+' <span>'+(element==='previousProduct'?'←':'→')+'</span>';}
  navigation('previousProduct',Atelier.products[(index+Atelier.products.length-1)%Atelier.products.length],'上一件作品');
  navigation('nextProduct',Atelier.products[(index+1)%Atelier.products.length],'下一件作品');
})();
