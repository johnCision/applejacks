//
export class Face extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('face-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [ 'size', 'avatar', 'initials' ] }

	connectedCallback() {} // appended into a document
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(name, oldValue, newValue) {

		const avatarElem = this.shadowRoot.getElementById('avatar')
		// const unknownFaceElem = this.shadowRoot.getElementById('unknownFace')
		// const initialsElem = this.shadowRoot.getElementById('initials')


		avatarElem.setAttributeNS('', 'src', newValue)
	}
}
