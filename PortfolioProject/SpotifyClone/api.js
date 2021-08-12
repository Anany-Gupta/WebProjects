
let token = "";
let clientId = '74b7958883e547618f043ddc19b5f0d3';
let clientSecret = '5c939e0a44ae430ca778ccefe2daf892';

(async function apiControllerFunction() {
    token = await getTokenFunction(clientId, clientSecret);
})();

async function getTokenFunction(clientId, clientSecret) {
    let result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    
    let data = await result.json();
    return data.access_token
}

async function getGenres(token) {
    
    let result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    
    let data = await result.json();
    return data.categories.items;
}
async function getPlaylistByGenre(token, genreId) {
    
    let limit = 50;
    
    let result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    
    let data = await result.json();
    return data.playlists.items;
}

async function getTracks(token, tracksEndPoint) {

    let limit = 50;

    let result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    let data = await result.json();
    return data.items;
}

async function getTrackInfo (token, trackEndPoint) {

    let result = await fetch(`${trackEndPoint}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    let data = await result.json();
    return data;
}