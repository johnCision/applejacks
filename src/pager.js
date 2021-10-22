//
export class Pager extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('pager-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return ['page'] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {
		// if targetActiveElement is a c-page then active=true works
		// however if it is not, then we should use data-active=true
		// this would be useful to support non page element switching

		if(name !== 'page') { return }

		const lastActiveElem = this.querySelector('*[active="true"]')
		if(lastActiveElem) { lastActiveElem.removeAttributeNS('', 'active') }

		const targetActiveElement = this.querySelector('*[name="' + newValue + '"]')

		targetActiveElement.setAttributeNS('', 'active', 'true')


	}
}
