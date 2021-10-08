import { App } from '../../ui/application.js'
import { UserAccount } from '../../ui/user-account.js'
import { ApplicationBar } from '../../ui/application-bar.js'
import { Face } from '../../ui/face.js'

import { fake_auth } from '../../fake_auth.js'

const HTML5_NS = 'http://www.w3.org/1999/xhtml'

function handleLoginButton(e) {
	console.log('handle account button', { e })

	// update state to reflext flow has started
	// aka hiding login and showing wait icon
	fake_auth('app.v1.json')
}

function handleLogoutButton(e) {
	fake_auth('app.v0.json')
}

async function fake_auth_token_proxy(code) {
	const url = new URL('https://localhost:8080/github_token')
	url.search = new URLSearchParams({ code })
	const response = await fetch(url, {
		method: 'POST',
		//mode: 'no-cors'
	})

	const json = await response.json()
	const token = json.token
	return token
}

async function fake_auth_token(code) {
	const client_id = '86bb02292e0e29cc1ae6'
	const client_secret = ''
	console.log('code', code)

	const url = new URL('https://github.com/login/oauth/access_token')
	url.search = new URLSearchParams({
		client_id,
		client_secret,
		code
	})

	console.log('fetch', url.toString())
	//history.pushState({ old: true }, '/apps/delight/app.html')

	const foo = await fetch(url, {
		method: 'POST',
		mode: 'no-cors',
		headers: {
      'Accept': 'application/json'
		}
	})

	console.log('fetch resp', url.toString(), foo.ok)
	const content = await foo.json()
	//console.log({ content })
}

//
function onContentLoadedSync() {
	onContentLoaded()
		.then()
		.catch(e => console.error(e))
}
async function onContentLoaded() {
	console.log('Here we go')

	const url = new URL(window.location.href)
	const sp = new URLSearchParams(url.search)
	if(sp.has('code')) {
		const token = await fake_auth_token_proxy(sp.get('code'))

		console.warn({ token })

		const apps = document.querySelectorAll('c-application')
		apps.forEach((value, key) => {
			value.setAttributeNS(HTML5_NS, 'github-token', token)
		})
	}

	//
	customElements.define('c-application', App)
	customElements.define('c-application-bar', ApplicationBar)
	customElements.define('c-user-account', UserAccount)
	customElements.define('c-face', Face)

	//
	//const loginButtonElem = document.querySelector('#loginButton')
	//loginButtonElem.addEventListener('click', handleLoginButton)

	const logoutButtonElem = document.querySelector('#logoutButton')
	logoutButtonElem.addEventListener('click', handleLogoutButton)

	// another way
	const applicationElem = document.querySelector('c-application')
	const observer = new MutationObserver((mutations, observer) => console.log(mutations))
	observer.observe(applicationElem, { attributes: true })

	//
	const userFaceElem = document.querySelector('#userFace')
	const userAccountElem = document.querySelector('c-user-account')
	const accountAvataObserver = new MutationObserver((mutations, observer) => {
		mutations.forEach(mutation => {
			//console.log('mutation', mutation.type)
			if(mutation.type !== 'attributes') { return }
			const { target, attributeName, attributeNamesapce } = mutation
			if(attributeName !== 'avatar') { return }
			console.log('account avatar update, update face')

			const avatar = target.getAttributeNS(attributeNamesapce, attributeName)
			userFaceElem.setAttributeNS(HTML5_NS, 'avatar', avatar)
		})
	})

	accountAvataObserver.observe(userAccountElem, { attributes: true, attributeOldValue: false })

}

if(document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onContentLoadedSync)
}
else {
	onContentLoaded()
}
