if (document.getElementById("password") || document.getElementById("pass") || document.getElementById("psw") || document.getElementById("new-password")) {
	getQuestion();
};

function getQuestion() {
	var a = $.getJSON("https://tosdr.org/api/1/service/" + gethost() + ".json", function(result)
	{
    	var str = JSON.stringify(result);
    	var obj = JSON.parse(str);
		//alert(obj.pointsData);
		//console.log(obj.pointsData);
		var points = obj.pointsData;
		for(point in points)
		{
			switch(points[point].tosdr.case) {
				case "This service tracks you on other websites":
				    var answer = prompt("Does this service track you on other websites?");
					if (answer == "yes") {
						alert("That's correct");
					} else {
						alert("Wrong");
					}
				    return;
				case "You can request access and deletion of personal data":
					var answer = prompt("Can you can request access and deletion of personal data?");
					if (answer == "yes") {
						alert("That's correct");
					} else {
						alert("Wrong");
					}
				    return;
				case " Terms may be changed any time at their discretion, without notice to the user ":
					var answer = prompt("Can terms be changed any time without notice to the user?");
					if (answer == "yes") {
						alert("That's correct");
					} else {
						alert("Wrong");
					}
				    return;
				case "The service can delete specific content without prior notice and without a reason":
					var answer = prompt("Does the service have to notify you or give a reason for deleting content?");
					if (answer == "no") {
						alert("That's correct");
					} else {
						alert("Wrong");
					}
				    return;
			}
		}
		var answer = prompt("Does this service use your personal data to employ targeted third-party advertising?");
			if (answer == "no") {
				alert("That's correct");
			} else {
				alert("Wrong");
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
