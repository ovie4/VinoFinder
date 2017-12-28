var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.PORT || 1865;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

var userProfiles = [];
var choices = [
{
	name: "Riesling",
	colour: "white",
	image: "http://localhost:1865/static/images/white",
	scores: [1,1,2,1,2,2],
	amzn:"https://www.amazon.com/s/ref=nb_sb_ss_c_3_5?url=search-alias%3Dgrocery&field-keywords=riesling&sprefix=riesl%2Camazonfresh%2C155&crid=2OEAL0X8U2S96&rh=n%3A16310101%2Ck%3Ariesling",
	total: "http://www.totalwine.com/wine/white-wine/riesling/c/000023?text=riesling"
},
{
	name: "Cabernet Sauvignon",
	colour: "red",
	image: "http://localhost:1865/static/images/red",
	scores: [3,1,4,4,3,2,3],
	amzn:"https://www.amazon.com/s/ref=nb_sb_ss_c_3_8?url=search-alias%3Dwine&field-keywords=cabernet+sauvignon&sprefix=cabernet%2Camazonfresh%2C152&crid=3P3CDEYS2UWKQ&rh=n%3A2983386011%2Ck%3Acabernet+sauvignon",
	total: "http://www.totalwine.com/search/all?text=cabernet%20sauvignon"
},
{
	name: "Malbec",
	colour: "red",
	image: "http://localhost:1865/static/images/red",
	scores: [2,3,3,1,3,1,3],
	amzn: "https://www.amazon.com/s/ref=nb_sb_ss_c_3_5?url=search-alias%3Dwine&field-keywords=malbec+wine&sprefix=malbe%2Camazonfresh%2C156&crid=2MOVRVQ9TDIM6&rh=n%3A2983386011%2Ck%3Amalbec+wine",
	total: "http://www.totalwine.com/wine/red-wine/malbec/c/000066?viewall=true&sort=most-popular&text=malbec"
},
{
	name: "Pinot Noir",
	colour: "red",
	image: "http://localhost:1865/static/images/red",
	scores: [2,2,3,3,2,3,3],
	amzn: "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dwine&field-keywords=pinot+noir&rh=n%3A2983386011%2Ck%3Apinot+noir",
	total: "http://www.totalwine.com/search/all?text=pinot%20noir"
},
{
	name: "Chianti",
	colour: "red",
	image: "http://localhost:1865/static/images/red",
	scores: [3,2,3,3,4,2,3],
	amzn: "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dwine&field-keywords=chianti&rh=n%3A2983386011%2Ck%3Achianti",
	total: "http://www.totalwine.com/search/all?text=chianti"
},
{
	name: "Moscato",
	colour: "white",
	image: "http://localhost:1865/static/images/white",
	scores: [1,1,2,2,1,2,3],
	amzn: "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dwine&field-keywords=moscato&rh=n%3A2983386011%2Ck%3Amoscato",
	total: "http://www.totalwine.com/search/all?text=moscato"
},
{
	name: "Sauvignon Blanc",
	colour: "white",
	image: "http://localhost:1865/static/images/white",
	scores: [3,2,4,3,4,4,3],
	amzn: "https://www.amazon.com/s/ref=nb_sb_ss_c_1_4?url=search-alias%3Dwine&field-keywords=sauvignon+blanc&sprefix=sauv%2Camazonfresh%2C154&crid=29TUZ3K69X0QJ&rh=n%3A2983386011%2Ck%3Asauvignon+blanc",
	total: "http://www.totalwine.com/search/all?text=sauvignon%20blanc"
},
{
	name: "Pinot Grigio",
	colour: "white",
	image: "http://localhost:1865/static/images/white",
	scores: [2,3,3,4,4,4,3],
	amzn: "https://www.amazon.com/s/ref=nb_sb_ss_c_1_4?url=search-alias%3Dwine&field-keywords=sauvignon+blanc&sprefix=sauv%2Camazonfresh%2C154&crid=29TUZ3K69X0QJ&rh=n%3A2983386011%2Ck%3Asauvignon+blanc",
	total: "http://www.totalwine.com/search/all?text=sauvignon%20blanc"
}

]



//different routes
//one for home page
app.get("/", function(req,res){
	  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});
//one for survey
app.get("/survey", function(req,res){
	  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

//for images
app.get("/static/css/style.css", function(req,res){
	res.sendFile(path.join(__dirname, "app/public/css/style.css"));
});
app.get("/static/images/:colour", function(req,res){
	var colour = req.params.colour;
	if(colour==="white"){
		res.sendFile(path.join(__dirname, "app/public/images/whitewine.jpg"));
	}
	else if(colour==="red"){
		res.sendFile(path.join(__dirname, "app/public/images/redwine.jpg"));
		}
	else if(colour==="winev"){
		res.sendFile(path.join(__dirname, "app/public/images/winev.png"));
	}
})
app.get("/api/wines", function(req,res){
	res.json(choices);
});
//routes for api requests
app.post("/api", function(req,res){
	var servProfile = req.body;
	console.log(servProfile);


	var diffArr =[];
	//run function to compare profiles
	for (var i = 0; i < choices.length; i++) {

	function wrapCompare(userScores){
	return function (vinoScores,rem){
		console.log(vinoScores);
		var diff=0;
		var arr3=[];
  		for (var i = 0; i < userScores.length; i++) {
  		console.log("vinoscores is: "+vinoScores[i]);
   		console.log("userscores is: "+userScores[i]);

  	diff+= Math.abs(userScores[i]-vinoScores[i]);
		console.log("Total diff is: "+diff);
		arr3.push(diff);
		console.log("Arr3 is: "+arr3);

   }
   rem=arr3[5];
   console.log("rem: "+rem);
   return rem;
  }
}


var z = wrapCompare(servProfile.profile);
diffArr.push(z(choices[i].scores));
console.log(diffArr);

}
	//loop thru diffArr and see where min value is
	var minDiff = Math.min.apply(null,diffArr);
	console.log("minDiff is: "+minDiff);

	for (var i = 0; i < diffArr.length; i++) {


		if(minDiff===diffArr[i]){
			matchProf=choices[i];
		}
	}
	
	
	console.log(matchProf);
	res.json(matchProf);

});


//listener
app.listen(port, function(){
	console.log("Bombs Away");
});