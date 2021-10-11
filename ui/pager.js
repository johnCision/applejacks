

//
export class Pager extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('pager-template')
		const content = template.content
		this._shadowDom = this.attachShadow({ mode: 'open' })
		this._shadowDom.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return ['page'] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {

		if (name != 'page') { return }

		//const activeElem = this._shadowDom.querySelector('')
	}
}
