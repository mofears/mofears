const axios = require('axios')
const User = require('../models/user')
const {
    OAuth2Client
} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {

    static login(req, res, next) {
        console.log(req.body)
        // client.verifyIdToken({
        //     idToken: req.body.token,
        //     audience: process.env.GOOGLE_CLIENT_ID
        // })
        // .then(ticket => {
        //     let payload = ticket.getPayload()
        //     return Promise.all([payload, User.findOne({
        //         email: payload.email
        //     })])
        // })
        // .then(([payload, user]) => {
        //     if (user) {
        //         return user
        //     } else {
        //         return User.create({
        //             name: payload.name,
        //             email: payload.email,
        //             password: 'random',
        //             imgUrl: payload.picture
        //         })
        //     }
        // })
        // .then(user => {
            
        //     console.log(user)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }

}

module.exports = UserController