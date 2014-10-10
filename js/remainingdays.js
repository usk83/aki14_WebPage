// 秋祭開催までの残り時間表示用スクリプト
(function () {
	dateObj = new Date();
	var remainingDays = 0;
	if (dateObj.getMonth()+1 === 9) {
		remainingDays += 30;
	}
	remainingDays += 11 - dateObj.getDate();
	if (remainingDays > 0)
	{
		document.getElementById("hf-contents").innerHTML = "<p>＼ 秋祭開催まで、あと<span>" + remainingDays + "</span>日 ／</p>";
	}
	else if (remainingDays < -1)
	{
		document.getElementById("hf-contents").innerHTML = "<p>本年度の秋祭は無事終了しました</p>";
	}
	else
	{
		document.getElementById("hf-contents").innerHTML = "<p>＼ <span class='nowopen'>祝! 秋祭開催中!!!</span> ／</p>";
	}
})();