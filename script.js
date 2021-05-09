const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d2b66e8fcfcd405eb3932dbed88582b0&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?&api_key=d2b66e8fcfcd405eb3932dbed88582b0&query=';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovies(API_URL);
async function getMovies(url) {
    const result = await fetch(url);
    const data = await result.json();

    renderMovies(data?.results)
}

function renderMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;

        const ratingClass = getRatingClass(vote_average)
        
        const data = `<img src="${IMG_PATH}${poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${ratingClass}">${vote_average}</span>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>`;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie')
        movieElement.innerHTML = data;

        main.appendChild(movieElement);
    });
}

const getRatingClass = (rating) => {
    if (rating > 7) {
        return 'green'
    } else if (rating < 5){
        return 'red'
    } 

    return 'orange';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(`${SEARCH_URL}"${searchTerm}"`);
        search.value = '';
    }
})

