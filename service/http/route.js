



export async function createRouter(options) {
	return (req, res) => {
		// construct a url object out of the request url
		// need a dummy base in order to construct properly, however,
		// it is not - and should not - ever be read in the follwoing code
		const reqUrl = new URL(req.url, 'https://dummy')

		const { method, pathname, search } = reqUrl

		// look up the bound handler for this path
		const handler = options[pathname]
		if(typeof handler !== 'function') {
			// if this is not found, or not a proper function, return 404
			console.warn('no handler', { pathname })
			res.writeHead(404, { 'Access-Control-Allow-Origin': '*' })
			res.write(JSON.stringify({ error: new Error('no handler for path') }))
			res.end()
			return
		}

		// fire promise for response
		// handler is not async, thus explicit promise with catch required
		// res should realy have a .waitFor(<promis>) method
		handler(method, pathname, search)
			.then(result => {
				// encode the results as bytes in order to apply content length
				const enc = new TextEncoder()
				const ab = enc.encode(result)

				res.writeHead(200, {
					'Content-Length': ab.byteLength,
					'Content-Type': 'applicatin/json; charset=utf-8',
					'Access-Control-Allow-Origin': '*'
				})

				// should we be writing result, or ab here?
				res.write(result)
				res.end()
			})
			.catch(e => {
				console.warn('handler exception', { e })
				res.writeHead(200, { 'Access-Control-Allow-Origin': '*' })
				res.write(JSON.stringify({ error: new Error('exception in handler') }))
				res.end()
			})
	}
}