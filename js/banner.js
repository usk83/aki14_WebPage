// バナーランダム並べ替え用
// Fisher–Yates shuffleアルゴリズム

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