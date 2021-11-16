import { expect, describe, test, beforeAll } from '@jest/globals'

import { Button } from '../src/button.js'

function injectTemplate(doc) {
	// do not use NS here as jest freaks
	const t = doc.createElement('template')
	t.setAttribute('id', 'button-template')

	const b = doc.createElement('button')
	b.setAttribute('id', 'button')
	t.appendChild(b)

	doc.head.appendChild(t)
}

// is this really how jest suggest this is done?
// how to test different names?
// how to test phases of defined
// how to test customElements.whenDefined
// how to test constructor when not in registry (dom error)
customElements.define('test-button', Button)

describe('Button', () => {
	beforeAll(() => injectTemplate(document))
	//test  expect(Button).toBeInstanceOf(HTMLElement)

	test('attributes', () => {
		expect(Button.observedAttributes).toContain('kind')
		expect(Button.observedAttributes).toContain('disabled')
	})

	test('construction (via new Button))', async () => {
		await customElements.whenDefined('test-button')

		const b = new Button()
		expect(b).toBeDefined()
	})

	test('construction (via createElementNS)', async () => {
		await customElements.whenDefined('test-button')

		const b = document.createElementNS('', 'test-button')

		//
		expect(b).toBeInstanceOf(Element)
	})

	test('attach button to DOM', async () => {
		await customElements.whenDefined('test-button')
		const b = document.createElement('test-button')

		document.body.appendChild(b)
	})

	test('update unknown attribute', async () => {
		await customElements.whenDefined('test-button')
		const b = document.createElement('test-button')

		document.body.appendChild(b)

		b.setAttributeNS('', 'foo', true)
	})

	test('update observed attribute', async () => {
		await customElements.whenDefined('test-button')
		const b = document.createElement('test-button')

		document.body.appendChild(b)

		b.setAttributeNS('', 'kind', 'something')
	})

	test('toggle disabled attribute', async () => {
		await customElements.whenDefined('test-button')
		const b = document.createElement('test-button')

		document.body.appendChild(b)

		b.toggleAttribute('disabled')
	})
})
