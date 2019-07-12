const axios = require('axios')
const mov = axios.create({
    baseURL: 'https://api.themoviedb.org',
    // timeout: 1000,
});

const sort = require('../helpers/sort.js')

class OmdbController{
    static get(req, res){
        mov.get(`/3/movie/now_playing?api_key=${process.env.MOVIE_APIKEY}&language=en-US&page=1`)
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
        mov.get(`/3/movie/popular?api_key=${process.env.MOVIE_APIKEY}&language=en-US&page=1`)
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
        // https://api.themoviedb.org/3/search/movie?api_key=1b8ff859a98498062adad4ed8f268b6b&language=en-US&query=spiderman&page=1&include_adult=false
        mov.get(`/3/search/movie?api_key=${process.env.MOVIE_APIKEY}&language=en-US&query=${find}&page=1&include_adult=false`)
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
                res.status(200).json(sort(dataResult))
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