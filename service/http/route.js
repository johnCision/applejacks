

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
				const ab = ArrayBuffer.from(result)
				if(ab.byteLength !== Buffer.byteLength) { console.warn('ab missmatch')}
				res.writeHead(200, {
					'Content-Length': Buffer.byteLength(result),
					'Content-Type': 'applicatin/json; charset=utf-8',
					'Access-Control-Allow-Origin': '*'
				})
				res.write(result)
				res.end()
			})
			.catch(e => {
				console.log({ e })
				res.writeHead(200)
				res.write({ e })
				res.end()
			})
	}
}