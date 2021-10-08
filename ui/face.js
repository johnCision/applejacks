

//
export class Face extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('face-template')
		const content = template.content
		this._shadowDom = this.attachShadow({ mode: 'open' })
		this._shadowDom.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [ 'size', 'avatar' ] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(name, oldValue, newValue) {
		const imgElem = this.shadowRoot.querySelector('IMG')
		imgElem.setAttributeNS('', 'src', newValue)
		imgElem.setAttributeNS('', 'height', '64px')
		imgElem.setAttributeNS('', 'width', '64px')
	}
}
