//
export class ApplicationFrame extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('application-frame-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return ['show-aside', 'show-toolbar'] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(_name, _oldValue, _newValue) { }
}
