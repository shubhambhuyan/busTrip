myData = JSON.parse(data);


function toCamelCase(str){
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

function isNumber(text) {
	return !isNaN(text);
}

function isValuePresentInArray(value, array) {
	value = toCamelCase(value);
	return array.indexOf(value) > -1;
}

function canTravel(source, destination, route) {
	var sourceFound = false;
	var destFound = false;
	source = toCamelCase(source);
	destination = toCamelCase(destination);
	for(var i = 0; i < route.length; i++) {
		if(!sourceFound && route[i] == source) {
			sourceFound = true;
		}
		if(sourceFound && !destFound && route[i] == destination) {
			destFound = true;
		}
	}
	return sourceFound && destFound;
}

function searchBusDetails(detail) {
	if(isNumber(detail)) {
		var message = "";
		for(var i = 0; i < myData.length; i++) {
			if(myData[i]["id"] === detail) {
				message = "<div class=\"col-md-12\"><h3><font color=\"red\">Bus No. : "+myData[i]["id"]+"</font><h3></div>"+" <div class=\"col-md-4\"><h3><font color=\"red\">Source : "+myData[i]["source"]+"</font><h3></div>"+"  <div class=\"col-md-4\"><h3><font color=\"red\">Destination : "+myData[i]["destination"]+"</font><h3></div>"+"<br><div class=\"col-md-6\"><h3><font color=\"red\">Stops at these stations : <h3></div></div>";
				for (var j = 0; j < myData[i]["stops"].length; j++) {
					if(j == 0 || j == myData[i]["stops"].length -1){
					message = message +"<p style=\"padding-left: 7.5%;\"><img src=\"images/halt.png\" height=\"40\" width=\"40\" align=\"middle\"><font color=\"red\">&emsp;"+myData[i]["stops"][j] +"</font></p>";
					}
					else{
						message = message +"<p style=\"padding-left: 7.5%;\"><img src=\"images/bus.png\" height=\"35\" width=\"35\" align=\"middle\"><font color=\"blue\">&emsp;"+myData[i]["stops"][j] +"</font></p>";
					}
				}
				//message = message.substr(0, message.length-3);
				message = message + "<br><br>  <section id=\"explore\"> <div class=\"container\"><div class=\"row\"><div class=\"watch\"><img class=\"img-responsive\" src=\"images/watch.png\"></div><div class=\"col-md-4 col-md-offset-2 col-sm-5\"><h2><font color=\"white\">WE HOPE YOU DON'T HAVE TO WAIT FOR LONG</font></h2></div><br><br><br><br></div></div></section>";
				break;
			}
		}
		if(message.length == 0)
			message = "<br><br>  <section id=\"explore\"> <div class=\"container\"><div class=\"row\"><div class=\"watch\"><img class=\"img-responsive\" src=\"images/watch.png\"></div><div class=\"col-md-4 col-md-offset-2 col-sm-5\"><h2><font color=\"white\">INVALID BUS NUMBER / BUS DETAILS UNAVAILABLE</font></h2></div><br><br><br><br></div></div></section>";
		return message;
	}
	else {
		var message = "";
		for(var i = 0; i < myData.length; i++) {
			if(isValuePresentInArray(detail, myData[i]["stops"])) {
				message = "<div class=\"col-md-12\"><h3><font color=\"red\">Bus No. : "+myData[i]["id"]+"</font><h3></div>"+" <div class=\"col-md-4\"><h3><font color=\"red\">Source : "+myData[i]["source"]+"</font><h3></div>"+"  <div class=\"col-md-4\"><h3><font color=\"red\">Destination : "+myData[i]["destination"]+"</font><h3></div>"+"<br><div class=\"col-md-6\"><h3><font color=\"red\">Stops at these stations : <h3></div></div>";
				for (var j = 0; j < myData[i]["stops"].length; j++) {
					if(j == 0 || j == myData[i]["stops"].length -1){
					message = message +"<p style=\"padding-left: 7.5%;\"><img src=\"images/halt.png\" height=\"40\" width=\"40\" align=\"middle\"><font color=\"red\">&emsp;"+myData[i]["stops"][j] +"</font></p>";
					}
					else{
						message = message +"<p style=\"padding-left: 7.5%;\"><img src=\"images/bus.png\" height=\"35\" width=\"35\" align=\"middle\"><font color=\"blue\">&emsp;"+myData[i]["stops"][j] +"</font></p>";
					}
				}
				//message = message.substr(0, message.length-3);
				message = message + "<br><br>  <section id=\"explore\"> <div class=\"container\"><div class=\"row\"><div class=\"watch\"><img class=\"img-responsive\" src=\"images/watch.png\"></div><div class=\"col-md-4 col-md-offset-2 col-sm-5\"><h2><font color=\"white\">WE HOPE YOU DON'T HAVE TO WAIT FOR LONG</font></h2></div><br><br><br><br></div></div></section>";
			}
		}
		if(message.length == 0)
			message = "<br><br>  <section id=\"explore\"> <div class=\"container\"><div class=\"row\"><div class=\"watch\"><img class=\"img-responsive\" src=\"images/watch.png\"></div><div class=\"col-md-4 col-md-offset-2 col-sm-5\"><h2><font color=\"white\"> INVALID BUS STOP / BUS STOP DETAIL UNAVAILABLE</font></h2></div><br><br><br><br></div></div></section>";
		return message;
	}
}


function exampleSearch() {
	document.getElementById("output").innerHTML = "<div class = \"col-sm-8\"><div class=\"container\"><br><br><br><br><br><br><br>"+searchBusDetails(document.getElementById("busDetail").value)+ "</div></div>";
}


function tripPlanner(source, destination) {
	var message = "";
	for(var i = 0; i < myData.length; i++) {
		if((myData[i]["source"] == source && myData[i]["destination"] == destination) || (canTravel(source, destination, myData[i]["stops"]))) {
			message = "<div class=\"col-md-12\"><h3><font color=\"red\">Bus No. : "+myData[i]["id"]+"</font><h3></div>"+" <div class=\"col-md-4\"><h3><font color=\"red\">Source : "+myData[i]["source"]+"</font><h3></div>"+"  <div class=\"col-md-4\"><h3><font color=\"red\">Destination : "+myData[i]["destination"]+"</font><h3></div>"+"<br><div class=\"col-md-6\"><h3><font color=\"red\">Stops at these stations : <h3></div></div>";
				for (var j = 0; j < myData[i]["stops"].length; j++) {
				if(j == 0 || j == myData[i]["stops"].length -1){
					message = message +"<p style=\"padding-left: 7.5%;\"><img src=\"images/halt.png\" height=\"40\" width=\"40\" align=\"middle\"><font color=\"red\">&emsp;"+myData[i]["stops"][j] +"</font></p>";
					}
					else{
						message = message +"<p style=\"padding-left: 7.5%;\"><img src=\"images/bus.png\" height=\"35\" width=\"35\" align=\"middle\"><font color=\"blue\">&emsp;"+myData[i]["stops"][j] +"</font></p>";
					}
			}
			//message = message.substr(0, message.length-3);
			message = message + "<br><br>  <section id=\"explore\"> <div class=\"container\"><div class=\"row\"><div class=\"watch\"><img class=\"img-responsive\" src=\"images/watch.png\"></div><div class=\"col-md-4 col-md-offset-2 col-sm-5\"><h2><font color=\"white\">WE HOPE YOU DON'T HAVE TO WAIT FOR LONG</font></h2></div><br><br><br><br></div></div></section>";
			break;
		}
	}
	if(message.length == 0) {
		message = "<br><br>  <section id=\"explore\"> <div class=\"container\"><div class=\"row\"><div class=\"watch\"><img class=\"img-responsive\" src=\"images/watch.png\"></div><div class=\"col-md-4 col-md-offset-2 col-sm-5\"><h2><font color=\"white\"> SORRY!!! NO DIRECT BUSES AVAILABLE IN THIS ROUTE </font></h2></div><br><br><br><br></div></div></section>";
	}
	return message;
}

function wrapperTripPlanner() {
	document.getElementById("output").innerHTML = "<div class = \"col-sm-8\"><div class=\"container\"><br><br><br><br><br><br><br>"+tripPlanner(document.getElementById("tripPlannerSource").value, document.getElementById("tripPlannerDestination").value)+"</div></div>";
}
