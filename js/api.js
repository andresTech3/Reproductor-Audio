//song data

const songList = [
    {
        title : "Axol",
        file : "Axol  The Tech Thieves   Bleed [NCS Release].mp3",
        cover : "min1.png"
    },

    {
        title : "Bleed",
        file :  "Nightcore   Maria  Mr Eye Music.mp3",
        cover : "min2.png"
    },

    {
        title : "Ellis",
        file :  "Ellis   Migraine (feat Anna Yvette) [NCS Release].mp3",
        cover : "min3.png"
    }

]

//Cancion actual
let actualSong = null;

//Capturar elementos del DOM para trabajar
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");




// Escuchar cliks en los controles
play.addEventListener("click",()=>{
    if(audio.paused){
        playSong();
    }else{
        pauseSong();
    }
});

next.addEventListener("click",()=> nextSong());
prev.addEventListener("click",()=> prevSong());


//Cargar canciones y mostrar el listado
const loadSongs = () =>{
    songList.forEach((song, index) =>{
        // crear li
        const li = document.createElement("li");
        // crear a
        const link = document.createElement("a");
        // Hidratar a
        link.textContent = song.title;
        link.href = "#";
        //escuchar clicks 
        link.addEventListener("click", () => loadSong(index)); 
        // Añadir li
        li.appendChild(link);
        // Añadir li a ul
        songs.appendChild(li);
    })
}



//cargar cancion seleccionada
const loadSong = (songIndex) =>{
    if (songIndex !== actualSong){
        changeActiveClass(actualSong, songIndex);
        actualSong = songIndex;
        audio.src = "../audio/" + songList[songIndex].file;
        changeSongTitle(songIndex);
        playSong();
        changeCover(songIndex);
    }
    
}

//Actualizar barra de progreso de la cancion
const updateProgress = (event) =>{
    //total y actual
    const {duration, currentTime} = event.srcElement;
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent+"%";
    
}

//Escuchar el elemento Audio
audio.addEventListener("timeupdate", updateProgress);



// Hacer la barra de progreso clicable
const setProgress = (event) =>{
    const totalWidth = progressContainer.offsetWidth;
    const progressWidth = event.offsetX;
    const current = (progressWidth / totalWidth) * audio.duration;
    audio.currentTime = current;
}

progressContainer.addEventListener("click",setProgress);





//actualizar controls
const updateControls = () =>{
    if (audio.paused){
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");

    }else{
        play.classList.add("fa-pause");
        play.classList.remove("fa-play");
    }
}

//Reproducir cancion
const playSong = () =>{
    if(actualSong != null){
        audio.play();
        updateControls();
    }
}
//pausar cancion

const pauseSong = () =>{
    audio.pause();
    updateControls();
}

//cambiar clase activa
const changeActiveClass = (lastIndex, newIndex) =>{
    const links = document.querySelectorAll("a");
    if(lastIndex !== null){
        links[lastIndex].classList.remove("active");
    }
    links[newIndex].classList.add("active");
}

//canviar el cover de la cancion
const changeCover = (songIndex)=>{
    cover.src = "../img/" + songList[songIndex].cover;
}

//canviar el title de la cancion
const changeSongTitle = (songIndex) =>{
    title.innerHTML =  songList[songIndex].title;
}

//anterior cancion
const prevSong = () =>{
    if(actualSong > 0){
        loadSong(actualSong - 1);
    }else{
        loadSong(songList.length -1)
    }
}

//siguiente cancion
const nextSong = () =>{
    if(actualSong < songList.length -1){
        loadSong(actualSong + 1);
    }
    else{
        loadSong(0);
    }
}

//lanzar siguente cancion cuando se acaba la actual
audio.addEventListener("ended", () => nextSong());
//GO!
loadSongs();


