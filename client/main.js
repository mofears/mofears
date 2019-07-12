const baseUrl = " http://localhost:3000"
var movies = []

$(document).ready(function(){
    $('#detail').hide()
    

    $('#btnShow').click(function(){
      event.preventDefault()
      $('#allMovies').show()
    })
    $('#btnHide').click(function(){
      event.preventDefault()
      $('#allMovies').hide()
    })
    $('#btnNowPlaying').click(function () {
        event.preventDefault()
        $.ajax({
            method: "GET",
            url: `${baseUrl}/omdb/get`
          })
          .done(function(response) {
            // movies = response.results
            console.log(response.results)
            response.results.forEach(element => {
              $('#allMovies').append(
                  `
                  <div class="col-4 card">
                    <medium>Title : ${element.title}</medium><br>
                    <small>Year: ${element.release_date}</small><br>
                    <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="Card image cap">
                    <small>Rating: ${element.vote_average}</small><br>
                    <small>${element.overview}</small>
                  </div>
                `
              )
            });
          });
    })
    $('#btnPopular').click(function () {
      event.preventDefault()
      $.ajax({
          method: "GET",
          url: `${baseUrl}/omdb/getPopular`
        })
        .done(function(response) {
          console.log(response.results)

          response.results.forEach(element => {
            $('#allMovies').append(
                `
                <div class="col-3 card" >
                  <medium id="title">Title : ${element.title}</medium><br>
                  <small>Year: ${element.release_date}</small><br>
                  <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="Card image cap">
                  <small>Rating: ${element.vote_average}</small><br>
                  <small>Overview: ${element.overview}</small>
                </div>`
            )
            $('#desc').hide()
            $('#title').click(function() {
              event.preventDefault()
              $('#desc').show()
            })
          });
        });
    })
    $('#btnSearch').click(function () {
      event.preventDefault()
      const queryBoxMovie = $('#searchMovie').val()
      $.ajax({
          method: "GET",
          url: `${baseUrl}/omdb/search?title=${queryBoxMovie}`
      })
      //gw belom search
        .done(function(response) {
          console.log(response)
          movies = response
          response.forEach((element, i) => {
              $('#allMovies').append(
                `
                <div class="col-4 card"">
                  <ul class="list-group">
                    <div class="container" style="padding-top: 20px; padding-bottom: 20px">
                      <li class="list-group-item" id="title">
                        <h5 style="text-align: center; margin-bottom: 0px" id="title-click" onclick="showDetail(${i})">${element.title}</h5>
                      </li>
                      <li class="list-group-item">
                        <div class="container">
                          <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="Card image cap">
                        </div>
                      </li>
                      <li class="list-group-item">
                        <small><b>Rating:</b> ${element.vote_average}</small><br>
                      </li>
                      <li class="list-group-item">
                        <small><b>Release Date:</b> ${element.release_date}</small><br>
                      </li>
                    </div>
                  </ul>
                </div>`
            )
            $('#desc').hide()
            $('#title').click(function() {
              event.preventDefault()
              $('#desc').show()
            })
          });
          });
    })
})
let title
function showDetail(index) {
  for (let i = 0; i < movies.length; i++) {
    if (i == index) {
      $('#detail-title').empty()
      $('#detail-poster').empty()
      $('#detail-rating').empty()
      $('#detail-overview').empty()
      $('#detail-release').empty()
      $('#detail-title').append(`${movies[i].title}`)
      $('#detail-poster').prepend(`<img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" style="width: 200px">`)
      $('#detail-rating').append(`<b>Rating:</b> ${movies[i].vote_average}`)
      $('#detail-overview').append(`${movies[i].overview}`)
      $('#detail-release').append(`<b>Release Date:</b> ${movies[i].release_date}`)
      title = movies[i].title
      // axios.post(`http://localhost:3000/api/youtube`, { title })
      console.log(title)
      
    }
  }
  event.preventDefault()
  $('#detail').show()
}
console.log(title)