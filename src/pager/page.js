//
export class Page extends HTMLElement {

	static get observedAttributes() { return ['active'] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(_name, _oldValue, _newValue) {
	}
}
