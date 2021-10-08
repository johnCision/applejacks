import * as http2 from 'http2'
import { promises as fs } from 'fs'

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

const localCert = await fs.readFile('localhost-cert.pem', 'utf-8')

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


const server = http2.createSecureServer({
  key: await fs.readFile('localhost-privkey.pem', 'utf-8'),
  cert: localCert,
	allowHTTP1: true,
	secureOptions: SSL_OP_NO_TLSv1 | SSL_OP_NO_TLSv1_1,
  pfx: await fs.readFile('output.pfx'),
  passphrase: 'asdf'
});

server.on('error', (err) => console.error('server error:', { err }));

server.on('request', async (req, res) => {
	const reqUrl = new URL(req.url, 'https://dummy')
	console.log('on request', req.method, reqUrl.pathname, reqUrl.search)
	//if(req.method !== HTTP2_METHOD_POST) { res.end(); return }
	if(reqUrl.pathname !== '/github_token') { res.end(); return }

	const sp = new URLSearchParams(reqUrl.search)

	if(!sp.has('code')) {
		console.log('no code?')
		throw new Error('no code')
	}

	const code = sp.get('code')
	try {
		const token = await request_token(code)

		const json = JSON.stringify({ token })
		console.log('got token writing json', json)
		res.writeHead(200, {
			'Content-Length': Buffer.byteLength(json),
			'Content-Type': 'applicatin/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		})
		res.write(json)
		res.end()
	}
	catch(e) {
		console.log('error fetching token', { e })
		res.writeHead(200)
		res.end(JSON.stringify({ e }))
	}
})

//
server.listen(8080, e => console.log({ e }))
console.log('listening')


	/*
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem

	openssl pkcs12 -export -in localhost-cert.pem  -inkey localhost-privkey.pem -out output.pfx

	sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ~/.localhost-ssl/localhost.crt
	*/