if (document.getElementById("password") || document.getElementById("pass") || document.getElementById("psw") || document.getElementById("new-password")) {
	getQuestion();
};

function getQuestion() {
	var a = $.getJSON("https://tosdr.org/api/1/service/" + gethost() + ".json", function(result)
	{
    	var str = JSON.stringify(result);
    	var obj = JSON.parse(str);
		console.log(obj.pointsData);
		var points = obj.pointsData;
		for(point in points)
		{
			console.log("searching point " + point);
			var caseStr = points[point].tosdr.case;
			console.log(caseStr);
			alert(caseStr);
		}	
	});
}

function askQuestion(caseStr) 
{
	alert("Did you know: " + caseStr);
}

function gethost() {
	var url = window.location.host
	var arr = url.split(".");
	return arr[arr.length - 2]
}
