console.log("is linked");

//on clicking submit
$("#submit").on("click", function(event){
	event.preventDefult();
		$.post("/api", function(data){
			if(data){
				console.log(data);
				//run function to compare and spit out results
			}
		})
	})