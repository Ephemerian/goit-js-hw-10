import SlimSelect from 'slim-select'
import "slim-select/dist/slimselect.css"
import { Report } from 'notiflix/build/notiflix-report-aio';
import  { fetchBreeds, fetchCatByBreed } from './cat-api';


const refs = {
    breedSelectEl: document.querySelector(".breed-select"),
    loaderEl: document.querySelector(".loader"),
    errorEl: document.querySelector(".error"),
    catInfoEl: document.querySelector(".cat-info")
}
const { breedSelectEl, loaderEl, errorEl, catInfoEl } = refs;

loaderShow();


fetchBreeds().then(resp => {
    // console.log(resp);
    const markUp = createOptions(resp.data);
    breedSelectEl.innerHTML = markUp;
    new SlimSelect({
        select: '#slim-select'
    })
});

function createOptions(arr) {
    return arr.map(({id, name}) => {
        return `<option value ="${id}">${name}</option>`;
    }).join("");
}

breedSelectEl.addEventListener('change', onChange);

function onChange(evt) {
    catInfoEl.innerHTML = "";
    loaderShow();
    const breedId = evt.target.value;
    // console.log(breedId);
    fetchCatByBreed(breedId).then(resp => {
        // console.log(resp);
        const result = createCatMarkup(resp.data);
        catInfoEl.innerHTML = result;
        loaderShow();
    }).catch(fetchError);  
}

function createCatMarkup({0: {
    breeds: {
      0: { name, description, temperament },
    },
    url,
  },
}) {
    return `<img class="image-cat" src="${url}" alt="${name}" width="400">
            <div class="wrapper">
            <h1 class="cat-title">${name}</h1>
            <p class="desc">${description}</p>
            <p class="info"><span class="temperament">Temperament:</span> ${temperament}</p>
            </div>`
}

function loaderShow() {
    loaderEl.classList.toggle('loader');
}

function fetchError() {
    loaderShow();
    Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Ok',
    );
}