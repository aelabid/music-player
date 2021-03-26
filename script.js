const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressC = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let isPlayin = false;

const songs = [
	{
		name:'elkawi',
		displayName: 'الكاوي',
		artist: 'سناء مرحتي'
	},
	{
		name:'mezinWsoulek',
		displayName: 'مزين وصولك',
		artist: 'سناء مرحتي'
	},
	{
		name:'om',
		displayName: 'الأم',
		artist: 'سناء مرحتي'
	},
	{
		name:'sidighasek',
		displayName: 'سيدي غاسق لنجال',
		artist: 'سناء مرحتي'
	},
	{
		name:'taltihanek',
		displayName: 'طال تيهانك',
		artist: 'سناء مرحتي'
	}
];


function play() {
	isPlayin = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'pause');
	//console.log(isPlayin);
	audio.play();

}

function  pause() {
	isPlayin = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'play');
	//console.log(isPlayin);
	audio.pause();
}

playBtn.addEventListener('click', () => { isPlayin ? pause() : play() })


function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	audio.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}



let songIndex = 0;

loadSong(songs[songIndex]);

function nextSong() {
	songIndex++;
	if(songIndex > songs.length - 1)
		songIndex = 0;
	console.log(songIndex);
	loadSong(songs[songIndex]);
	play();
}

function prevSong() {
	songIndex--;
	if(songIndex < 0)
		songIndex = songs.length - 1;
	console.log(songIndex);
	loadSong(songs[songIndex]);
	play();
}

function updateProgressBar(e) {
	if(isPlayin){
		const {duration, currentTime} = e.srcElement;
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`; 
			console.log(e.srcElement.duration);

		const durationMinutes = Math.floor(duration / 60);
		const durationSeconds = Math.floor(duration % 60);
		if(durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}
		if (durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		}

		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if(currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		}
		currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = audio;
	audio.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgressBar);
progressC.addEventListener('click', setProgressBar);
audio.addEventListener('ended', nextSong);
