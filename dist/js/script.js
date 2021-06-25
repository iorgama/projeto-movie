const url = 'http://www.omdbapi.com/';
const api_key = 'apikey=9755b1af';
const request = new XMLHttpRequest();

const botaoSearchMovie = document.querySelector('#search');

botaoSearchMovie.addEventListener('click', function (event) {
  event.preventDefault();
  cleanCardMovie();
  searchMovie();
});

function cleanCardMovie() {
  document.getElementById('card-error').style.display = 'none';
  document.getElementById('card-img').innerHTML = '';
  document.getElementById('card-img').style.display = 'none';
  document.getElementById('card-text').innerHTML = '';
  document.getElementById('card-text').style.display = 'none';
}

function cleanInputMovie() {
  document.querySelector('#name-movie').value = '';
}

function searchMovie() {
  const nameMovie = document.querySelector('#name-movie').value.trim();
  if (nameMovie != '') {
    const urlParams = `${url}?t=${nameMovie}&${api_key}`;

    fetch(urlParams)
      .then((response) => response.json()) // retorna uma promise
      .then((result) => {
        cleanInputMovie();
        storeMovie = result;
        if (!storeMovie.Error) {
          showMovie(storeMovie);
        } else {
          showMessage();
        }
      })
      .catch((err) => {
        // trata se alguma das promises falhar
        showMessage('error', 'Ops, algo deu errado.');
        // console.error(err);
      });
  }
}

function showMessage() {
  document.getElementById('card-error').style.display = 'flex';
}

function showMovie(storeMovie) {
  document.getElementById('card-text').style.display = 'inline';
  document.getElementById('card-img').style.display = 'inline';
  createImg(storeMovie.Poster);
  createTxt('Title', storeMovie.Title);
  createTxt('Plot', storeMovie.Plot);
  createTxt('Runtime', `Duração: ${storeMovie.Runtime}.`);
  createTxt('Genre', `Gênero: ${storeMovie.Genre}`);
  createTxt('imdbRating', `Avaliação: ${storeMovie.imdbRating}`);
}

function createImg(src) {
  const img = document.createElement('img');
  img.src = src;
  document.getElementById('card-img').appendChild(img);
}

function createTxt(id, field) {
  const p = document.createElement('p');
  p.setAttribute('id', id);
  p.innerText = field;
  document.getElementById('card-text').appendChild(p);
}
