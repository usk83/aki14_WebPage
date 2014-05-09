// ページトップ用
$(function()
{
	var topBtn = $('#pagetop');
	topBtn.stop().animate({'bottom' : '-60px'}, 200);
	var showFlag = false;
	if(document.body.scrollTop > 200)
	{
		topBtn.children("a").css("cursor", "pointer");
		showFlag = true;
		topBtn.stop().animate({'bottom' : '20px'}, 200);

	}
	//スクロールが200に達したらボタン表示
	$(window).scroll(function ()
	{
		if ($(this).scrollTop() > 200)
		{
			if (showFlag === false)
			{
				topBtn.children("a").css("cursor", "pointer");
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
				topBtn.children("a").css("opacity", "0.6");
				topBtn.children("a").css("cursor", "default");
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
				$(this).stop().animate({
					'background' : '#999',
					'opacity' : '1'
				}, 300);
			}
		},
		function()
		{
			if(showFlag)
			{
				$(this).stop().animate({
					'background' : '#666',
					'opacity' : '0.6'
				}, 300);
			}
		}
	);
});