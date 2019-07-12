const axios = require('axios')
const mov = axios.create({
    baseURL: 'https://api.themoviedb.org',
    // timeout: 1000,
});

class OmdbController{
    static get(req, res){
        mov.get(`/3/movie/now_playing?api_key=1b8ff859a98498062adad4ed8f268b6b&language=en-US&page=1`)
        .then(function ({ data }) {
            res.status(200).json(data)
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({
                message: 'Not Found!',
                resource: 'controller omdb get!!!',
                data: error
            })
        })
    }
    static getPopular(req, res){
        mov.get(`/3/movie/popular?api_key=1b8ff859a98498062adad4ed8f268b6b&language=en-US&page=1`)
        .then(function ({ data }) {
            res.status(200).json(data)
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({
                message: 'Not Found!',
                resource: 'controller omdb getPopular!!!',
                data: error
            })
        })
    }
    static searchMovie(req, res){
        // console.log(req.query.title)
        const find = req.query.title
        mov.get('/3/movie/now_playing?api_key=1b8ff859a98498062adad4ed8f268b6b&language=en-US&page=1')
        .then(function ({ data }) {
            if(!find){
                throw new Error
            }else{
                for (let i = 0; i < data.results.length; i++) {
                    if(data.results[i].title.toLowerCase().includes(find.toLowerCase())){
                        res.status(200).json(data.results[i])
                    }
                }
            }
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({
                message: 'Not Found!',
                resource: 'controller omdb searchMovie!!!',
                data: error
            })
        })
    }
    static search(req, res){
        const find = req.query.title
        mov.get(`/3/movie/${id_movie}/similar?api_key=${process.env.MOVIE_APIKEY}&language=en-US&page=1`)
        .then(function ({ data }) {
            const dataResult = []
            if(!find){
                throw new Error
            }else{
                for (let i = 0; i < data.results.length; i++) {
                    if(data.results[i].title.toLowerCase().includes(find.toLowerCase())){
                        dataResult.push(data.results[i])
                    }
                }
                res.status(200).json(dataResult)
            }
        })
        .catch(function (error) {
            console.log(error);
            res.status(404).json({
                message: 'Not Found!',
                resource: 'controller omdb searchMovie!!!',
                data: error
            })
        })
    }
}

module.exports = OmdbController