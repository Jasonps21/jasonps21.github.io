var webPush = require('web-push');
var pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/eNr0yobdDtc:APA91bFugzD_5inw9gYXFU889mDj8ftsEBfQJDJoKx5L-Ft6tnADptniaBv_e404U0FZoNYH27zcZO9c5qdy3ZpRoNN_MJZUcF8p0RjFo0qlDbcm4i9D0r9_bTanIvtIEMfFSMcnQxAc",
    keys: {
        p256dh: "BJKFYhl/ZgeswxzZm1XDNucHNzj6NivN4hlS2hhMoBnTAsH02VE2SXYTREp/11Gp46PDsLeorgEEddOgZfzyiPw=",
        auth: "01HzUXhQr576DLAgxrmINw=="
    }
};
const vapidKeys = {
    "publicKey":"BIG5nfPYomFXz9pSFs9rc0VUv_NOpmXnAGw6SWKWNwX9aFlL0kjGbRLJRp1Rzg4grw6FY4ZPkruLVBE50rgzi80",
    "privateKey":"JxoZJNn4kQvOG_GgS5K6SzJuVD_AViwBv6Uyk3wAv7Y"
}
webPush.setGCMAPIKey('AAAAgSusJ3Y:APA91bGkdFBLx8SHKE9l62PxUqBBVffLJHPaybyCcrUj2B9jWmCNQexrVCDEcn0vAS4JnW4EDSmzfa9jkXpuoWcSTw3YYja-tcelkcwrL42rOMXxR53GY7_vf1Y4iQJhuxQ2U66JvCa8');
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var payload = 'Here is a payload!';

webPush.sendNotification(
    pushSubscription,
    payload
);