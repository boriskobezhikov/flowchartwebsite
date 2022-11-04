async function albumImageMaker() {
let url = "https://ws.audioscrobbler.com/2.0/?method=album.search&album=to%20pimp%20a%20butterfly&api_key=4e448db917e784720c46e1ff1d1f9c14&format=json";
    let response = await fetch(url);
    let commits = await response.json();
    let ggg = commits.results.albummatches.album[0].image[2]['#text']; 
    let img = document.createElement("img");
    img.src = ggg;
    let src = document.getElementById("header");
    src.appendChild(img);
}

albumImageMaker();