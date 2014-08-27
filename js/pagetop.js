// ページトップ用
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