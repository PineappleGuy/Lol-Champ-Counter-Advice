const BASE_URL = "http://localhost:3000"
const CHAMPIONS_URL = `${BASE_URL}/champions`
const COMMENTS_URL = `${BASE_URL}/comments`

fetch(CHAMPIONS_URL)
    .then(resp => resp.json())
    .then(json => console.log(json));