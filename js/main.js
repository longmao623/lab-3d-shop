(function () {
  'use strict';
  var PRODUCTS = [
    {id:'coat-camel',name:'时光 · 羊毛长大衣',en:'The Quiet Coat',price:1890,room:'01 · 柔软的轮廓',category:'外套',image:'img/coat-camel.jpg',material:'90% 羊毛 · 10% 羊绒',description:'以干净的肩线与恰好过膝的长度，留住羊毛最本真的形态。温润的驼色，在日光下呈现柔和的层次。',detail:'双面羊毛与羊绒混纺，无里布手工缝边。微落肩、直筒廓形，隐藏式按扣。',node:'Product_coat-camel.jpg'},
    {id:'dress-ivory',name:'流光 · 真丝吊带裙',en:'The Light Slip',price:1290,room:'01 · 柔软的轮廓',category:'裙装',image:'img/dress-ivory.jpg',material:'100% 桑蚕丝',description:'一束光落在真丝上，便有了流动的形状。斜裁吊带裙顺着身体的节奏自然垂落，保留恰好的松弛。',detail:'19 姆米桑蚕丝，45° 斜裁。细肩带、V 领、侧缝隐形拉链。',node:'Product_dress-ivory.jpg'},
    {id:'blazer-taupe',name:'留白 · 羊毛西装',en:'The Poise Blazer',price:1590,room:'02 · 日常的秩序',category:'外套',image:'img/blazer-taupe.jpg',material:'100% 初剪羊毛',description:'利落的翻领与柔和的灰褐色相遇，让精裁不再锋利。一件可以在正式与日常之间自由游走的西装。',detail:'初剪羊毛斜纹呢，半麻衬工艺。单粒扣、微宽肩、弧形翻领。',node:'Product_blazer-taupe.jpg'},
    {id:'shirt-white',name:'呼吸 · 棉质廓形衬衫',en:'The Air Shirt',price:690,room:'02 · 日常的秩序',category:'上装',image:'img/shirt-white.jpg',material:'100% 长绒棉',description:'不刻意熨平每一道褶皱，让长绒棉保留空气感。宽松廓形、干净领型，是每日衣橱里安静的底色。',detail:'高支长绒棉，水洗工艺。落肩、弧形下摆、天然贝壳扣。',node:'Product_shirt-white.jpg'},
    {id:'skirt-black',name:'夜色 · 缎面半裙',en:'The Fluid Skirt',price:890,room:'03 · 流动的边界',category:'裙装',image:'img/skirt-black.jpg',material:'72% 醋酸纤维 · 28% 粘纤',description:'黑色不是沉默，而是容纳所有光。行走间，缎面随步伐泛起细微的光泽，垂坠而不拘束。',detail:'醋酸缎面，斜裁 A 字轮廓。及踝长度，侧缝隐形拉链。',node:'Product_skirt-black.jpg'},
    {id:'knit-grey',name:'云朵 · 羊绒针织衫',en:'The Soft Knit',price:1090,room:'03 · 流动的边界',category:'上装',image:'img/knit-grey.jpg',material:'100% 羊绒',description:'轻轻折叠的一朵云。细腻羊绒带来几乎没有重量的温暖，雾灰色让柔软的触感延伸到视觉。',detail:'26 支双股羊绒，12 针细密编织。圆领、微宽松版型、罗纹收边。',node:'Product_knit-grey.jpg'}
  ];
  var KEY = 'atelier-bag-v1';
  function read() { try { var x=JSON.parse(localStorage.getItem(KEY)||'[]'); return Array.isArray(x)?x:[]; } catch(e) { return []; } }
  function write(items) { try { localStorage.setItem(KEY,JSON.stringify(items)); } catch(e) { showToast('浏览器未允许保存购物袋'); } updateCount(); document.dispatchEvent(new CustomEvent('bagchange')); }
  function updateCount() { var n=read().reduce(function(s,x){return s+(Number(x.qty)||0);},0); document.querySelectorAll('[data-bag-count]').forEach(function(el){el.textContent=n;}); }
  var toastTimer;
  function showToast(message) { var el=document.getElementById('toast'); if(!el){return;} el.textContent=message; el.classList.add('is-visible'); clearTimeout(toastTimer); toastTimer=setTimeout(function(){el.classList.remove('is-visible');},2800); }
  function add(id,size,qty) { var items=read(); var found=items.find(function(x){return x.id===id&&x.size===size;}); if(found){found.qty=Math.min(9,found.qty+(qty||1));}else{items.push({id:id,size:size||'M',qty:qty||1});} write(items); var p=PRODUCTS.find(function(x){return x.id===id;}); showToast('已将「'+(p?p.name:'作品')+'」加入购物袋'); }
  function money(n) { return '¥'+Number(n).toLocaleString('zh-CN'); }
  window.Atelier={products:PRODUCTS,bag:{read:read,write:write,add:add},money:money,toast:showToast};
  updateCount();
  document.addEventListener('click',function(e){var el=e.target.closest('[data-add-product]');if(el){add(el.dataset.addProduct,'M',1);}});
  window.addEventListener('storage',updateCount);
})();
