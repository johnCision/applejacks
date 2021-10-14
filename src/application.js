
const ATTRIBUTE_HREF = 'href'
const ATTRIBUTE_GITHUBTOKEN = 'github-token'
const ATTRIBUTE_STATE = 'state'

//
export class App extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('app-template')
		const content = template.content
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [
		ATTRIBUTE_HREF, ATTRIBUTE_GITHUBTOKEN, ATTRIBUTE_STATE
	] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {
		console.log('application attribute update', { name, oldValue, newValue })

		const future =
			(name === ATTRIBUTE_HREF) ? App.updateHref(this) :
			(name === ATTRIBUTE_GITHUBTOKEN) ? App.updateGithubToken(this) :
			(name === ATTRIBUTE_STATE) ? App.updateState(this) :
			Promise.reject(new Error('unknown attribute:' + name))

		future
			.then()
			.catch(e => console.warn('future error', e))
	}

	static async updateGithubToken(appElem) {

		const githubToken = appElem.getAttribute(ATTRIBUTE_GITHUBTOKEN)
		console.log('updating github user', { githubToken })

		const response = await fetch('https://api.github.com/user', {
			headers: {
				'Authorization': 'Basic ' + btoa(':' + githubToken)
			}
		})

		const json = await response.json()
		console.log({ json })

		const { avatar_url, login, repos_url } = json

		const userElem = appElem.querySelector('c-user-account')
		userElem.setAttributeNS('', 'name', login)
		userElem.setAttributeNS('', 'avatar', avatar_url)
	}

	static async updateHref(appElem) {
		// fire an async
		throw new Error('replace with real fetch to localhost server')
		const result = await fake_fetch(appElem.getAttribute(ATTRIBUTE_HREF))
		// check status code and throw error
		// check result is json or throw error
		console.log('href update', result)

		// apply result to state
		const { name, state, actions } = result

		if (actions.login) { }
		if (actions.logout) { }
		if (actions.start) { }
		if (actions.back) { }
		if (actions.validate) { }
		if (actions.submit) { }

		// support for interaction with known child nodes
		// for any user acount child nodes, update the current user name
		const userElem = appElem.querySelector('c-user-account')
		// result.actions.login
		if (name && userElem) { userElem.setAttribute('NAME', name) }


		//
		appElem.setAttributeNS('', 'state', state)
	}

	static async updateState(appElem) {
		// odd
		console.warn('who updated my state? likely me')
	}
}

