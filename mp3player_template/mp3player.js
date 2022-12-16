let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#actual_volume_slider');
let slider = document.querySelector('#duration_slider');
let total_time = document.querySelector('#total_time');
let current_time = document.querySelector('#current_time')
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [{
		name: "first song",
		path: "song1.mp3",
	},
	{
		name: "second song",
		path: "song2.mp3",
	},
	{
		name: "third song",
		path: "song3.mp3",
	},
	{
		name: "fourth song",
		path: "song4.mp3",
	},
	{
		name: "fifth song",
		path: "song5.mp3",
	}
];


// All functions


// function load the track
function load_track(index_no) {
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;
	track.load();

	total_time.innerHTML = track.duration
	console.log(track.innerHTML)
	timer = setInterval(range_slider, 1000);
}

load_track(index_no);


function toggle_volume_slider(){
	let volume_slider= document.getElementById("volume_slider")
	//console.log(volume_slider.attributes.visibility)
	if (volume_slider.style.visibility == "hidden"){
		volume_slider.style.visibility = "visible"
		console.log(volume_slider.style)
	}else{
		volume_slider.style.visibility = "hidden"
		console.log(volume_slider.style)
	}
}


// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}


// reset song slider
function reset_slider() {
	slider.value = 0;
}

// play song
function playsong() {
	auto_play=1;
	track.play();
	Playing_song = true;
	play.innerHTML = '<img src="pause-solid.svg" alt="" class="audio-controls-container-img">';
}

//pause song
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<img src="play-solid.svg" alt="" class="audio-controls-container-img">';
}


// next song
function next_song() {
	current_time_flag=0;
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song() {
	current_time_flag=0;
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change() {
	//volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}


let current_time_flag=0;
function range_slider() {
	let position = 0;

	if( current_time_flag == 0)
	{
		total_time.innerHTML = (track.duration / 60).toFixed(2)
		current_time_flag = 1;
	}

	// update slider position
	if (!isNaN(track.duration)) {
		current_time.innerHTML = (track.currentTime / 60).toFixed(2)
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// function will run when the song is over
	if(auto_play == 1)
	{
		if (track.ended) {
			play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
			next_song();
			current_time_flag = 0;
		}
	}
}