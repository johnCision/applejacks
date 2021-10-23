//
export class Button extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('button-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [ 'kind', 'icon', 'size', 'disabled' ] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(name, _oldValue, newValue) {
		if(name !== 'disabled') { return }
		const has = this.hasAttributeNS('', 'disabled')
		const buttonElem = this.shadowRoot.querySelector('button')

		console.log( { has, buttonElem})

		if(has) {
			buttonElem.setAttributeNS('', 'disabled', newValue)
		}
	}
}
