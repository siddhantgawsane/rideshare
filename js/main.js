$(document).ready(function(){
	var js_rides = $('.js_rides');
	var getRides = 	function() {
		$.get("/ride", function(rides, status){
	        // alert("Data: " + data + "\nStatus: " + status);
	        var ride_html;

	        for(i=0;i<rides.length;i++){
	        	ride = JSON.parse(rides[i]);
		        ride_html = '<button class="col-sm-4" style="border: 0;background-color: white;">';
		        ride_html = ride_html + '<div class="panel panel-primary">';
		        ride_html = ride_html + '<div class="panel-heading"><strong>SHARED RIDE</strong></div>';
		        ride_html = ride_html + '<div class="panel-body"><p>From: ' + ride['source'];
		        ride_html = ride_html + '<br/>To: ' + ride['destination'];
		        ride_html = ride_html + '<br/>Time: ' + ride['when'];
		        ride_html = ride_html + '</p></div><div class="panel-footer">Contact: '+ride['contact'];
		        ride_html = ride_html + '</div></div></button>';
		        js_rides.append(ride_html);
	        }
	    });
	}

	getRides();

    $("#post-ride").click(function(event){
    	var from = $("#from");
    	var to = $("#to");
    	var date = $("#date");
    	var time = $("#time");
    	var contact = $("#contact");

    	if (!from.val()){
    		from.parent().addClass("has-error");
    		from.css("border-width","2px");
    	}
    	if (!to.val()){
    		to.parent().addClass("has-error");
    		to.css("border-width","2px");
    	}
    	if (!date.val()){
    		date.parent().addClass("has-error");
    		date.css("border-width","2px");
    	}
    	if (!time.val()){
    		time.parent().addClass("has-error");
    		time.css("border-width","2px");
    	}
    	if (!contact.val()){
    		contact.parent().addClass("has-error");
    		contact.css("border-width","2px");
    	}
    	console.log(from,to,date,time,contact);

    	var data = { 'from': from.val(), 'to': to.val(), 'when': date.val() + " " + time.val(), 'contact': contact.val() };

    	$.ajax({
			type: 'POST',
			url: '/ride',
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(data){
				js_rides.empty();
				getRides();
			}
		});
	});
});