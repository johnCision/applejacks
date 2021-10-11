

//
export class Page extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('page-template')
		const content = template.content
		const shadow = this.attachShadow({ mode: 'open' })
		shadow.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [''] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {
	}
}
