const HTML5_NS = ''

//
export class UserAccount extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('user-template')
		const content = template.content
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return ['name', 'avatar'] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {
		//
	}

}
