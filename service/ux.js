import { createLocalServer } from './http/http.js'
import { createRouter } from './http/route.js'
import { handleGithubAuth } from './auth/github.js'
import { createWorkflowHandler } from './workflow/workflow.js'

const delightUsersStore = {
	'email': { state: 'anon' }
}

const delighAppStates = {
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

const handleDelightAppWorkflow = createWorkflowHandler()

const router = await createRouter({
	'/github_token': handleGithubAuth,
	'/delight': handleDelightAppWorkflow,
	'/data': undefined
})
const server = await createLocalServer()
server.on('error', e => console.log({ e }))
server.on('request', router)

server.listen(8080, () => console.log('service up'))