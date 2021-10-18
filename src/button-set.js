export class ButtonSet extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('button-set-template')
		const content = template.content
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	// show values 'start', 'end', 'both' ?
	static get observedAttributes() { return [ 'show' ] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(name, oldValue, newValue) {  }
}
