let movies = []
let movieSaved = {}

// When loading the page
window.addEventListener('load', () => {
    // Check if there is data in localStorage
    if (localStorage.getItem('movies')) {
        movies = JSON.parse(localStorage.getItem('movies'));
        displayMovies();
    }
})
function addMovies() {
    let movieTitle = document.getElementById('movieTitle').value
    let moviePoster = document.getElementById('moviePoster').value
    let movieTrailer = document.getElementById('movieTrailer').value

    if(movieTitle !== '' && moviePoster !== '' && movieTrailer !== '') {
        const posterIsDuplicated = movies.some(movie=> movie.poster === moviePoster)
        const trailerIsDuplicated = movies.some(movie=> movie.trailer === movieTrailer)

        if(!posterIsDuplicated && !trailerIsDuplicated) {
            movieSaved = {
                title: movieTitle,
                poster: moviePoster,
                trailer: movieTrailer
            }
            movies.push(movieSaved)

            localStorage.setItem('movies', JSON.stringify(movies));
            displayMovies()
        }
        else {
            Swal.fire({
                text: `Remember that you should not repeat the poster or the trailer to upload a new movie 📽️`,
                icon: 'warning'
            })
        }
    }
    else {
        Swal.fire({
            text: `Hey! We need you to complete all the fields!`,
            icon: 'error'
        })
    }
}

function displayMovies() {
    document.getElementById('newDiv').innerHTML = ''

    for(let i = 0; i < movies.length; i++) {
        let movieSaved = movies[i]
        let movieDiv = document.createElement('div')
        movieDiv.id = 'card'

        let close = document.createElement(`button`)
        close.id = 'close'
        close.textContent = 'X'
        close.addEventListener('click', function() {
            removeMovie(i);
        });

        let p = document.createElement(`p`)
        p.textContent = `${movieSaved.title}`

        let a = document.createElement(`a`)
        a.href = movieSaved.trailer
        a.target = '_blank'
        a.textContent = `Youtube Trailer`

        let img = document.createElement(`img`)
        img.id = 'cardImage'
        img.src = movieSaved.poster

        movieDiv.appendChild(close)
        movieDiv.appendChild(p)
        movieDiv.appendChild(img)
        movieDiv.appendChild(a)

        document.getElementById('newDiv').appendChild(movieDiv);
    }
}

function removeMovie(index) {
    movies.splice(index, 1); // Delete movie from array
    // Update data in localStorage
    localStorage.setItem('movies', JSON.stringify(movies));
    displayMovies(); // Show updated movies again
}

function updateMovieDisplay() {
    document.getElementById('newDiv').innerHTML = '';
    displayMovies();
}