class YoutubeController {
  static get(req, res) {
    res.status(200).json({ message: 'masuk' })
  }
}

module.exports = YoutubeController