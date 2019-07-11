const baseUrl = 'http://localhost:3000'
let iTunesAPI = axios.create({
    baseURL: 'https://localhost:3000',
})

$(document).ready(function () {

    $('.title').click(function () {

        let title = $(this).html().split(' ').join('+')
        iTunesAPI.post(`${baseUrl}/itunes/music/search`, {
                term: `${title}+soundtrack`
            })
            .then(response => {
                // console.log(response)
                if (response.data.results.length > 0) {
                    $('.soundtrack').empty()
                    $('.soundtrack').append(
                        `
                        <h3>Soundtrack is now playing...</h3>
                        <audio autoplay src="${response.data.results[0].previewUrl}">
                        </audio>    
                        `)
                } else {
                    $('.soundtrack').empty()
                    $('.soundtrack').append(
                        `
                        <h3>Currently no soundtrack for this movie.</h3>
                        `
                    )
                }
                // console.log(response.data.results[0].previewUrl)
            })
            .catch(err => {
                console.log(err)
            })
    })

    $('.stop').click(function () {
        $('.soundtrack').empty()
    })

})