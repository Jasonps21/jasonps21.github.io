importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
} else {
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/detail.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/favorit.html', revision: '1' },
    { url: '/pages/contact.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/css/material-icons.css', revision: '1' },
    { url: '/css/MaterialIcons-Regular.eot', revision: '1' },
    { url: '/css/MaterialIcons-Regular.ttf', revision: '1' },
    { url: '/css/MaterialIcons-Regular.woff', revision: '1' },
    { url: '/css/MaterialIcons-Regular.woff2', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/init.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/dateUtil.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/indexeddb.js', revision: '1' },
    { url: '/img/logo-128.png', revision: '1' },
    { url: '/img/logo-512.png', revision: '1' }
]);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('/detail.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'detail'
    })
);

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/css/materialize.min.css'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('.*\.png'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});