import { fake_fetch } from '../fake_fetch.js'

//
export class App extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('app-template')
		const content = template.content
		this._shadowRoot = this.attachShadow({ mode: 'open' })
		this._shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return ['HREF', 'href'] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {
		console.log('href update', { name, oldValue, newValue })
		if (name.toUpperCase() !== 'HREF') { console.log('unknown attr', name); return }

		// fire an async ...
		fake_fetch(this.getAttribute('HREF'))
			.then(result => {
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

				const userElem = this.querySelector('c-user-account')
				// result.actions.login
				if (name && userElem) { userElem.setAttribute('NAME', name) }

				// for any page child node, update the active page
				const pageElemList = this.querySelectorAll('*[slot="pages"]')
				pageElemList.forEach((pageElem, key) => {
					//console.log('updating app route', { pageElem, key })

					// select by state -> id
					const id = pageElem.getAttribute('ID')
					const isActive = pageElem.getAttribute('ACTIVE')

					if (id === state) { pageElem.setAttribute('ACTIVE', true) }
					if (id !== state && isActive) { pageElem.setAttribute('ACTIVE', false) }
				})
			})
			.catch(e => { console.error('fetch threw an error', e) })
	}

	static async updateHref(r) { }
}
