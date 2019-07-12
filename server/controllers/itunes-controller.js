let axios = require('axios')
let iTunesAPI = axios.create({
    baseURL: 'https://itunes.apple.com/search',
})
class ItunesController {

    static getMusic(req, res, next) {
        // console.log(req.body)
        iTunesAPI.get(`?term=${req.body.term}&limit=1&media=music`)
            .then(songs => {
                // console.log(songs.data)
                res.status(200).json(songs.data)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error',
                    source: 'itunesController_getMusic',
                    error: err
                })
            })
    }

}

module.exports = ItunesController