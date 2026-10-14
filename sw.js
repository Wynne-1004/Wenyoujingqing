var C='diary-v3',F=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){
    return Promise.all(F.map(function(u){return fetch(new Request(u,{cache:'reload'})).then(function(r){if(r.ok)return c.put(u,r)})}));
  }).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!=C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!='GET'||new URL(e.request.url).origin!=location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){
    var n=fetch(new Request(e.request.url,{cache:'reload'})).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}return res}).catch(function(){return r});
    return r||n;
  }));
});
