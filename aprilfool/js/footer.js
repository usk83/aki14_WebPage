// header-navi-follow.js
// =====================================================================
// ナビゲーションバーをページ上部についてこさせる
// =====================================================================
var bt = $("#header-navi").offset().top; // #header-naviのページ上からの距離を取得
var ds = 0;
var followon = false; // ついてきてるかどうか

$(document).scroll(function(){ // スクロール発生時の処理の記述を開始
	ds = $(this).scrollTop(); // ユーザのスクロールした距離を取得

	if (bt <= ds) // スクロール距離が#header-naviの位置を超えたら、
	{
		$("#header-navi").addClass('follow'); // 「follow」というclassを追加する
		if(!followon) // ついてきてなかったら
		{
			$("#header-navi").after("<div id='followblank' class='clearfix'><a href=\"developer's_room.html\">開発者の部屋</a></div>");
			followon = true;
		}
		blank_a();
	}
	else if (bt >= ds) // スクロールがページ上まで戻ったら、
	{
		$("#header-navi").removeClass('follow'); // classを削除
		if(followon) // ついてきてたら
		{
			$("#followblank").remove();
			followon = false;
		}
	}
});
function blank_a()
{
	$("#followblank a").mouseover(function()
	{
		$(this).css({
			"transition": "all 0.5s ease-in 0.5s",
			"-webkit-transition:": "all 0.5s ease-in 0.5s",
			"color": "#333"
		});
	});
	$("#followblank a").mouseout(function()
	{
		$(this).css({
			"transition": "none",
			"-webkit-transition:": "none",
			"color": "#fff"
		});
	});
}

// windowサイズが小さくてもスクロールされるようにする
$(window).on("scroll", function()
{
	if($(window).scrollLeft()>=0 && $(window).scrollLeft()<=1280-window.innerWidth)
	{
		$(".follow").css("left", -$(window).scrollLeft());
	}
});



// twitter-widget.js
// =====================================================================
// Twitterウィジェット用
// =====================================================================
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
// adjustTwitterWidget();



// google+-widget.js
// =====================================================================
// google+ウィジェット用
// =====================================================================
window.___gcfg = {lang: 'ja'};
(function()
{
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/platform.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();


// mouseonnavi.js
// =====================================================================
// 親要素にcssを指定するため
// =====================================================================
$(function()
{
	$("#hn-nav li").mouseover(function()
	{
		$("#header-navi").css("background","rgba(37, 37, 37, 0.7)");
		$("#hn-nav a").css("color", "rgba(238, 238, 238, 0.5)");
		$("#hn-logo img").css("opacity","0.7");
		$(this).css("background", "#252525");
		$(this).children("a").css("color","#eee");
		$(this).children("a").css("font-weight","bold");
		$("#hn-right a").css("color", "rgba(255, 255, 255, 0.5)");
	});
	$("#hn-nav li").mouseout(function()
	{
		$("#header-navi").css("background","#252525");
		$("#hn-logo img").css("opacity","1");
		$(this).css("background","none")
		$("#hn-nav a").css("color","#eee");
		$("#hn-right a").css("color", "#fff");
	});
});