import { App } from '../../ui/application.js'
import { UserAccount } from '../../ui/user-account.js'
import { ApplicationBar } from '../../ui/application-bar.js'

import { fake_auth } from '../../fake_auth.js'

function handleLoginButton(e) {
	console.log('handle account button', { e })

	// update state to reflext flow has started
	// aka hiding login and showing wait icon
	fake_auth('app.v1.json')
}

function handleLogoutButton(e) {
	fake_auth('app.v0.json')
}

//
function onContentLoaded() {
	console.log('Here we go')

	//
	customElements.define('c-application', App)
	customElements.define('c-application-bar', ApplicationBar)
	customElements.define('c-user-account', UserAccount)

	//
	const loginButtonElem = document.querySelector('#loginButton')
	loginButtonElem.addEventListener('click', handleLoginButton)

	const logoutButtonElem = document.querySelector('#logoutButton')
	logoutButtonElem.addEventListener('click', handleLogoutButton)

	// another way
	const applicationElem = document.querySelector('c-application')
	const observer = new MutationObserver((mutations, observer) => console.log(mutations))
	observer.observe(applicationElem, { attributes: true })
}

if(document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onContentLoaded)
}
else {
	onContentLoaded()
}
