var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = 1865;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

var userProfiles = [];
var choices = [
{
	name: "Riesling",
	colour: "white",
	image: "http://localhost:1865/static/images/white",
	scores: [1,1,2,1,3,2]
},
{
	name: "Cabernet Sauvignon",
	colour: "red",
	image: "http://localhost:1865/static/images/red",
	scores: [3,1,4,4,3,2]
},
{
	name: "Malbec",
	colour: "red",
	image: "http://localhost:1865/static/images/red",
	scores: [2,3,3,1,3,1]
}
]

// function scoreCompare(arr1,arr2){
// 	var diff =0;
// 	var arr3 = [];
// 	for (var i = 0; i < arr1.length; i++) {
		
		
// 		diff+= Math.abs(arr1[i]-arr2[i]);
// 		console.log("Total diff is: "+diff);
// 		arr3.push(diff);
// 		console.log("Arr3 is: "+arr3);
// 		//return diff;
// 	}
// 	totalDiff = arr3[5];
// 	console.log("totalDiff is: "+totalDiff);
// 	//return totalDiff;
// }

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
app.get("/static/images/:colour", function(req,res){
	var colour = req.params.colour;
	if(colour==="white"){
		res.sendFile(path.join(__dirname, "app/public/images/whitewine.jpg"));
	}
	else if(colour==="red"){
		res.sendFile(path.join(__dirname, "app/public/images/redwine.jpg"));

	}
})

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