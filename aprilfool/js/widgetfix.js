$(function()
{
	$(window).load(function()
	{
		// facebookの上の角を丸める
		$("#mc-fb-iframe").css({
			"border-top-left-radius": "10px",
			"border-top-right-radius": "10px"
		});
		// Twitterの角を丸める
		$("#twitter-widget-1").contents().find(".root").css({
			"border-radius": "10px"
		});
		// Twitterフッターの微調整
		$("#twitter-widget-1").contents().find(".timeline-footer").css({
			"border-bottom-left-radius": "9px",
			"border-bottom-right-radius": "9px"
		});
	});
});