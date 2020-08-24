const cacheName = '20200622_083735';
const staticAssets = [
  './',
  './index.html',
  './gfx/banner.jpg',     './gfx/slide1.jpg',  './gfx/slide2.jpg',  './gfx/slide3.jpg',  
  './gfx/icon-logo.png',  './gfx/icon-512x512.png',  
  './gfx/logo.jpg',       '../../main_gfx/jadmin.jpg',

  '../../main_jslib/leaflet.js',              '../../main_jslib/leaflet.css',
  '../../main_jslib/images/jRedMarker.png',   '../../main_jslib/images/jblueMarker.png',
  '../../main_jslib/images/layers.png',       

  '../../main_jslib/axios.min.js',
  '../../main_jslib/coke.js',   
  '../../main_jslib/je_msg.js',
  
  
  '../../main_codes/jbe_admin.js',  '../../main_codes/jbe_cart.js',   
  '../../main_codes/jbe_cat.js',    '../../main_codes/jbe_chat.js',
  '../../main_codes/jbe_db.js',     '../../main_codes/jbe_map.js',  
  '../../main_codes/jbe_notif.js',  '../../main_codes/jbe_order.js',  
  '../../main_codes/jbe_pages.js',  '../../main_codes/jbe_stock.js',  
  '../../main_codes/jbe_sys.js',    '../../main_codes/jbelib.js',     
  '../../main_codes/main_app.js',   '../../main_codes/main_lib.js', 

  '../../main_codes/main_styles.css',   '../../main_codes/mobile.css',

  
  '../../main_gfx/proc_logo.gif',  

  '../../main_gfx/avatar.png',    '../../main_gfx/dots.png',    
  '../../main_gfx/jadd.png',      '../../main_gfx/jback.png',  
  '../../main_gfx/jbell.png',     '../../main_gfx/jcall.png',
  '../../main_gfx/jcam.png',      '../../main_gfx/jcancel.png', 
  '../../main_gfx/jcart.png',     '../../main_gfx/jcategory.png', 
  '../../main_gfx/jchat.png',     '../../main_gfx/jdele.png',  
  '../../main_gfx/jedit.png',     '../../main_gfx/jham.png',   
  '../../main_gfx/jhome.png',     '../../main_gfx/jimage.png', 
  '../../main_gfx/jnotif.png',    '../../main_gfx/jproduct.png', 
  '../../main_gfx/jpromo.png',    '../../main_gfx/jpurchase.png',  
  '../../main_gfx/jrefresh.png',  '../../main_gfx/jsave.png',
  '../../main_gfx/jsearch.png',   '../../main_gfx/jsend.png',
  '../../main_gfx/jsite.png',     '../../main_gfx/jsms.png', 
  '../../main_gfx/landmark.png',  
  
  './manifest.webmanifest'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if(url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});


async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req){
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req,fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
