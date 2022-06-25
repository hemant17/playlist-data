async function getData() {
  document.getElementById("submit").textContent = "Fetching..";
  document.getElementById("showData").innerHTML = "";
  document.getElementById("showData").className = "";
  document.getElementById("gif-container").innerHTML = '';
  var playlistEntered = document.getElementById("myText").value;
  var checkedPlaylistID = is_playlist_url(playlistEntered);
  if (checkedPlaylistID != "NULL"){
    finalFetch(checkedPlaylistID);
  }


  else {
    document.getElementById("showData").innerHTML = "You sure that playlist URL is correct?";
    document.getElementById("showData").className = "flash mt-3 flash-error ";
    document.getElementById("submit").textContent = "Fetch Again";
    document.getElementById("gif-container").innerHTML = '<img src="assets/dustin-boom.gif" class="img-responsive"></img>';
  }


}

// URL Validator
function is_url(myURL) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
      "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(myURL);
}
//to check if input url contains "list=" or not
function list_check(a, b, c, d, e) {
  if (a == "l" && b == "i" && c == "s" && d == "t" && e == "=") {
    return true;
  } else {
    return false;
  }
}
function is_playlist_url(str) {
  if (str[str.length - 1] == "/") {
    str = str.slice(0, str.length - 1);
  }
  var i = 0,
    low = -1,
    high = -1,
    ans = "NULL";
  if (!is_url(str)) {
    return ans;
  }
  while (i <= 5000) {
    if (list_check(str[i], str[i + 1], str[i + 2], str[i + 3], str[i + 4])) {
      low = i + 5;
      break;
    }
    i++;
  }
  if (low != -1) {
    high = str.length;
    ans = str.slice(low, high);
  }
  return ans;
}

//console.log(is_playlist_url());


	// Formatting seconds into Hours, Minutes and Seconds. 
	function formatDuration(duration) {
		let seconds = duration;
		let hours = Math.floor(seconds / 3600);
		seconds -= hours * 3600;
		let minutes = Math.floor(seconds / 60);
		seconds -= minutes * 60;
		seconds = Math.floor(seconds);
		return { hours, minutes, seconds };
	}


// DOM
function finalFetch(playlistEntered){
  $.post(
    "/search",
    {
      playlistID: playlistEntered,
    },

    

    function (fetchedData) {

      if (fetchedData === "API_Error") {
        document.getElementById("showData").innerHTML = "Great Scott! Are you sure this playlist is in the right time and in the right universe?";
        document.getElementById("showData").className = "flash mt-3 flash-warn";
        document.getElementById("gif-container").innerHTML = '<img src="assets/great-scott.gif"></img>';
        document.getElementById("submit").textContent = "Fetch Again";

      }

      else { 
      let fetchData = formatDuration(parseInt(fetchedData));
      document.getElementById("showData").className = "flash mt-3 flash-success Box anim-hover-grow" ;
      document.getElementById("showData").innerHTML = "This playlist is " + fetchData.hours + " hours " + fetchData.minutes + " minutes " + fetchData.seconds + " seconds.";
      document.getElementById("submit").className = "btn";
      document.getElementById("submit").textContent = "Fetch Again";

    }
    }
  );
}


