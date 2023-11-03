import axios from "axios";

const API_KEY = "live_Vz7Kd5l57H5WpnJnuFwLAid9HV8H3irH6ZGREUNBC9qJSJu0ksbd7H3b836q7Xyn";
axios.defaults.headers.common["x-api-key"] = API_KEY;
const BASE_URL = "https://api.thecatapi.com/v1/";

function fetchBreeds() {
    return axios.get(`${BASE_URL}breeds`);
}

function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}images/search?breed_ids=${breedId}`);
}

export { fetchBreeds, fetchCatByBreed };