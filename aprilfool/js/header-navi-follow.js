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