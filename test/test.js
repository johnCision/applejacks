import { test, expect } from '@jest/globals'

console.log(test)

test('adds 1 + 1 to equal 2', () => {
	expect(1 + 1).toBe(2)
})
