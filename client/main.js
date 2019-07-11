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
                    <li class="list-group-item">
                      <medium>Title : ${element.title}</medium><br>
                      <small>Year: ${element.release_date}</small><br>
                      <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" width="200" height="400" class="rounded float-left" alt="..."><br>
                      <small>Rating: ${element.vote_average}</small>
                      <p>${element.overview}</p>
                    </li>
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
                  <li class="list-group-item">
                    <medium>Title : ${element.title}</medium><br>
                    <small>Year: ${element.release_date}</small><br>
                    <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" width="200" height="400" class="rounded float-left" alt="..."><br>
                    <small>Rating: ${element.vote_average}</small>
                    <p>${element.overview}</p>
                  </li>
              `
            )
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
        .done(function(response) {
              $('#allMovies3').append(
                `
                  <li class="list-group-item">
                    <medium> Title : ${response.title}</medium><br>
                    <small> Year: ${response.release_date}</small><br>
                    <img src="https://image.tmdb.org/t/p/w500/${response.poster_path}" width="100" height="200" class="rounded float-left" alt="..."><br>
                    <small> Rating: ${response.vote_average}</small>
                    <p>${response.overview}</p>
                  </li>
              `
            )
          });
  })
})