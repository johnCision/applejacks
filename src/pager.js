const ATTR_ACTIVE = 'active' // could be data-active
const ATTR_PAGE = 'page'

//
export class Pager extends HTMLElement {

	static get observedAttributes() { return [ ATTR_PAGE ] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {
		// if targetActiveElement is a c-page then active=true works
		// however if it is not, then we should use data-active=true
		// this would be useful to support non page element switching

		if(name !== ATTR_PAGE) { return }

		const lastActiveElem = this.querySelector('*[' + ATTR_ACTIVE + ']')
		if(lastActiveElem) { lastActiveElem.removeAttribute(ATTR_ACTIVE) }

		const targetActiveElement = this.querySelector('*[name="' + newValue + '"]')

		if(targetActiveElement !== null) {
			targetActiveElement.setAttribute(ATTR_ACTIVE, 'true')
			return
		}

		const unknownPageElement = this.querySelector('*[name="unknown"]')
		if(unknownPageElement !== null) {
			unknownPageElement.setAttribute(ATTR_ACTIVE, true)
			return
		}

		console.warn('unknown page selected, and no unknown fallback', newValue)
	}
}
