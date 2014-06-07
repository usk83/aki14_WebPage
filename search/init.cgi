## Site Search 2.0.0
## SYNCK GRAPHICA
## www.synck.com
## last update :: 2011-03-18

## 検索対象のディレクトリを相対パスで指定
$config{'dir'} = '../';

## サイト内検索で反映しないファイル名
@excluded_files = ('mailform.php','progress.html','ie-css3.htc','comingsoon.html');

## 参照したくないディレクトリの"パス"を書いてね。
@excluded_dirs = ('/_2012/','/_2013/','/_2014backup/','/2014/','/aprilfool/','/ra/','/ra_core/','/search/','/parts/', '/downloads/');

## 参照したくないディレクトリ名
@excluded_dirs_name = ('img','images','js','admin','mobile','css');

## キャッシュファイル
$config{'cache'} = 'search.cache.cgi';

## インデックスキャッシュの有効期限 (単位：分)
$config{'expiration'} = 180;

## テンプレートファイルのパス
$config{'template'} = 'search.tpl';

## HTMLの文字コード / 混在はできません
$config{'charset'} = 'utf-8';

## 検索クエリのログ / ヒットしたキーワード
$config{'log.match'} = 'search.log.match.cgi';

## 検索クエリのログ / ヒットしなかったキーワード
$config{'log.not.match'} = 'search.log.not.match.cgi';

## タイトル抜き出し(正規表現)
$config{'title_regex'} = qr/ | /i;

## コンテンツの抜き出し(正規表現)
$config{'body_regex'} = qr/<body>(.*?)<\/body>/i;
## 初期タイトル
$config{'title'} = 'サイト内検索';

## URL置き換えが必要な場合は置き換えの前後
$config{'uri_replace_before'} = '../';
$config{'uri_replace_after'} = '/';


## version 2.1.0 later ##

## ページング
$config{'paging'} = 10;