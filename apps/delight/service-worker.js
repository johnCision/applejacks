
// 'install' 'activate'

self.addEventListener('fetch', event => {
	//console.log('fetch', { event })
	event.respondWith(fetch(event.request))
})

self.addEventListener('push', event => {

})