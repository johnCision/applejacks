//
export class Text extends HTMLElement {
	#hasAdoptedText

	constructor() {
		super()

		this.#hasAdoptedText = false
	}

	static get observedAttributes() { return [ 'lang', 'key', 'refresh' ] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, oldValue, newValue) {

		//
		const keyValue = this.getAttributeNS('', 'key')
		const langValue = this.getAttributeNS('', 'lang')


		if(!this.#hasAdoptedText && Text.shouldAdoptText(this, oldValue)) {

			Text.adoptText(this)

			this.#hasAdoptedText = true
		}

		if(name === 'key') { return }
		if(name !== 'lang') { return }

		//
		const existingSpanElem = this.querySelector('span[lang="' + newValue + '"]')
		if(existingSpanElem) { return }

		// const response = await fetch(urlToKeyServer)
		// response.ok()
		// const result = await response.json()

		const text = 'Now is the time'
		const spanElem = Text.createLangSpan(newValue, text)
		this.appendChild(spanElem)

	}

	static adoptText(textElem) {
		const langValue = textElem.getAttributeNS('', 'lang')
		const text = textElem.innerText

		textElem.childNodes.forEach(c => c.remove())

		const adoptedSpanElem = Text.createLangSpan(langValue, text)
		textElem.appendChild(adoptedSpanElem)
	}

	static shouldAdoptText(textElem, oldValue) {
		if(oldValue !== null) { return false }

		const langValue = textElem.getAttributeNS('', 'lang')
		const keyValue = textElem.getAttributeNS('', 'key')

		if(langValue === undefined) { return false }
		if(keyValue === undefined) { return false }

		if(langValue === null) { return false }
		if(keyValue === null) { return false }

		if(langValue === '') { return false }
		if(keyValue === '') { return false }

		return true
	}

	static createLangSpan(lang, text) {
		const spanElem = document.createElementNS('', 'span')
		spanElem.setAttributeNS('', 'lang', lang)
		const textNode = document.createTextNode(text)
		spanElem.appendChild(textNode)
		return spanElem
	}
}
