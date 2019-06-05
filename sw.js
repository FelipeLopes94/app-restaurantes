//Service worker já startado via registro no local ./js/sw.registration.js
//armazenar tudo em cache

const nameCacheEstatico = 'avaliador-restaurante';
/**
 * Install Service worker and cache all pages and assets required for offline access
 */
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(nameCacheEstatico).then((cache) => {
    return cache.addAll(['.',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
    './js/sw_registration.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
      ]);
  }));
}); //Ja retorna em cache com todos arquivos, e imagens carregados

/**
 * Ativar o service worker
 */
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName != nameCacheEstatico;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})    
			);
		})
	);
});

/***
 * captar as solicitações
 * Caso encontre o cache, retorna tudo, caso não encontre, retorna erro.
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => {

    return response ||
    caches.open(nameCacheEstatico).then((cache) => {
      return fetch(event.request).then((response) => {
        if (response.status === 404) {   //erro retornado caso  não encontre
          console.log("Page not found.");
          return new Response("Page not found.")
        }return response("Tudo funcionando!")
      });
    });
  }).catch(function() {
      //caso tudo falhe, retorna uma mensagem informando.
      return new Response("Voce esta offline, a página não pode ser recuperada")
  })
  );
});
