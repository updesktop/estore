const cacheName = 'ESTORE_081735';
const staticAssets = [
  './',
  './index.html',
  './gfx/icon-512x512.png',  './gfx/icon-192x192.png',    

  '../../main_jslib/leaflet.js',              '../../main_jslib/leaflet.css', 
  '../../main_jslib/images/jRedMarker.png',   '../../main_jslib/images/jblueMarker.png',
  '../../main_jslib/images/layers.png',       

  '../../main_jslib/axios.min.js',
  '../../main_jslib/coke.js',   
  '../../main_jslib/je_msg.js',
  '../../main_jslib/qrcode.min.js',  
   
  '../../main_codes/jbe_admin.js',  '../../main_codes/jbe_cart.js',   
  '../../main_codes/jbe_cat.js',    '../../main_codes/jbe_chat.js',
  '../../main_codes/jbe_db.js',     '../../main_codes/jbe_map.js',  
  '../../main_codes/jbe_notif.js',  '../../main_codes/jbe_order.js',  
  '../../main_codes/jbe_pages.js',  '../../main_codes/jbe_stock.js',  
  '../../main_codes/jbe_sys.js',    '../../main_codes/main_app.js',   

  '../../main_codes/main_lib.min.js', '../../main_codes/jbelib.min.js',     
  '../../main_codes/main_styles.css',   '../../main_codes/mobile.css',
  
  '../../main_gfx/proc_logo.gif',  '../../main_gfx/jadmin.jpg',

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


self.addEventListener('fetch', event => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method != 'GET') return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(async function() {
    // Try to get the response from a cache.
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      // If we found a match in the cache, return it, but also
      // update the entry in the cache in the background.
      event.waitUntil(cache.add(event.request));
      return cachedResponse;
    }

    // If we didn't find a match in the cache, use the network.
    return fetch(event.request);
  }());
});

/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
*/

/*
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
*/
