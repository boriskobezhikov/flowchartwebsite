async function myFunction() {
    var imagesDiv = document.getElementById("header");
    while(imagesDiv.firstChild) {
        imagesDiv.removeChild(imagesDiv.firstChild);
    }
    var input, filter;
    input = document.getElementById('myInput');
    filter = input.value;

    let lastUrl = 'https://ws.audioscrobbler.com/2.0/?method=album.search&';
    lastUrl = lastUrl + 'album=' + filter + '&limit=10' + '&format=json&api_key=4e448db917e784720c46e1ff1d1f9c14';

    let apiUrl = await fetch(lastUrl);
    apiUrlJson = await apiUrl.json();
    let albumsInformation = apiUrlJson.results.albummatches.album;
    for (let i = 0; i < Object.keys(albumsInformation).length; i++) {
    let albumImage = albumsInformation[i].image[2]['#text'];
    let img = document.createElement('img');
    img.src=albumImage;
    var src = document.getElementById("header");
    src.appendChild(img);
    }
}