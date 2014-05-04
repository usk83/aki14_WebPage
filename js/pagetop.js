// ページトップ用
$(function()
{
	var topBtn = $('#pagetop');
	topBtn.stop().animate({'bottom' : '-60px'}, 200);
	var showFlag = false;
	//スクロールが100に達したらボタン表示
	$(window).scroll(function ()
	{
		if ($(this).scrollTop() > 100)
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
				topBtn.stop().animate({'bottom' : '-60px'}, 200);
			}
		}
	});
	//スクロールしてトップ
	topBtn.click(function ()
	{
		$('body,html').animate({scrollTop: 0}, 500);
		return false;
	});
});