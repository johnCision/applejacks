//
export class Text extends HTMLElement {

	static get observedAttributes() { return [ 'lang', 'key' ] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, _oldValue, newValue) {
		// console.log('text attr changed', name, newValue)

		if(name === 'key') { return }
		if(name !== 'lang') { return }

		const key = this.getAttributeNS('', 'key')
		const lang = newValue

		//
		const existingSpanElem = this.querySelector('span[lang="' + lang + '"]')
		if(existingSpanElem !== null) { return }

		const serviceElem = document.querySelector('c-text-service')
		const href = serviceElem.getAttributeNS('', 'href')

		const url = new URL(href)
		const search = new URLSearchParams(url.search)
		search.append('keys', key)
		search.append('lang', lang)
		url.search = search

		fetch(url)
			.then(response => response.json())
			.then(result => {
				const text = result[key]
				if(text === undefined) {
					throw new Error('unresolved key: ' + key)
				}


				const anySpanElem = this.querySelector('span')
				if(anySpanElem === null) {
					// no span, initial state, may have raw-text
					this.childNodes.forEach(c => c.remove())
				}

				// now create a cache item of the lookup
				const spanElem = Text.createLangSpan(lang, text)
				this.appendChild(spanElem)
			})
			.catch(e => {
				//console.warn('key fetch error', { e })
				console.log('key fetch', e)
			})
	}

	static createLangSpan(lang, text) {
		const spanElem = document.createElementNS('', 'span')
		spanElem.setAttributeNS('', 'lang', lang)
		const textNode = document.createTextNode(text)
		spanElem.appendChild(textNode)
		return spanElem
	}
}
