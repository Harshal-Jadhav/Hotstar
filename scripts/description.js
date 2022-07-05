let data = JSON.parse(localStorage.getItem('movieData'));


bannerAppend(data);
function bannerAppend(data) {
    document.querySelector('#banner').innerHTML = null;

    // creating a 2 main div
    let box1 = document.createElement('div');
    let box2 = document.createElement('div');

    // creating elements for box 1
    let name = document.createElement('p');
    name.innerText = data.original_title;
    let des = document.createElement('p');
    des.innerText = data.overview;
    let release = document.createElement('p');
    release.innerText = data.release_date;
    let rating = document.createElement('p');
    rating.innerText = `IMDB Rating - ${data.vote_average} `
    let playdiv = document.createElement('div');
    let playBtn = document.createElement('span');
    playBtn.innerText = 'play_arrow';
    playBtn.setAttribute('class', 'material-symbols-outlined')
    let watch = document.createElement('span');
    watch.innerText = 'Watch Movie'

    // appending to playBtn & watch to playdiv
    playdiv.append(playBtn, watch);

    // appending all elements to box 1;
    box1.append(name, des, release, rating, playdiv);

    // creating elements for box 2
    let img = document.createElement('img');
    img.src = 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
    box2.append(img);

    // appending to HTML
    document.querySelector('#banner').append(box1, box2)
}


let movie_id = data.id;
getCast(movie_id)
async function getCast(movie_id) {
    let url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=3e2781777064cd5e627152af0f4c73b7`

    let res = await fetch(url)
    let cast = await res.json();
    castAppend(cast.cast)
}


function castAppend(data) {
    console.log(data);
    document.querySelector('#cast').innerHTML = null;
    data.forEach(function (el) {
        let box = document.createElement('div')

        let img = document.createElement('img');
        img.src = 'https://image.tmdb.org/t/p/original' + el.profile_path;
        let name = document.createElement('p');
        name.innerText = el.name;
        let character = document.createElement('p');
        character.innerText = el.character;

        box.append(img, name, character);

        document.querySelector('#cast').append(box);
    })
}