if (document.getElementById("password") || document.getElementById("pass") || document.getElementById("psw") || document.getElementById("new-password")) {
	getQuestion();
};

function getQuestion() {
	var a = $.getJSON("https://tosdr.org/api/1/service/" + gethost() + ".json", function(result)
{
    var str = JSON.stringify(result);
    var obj = JSON.parse(str);
    alert(str[0]);
});
	
}

function askQuestion(a) {
	
}

function gethost() {
	var url = window.location.host
	var arr = url.split(".");
	return arr[arr.length - 2]
}
