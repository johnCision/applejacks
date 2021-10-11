

//
export class Button extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('button-template')
		const content = template.content
		const root = this.attachShadow({ mode: 'open' })
		root.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [ 'kind', 'icon', 'size' ] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(name, oldValue, newValue) {  }
}
