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

// ページ読み込み後2秒後に実行
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

// missmisterMsg()を2秒後に実行
$(function()
{
	setTimeout("missmisterMsg()", 2000);
});