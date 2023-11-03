import axios from "axios";

const API_KEY = "live_bKfR2wDaTAffqzsaUb8tarI4g84eSSVXQ5JNTwOYU7XJY2DsGoE3TnKleIN0CjLn";
axios.defaults.headers.common["x-api-key"] = API_KEY;
const BASE_URL = "https://api.thecatapi.com/v1/";

function fetchBreeds() {
    return axios.get(`${BASE_URL}breeds`);
}

function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}images/search?breed_ids=${breedId}`);
}

export { fetchBreeds, fetchCatByBreed };