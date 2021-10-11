import { createLocalServer } from './http/http.js'
import { createRouter } from './http/route.js'
import { handleGithubAuth } from './auth/github.js'
import { handleWorkflow } from './workflow/workflow.js'

const router = createRouter({
	'/github_token': handleGithubAuth,
	'/workflow': handleWorkflow,
	'/data': undefined
})
const server = await createLocalServer()
server.on('error', e => console.log({ e }))
server.on('request', (req, res) => router)

server.listen(8080, () => console.log('service up'))