const jwtoken = require('../helpers/jwt')

module.exports = {
    authentication(req, res, next) {
        console.log('masuk <<<<<<<')
        console.log(req.headers.token, 'token di authentication <<<<<<<<<')
        try {
            var decoded = jwtoken.verifyToken(req.headers.token)
            req.headers.decoded = decoded
            next()
        } catch (err) {
            throw new Error(`Invalid token.`)
        }
    }
}