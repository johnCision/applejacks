

//
export class Pager extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('pager-template')
		const content = template.content
		const shadow = this.attachShadow({ mode: 'open' })
		shadow.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return ['page'] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {

		if (name != 'page') { return }

		const lastActiveElem = this.querySelector('*[active="true"]')
		console.log({ lastActiveElem })
		if(lastActiveElem) { lastActiveElem.removeAttributeNS('', 'active') }

		const targetActiveElement = this.querySelector('*[name="' + newValue + '"]')
		console.log({ targetActiveElement })
		targetActiveElement.setAttributeNS('', 'active', 'true')



	}
}
