//
export class Icon extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('icon-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return ['name', 'size'] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(_name, _oldValue, _newValue) { }
}
