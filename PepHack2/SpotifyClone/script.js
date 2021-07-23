let profileDiv = document.querySelector(".info");
let expandableDiv=document.querySelector(".drop-down-menu");
let mainDiv = document.querySelector(".main-div");

let currentPage='homepage';

profileDiv.addEventListener("click",function(){
    if(expandableDiv.classList.contains("hide")){
        expandableDiv.classList.remove("hide");
    }
    else{
        expandableDiv.classList.add("hide");

    }
})

initializeHomePage();
document.querySelector(".home-btn").addEventListener("click", async function (e) {
    if (currentPage != 'homepage') {
        await delay();
        makeHomePage();
        initializeHomePage();
        mainDiv.classList.remove('animate');
        currentPage = 'homepage';
    }
});
async function initializeHomePage() {


    await initSlider();
    let today = new Date();
    let currentTime = today.getHours();
    if (currentTime < 12) {
        document.querySelector('.greeting').textContent = "Good morning";
    }
    else if (currentTime >= 12 && currentTime < 17) {
        document.querySelector('.greeting').textContent = "Good afternoon";
    }
    else if (currentTime >= 17 && currentTime < 20) {
        document.querySelector('.greeting').textContent = "Good evening";
    }
    else {
        document.querySelector('.greeting').textContent = "Good night";

    }
    await new Promise(function (scb, fcb) {
        setTimeout(function () {
            scb();
        }, 500);

    });
    let idList = ['1upw2pToc2QE2kLTFXcbJV', '37i9dQZF1DZ06evO0lbUOX', '37i9dQZF1E3a6iHOLQ0EMH', '37i9dQZF1E358mhbe9ogWQ'];
    let nameList = ['Anime', 'This Is Kishore Kumar', 'Daily Mix 1', 'Daily Mix 2'];
    document.querySelector('.recent-played-playlist').innerHTML='';
    for (let i = 0; i < idList.length; i++) {
        let songs = await getTracks(token, `https://api.spotify.com/v1/playlists/${idList[i]}/tracks`);
        createRecentPlaylistDiv(nameList[i],idList[i], songs);
    }




};
function makeHomePage() {
    mainDiv.innerHTML = `
    <div class="header">
            <div class="profile">
                <div class="info">
                    <div class="profile-pic">
                        <img src="https://images8.alphacoders.com/107/1071809.png" alt="">
                    </div>
                    <p>Anany</p>
                    <i class="material-icons">arrow_drop_down</i>
                </div>


                <div class="drop-down-menu hide">
                    <div class="options">Account</div>
                    <div class="options">Profile</div>
                    <div class="options">Settings</div>


                </div>
            </div>
        </div>
        <div class="animate-slider">
            <div class="slider-container">
                <div class="img-container">
                    <img src="./sliderimg/sliderimg5.jpg" id="lastClone" alt="">
                    <img src="./sliderimg/sliderimg1.jpg" alt="">
                    <img src="./sliderimg/sliderimg2.jpg" alt="">
                    <img src="./sliderimg/sliderimg3.jpg" alt="">
                    <img src="./sliderimg/sliderimg4.jpg" alt="">
                    <img src="./sliderimg/sliderimg5.jpg" alt="">
                    <img src="./sliderimg/sliderimg1.jpg" id='firstClone' alt="">
                </div>
            </div>

        </div>

        <button id='prevBtn'>
            <i class="material-icons">arrow_back_ios_new</i>
        </button>
        <button id='nextBtn'>
            <i class="material-icons">arrow_forward_ios_new</i>
        </button>
        <div class="greeting">
        </div>
        <div class='recent-played-playlist'>

        </div>`;
}


async function createPersonalPlaylist(e, imgurl, playlist_id) {

    let songs = await getTracks(token, `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`);
    await createPlaylistTracksPage(imgurl, e.target.textContent, `personalised playlist`, `https://open.spotify.com/playlist/${playlist_id}`)
    await addTracksToPage(songs);
    
}


async function delay() {
    mainDiv.classList.add('animate');
    await new Promise(function (scb, fcb) {
        setTimeout(function () {
            scb();
        }, 1000);

    });
}
async function initSlider(){
    let sliderContainer = document.querySelector('.img-container');
    let allImages = document.querySelectorAll('.img-container img');
    await delay();

    let prevBtn = document.querySelector('#prevBtn');
    let nextBtn = document.querySelector('#nextBtn');
    let size = allImages[0].clientWidth;
    let counter = 1;
    sliderContainer.style.transform = `translateX(${-size * counter}px)`;
    console.log(`translateX(${-size * counter}px)`);

    nextBtn.addEventListener('click', function () {
        if (counter >= allImages.length - 1) return;
        sliderContainer.style.transition = `transform 0.4s ease-in-out`;
        counter++;
        sliderContainer.style.transform = `translateX(${-size * counter}px)`;


    })
    prevBtn.addEventListener('click', function () {
        if (counter <= 0) return;
        sliderContainer.style.transition = `transform 0.4s ease-in-out`;
        counter--;
        sliderContainer.style.transform = `translateX(${-size * counter}px)`;


    })
    sliderContainer.addEventListener('transitionend', function (e) {
        if (allImages[counter].id == 'lastClone') {
            sliderContainer.style.transition = `none`;
            counter = allImages.length - 2;
            sliderContainer.style.transform = `translateX(${-size * counter}px)`;

        }
        if (allImages[counter].id == 'firstClone') {
            sliderContainer.style.transition = `none`;
            counter = allImages.length - counter;
            sliderContainer.style.transform = `translateX(${-size * counter}px)`;

        }
    })
}
