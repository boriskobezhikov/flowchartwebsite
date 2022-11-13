async function searchAlbum() {
    var imagesDiv = document.getElementById("header");
    var child = imagesDiv.lastElementChild; 
    while (child) {
        imagesDiv.removeChild(child);
        child = imagesDiv.lastElementChild;
    }
    var input, filter;
    input = document.getElementById('myInput');
    filter = input.value;

    let lastUrl = 'https://ws.audioscrobbler.com/2.0/?method=album.search&';
    lastUrl = lastUrl + 'album=' + filter + "&limit=5" + '&format=json&api_key=4e448db917e784720c46e1ff1d1f9c14';

    let apiUrl = await fetch(lastUrl);
    apiUrlJson = await apiUrl.json();
    let albumsInformation = apiUrlJson.results.albummatches.album;
    for (let i = 0; i < Object.keys(albumsInformation).length; i++) {
    let albumImage = albumsInformation[i].image[2]['#text'];
    let img = document.createElement('img');
    img.src=albumImage;
    img.classList.add("mt-2");
    img.classList.add("me-2");
    img.setAttribute("onclick","func(this)");
    var src = document.getElementById("header");
    src.appendChild(img);
    }
}

function func(img) {
    img.onmouseup = function(event) { // (1) отследить нажатие

        // (2) подготовить к перемещению:
        // разместить поверх остального содержимого и в абсолютных координатах
        img.style.position = 'absolute';
        img.style.zIndex = 1000;
        // переместим в body, чтобы мяч был точно не внутри position:relative
        document.body.append(img);
        // и установим абсолютно спозиционированный мяч под курсор
      
        moveAt(event.pageX, event.pageY);
      
        // передвинуть мяч под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(pageX, pageY) {
          img.style.left = pageX - img.offsetWidth / 2 + 'px';
          img.style.top = pageY - img.offsetHeight / 2 + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // (3) перемещать по экрану
        document.addEventListener('mousemove', onMouseMove);
      
        // (4) положить мяч, удалить более ненужные обработчики событий
        img.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          img.onmouseup = null;
        };
      };
      img.ondragstart = function() {
        return false;
      };
}
