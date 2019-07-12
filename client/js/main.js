const baseUrl = " http://localhost:3000"

$(document).ready(function(){
    $('#btnShow').click(function(){
      event.preventDefault()
      $('#allMovies').show()
      $('#allMovies2').show()
    })
    $('#btnHide').click(function(){
      event.preventDefault()
      $('#allMovies').hide()
      $('#allMovies2').hide()
    })
    $('#btnNowPlaying').click(function () {
        event.preventDefault()
        $.ajax({
            method: "GET",
            url: `${baseUrl}/omdb/get`
          })
          .done(function(response) {
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
            $('#allMovies2').append(
                `
                <div class="col-4 card" >
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
          response.forEach(element => {
              $('#allMovies').append(
                `
                <div class="col-4 card"">
                  <medium id="title">Title : ${element.title}</medium><br>
                  <small>Year: ${element.release_date}</small><br>
                  <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="Card image cap">
                  <small>Rating: ${element.vote_average}</small><br>
                  <small id="desc">${element.overview}</small>
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