function statsPanel(stats){
	
	document.getElementById("tweetNum").innerHTML = "<b>Analyzed tweets  </b>";
	document.getElementById("duration").innerHTML = "<b>Time frame  </b>";
	document.getElementById("average").innerHTML = "<b>Tweets per second  </b>";
	
	var tweetNum = stats.tweetCount;
	var time = stats.duration;
	var tweetPerSec = tweetNum / time;
	tweetPerSec = tweetPerSec.toFixed(2);
	
	var minutes = Math.floor(time / 60);
	var seconds = time - minutes * 60;
	var timeStr = "";
	if(minutes > 1){
		timeStr += minutes + " minutes and ";
	}else if(minutes == 1){
		timeStr += "1 minute and ";
	}
	timeStr += seconds + "seconds";
	
	document.getElementById("tweetNum").innerHTML += tweetNum;
	document.getElementById("duration").innerHTML += timeStr;
	document.getElementById("average").innerHTML += tweetPerSec;
	
}
