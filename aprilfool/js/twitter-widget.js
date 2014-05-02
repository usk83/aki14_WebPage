// Twitterウィジェット用
!function(d,s,id)
{
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id))
	{
		js=d.createElement(s);
		js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
	// window.setTimeout("hoge()", 10000);
}
(document,"script","twitter-wjs");


// Twitterの文字修正用
function adjustTwitterWidget()
{
	if ($("#twitter-widget-1").contents().find(".tweet-box-button").text() == "@akisai_sfcさん宛にツイートする")
	{
		$('iframe.twitter-timeline').contents().find(".tweet-box-button").text("@akisai_sfc宛にツイート");
	}
	else
	{
		setTimeout(adjustTwitterWidget, 100);
	}
}
// 初回
adjustTwitterWidget();


// function hoge()
// {
// 	$('iframe.twitter-timeline').contents().find(".tweet-box-button").text("@akisai_sfc宛にツイート");
// }
// $(window).load(function()
// {
// 	$('iframe.twitter-timeline').contents().find(".tweet-box-button").text("@akisai_sfc宛にツイート");
// });