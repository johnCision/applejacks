import * as http2 from 'http2'
import { promises as fs } from 'fs'

const {
	SSL_OP_NO_TLSv1,
	SSL_OP_NO_TLSv1_1,
} = http2.constants;


export async function createLocalServer() {
	const localCert = await fs.readFile('./service/http/localhost-cert.pem', 'utf-8')

	return http2.createSecureServer({
		key: await fs.readFile('./service/http/localhost-privkey.pem', 'utf-8'),
		cert: localCert,
			allowHTTP1: true,
			secureOptions: SSL_OP_NO_TLSv1 | SSL_OP_NO_TLSv1_1,
		pfx: await fs.readFile('./service/http/output.pfx'),
		passphrase: 'asdf'
	})
}

/*
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem

	openssl pkcs12 -export -in localhost-cert.pem  -inkey localhost-privkey.pem -out output.pfx

	sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ~/.localhost-ssl/localhost.crt
*/