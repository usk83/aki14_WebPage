function loadEventDetail(place)
{
	var target = "";
	target = "./event_detail.html #" + place;
	$("#eventDetail").fadeOut(500, function(){putDetail(target);});
	// $("#fuga").fadeTo(500, 0, function(){putDetail(target);});
}
function putDetail(target)
{
	$("#eventDetail").load(target);
	setTimeout(function(){showDetail();}, 200);
}
function showDetail()
{
	// $("#fuga").fadeTo(500, 1);
	$("#eventDetail").fadeIn(500);
}