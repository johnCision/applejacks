import { expect, test } from '@jest/globals'

import { Button } from '../src/button.js'

test('Button', () => {
	// expect(Button).toBeInstanceOf(HTMLElement)
	expect(Button.observedAttributes).toContain('kind')
	expect(Button.observedAttributes).toContain('disabled')

	customElements.define('test-button', Button)

	const t = document.createElementNS('', 'template')
	t.setAttributeNS('', 'id', 'button-template')

	document.head.appendChild(t)

	const b = document.createElementNS('', 'test-button')

	expect(b).toBeInstanceOf(Element)
})
