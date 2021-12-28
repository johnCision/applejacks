export class ApplicationBar extends HTMLElement {
	static template

	constructor() {
		super()

		const { content } = ApplicationBar.template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [ ] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(_name, _oldValue, _newValue) { }
}
