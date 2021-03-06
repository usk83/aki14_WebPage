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
			$("#header-navi").css({
				"left": "0",
				"top": "0"
			});
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
			"opacity": "1"
		});
	});
	$("#followblank a").mouseout(function()
	{
		$(this).css({
			"transition": "none",
			"-webkit-transition:": "none",
			"opacity": "0"
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

// linkinpage.js
// =====================================================================
// ページ内リンク用
// =====================================================================
$(function(){
	// #で始まるアンカーをクリックした場合に処理
	$("a[href^=#]").click(function() {
		if($(this).attr("href") != "#header")
		{
			// スクロールの速度
			var speed = 400; // ミリ秒
			// アンカーの値取得
			var href= $(this).attr("href");
			// 移動先を取得
			var target = $(href === "#" || href === "" ? 'html' : href);
			// 移動先を数値で取得
			var position = target.offset().top - 52;
			// スムーススクロール
			$('body,html').animate({scrollTop:position}, speed, 'swing');

			target.find("h1").animate(
			{
				'color': '#5574CA'
			},
			{
				'duration': 200
			})
			.animate(
			{
				'color': '#fff'
			},
			{
				'duration': 600
			});

			if(target.find("h1")[0] == undefined)
			{
				target.find("h2").animate(
				{
					'color': '#5574CA'
				},
				{
					'duration': 200
				})
				.animate(
				{
					'color': '#323'
				},
				{
					'duration': 600
				});
			}

			return false;
		}
	});
});

// pagetop.js
// =====================================================================
// ページトップ用
// =====================================================================
$(function()
{
	var topBtn = $('#pagetop');
	var clicked = false;
	topBtn.stop().animate({'bottom' : '-78px'}, 1000);
	var showFlag = false;
	if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200)
	{
		topBtn.children("a").css("cursor", "pointer");
		showFlag = true;
		topBtn.stop().animate({'bottom' : '0px'}, 300);
	}
	//スクロールが200に達したらボタン表示
	$(window).scroll(function ()
	{
		if (!clicked)
		{
			if ($(this).scrollTop() > 200)
			{
				if (showFlag === false)
				{
					topBtn.children("a").css("cursor", "pointer");
					showFlag = true;
					topBtn.stop().animate({'bottom' : '0px'}, 300);
				}
			}
			else
			{
				if (showFlag)
				{
					showFlag = false;
					topBtn.children("a").css("opacity", "0");
					topBtn.children("a").css("cursor", "default");
					topBtn.stop().animate({'bottom' : '-78px'}, 300);
				}
			}
		}
	});
	//スクロールしてトップ
	topBtn.click(function ()
	{
		if(showFlag)
		{
			clicked = true;
			topBtn.animate({'bottom' : '-20px'}, 300);
			$('body,html').delay(300).animate({scrollTop: 0}, 500);
			topBtn.animate({'bottom' : '3000px'}, 2000, function()
			{
				topBtn.css("bottom", "-200");
				topBtn.children("a").css("opacity", "0");
				topBtn.children("a").css("cursor", "default");
				topBtn.animate({'bottom' : '-78px'}, 300);
				showFlag = false;
				clicked = false;
				if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200)
				{
					topBtn.children("a").css("cursor", "pointer");
					showFlag = true;
					topBtn.stop().animate({'bottom' : '0px'}, 300);
				}
			});
		}
		return false;
	});
	topBtn.children("a").hover(
		function()
		{
			if(showFlag)
			{
				$(this).stop().animate({
					'opacity' : '1'
				}, 200);
			}
		},
		function()
		{
			if(showFlag)
			{
				$(this).stop().animate({
					'opacity' : '0'
				}, 400);
			}
		}
	);
});

// addNew.js
// =====================================================================
// 更新情報にNEW!!!追加用
// =====================================================================
(function addNew()
{
	$(".newInfo").after("<div id='addedNew'>←<div><div>N</div><div>E</div><div>W</div><div>!</div><div>!</div><div>!</div></div></div>");
})();

function newAni(on, revease, count)
{
	for(var i = 0; i < on.length; i++)
	{
		if(on[i])
		{
			if(!revease[i])
			{
				count[i]++;
				$("#addedNew div div").eq(i).css("top", "-=1");
				if(count[i] == 7)
				{
					on[i+1] = true;
				}
				else if(count[i] == 14)
				{
					revease[i] = true;
				}
			}
			else if(revease[i])
			{
				count[i]++;
				$("#addedNew div div").eq(i).css("top", "+=1");
				if(count[i] == 28)
				{
					on[i] = false;
					if(i == 5)
					{
						setTimeout('newAnistart()', 1000);
						return;
					}
				}
			}

		}
	}

	setTimeout(function(){newAni(on, revease, count);}, 15);
}

function newAnistart()
{
	on = new Array(6);
	revease = new Array(6);
	count = new Array(6);
	for(var i = 0; i < on.length; i++)
	{
		if(i == 0)
		{
			on[i] = true;
		}
		else
		{
			on[i] = false;
			revease[i] = false;
		}
		count[i] = 0;
	}
	newAni(on, revease, count);
}

setTimeout("newAnistart()", 500);

// banner.js
// =====================================================================
// バナーランダム並べ替え用
// Fisher–Yates shuffleアルゴリズム
// =====================================================================
$(function() {
	Array.prototype.shuffle = function() {
		var i, j, temp;
		i = this.length;
		while(i) {
			j = Math.floor(Math.random() * i);
			i--;
			temp = this[i];
			this[i] = this[j];
			this[j] = temp;
		}
		return this;
	};

	var randomContent = [];
	$('#mc-sponsors uL li').each(function() {
		randomContent.push($(this).html());
	});
	randomContent.shuffle();
	$('#mc-sponsors uL li').empty();
	i = 0;
	$('#mc-sponsors uL li').each(function() {
		$(this).append(randomContent[i]);
		i++;
	});
});