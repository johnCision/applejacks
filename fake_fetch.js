const DB = {
	'app.v0.json': {
		state: 'anon',

		actions: [
			{ rel: 'login', href: 'app.v1.json' }
		]
	},
	'app.v1.json': {
		name: 'applejacks',
		state: 'welcome_user',

		actions: [
			{ rel: 'start', href: 'app.v2.json' },
			{ rel: 'logout', href: 'app.v0.json' }
		]
	},
	'app.v2.json': {
		name: 'applejacks',
		state: 'questions',

		q: 'pick a color',

		actions: [
			{ rel: 'back', href: 'app.v2.json' },

			{ rel: 'colorRed', href: 'app.v3.json?color=Red' },
			{ rel: 'colorGreen', href: '' },
			{ rel: 'colorBlue', href: '' }
		]
	},
	'app.v3.json': {
		name: 'applejacks',
		state: 'questions',

		q: 'enter some keywords',

		actions: [
			{ rel: 'validate', href: 'app.v3.json' },
			{ rel: 'submit', href: 'app.v4.json' }
		]
	}
}

export async function fake_fetch(urn) {
	const key = urn.split('?')[0]
	const result = DB[key]
	console.log('fake_fetch', key, result)
	return new Promise((resolve, reject) => setTimeout(() => resolve(result), 10))
}
