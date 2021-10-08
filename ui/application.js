import { fake_fetch } from '../fake_fetch.js'

const ATTRIBUTE_HREF = 'href'
const ATTRIBUTE_GITHUBTOKEN = 'github-token'

//
export class App extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('app-template')
		const content = template.content
		this._shadowRoot = this.attachShadow({ mode: 'open' })
		this._shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [
		ATTRIBUTE_HREF, ATTRIBUTE_GITHUBTOKEN
	] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {

		console.log('application attribute update', { name, oldValue, newValue })

		if (name === ATTRIBUTE_HREF) { App.updateHref(this); return }
		if (name === ATTRIBUTE_GITHUBTOKEN) { App.updateGithubToken(this); return }

		console.warn('unknown attribute change on application', { name })
	}

	static async updateGithubToken(appElem) {

		const githubToken = appElem.getAttribute(ATTRIBUTE_GITHUBTOKEN)
		console.log('updating github user ...', { githubToken })

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
		// fire an async ...
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

		// for any page child node, update the active page
		const pageElemList = appElem.querySelectorAll('*[slot="pages"]')
		pageElemList.forEach((pageElem, key) => {
			//console.log('updating app route', { pageElem, key })

			// select by state -> id
			const id = pageElem.getAttribute('ID')
			const isActive = pageElem.getAttribute('ACTIVE')

			if (id === state) { pageElem.setAttribute('ACTIVE', true) }
			if (id !== state && isActive) { pageElem.setAttribute('ACTIVE', false) }
		})
	}
}

