console.log("starting content script");
let bodyText = document.body.textContent.toLowerCase();
bodyText = bodyText.replace(/[\n\r]/g, '');
console.log(bodyText.trim());
const expr = /((\bi\b)|(\byou\b)).*((\bagree\b)|(\bunderstand\b)|(\backnowledge\b)).*((\bterms\b)|(\bprivacy policy\b))/;
if (bodyText.search(expr) !== -1) {
	// bodyText.includes("agree") && (bodyText.includes("terms") || bodyText.includes("privacy policy")
	// document.getElementById("password") || document.getElementById("pass") || document.getElementById("psw") || document.getElementById("new-password")
	let matches = bodyText.match(expr)
	for (let m in matches) {
		// console.log(matches[m]);
	}

	console.log("site has terms of service or privacy policy");
	injectHTML();
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
		console.log("Generating question");
		if(Math.random() < 0.5) {
		// ask a correct question
			console.log("asking question");
			askQuestion(obj.pointsData[points[points.length * Math.random() << 0]].tosdr.case, true);
		}
		else {
			var topics = Object.keys(allCases);
			var topic = topics[topics.length * Math.random() << 0];
			var tc = allCases[topic][allCases[topic].length * Math.random() << 0].name;
			var same = true;
			while (same) {
				same = false
				topic = topics[topics.length * Math.random() << 0];
				tc = allCases[topic][allCases[topic].length * Math.random() << 0].name;
				for (c in points) {
					if (tc == obj.pointsData[c]) {
						same == true;
					}
				}
			}
			console.log("asking question");
			askQuestion(tc, false);
		}
	});
}

function injectHTML(){
	$.getJSON("https://tosdr.org/api/1/service/" + gethost() + ".json", function(result) {
		console.log("injecting html");
		$.get(chrome.extension.getURL('/popup.html'), function(data) {
			$(data).appendTo('body');
			console.log("html injection complete");
		// Or if you're using jQuery 1.8+:
		// $($.parseHTML(data)).appendTo('body');
			getQuestion();
		});
	});
}

function askQuestion(questionStr, correct){
	let caseMessage = document.getElementById("caseMessage");
	caseMessage.innerHTML = questionStr;
	if(correct)
	{
		document.getElementById("trueButton").addEventListener("click", correctAns);
		document.getElementById("falseButton").addEventListener("click", incorrectAns);
	}
	else
	{
		document.getElementById("trueButton").addEventListener("click", incorrectAns);
		document.getElementById("falseButton").addEventListener("click", correctAns);
	}
}

function correctAns()
        {
            console.log("correct answer");
            document.getElementById("caseMessage").style.textAlign = "center";
            document.getElementById("caseMessage").innerHTML = "Correct!";
            document.getElementById("privasmartContent").style.backgroundColor = "rgb(67, 239, 95)";
            document.getElementById("closeButton").style.backgroundColor = "rgb(67, 239, 95)";
            setTimeout(function(){}, 2000);
            closePrivasmart();
        }
        function incorrectAns()
        {
            console.log("incorrect answer");
            document.getElementById("caseMessage").style.textAlign = "center";
            let arr = window.location.host.split(".");
            document.getElementById("caseMessage").innerHTML = "Wrong! <a href='https://tosdr.org/#" + arr[arr.length - 2] + "'>Click here</a> to learn more.";
            document.getElementById("privasmartContent").style.backgroundColor = "rgb(188, 23, 0)";
            document.getElementById("closeButton").style.backgroundColor = "rgb(188, 23, 0)";
            document.getElementById("PrivasmartContainer").style.color = "rgb(255, 255, 255)";
        }

function closePrivasmart()
{
	console.log("close container");
	let elem = document.getElementById("PrivasmartContainer");
	elem.classList.add('fadeOut');
	setTimeout(function(){
		elem.parentNode.removeChild(elem);
	}, 1000);
}

function gethost(){
	var url = window.location.host
	var arr = url.split(".");
	return arr[arr.length - 2]
}
