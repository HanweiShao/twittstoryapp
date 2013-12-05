function hashPanel(hashtags){
	for(var i=0; i<hashtags.length; i++){
		var div = document.createElement("div");
		var p1 = document.createElement("p");
		var p2 = document.createElement("p");
		p1.innerHTML = hashtags[i].text;
		if(hashtags[i].size>1){
			p2.innerHTML = " (mentioned " + hashtags[i].size + " times)";
		}else{
			p2.innerHTML = " (mentioned 1 time)";
		}
		p1.style.float = "left";
		p1.className = "hashtag";
		p2.style.float = "left";
		div.style.clear = "both";
		div.appendChild(p1);
		div.appendChild(p2);
		$("#hashTags").append(div);
	}
}
