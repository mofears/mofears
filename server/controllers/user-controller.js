const axios = require('axios')
const User = require('../models/user')
const {
    OAuth2Client
} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const passwordGen = require('../helpers/generatePass')
const jwt = require('../helpers/jwt')

class UserController {

    static login(req, res, next) {
        client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                let payload = ticket.getPayload()
                return Promise.all([payload, User.findOne({
                    email: payload.email
                })])
            })
            .then(([payload, user]) => {
                // delete payload.exp
                if (user) {
                    return Promise.all([payload, user])
                } else {
                    return Promise.all([payload, User.create({
                        name: payload.name,
                        email: payload.email,
                        password: passwordGen(),
                        imgUrl: payload.picture
                    })])
                }
            })
            .then(([payload]) => {
                let token = jwt.signToken(payload)
                res.status(200).json(token)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static logout(req, res, next) {
        req.headers.token = ''
        res.status(200).json('Successfuly logged out.')
    }

}

module.exports = UserController