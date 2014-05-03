// スムーズスクロール部分の記述
$(function(){
	// #で始まるアンカーをクリックした場合に処理
	$('a[href^=#]').click(function() {
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

		return false;
	});
});