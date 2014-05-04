// ページトップ用
$(function()
{
	var topBtn = $('#pagetop');
	topBtn.stop().animate({'bottom' : '-60px'}, 200);
	var showFlag = false;
	//スクロールが200に達したらボタン表示
	$(window).scroll(function ()
	{
		if ($(this).scrollTop() > 200)
		{
			if (showFlag === false)
			{
				showFlag = true;
				topBtn.stop().animate({'bottom' : '20px'}, 200);
			}
		}
		else
		{
			if (showFlag)
			{
				showFlag = false;
				topBtn.children("a").css("background", "#666");
				topBtn.stop().animate({'bottom' : '-60px'}, 200);
			}
		}
	});
	//スクロールしてトップ
	topBtn.click(function ()
	{
		if(showFlag)
		{
			$('body,html').animate({scrollTop: 0}, 500);
		}
		return false;
	});
	topBtn.children("a").hover(
		function()
		{
			if(showFlag)
			{
				$(this).css("background", "#999");
			}
		},
		function()
		{
			if(showFlag)
			{
				$(this).css("background", "#666");
			}
		}
	);
});