//
export class UserAccount extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('user-template')
		const content = template.content
		this._shadowRoot = this.attachShadow({ mode: 'open' })
		this._shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return ['name'] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {
		if (name !== 'name') { return }

		//console.log('user change', { name, oldValue, newValue })

		const activeUser = newValue !== ''

		console.log('set user active state to', activeUser)

		// update placholder
		//const userNameElem = this._shadowRoot.querySelector('#userName')
		//userNameElem.innerText = newValue

		// update ui state
		const hostClassList = this._shadowRoot.querySelector('#control').classList
		if (activeUser && !hostClassList.contains('active')) { hostClassList.add('active') }
		if (!activeUser && hostClassList.contains('active')) { hostClassList.remove('active') }
	}
}
