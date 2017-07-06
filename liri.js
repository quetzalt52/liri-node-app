// grab keys from the keys.js file
var keys = require('./keys.js');
// grabs the file  system 
var fs = require('fs');
// node package manager 
//var request = require('request');


console.log( "Please enter any of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says");

// declaring command variables
var nodevalue = process.argv[2];
// either the name of a song, or movie
var value = process.argv[3];
var count ="";
	for (var i = 3; i < nodevalue.length; i ++) {
		if(i>3 && i<nodevalue.length){
	    count  = count + "+" + nodevalue[i];
	  } else{
	    count  = count + nodevalue[i];
	  }
	}

// switch case for whatever command the user enters
switch(nodevalue){
    case 'my-tweets':
		showmeTweets();
 	break;

    case 'spotify-this-song':
		var anysong = "";
		if(anysong){
	      spotifyMusic(anysong);
	    } else{
	      spotifyMusic("Frantic");
	    }
	break;

	case 'movie-this':
	    movie();
	break;
	
	case 'do-what-it-says':
	    doThing();
	break;
	
	default:
	break;

}

	console.log( "Please enter any of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says");


function showmeTweets() {
	// twitter keys variable, referencing the keys file and export line
  var twitterKeys = require('./keys.js').twitterKeys;
  // npm package
  var Twitter = require('twitter');
  // assigning the keys
  var client = new Twitter ({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
  });
	//https://dev.twitter.com/rest/reference/get/statuses/user_timeline
	var params = {
		user_id: 'gladysDEspi',
		countTweets : 20
	};
	client.get('statuses/user_timeline',params, function(err,tweets, response){
		
		if (!err) {
			for(var i = 0; i<tweets.length; i++){
	        var date = tweets[i].created_at;
	        console.log("@gladysDEspi: " + tweets[i].text + " Created At: " + date.substring(0, 19));
	        console.log("-----------------------");
        
	        //adds text to log.txt file
	        fs.appendFile('log.txt', "@gladysDEspi: " + tweets[i].text + " Created At: " + date.substring(0, 19));
	        fs.appendFile('log.txt', "-----------------------");
      }
    }else{
      console.log('Error occurred');
    }
	});
}//end of showmeTweets

function spotifyMusic(song) {
	// spotify package
	var Spotify = require ('node-spotify-api');
	
	var spotify = new Spotify ({
		id: 'a19972daeebc412c8f57ceb82fd35dca',
		secret: '4a3f3dd36eef4b62b491ccb219777a81'
	});
	
	spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songInfo = data.tracks.items[i];
        //artist
        console.log("Artist: " + songInfo.artists[0].name);
        //song name
        console.log("Song: " + songInfo.name);
        //spotify preview link
        console.log("Preview URL: " + songInfo.preview_url);
        //album name
        console.log("Album: " + songInfo.album.name);
        console.log("-----------------------");
        
        //adds text to log.txt
        fs.appendFile('log.txt', songInfo.artists[0].name);
        fs.appendFile('log.txt', songInfo.name);
        fs.appendFile('log.txt', songInfo.preview_url);
        fs.appendFile('log.txt', songInfo.album.name);
        fs.appendFile('log.txt', "-----------------------");
      }
    } else{
      console.log('Error occurred.');
    }
  });

}//end of spotify-function

//movie FUNCTION
function movie() {
 //npm package
var request = require('request');
var movieDefault = "Mr.Nobody";

// search url variable
var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';

request(url, function (error, response, body) {
	// If the request is successful
	if (!error && response.statusCode == 200) {
	  // Parse the body and pull for each attribute
		var body = JSON.parse(body);
		console.log("----------------MOVIE THIS-----------------")
		console.log("Title: " + body.Title);
		console.log("Year: " + body.Year);
		console.log("Rating: " + body.imdbRating);
		console.log("Country of Production: " + body.Country);
		console.log("Language: " + body.Language);
		console.log("Plot: " + body.Plot);
		console.log("Actors: " + body.Actors);

		// add text to log.txt
		fs.appendFile('log.txt', "Title: " + body.Title);
		fs.appendFile('log.txt', "Year: " + body.Year);
		fs.appendFile('log.txt', "Rating: " + body.imdbrating);
		fs.appendFile('log.txt', "Country of Production: " + bodyCountry);
		fs.appendFile('log.txt', "Language: " + body.Language);
		fs.appendFile('log.txt', "Plot: " + body.Plot);
		fs.appendFile('log.txt', "Actors: " + body.Actors);
		fs.appendFile('log.txt', "-----------------------");
		


	} else{
	  console.log('Error occurred.')
	}	
	if(movieName === "Mr. Nobody"){
	    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
	    //append movie to log txt
	    fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
	}//end of if
});

}//end of movie function


function doThing(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');
    spotifyMusic(txt[1]);
  });
}//end of doThing 