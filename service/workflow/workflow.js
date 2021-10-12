

const STATES = {
	'anon': {
		'LOGIN': { target: 'welcome_user' }
	},
	'welcome_user': {
		'LOGOUT': { target: 'anon' },
		'START': { target: 'questions' }
	},
	'questions': {
		'RESET': { target: 'welcome_user' },
		'NEXT': {},
		'PREV': {},
	},
	'home': {
		'LOGOUT': { target: 'anon' },
		'RESET': { target: 'welcome_user' },
		'START': { target: 'questions'}
	}
}

class Stately {
	static async transition(machine, state, transition) {

	}
}

export async function handleWorkflow(method, pathname, search) {


}