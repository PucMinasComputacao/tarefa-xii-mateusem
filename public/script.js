const API_KEY = "caa8854ae6812afc65329db273deed0b";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const movieList = document.getElementById("movie-list");
const message = document.getElementById("message");
const searchInput = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");


function showMessage(text) {

  message.textContent = text;

}


async function fetchMovies(query = "") {

    try {

        showMessage("Carregando Filmes...");

        let url = "";

        if(query) {

            url =
                `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`;

        }

        else {
            
            url =
                `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`;
        }

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Erro na requisição");

        }

        const data = await response.json();

        renderMovies(data.results);

    }

    catch (error) {

        console.error(error);

        showMessage("Erro ao carregar filmes.");

    }

}

    function createMovieCard(movie) {

        const card = document.createElement("div");

        card.classList.add("movie-card");

        const poster = movie.poster_path

        ? `${IMAGE_URL}${movie.poster_path}`

        :"https://via.placeholder.com/500x750?text=Sem+Imagem";

        const year = movie.release_date

            ? movie.release_date.split("-")[0]

            :"Sem data";

        card.innerHTML = `

        <img src="${poster}" alt="${movie.title}">

        <div class = "movie-info">

            <h2>${movie.title}</h2>

            <p>
                <strong>Ano:</strong> ${year}
            </p>

            <p class="rating">
                ${movie.vote_average}
            </p>

            <p>

                ${movie.overview

                ? movie.overview.substring(0, 120) + "..."

                : "Sem descrição"}

            </p>

        </div>

    `;

    return card;

    }

    function renderMovies(movies) {

        movieList.innerHTML = "";

        if (movies.length === 0) {

            showMessage("Nenhum filme encontrado.");

            return;
        }

        showMessage("");


        movies.forEach(movie => {

            const card = createMovieCard(movie);

            movieList.appendChild(card);

        });
    }

    btnSearch.addEventListener("click", () => {

        const query = searchInput.value.trim();

        fetchMovies(query);

    });

    searchInput.addEventListener("keypress", (event) => {

        if (event.key === "Enter") {

            const query = searchInput.value.trim();

            fetchMovies(query);

        }
    });

    fetchMovies();
