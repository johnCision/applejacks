//
const ATTR_HREF = 'href'

//
export class TextService extends HTMLElement {

	static get observedAttributes() { return [ ATTR_HREF ] }

	connectedCallback() {
		// observer the html lang attribute
		// on change, fire update for all c-text elements
		// this will cause key update requests for only
		// the unknown keys

		const htmlElem = document.querySelector('html')
		const observer = new MutationObserver(mutations => {
			const [ latestMutation ] = mutations.slice(-1)
			const { attributeName } = latestMutation

			if(attributeName !== 'lang') { return }

			const lang = htmlElem.getAttributeNS('', 'lang')

			const textElems = document.querySelectorAll('c-text')
			textElems.forEach(textElem => {
				textElem.setAttributeNS('', 'lang', lang)
			})

		})
		const _o = observer.observe(htmlElem, { attributes: true })

	}
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(_name, _oldValue, _newValue) {
		// if(name !== ATTR_HREF) { return }
		// should we tell all the c-text to update?
	}
}
