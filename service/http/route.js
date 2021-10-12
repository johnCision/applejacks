

export async function createRouter(options) {
	return (req, res) => {
		const reqUrl = new URL(req.url, 'https://dummy')
		console.log('on request - route', req.method, reqUrl.pathname, reqUrl.search)
		const { method, pathname, search } = reqUrl

		const handler = options[pathname]
		if(handler === undefined) { console.warn('no handler'); res.end(); return }

		// fire promise for response
		handler(method, pathname, search)
			.then(result => {
				const enc = new TextEncoder()
				const ab = enc.encode(result)
				res.writeHead(200, {
					'Content-Length': ab.byteLength,
					'Content-Type': 'applicatin/json; charset=utf-8',
					'Access-Control-Allow-Origin': '*'
				})
				res.write(result)
				res.end()
			})
			.catch(e => {
				console.log({ e })
				res.writeHead(200, { 'Access-Control-Allow-Origin': '*' })
				res.write(JSON.stringify({ e }))
				res.end()
			})
	}
}