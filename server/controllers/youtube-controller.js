const axios = require('axios');
const youtubeAPI = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

class YoutubeController {
  static getData(req, res, next) {
    youtubeAPI.get(`/search?part=id&q=trailer${req.body.title}&type=video&key=${process.env.YOUTUBE_API_KEY}`)
    .then(({ data }) => {
      res.status(200).json(data.items[0].id.videoId)
    })
    .catch(next)
  }
}

module.exports = YoutubeController