// 秋祭開催までの残り時間表示用スクリプト
// 9月から前日までの対応のみ
(function () {
	dateObj = new Date();
	var remainingDays = 0;
	if (dateObj.getMonth()+1 === 9) {
		remainingDays += 30;
	}
	remainingDays += 11 - dateObj.getDate();

	document.getElementById("hf-contents").innerHTML = "<p>＼ 秋祭開催まで、あと<span>" + remainingDays + "</span>日 ／</p>";
})();