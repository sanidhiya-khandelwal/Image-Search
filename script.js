const API_KEY = "7Li84kE4r9A8ep20KGpc56gBV-M6yD0Taajli79m08M";
// const url = "https://api.unsplash.com/search/photos?page=1&query=cars&client_id=7Li84kE4r9A8ep20KGpc56gBV-M6yD0Taajli79m08M";

// const url = "https://api.unsplash.com/search/photos?query=cars&client_id=7Li84kE4r9A8ep20KGpc56gBV-M6yD0Taajli79m08M";

const url = "https://api.unsplash.com/search/photos?page=1&query=";

window.addEventListener('load', () => fetchImages('cities'))

async function fetchImages(query) {
    const res = await fetch(`${url}${query}&client_id=${API_KEY}`);
    const data = await res.json();
    bindData(data.results);
}

function bindData(results) {
    const imagesContainer = document.getElementById('images-container');
    const templateImagesCard = document.getElementById('template-images-card');

    imagesContainer.innerHTML = '';

    results.forEach(result => {
        if (!result.urls.regular || !result.alt_description) return;
        const imageClone = templateImagesCard.content.cloneNode(true);
        // console.log('image clone ' + imageClone);
        fillDataInCard(imageClone, result);
        imagesContainer.appendChild(imageClone);
    })
}

function fillDataInCard(imageClone, result) {
    const mainImg = imageClone.querySelector('#main-img');
    const imageTitle = imageClone.querySelector('#image-title')
    mainImg.src = result.urls.regular;
    imageTitle.innerHTML = `Title : ${result.alt_description}`;
}