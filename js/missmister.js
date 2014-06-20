function showMsg(id)
{
	$(id).animate
	(
		{opacity:"1"},
		{
			duration: 1000,
			easing: "linear",
			complete: function(){}
		}
	);
	$(id).lettering().animateLetters
	(
		{opacity:0},{opacity:1},
		{
			randomOrder: false,
			time: 500,
			reset: false
		}
	);
	setTimeout(function(){hideMsg(id);},2000);
}
function hideMsg(id)
{
	$(id).lettering().animateLetters
	(
		{opacity:1},{opacity:0},
		{
			randomOrder: false,
			time: 500,
			reset: false
		}
	);
	$(id).animate
	(
		{opacity:"0"},
		{
			duration: 1500,
			easing: "linear",
			complete: function(){}
		}
	);

	setTimeout(function(){deleteMsg(id);},1500);
}
function deleteMsg(id)
{
	id = id.slice(1);
	var node = document.getElementById(id);
	node.parentNode.removeChild(node);
}

// ページ読み込み後1.5秒後に実行
function missmisterMsg()
{
	var id;
	if(window.location.href.split('/').pop() == "miss_contest.html")
	{
		id = "#missMsg";
	}
	else
	{
		id = "#misterMsg";
	}

	showMsg(id);
}

// missmisterMsg()を1.5秒後に実行
$(function()
{
	setTimeout("missmisterMsg()", 1500);
});

// 写真クリック時にページコンテンツ変更
function fadeoutContest(ele)
{
	var id = ele.id;
	var target = "missmister/" + id + ".html" + " #missmisterContents";

	$("#mc-main").fadeOut(500, function(){changeContents(target)});
}

function changeContents(target)
{
	$("#mc-main").load(target);
	setTimeout(function(){fadeinContents();}, 200);
}

function fadeinContents()
{
	$("#mc-main").fadeIn(500);
	bxSlider();
}

// slideShow
function bxSlider()
{
	$('.bxslider').bxSlider({
		auto: true,
		speed: 2000,
		buildPager: function(slideIndex)
		{
			switch(slideIndex){
				case 0:
				return '<img src="img/event/missmister/missNo1/pic1-thumbnail.jpg">';
				case 1:
				return '<img src="img/event/missmister/missNo1/pic2-thumbnail.jpg">';
				case 2:
				return '<img src="img/event/missmister/missNo1/pic3-thumbnail.jpg">';
			}
		}
	});
}