


//
export class ApplicationBar extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('application-bar-template')
		const content = template.content
		const root = this.attachShadow({ mode: 'open' })
		root.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [ ] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(name, oldValue, newValue) {  }
}
