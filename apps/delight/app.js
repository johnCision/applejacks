import { App } from '../../ui/application.js'
import { ApplicationFrame } from '../../ui/application-frame.js'
import { UserAccount } from '../../ui/user-account.js'
import { ApplicationBar } from '../../ui/application-bar.js'
import { Face } from '../../ui/face.js'
import { Pager } from '../../ui/pager.js'
import { Page } from '../../ui/page.js'
import { Button } from '../../ui/button.js'
import { Icon } from '../../ui/icon.js'
import { Label } from '../../ui/label.js'

const HTML5_NS = 'http://www.w3.org/1999/xhtml'

function handleAccountButton(event) {
	console.log('account button pressed')
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

//
function onContentLoadedSync() {
	// because handles are sync, create proxy into async method
	// otherwize, exception will be lost
	onContentLoaded()
		.then()
		.catch(e => console.log({ e }))
}
async function onContentLoaded() {
	console.log('Here we go')

	//
	customElements.define('c-application', App)
	customElements.define('c-application-frame', ApplicationFrame)
	customElements.define('c-application-bar', ApplicationBar)
	customElements.define('c-user-account', UserAccount)
	customElements.define('c-face', Face)
	customElements.define('c-pager', Pager)
	customElements.define('c-page', Page)
	customElements.define('c-button', Button)
	customElements.define('c-icon', Icon)
	customElements.define('c-label', Label)

	//
	const serviceWorkerRegistration = await navigator.serviceWorker.register(
		'/apps/delight/service-worker.js',
		{ type: 'module', scope: './' })

	navigator.serviceWorker.addEventListener('message', message => {

	})

	//
	if(Notification.permission === 'granted') {
		const notification = new Notification('Hi there!')
	}
	else if(Notification.permission === 'denied') {
		// awe
	}
	else {
		const permission = await Notification.requestPermission()
		if(permission === "granted") {
			const notification = new Notification('Thanks!')
		}
	}

	//
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
	const loginButtonElem = document.querySelector('#accountButton')
	loginButtonElem.addEventListener('click', handleAccountButton)

	// another way
	//
	const applicationElem = document.querySelector('c-application')
	const userFaceElem = document.querySelector('#userFace')
	const userAccountElem = document.querySelector('c-user-account')

	// create and observer to map c-application state into the main c-pager
	const applicationStateObserver = new MutationObserver((mutations, observer) => {
		// we could loop over each via
		// 		mutations.forEach(mutation => {})
		// however, we are only interested in the lateset mutation
		// downside is the use of slice(-1) to get the last item (not intuitive)
		const [ latestMutation ] = mutations.slice(-1)
		if(latestMutation.type !== 'attributes') { return }
		const { target, attributeName, attributeNamesapce } = latestMutation

		// could omit if we already using attributeFilter
		if(attributeName !== 'state') { return }

		const state = target.getAttribute('state')
		const statePagerElem = document.getElementById('statePager')
		statePagerElem.setAttributeNS(HTML5_NS, 'page', state)

	})
	applicationStateObserver.observe(applicationElem, {
		attributes: true,
		attributeFilter: ['state']
	})

	// creaete an observer to map to c-user-account elemnts avatar attribute
	//   into the c-face
	const accountAvataObserver = new MutationObserver((mutations, observer) => {
		const [ latestMutation ] = mutations.slice(-1)
		if(latestMutation.type !== 'attributes') { return }
		const { target, attributeName, attributeNamesapce } = latestMutation

		if(attributeName !== 'avatar') { return }

		const avatar = target.getAttributeNS(attributeNamesapce, attributeName)
		userFaceElem.setAttributeNS(HTML5_NS, 'avatar', avatar)
	})
	accountAvataObserver.observe(userAccountElem, {
		attributes: true,
		attributeOldValue: false
	})
}

if(document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onContentLoadedSync)
}
else {
	onContentLoaded()
}
