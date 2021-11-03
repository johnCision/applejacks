function onClick(event) {
	console.log('inner, button event', event.target)
	// const disabled = event.target.getAttributeNS('', 'disabled')
	// console.log({ disabled })
}

//
export class Button extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('button-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() {
		return [ 'kind', 'icon', 'size', 'disabled' ]
	}

	connectedCallback() {
		const buttonElem = this.shadowRoot.querySelector('#button')
		buttonElem.addEventListener('click', onClick)
	}
	disconnectedCallback() {}
	adoptedCallback() {}
	attributeChangedCallback(name, _oldValue, newValue) {
		if(name !== 'disabled') { return }
		const has = this.hasAttributeNS('', 'disabled')
		const buttonElem = this.shadowRoot.querySelector('button')

		if(has) {
			buttonElem.setAttributeNS('', 'disabled', newValue)
			return
		}

		buttonElem.removeAttributeNS('', 'disabled')
	}
}
