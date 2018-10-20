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
			if (points[point].tosdr.case == "This service tracks you on other websites") {
				var answer = prompt("Does this service track you on other websites?");
					if (answer == "yes") {
						alert("That's correct");
					} else {
						alert("Wrong");
					}
			}
			/*switch(point.tosdr.case) {
				case "This service tracks you on other websites":
					var answer = prompt("Does this service track you on other websites?");
					if (answer == "yes") {
						alert("That's correct");
					} else {
						alert("Wrong");
					}
				default:
					var answer = prompt("Does this service track you on other websites?");
						if (answer == "no") {
							alert("That's correct");
						} else {
							alert("Wrong");
						}
			}*/
	
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
