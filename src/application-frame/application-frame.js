/* eslint-disable max-classes-per-file */

const ATTRS = {
	SHOW_ASIDE: 'show-aside',
	SHOW_TOOLBAR: 'show-toolbar',
	SHOW_CHAT: 'show-chat',
	SHOW_ALERT: 'show-alert'
}

//
class ApplicationFrameCore extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('application-frame-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return Object.keys(ATTRS).map(k => ATTRS[k]) }

	attributeChangedCallback(_name, _oldValue, _newValue) { }
}

//
// example of exporting attributes as properties of the object
// this can be helpful for api interacts that are pure js
// and/or do not want to be exposed to the core dom interface
export class ApplicationFrame extends ApplicationFrameCore {
	get showAside() {
		const show = this.getAttributeNS('', ATTRS.SHOW_ASIDE)
		return show === true
	}

	set showAside(value) {
		if(value) { this.setAttributeNS('', ATTRS.SHOW_ASIDE, true); return }
		this.removeAttributeNS('', ATTRS.SHOW_ASIDE)
	}
}
