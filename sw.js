const cacheKey = 'v1';
const urlPatternsToCache = [
  /www.thecocktaildb.com\/images/,

]
self.addEventListener('install', function(event) {
  console.log('Installation stage. Started caching')
  event.waitUntil(
    caches.open(cacheKey).then(function(cache) {
      return cache.addAll([
        '/dist/main.bundle.js',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('SW has been activated')
  var cacheWhitelist = [cacheKey];

  // event.waitUntil(
  //   caches.keys().then(function(keyList) {
  //     return Promise.all(keyList.map(function(key) {
  //       if (cacheWhitelist.indexOf(key) === -1) {
  //         return caches.delete(key);
  //       }
  //     }));
  //   })
  // );
});

self.addEventListener('fetch', function(event) {
  let shouldBeCached = urlPatternsToCache.some(regExp => regExp.test(event.request.url));
  if(!shouldBeCached){
    console.log("SW rejected caching the resource " + event.request.url)
    return;
  }
  console.log("SW is processing the resource " + event.request.url)
  let pr = caches.match(event.request).then(function(response) {
    if(response)
      console.log(event.request.url + ' has been found in cache')
    else
      console.log(event.request.url + ' has not been cached')

    return response || fetch(event.request)
      .then(response => caches.open(cacheKey)
        .then(cache => { 
          // if(!response.ok){
          //   console.log(event.request.url + ' failed')
          // } else{
          //   cache.put(event.request, response.clone()); 
          //   console.log(event.request.url + ' has been added to cache')
          // }
          cache.put(event.request, response.clone()); 
          return response;
        }) 
      )
  }).catch(_ => {console.log('fail')})
  event.respondWith(pr);
});