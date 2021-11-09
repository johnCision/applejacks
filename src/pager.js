// this components control attribute
const ATTR_PAGE = 'page'

// attributes on target pages
const ATTR_NAME = 'name'
const ATTR_ACTIVE = 'active' // could be data-active
const ATTR_ACTIVE_VALUE = 'true'

const PAGE_NAMES_UNKNOWN = 'unknown'

function selectorForPage(name) {
	return ':scope > *[' + ATTR_NAME + '="' + name + '"]'
}
const UNKNOWN_PAGE_SELECTOR = selectorForPage(PAGE_NAMES_UNKNOWN)
const ACTIVE_PAGE_SELECTOR = ':scope > *[' + ATTR_ACTIVE + ']'

//
export class Pager extends HTMLElement {
	static get observedAttributes() { return [ ATTR_PAGE ] }

	attributeChangedCallback(name, oldValue, newValue) {
		// only update on page change
		if(name !== ATTR_PAGE) { return }

		// toss out last active page (querySelectorAll for good measure?)
		const lastActiveElem = this.querySelector(ACTIVE_PAGE_SELECTOR)
		if(lastActiveElem) { lastActiveElem.removeAttribute(ATTR_ACTIVE) }

		// find the next active page
		const nextActiveElem = this.querySelector(selectorForPage(newValue))

		// if found then set active
		if(nextActiveElem !== null) {
			nextActiveElem.setAttribute(ATTR_ACTIVE, ATTR_ACTIVE_VALUE)
			return
		}

		// fallback if not found to unknown if exists
		const unknownPageElement = this.querySelector(UNKNOWN_PAGE_SELECTOR)
		if(unknownPageElement !== null) {
			unknownPageElement.setAttribute(ATTR_ACTIVE, ATTR_ACTIVE_VALUE)
			return
		}

		console.warn('unknown page selected, and no unknown fallback', newValue)
	}
}
