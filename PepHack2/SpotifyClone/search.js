let searchBtn = document.querySelector(".search");


searchBtn.addEventListener("click", async function () {
    if (currentPage != 'searchpage') {
        mainDiv.classList.add('animate');
        await delay();
        mainDiv.innerHTML='';
        createSearchDivs();
        await createSearchPage()
        mainDiv.classList.remove('animate');
        currentPage = 'searchpage';
    }
});

async function createSearchPage() {
    let genres = await getGenres(token);

    for (let i = 0; i < genres.length; i++) {
        // console.log(genres[0]); 
        await addGenre(genres[i]);
    }
}
function createSearchDivs() {
    mainDiv.innerHTML = `
    
    <i class="material-icons search-back">arrow_back</i>
    <p class="search-heading">Top Genres</p>
    <div class="search-genre"></div>`;
}

function addGenre(genreObj) {
    let genreDiv = document.createElement("div");
    genreDiv.classList.add("genre");
    genreDiv.innerHTML = `
    <img src="${genreObj.icons[0].url}" class="genre-img">
        <p>${genreObj.id.toUpperCase()}</p>
        
        `;
    genreDiv.addEventListener("click", async function () {
        let Playlists = await getPlaylistByGenre(token, genreObj.id);
        await createPlaylistPage(genreObj.id);
        console.log(Playlists[0]);
        for (let i = 0; i < Playlists.length; i++) {

            await createPlaylistDiv(Playlists[i]);
        }

    });
    document.querySelector(".search-back").addEventListener("click", async function (e) {
        makeHomePage();
        initializeHomePage();
    });
    document.querySelector(".search-genre").append(genreDiv);

}
async function createPlaylistPage(genreName) {
    if (currentPage != genreName) {
        mainDiv.classList.add('animate');
        await delay();
        currentPage = genreName;
        mainDiv.innerHTML = `
        <div class="playlist-title">    
        <i class="material-icons search-back-1">arrow_back</i>
        ${genreName.toUpperCase()}
        </div>
        <div class="playlist-div"></div>    
        `;
        mainDiv.classList.remove('animate');
    }

    // let tracks=await getTracks(token,playlistObj.href);
}
async function createPlaylistDiv(playlistObj) {

    currentPage = playlistObj.name;
    let playlist = document.createElement("div");
    playlist.classList.add("single-playlist");
    playlist.innerHTML = `
    <div
    
    <div class="playlist-banner">
    <img class="banner-img" src="${playlistObj.images[0].url}"> 
    
    </div>
    
    <div class="playlist-name">${playlistObj.name.toUpperCase()}</div>
    <div class="playlist-description">${playlistObj.description}</div>`;

    // console.log(playlistObj);

    playlist.addEventListener("click", async function () {
        await createPlaylistTracksPage(playlistObj.images[0].url, playlistObj.name.toUpperCase(), playlistObj.description, playlistObj.external_urls.spotify);
        await addTracksToPage(await getTracks(token, playlistObj.tracks.href));

    })
    document.querySelector('.playlist-div').append(playlist);
    document.querySelector(".search-back-1").addEventListener("click", async function (e) {
                searchBtn.click();
    });

}

async function createPlaylistTracksPage(img, name, description, atag) {
    if (currentPage != name) {
        mainDiv.classList.add('animate');
        await delay();
        // console.log(playlistObj);
        mainDiv.innerHTML =
            `    <div class="track-page-banner">
        
        <div class="banner-img-div">
        
        <a class="link-playlist"  target="_blank" href="${atag}}">
        <img class="track-page-banner-img" src="${img}"> </a>
        
        </div>
            <div class="banner-title">${name}
            <div class="playlist-description">${description}</div>
            </div>
            </div>
            
            
            <div class="table">
        <div class="thead">

        <div class="tr">
                <div class="td Sno">#</div>
                <div class="td Title">Title</div>
                <div class="td Albums" >Album</div>
                <div class="td Date-Added" >Date Added</div>
                <div class="td Duration">
                <i class="material-icons">timer</i></div>
                </div>
                </div>
                <div class="tbody">
        </div>
        </div>
        
        `;
        mainDiv.classList.remove('animate');
    }
}

async function addTracksToPage(trackObjList) {
    // console.log(playlistObj);

    // console.log(trackObjList[0]);
    for (let i = 1; i <= trackObjList.length; i++) {

        let song = trackObjList[i - 1];
        let track = document.createElement("div");
        track.classList.add('tr');
        track.innerHTML =
            `
        
        <div class="td Sno">${i}</div>
        <div class="td track-title">
        <div class="track-img-div"><img src="${song.track.album.images[0].url}" alt="${song.track.album.images[1].url}" class="track-img"></div>
        <div class="track-title-div">
        <div class="song-name">${song.track.name}</div>
        <div class="song-artist">${song.track.artists[0].name}</div>
        </div>
        </div>        
        <div class="td Albums">${song.track.album.name}</div>
        <div class="td Date-Added" >${song.added_at.substring(0, 10)}</div>
            <div class="td Duration">${msToMinutesAndSeconds(song.track.duration_ms)}</div>
        `;
        track.addEventListener("click", async function () {
            createTrackModal(song);
            //    console.log(await getTrack(token,song.track.href));

        });
        document.querySelector('.tbody').append(track);
        await new Promise(function (scb, fcb) {
            setTimeout(function () {
                scb();
            }, 200);

        });

    }
}



function msToMinutesAndSeconds(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

async function createTrackModal(song) {
    let songInfo = await getTrackInfo(token, song.track.href);
    console.log(songInfo);
    document.querySelector(".table").classList.add("disable");
    let trackModal = document.createElement("div");
    trackModal.classList.add('track-info-modal');
    trackModal.innerHTML = `
        <div class="song-img">
        <img src="${songInfo.album.images[0].url}" alt="">
        </div>
        <div class="track-info">
        <div class="track-name">${songInfo.album.name}</div>
        <div class="artist-name">${songInfo.artists[0].name}</div>
        <div class="release-date">${songInfo.album.release_date}</div>
        <div class="duration-track">${msToMinutesAndSeconds(songInfo.duration_ms)}</div>
        <div ><a class="link-track"  target="_blank" href="${songInfo.external_urls.spotify}">Track-Link</a></div>
        </div>
        <div class="close-modal"><i class="material-icons">highlight_off</i></div>`;
    mainDiv.appendChild(trackModal);
    document.querySelector(".close-modal").addEventListener("click", function (e) {
        trackModal.remove();
        document.querySelector(".table").classList.remove("disable");
    })

}