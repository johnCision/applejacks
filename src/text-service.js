
const ATTR_HREF = 'href'

//
export class TextService extends HTMLElement {
	constructor() {
		super()
	}

	static get observedAttributes() { return [ ATTR_HREF ] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {
		if(name !== ATTR_HREF) { return }

		// should we tell all the c-text to update?
	}
}
