// const baseUrl = 'http://localhost:3000'
let iTunesAPI = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        token: localStorage.getItem("token")
    }
})

$(document).ready(function () {

    $('#click').click(function (event) {
        event.preventDefault()
        let title = $('#search').val().split(' ').join('+')
        console.log(title)
        iTunesAPI.post(`/itunes/music/search`, {
                term: `${title}+soundtrack`
            })
            .then(response => {
                if (response.data.results.length > 0) {
                    $('.soundtrack').empty()
                    $('.soundtrack').append(
                        `
                        <h3>Soundtrack is now playing...</h3>
                        <audio autoplay controls src="${response.data.results[0].previewUrl}">
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
            })
            .catch(err => {
                $('.error').empty()
                $('.error').append(
                    `
                    <p>Unauthorized process.</p>
                    `
                )
            })
    })

    $('.stop').click(function () {
        $('.soundtrack').empty()
    })

})