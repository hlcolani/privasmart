console.log("starting content script");
let bodyText = document.body.textContent.toLowerCase();
const expr = /(\bi\b)|(\byou\b).*(\bagree\b)|(\bunderstand\b)|(\backnowledge\b).*(\bterms\b)|(\bprivacy policy\b)/;
if (bodyText.search(expr) !== -1) {
	// bodyText.includes("agree") && (bodyText.includes("terms") || bodyText.includes("privacy policy")
	// document.getElementById("password") || document.getElementById("pass") || document.getElementById("psw") || document.getElementById("new-password")
	for (let m in bodyText.match(expr)) {
		console.log(m);
	}

	console.log("site has terms of service or privacy policy");
	console.log("injecting html");
	$.get(chrome.extension.getURL('/popup.html'), function(data) {
		$(data).appendTo('body');
		// Or if you're using jQuery 1.8+:
		// $($.parseHTML(data)).appendTo('body');
	});
	getQuestion();
}
else{
	console.log(document.readyState);
	console.log("DOM not loaded yet?");
}

function getQuestion(){
	var a = $.getJSON("https://tosdr.org/api/1/service/" + gethost() + ".json", function(result) {
    	var str = JSON.stringify(result);
    	var obj = JSON.parse(str);
		console.log(obj.pointsData);
		var points = Object.keys(obj.pointsData);
		if(Math.random() < 0.5) {
		// ask a correct question
			askQuestion(obj.pointsData[points[points.length * Math.random() << 0]].tosdr.case, true);
		}
		else {
			var topics = Object.keys(allCases);
			var topic = topics[topics.length * Math.random() << 0];
			var tc = allCases[topic][allCases[topic].length * Math.random() << 0].name;
			var same = true
			while (same) {
				same == false
				topic = topics[topics.length * Math.random() << 0];
				tc = allCases[topic][allCases[topic].length * Math.random() << 0].name;
				//alert(obj.pointsData[points[0]].tosdr.case);
				for (c in points) {
					if (tc == obj.pointsData[c]) {
						alert(obj.pointsData[c]);
						same == true;
					}
				}
			}
			//console.log(tc);
			askQuestion(tc, false);
		}
	});
}

function askQuestion(questionStr, correct){
	document.getElementById("caseMessage").innerHTML = questionStr;
	if(correct)
	{
		document.getElementById("trueButton").setAttribute( "onclick", "javascript: correctAns();");
		document.getElementById("falseButton").setAttribute( "onclick", "javascript: incorrectAns();");
	}
	else
	{
		document.getElementById("falseButton").setAttribute( "onclick", "javascript: correctAns();");
		document.getElementById("trueButton").setAttribute( "onclick", "javascript: incorrectAns();");
	}
}

function gethost(){
	var url = window.location.host
	var arr = url.split(".");
	return arr[arr.length - 2]
}
