document.querySelector('.playlist-1').addEventListener("click", async function (e) {
    if (currentPage != 'p1') {
        currentPage = 'p1';
        await delay();
        let imgurl = `https://i.pinimg.com/originals/97/b6/fa/97b6fa82625085f5bb1223a9988208af.png`;
        createPersonalPlaylist(e, imgurl, '1upw2pToc2QE2kLTFXcbJV');
        mainDiv.classList.remove("animate");
    }
})
document.querySelector('.playlist-2').addEventListener("click", async function (e) {
    if (currentPage != 'p2') {
        currentPage = 'p2';
        await delay();
        let imgurl = `https://i.pinimg.com/originals/51/c1/38/51c138927fa01e69696e6a3b360c68c1.jpg`;
        createPersonalPlaylist(e, imgurl, '6PEC2pvRSDrCxKaiYJjcDe');
        mainDiv.classList.remove("animate");
    }


})
document.querySelector('.playlist-3').addEventListener("click", async function (e) {
    if (currentPage != 'p3') {
        currentPage = 'p3';
        await delay();
        let imgurl = `https://miro.medium.com/max/1024/1*WlEgaw6OMVpsgukTuhjggA.jpeg`;
        createPersonalPlaylist(e, imgurl, '3LDTYbPZfIqiYzyFsZW4E7');
        mainDiv.classList.remove("animate");
    }

})
async function createRecentPlaylistDiv(name,id, playlist) {
    // console.log();
    let rpDiv = document.createElement('div');
    rpDiv.classList.add('rpDiv');
    rpDiv.innerHTML = `
        
    <div class="rp-div-img">
    <img src="${playlist[0].track.album.images[0].url}" alt="">
    </div>
    <div class="rp-div-title">${name}</div>
    `
    rpDiv.addEventListener("click",async function(){
        await delay();
        await createPlaylistTracksPage(playlist[0].track.album.images[0].url,name, `personalised playlist`, `https://open.spotify.com/playlist/${id}`)
        await addTracksToPage(playlist);
        
    })
    document.querySelector('.recent-played-playlist').append(rpDiv);

}