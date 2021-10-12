
// 'install' 'activate'

self.addEventListener('install', event => {
	console.log('install')

	self.skipWaiting()
})

self.addEventListener('activate', event => {
	console.log('activate')

	self.clients.claim()
})

self.addEventListener('fetch', event => {
	//console.log('fetch', { event })
	event.respondWith(fetch(event.request))
})

self.addEventListener('push', event => {

})