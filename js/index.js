var active = false;
var minutes = 0;
var seconds = 0;
var working = false;
var intervalID = null;
var audio = new Audio('notify.mp3');


var switchTimer = function(){
	if(working === true){
		
		minutes = document.getElementById("rest-setting").innerHTML;
		seconds = 0;
		working = false;
		
		$("#h2-work").removeClass("active");
	} else if (working === false){
		
		minutes = document.getElementById("work-setting").innerHTML;
		seconds = 0;
		working = true;
		$("#h2-work").addClass("active");
		
	}
	updateClock();
};

var countdown = function(){
	if(seconds > 0){
		seconds -= 1;
	} else if(seconds === 0 && minutes > 0){
		seconds = 59;
		minutes -= 1;
	}
	updateClock();
};

var timeString = function(x){
  if(x < 10) {
		return "0" + x;
	} else {
		return x;
	}
};


var updateClock = function(){
	var newMins = timeString(minutes);
	var newSecs = timeString(seconds);
	$("#clock-minutes").text(newMins);
	$("#clock-seconds").text(newSecs);
	if(newMins == 0 && newSecs == 0){
		audio.play();
		switchTimer();
	}
}


var activeChange = function(){
	if(active === true){
		intervalID = setInterval(countdown, 1000);
	} else {
		clearInterval(intervalID);
	}
}


$("#button-play").click(function(){
	$("#button-pause").removeClass("nodisplay");
	$("#button-play").addClass("nodisplay");
	active = true;
	activeChange();
});

$("#button-pause").click(function(){
	$("#button-play").removeClass("nodisplay");
	$("#button-pause").addClass("nodisplay");
	active = false;
	activeChange();
});

$(document).ready(function(){
	working = false;
	switchTimer();
});


var workSetting = document.getElementById("work-setting").innerHTML;

$("#work-less").click(function(){
	if (workSetting > 0){
		workSetting = parseInt(workSetting) - 1;
		$("#work-setting").text(workSetting);
	};
});

$("#work-more").click(function(){
	if (workSetting < 60){
		workSetting = parseInt(workSetting) + 1;
		$("#work-setting").text(workSetting);
	};
});

$("#button-reset").click(function(){
	working = false;
	minutes = $("#work-setting").val();
	seconds = 0;
	active = false;
	audio = new Audio();
	activeChange();
	updateClock();
	$("#button-play").removeClass("nodisplay");
	$("#button-pause").addClass("nodisplay");
	audio = new Audio('notify.mp3');
});