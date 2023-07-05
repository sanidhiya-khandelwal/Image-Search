const API_KEY = "7Li84kE4r9A8ep20KGpc56gBV-M6yD0Taajli79m08M";
const url = "https://api.unsplash.com/search/photos?page=1";



window.addEventListener('load', () => fetchImages('cities'))

//when clicked on logo page reloads
function reload() {
    window.location.reload();
}

async function fetchImages(query) {
    const res = await fetch(`${url}&query=${query}&client_id=${API_KEY}`);
    const data = await res.json();
    bindData(data.results);
}


function bindData(results) {
    const imagesContainer = document.getElementById('images-container');
    const templateImagesCard = document.getElementById('template-images-card');

    imagesContainer.innerHTML = '';

    results.forEach(result => {
        if (!result.urls.regular || !result.alt_description || !result.user.name) return;
        const imageClone = templateImagesCard.content.cloneNode(true);
        fillDataInCard(imageClone, result);
        imagesContainer.appendChild(imageClone);
    })
}

function fillDataInCard(imageClone, result) {
    const mainImg = imageClone.querySelector('#main-img');
    const imageTitle = imageClone.querySelector('#image-title')
    const userName = imageClone.querySelector('#username');
    mainImg.src = result.urls.regular;
    imageTitle.innerHTML = `<h4>Title</h4> : <span>${result.alt_description}</span>`;
    userName.innerHTML = `<h4>Photo by : </h4> ${result.user.name}`;


    //functionality to Download
    imageClone.firstElementChild.firstElementChild.addEventListener('click', () => {
        window.open(result.links.download, '_blank')
    })
}

// functionality for nav links
var curSelectedNav = null;
function navItemClick(query) {
    fetchImages(query);
    var element = document.getElementById(query);
    curSelectedNav?.classList.remove("mystyle");
    curSelectedNav = element;
    element.classList.add("mystyle");
}

// function of input search by user
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');
searchButton.addEventListener('click', () => {
    if (!searchText) return;
    fetchImages(searchText.value);
    curSelectedNav?.classList.remove("mystyle");
    curSelectedNav = null;
})

// function for enter button
searchText.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('search-button').click();
    }
})




