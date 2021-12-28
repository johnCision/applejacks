//
export class Button extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = Button.template

		if(templateElement === undefined || templateElement === null) {
			throw new Error('template undefined')
		}

		const { content } = templateElement
		this.attachShadow({ mode: 'open' })
		const clone = content.cloneNode(true)
		this.shadowRoot.appendChild(clone)
	}

	static get observedAttributes() {
		return [ 'kind', 'icon', 'size', 'disabled' ]
	}

	static onClick(event) {
		console.log('inner, button event', event.target)
		// const disabled = event.target.getAttributeNS('', 'disabled')
		// console.log({ disabled })
	}


	connectedCallback() {
		const buttonElem = this.shadowRoot.querySelector('#button')
		buttonElem.addEventListener('click', Button.onClick)
	}

	disconnectedCallback() {
		// removeEventListener('click')
	}

	adoptedCallback() { }

	attributeChangedCallback(name, _oldValue, newValue) {
		//console.log('aCC', name, newValue)
		if(name !== 'disabled') { return }
		const has = this.hasAttributeNS('', 'disabled')
		const buttonElem = this.shadowRoot.querySelector('#button')

		if(has) {
			buttonElem.setAttributeNS('', 'disabled', newValue)
			return
		}

		buttonElem.removeAttributeNS('', 'disabled')
	}
}
