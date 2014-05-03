// ナビゲーションバーオンマウス用
// 親要素にcssを指定するため
$(function()
{
	$("#hn-nav li").mouseover(function()
	{
		$("#header-navi").css("background","rgba(37, 37, 37, 0.7)");
		$("#hn-nav a").css("color", "rgba(238, 238, 238, 0.5)");
		$("#hn-logo img").css("opacity","0.7");
		$(this).css("background", "#252525");
		$(this).children("a").css("color","#eee");
		$("#hn-right a").css("color", "rgba(255, 255, 255, 0.5)");
	});
	$("#hn-nav li").mouseout(function()
	{
		$("#header-navi").css("background","#252525");
		$("#hn-logo img").css("opacity","1");
		$(this).css("background","none");
		$("#hn-nav a").css("color","#eee");
		$("#hn-right a").css("color", "#fff");
	});
});