const jwt = require('jsonwebtoken')
exports.verifyJwtToken = (token, secretKey) => {
	console.log('vo day r')
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) {
				return reject(err)
			}
			resolve(decoded)
		})
	})
}
