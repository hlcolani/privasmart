if (document.getElementById("password") || document.getElementById("pass") || document.getElementById("psw") || document.getElementById("new-password")) {
	alert(getQuestion());
};

function getQuestion() {

    	if (var a = $.getJSON("https://tosdr.org/api/1/service/" + gethost() + ".json")) {
    		return "Terms of Service pls";
		}
		else {
			return "not a real one";
		}
	}

function gethost() {
	var url = window.location.host
	var arr = url.split(".");
	return arr[arr.length - 2]
}
