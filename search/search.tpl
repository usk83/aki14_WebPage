<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="Content-Script-Type" content="text/javascript" />
		<meta http-equiv="Content-Style-Type" content="text/css" />
		<title>_%%search_title%%_</title>
		<link rel="stylesheet" href="sitesearch.css" type="text/css" />
		<script type="text/javascript" src="sitesearch.js"></script>
	</head>
	<body>
		<form class="sitesearch" method="get" action="index.cgi">
			<input type="text" name="q" value="_%%search_keywrod%%_" /> <input type="submit" value="サイト内検索" />
		</form>
		<div id="search_result">
			_%%search_result%%_
		</div>
		<form class="sitesearch" method="get" action="index.cgi">
			<input type="text" name="q" value="_%%search_keywrod%%_" /> <input type="submit" value="サイト内検索" />
		</form>
	</body>
</html>