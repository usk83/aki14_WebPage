var currDetail = "";

function loadEventDetail(place, type)
{
	if (currDetail == place)
	{
		if(type == "linkinpage")
		{
			gotoDetail(place);
			return;
		}
		else return;
	}
	else currDetail = place;

	$('#planIntro button').each(function() {
		$(this).animate({'opacity': '1'},{'duration': 200});
	});
	var n;
	if (place == "stage") n = 0;
	else if (place == "outside") n = 1;
	else if (place == "inside") n = 2;
	var button = "#planIntro ul li:eq(" + n + ") button";
	$(button).animate({'opacity': '0.5'},{'duration': 200});

	console.log();
	$("#eventDetail").fadeOut(500, function(){putDetail(place, type);});
}
function putDetail(place, type)
{
	var target = "";
	target = "./event_detail.html #event_" + place;
	$("#eventDetail").load(target);
	setTimeout(function(){showDetail(place, type);}, 200);
}
function showDetail(place, type)
{
	if(type == "linkinpage") $("#eventDetail").fadeIn(500, function(){gotoDetail(place);});
	else  $("#eventDetail").fadeIn(500);
}
function gotoDetail(place)
{
	var speed = 400; // ミリ秒
	// アンカーの値取得
	var href= "#event_" + place;
	// 移動先を取得
	var target = $(href === "#" || href === "" ? 'html' : href);
	// 移動先を数値で取得
	// var position = target.offset().top - 52;

	try{
		var position = target.offset().top - 52;
	} catch(e) {
		return;
	}

	// スムーススクロール
	$('body,html').animate({scrollTop:position}, speed, 'swing');

	target.find("h1").animate({'color': '#5574CA'},{'duration': 200})
	.animate({'color': '#fff'},{'duration': 600});

	if(target.find("h1")[0] === undefined){
		target.find("h2").animate({'color': '#5574CA'},{'duration': 200})
		.animate({'color': '#323'},{'duration': 600});
	}

		return false;
}

(function () {
	var randnum = Math.floor(Math.random() * 3);
	var target = "#planIntro ul li:eq(" + randnum + ") button";

	$(target).css("opacity","0.5");

	if (randnum === 0) loadEventFirst('stage');
	if (randnum === 1) loadEventFirst('outside');
	if (randnum === 2) loadEventFirst('inside');
})();
function loadEventFirst(place)
{
	currDetail = place;

	var target = "./event_detail.html #event_" + place;
	$("#eventDetail").load(target);
}
