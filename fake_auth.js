export async function fake_auth(url) {
	// send user off page to go auth
	// await user redirect back here with session token
	// extract token / generate page staticly with token in app attribute

	// fake this by juse injecting the final token back into the app
	console.log('fake auth success - inject token')
	const token = Math.floor(Math.random() * 1000)
	document.querySelector('c-application').setAttribute('HREF', url + '?token=' + token)
}
