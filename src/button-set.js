export class ButtonSet extends HTMLElement {
	static template

	constructor() {
		super()

		const { content } = ButtonSet.template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	// show values 'start', 'end', 'both' ?
	static get observedAttributes() { return [ 'show' ] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(_name, _oldValue, _newValue) { }
}
