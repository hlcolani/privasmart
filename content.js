// while(document.readyState != "complete")
// {
// }
console.log("starting content script");
if (
	//document.body.textContent.indexOf("agree") && (document.body.textContent.indexOf("terms") || document.body.textContent.indexOf("privacy policy"))
	document.getElementById("password") || document.getElementById("pass") || document.getElementById("psw") || document.getElementById("new-password")
	) {
	console.log(document.readyState);
	console.log("site has password field");getQuestion();
	console.log("injecting html");
	$.get(chrome.extension.getURL('/popup.html'), function(data) {
		$(data).appendTo('body');
		// Or if you're using jQuery 1.8+:
		// $($.parseHTML(data)).appendTo('body');
	});
}
else{
	console.log(document.readyState);
	console.log("DOM not loaded yet?");
}

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
			// askQuestion(caseStr);
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
