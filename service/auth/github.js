import * as http2 from 'http2'

const {
	HTTP2_HEADER_PATH,
	HTTP2_HEADER_STATUS,
	HTTP2_METHOD_POST,
	HTTP2_METHOD_GET,
	HTTP2_HEADER_METHOD,
	HTTP2_HEADER_ACCEPT,

	SSL_OP_NO_TLSv1,
	SSL_OP_NO_TLSv1_1,

} = http2.constants;


async function request_token(code) {
	const client_id = '86bb02292e0e29cc1ae6'
	const client_secret = 'ec88736b241d8f669d8a3023ee29ba60f26ba3cf'

	// 'https://github.com/login/oauth/access_token'
	return new Promise((resolve, reject) => {
		const client = http2.connect('https://github.com', {
			//ca: localCert
		});

		client.on('error', (err) => reject(err));

		const sp = new URLSearchParams({
			client_id, client_secret, code
		})

		const path = '/login/oauth/access_token'
		const reqPath = path + '?' + sp.toString()
		console.log('requesting from github', reqPath)
		const req = client.request({
			[HTTP2_HEADER_METHOD]: HTTP2_METHOD_POST,
			[HTTP2_HEADER_PATH]: reqPath,
			[HTTP2_HEADER_ACCEPT]: 'application/json'
		});

		req.setEncoding('utf8')

		req.on('response', (headers, flags) => {
			console.log('github status', headers[HTTP2_HEADER_STATUS])
			for (const name in headers) {
			}
		})

		let data = ''
		req.on('data', (chunk) => { data += chunk; })
		req.on('end', () => {

			client.close()

			const json = JSON.parse(data)

			if(json.error) { reject(json.error); return }

			resolve(json.access_token)
		})
		req.end()
	})
}



export async function handleGithubAuth(method, pathname, search) {
	console.log('handling github auth')
	if(pathname !== '/github_token') { throw new Error('unhandled pathname') }
	const sp = new URLSearchParams(search)

	if(!sp.has('code')) {
		console.log('no code?')
		throw new Error('no code')
	}

	const code = sp.get('code')
	const token = await request_token(code)
	return JSON.stringify({ token })
}