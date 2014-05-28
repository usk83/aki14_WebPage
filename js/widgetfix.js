$(window).load(function()
{
	function widgetFix()
	{
		var twFrame = $('iframe.twitter-timeline');
		// if (twFrame.length)
		if(twFrame.contents().find(".root.twitter-timeline").attr('data-profile-id'))
		{
			// Twitterの角を丸める
			twFrame.contents().find(".root.twitter-timeline").css('border-radius', '10px');
			// Twitterフッターの微調整
			twFrame.contents().find(".timeline-footer").css({
				"border-bottom-left-radius": "9px",
				"border-bottom-right-radius": "9px"
			});
		}
		else
		{
			setTimeout(widgetFix, 500);
		}
		$("#mc-fb-iframe").css({
			"border-top-left-radius": "10px",
			"border-top-right-radius": "10px"
		});
		// console.log($("#mc-fb-iframe").contents().find('div.pam'));
		// $("#mc-fb-iframe").contents().find('div.pam').css('padding', '3px 10px');
	}
	widgetFix();
});

function hoge()
{
	console.log($("#mc-fb-iframe").contents());
}