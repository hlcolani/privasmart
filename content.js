if (document.getElementById("password") || document.getElementById("pass") || document.getElementById("psw") || document.getElementById("new-password")) {
	getQuestion();
};

function getQuestion() {
	var a = $.getJSON("https://tosdr.org/api/1/service/" + gethost() + ".json", function(result)
	{
    	var str = JSON.stringify(result);
    	var obj = JSON.parse(str);
		alert(obj.pointsData);
		console.log(obj.pointsData);
		var points = obj.pointsData;
		for(point in points)
		{
			console.log("searching point " + point);
			console.log(point);
			console.log(points[point].tosdr.case);
		}	
	});
}

function askQuestion() {
	
}

function gethost() {
	var url = window.location.host
	var arr = url.split(".");
	return arr[arr.length - 2]
}
