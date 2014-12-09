Parse.initialize("fmIMSG4IweKf7ZgJ0xjf3oeMTTvdxitEnorn9Dcp", "K2UHs8UkSLypzrT0GbCqWDS7C26BW8wthzu6Gv6o");

var user = Parse.User.current();

function signupFn () {
	var user = new Parse.User();
	user.set("username", document.getElementById('userNameField').value);
	user.set("password", document.getElementById('passwordField').value);

	user.signUp(null, {
		success:function(user) {
			alert("Signed Up")
					},
		error:function(user, error) {
			if (error.code == 202) {
				alert("User already exists. Log In or create new account.")
			};
			console.log("error code" + error.code);	
		}
	});
}

function loginFn () {
	Parse.User.logIn(document.getElementById('userNameField').value, document.getElementById('passwordField').value, {
  		success: function(user) {
			window.location.reload();
		},
		error:function(user, error) {
			console.log("error code" + error.code);	
			if (error.code == 101) {
				alert("User account doesn't exist. Create new account first.")
			};
		}
	});
}

function logOutFn() {
	Parse.User.logOut({
		success: function(user) {
  			alert("logged out");
  			window.location.reload();
  		},
		error: function(user, error) {
	    	console.log("error code" + error.code);
		}
	})
}

var ProductObject = Parse.Object.extend("ProductDB");

function addProduct() {
	var product = new ProductObject;
	var file = [];
	var files = document.getElementById('addProduct').files;
	for(var i=0; i<files.length; i++){
	file = document.getElementById('addProduct').files[i];
	var name = document.getElementById('addProduct').files[i].name;
	var parseFile = new Parse.File(name, file);
	}
  	parseFile.save().then(function() {
	    var product = new ProductObject;

		product.set("mainImage", parseFile);
		product.set("featured", false);
		product.set("price", 69.99);
		product.save();
		alert("worked")
  	}, function(error) {
    	console.log("error :"+error.code)
  });

};

var query = new Parse.Query(ProductObject);
query.find({
	success: function(results) {
		console.log(results);
		displaycurrentUser();
		for(var i=0; i<results.length; i++){
			var product = results[i];
			var img = product.get("mainImage");
			// console.log(img.url());
			//document.getElementById("image").src = img.url();
			displayProduct(product);
		}
	},
	error: function(error) {
		console.log("error code" + error.code);
	}
})

function displayProduct(product) {
	var div = document.createElement("div")
	div.id = "products";
	var img = document.createElement("img");
	img.src = product.get("mainImage").url();
	img.setAttribute("class", "popup");
	div.appendChild(img)

	
	if(product.get("featured") == true) {
		img.setAttribute("class", "featured");
	}

	var form = document.createElement("div");
	div.appendChild(form);

	var favouriteBtn = document.createElement("input");
	favouriteBtn.type = "button";
	favouriteBtn.value = "fav";
	favouriteBtn.setAttribute("onclick" ,"favourite()");
	favouriteBtn.id = product.id;

	var price = document.createElement("p");
	price.innerText = "$ " + product.attributes.price;
	form.appendChild(price);

	// var description = document.createElement("p");
	// description.innerText = product.attributes.description;
	// form.appendChild(description);

	form.appendChild(favouriteBtn);
	
	document.getElementById("main").appendChild(div);
	
}

function favourite(e) {
	var currentId = event.currentTarget.id;
	var query = new Parse.Query(ProductObject);
	query.equalTo("objectId", currentId);
	query.first({
  		success: function(results) {

  			if (results.attributes.featured == false) {
  			results.set("user", user);
    		results.set("featured", true);
   			results.save();
   			alert("favourited")
   			} else {
   				results.set("user", user);
   				results.set("featured", false);
   				results.save();
   				alert("Unfavourited")
   			}
  		},
  	error: function(error) {
    	 console.log("Error: " + error.code + " " + error.message);
  		}
	});	
}

function displaycurrentUser () {
	if (user == null) {
		
	} else {
		var currentUserdiv = document.getElementById('currentUser');
		var currentUserDisplay = document.createElement("p");
		currentUserDisplay.innerText = user.attributes.username;
		
		currentUserdiv.appendChild(currentUserDisplay);
	}
}



function addRating() {
	console.log(this.value);
	console.log(this.ratings);
	this.ratings.push(parseInt(this.value));
	console.log(this.product);
	// this.product.set("rating", newRatingArray);
	this.product.save();
}












