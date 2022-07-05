document.querySelector('#logo').addEventListener('click', trans);

function trans() {
    window.location.href='index.html'
}

async function get() {
    let keyword = document.querySelector('#search').value;
    if (keyword.length == 0) {
        document.querySelector('#search_result').style.display = 'none'
    } else {
        document.querySelector('#search_result').style.display = 'grid'
    }
    let data = await getData(keyword)
    append(data.results);
    console.log(data.results)
}

async function getData(keyword) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=3e2781777064cd5e627152af0f4c73b7&query=${keyword}&page=1&include_adult=false`
    let res = await fetch(url);
    let data = await res.json();
    return data;

}

function append(data) {
    document.querySelector('#search_result').innerHTML = null;

    data.forEach(function (el) {
        // Creating a box
        let box = document.createElement('div');
        box.addEventListener('click',function(){addToLocalStorage(el)})
        // Creating box elements
        let image_div = document.createElement('div');
        let img = document.createElement('img');
        img.src = "https://image.tmdb.org/t/p/original" + el.backdrop_path;
        image_div.append(img);
        

        let des_div = document.createElement('div')
        let des = document.createElement('p');
        des.innerText = el.original_title
        let release = document.createElement('p')
        release.innerText = el.release_date;

        des_div.append(des, release);

        box.append(image_div, des_div);
        document.querySelector('#search_result').append(box);
    })
}


let id;
function debounce(func, delay) {
    if (id) {
        clearTimeout(id);
    }
    id = setTimeout(function () {
        func();
    }, delay)
}

// Adding to local Storage for further page
function addToLocalStorage(el) {
    localStorage.setItem('movieData', JSON.stringify(el))
    window.location.href='description.html'
}

document.querySelector('#trending').addEventListener('click', trendingPage);

function trendingPage() {
    window.location.href='trending.html'
}