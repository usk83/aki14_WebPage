<?php header("Content-Type:text/html;charset=utf-8"); ?>
<?php //error_reporting(E_ALL | E_STRICT);
#############################################################
#  PHPメールプログラム  フリー版
#  改造や改変は自己責任で行ってください。
#
#  今のところ特に問題点はありませんが、不具合等がありましたら下記までご連絡ください。
#  MailAddress: info@php-factory.net
#  name: K.Numata
#  HP: http://www.php-factory.net/
#
#  重要！！サイトでチェックボックスを使用する場合のみですが。。。
#  チェックボックスを使用する場合はinputタグに記述するname属性の値を必ず配列の形にしてください。
#  例  name="当サイトをしったきっかけ[]"  として下さい。
#  nameの値の最後に[と]を付ける。じゃないと複数の値を取得できません！
#
#############################################################

// フォームページ内の「名前」と「メール」項目のname属性の値は特に理由がなければ以下が最適です。
// お名前 <input size="30" type="text" name="名前" />  メールアドレス <input size="30" type="text" name="Email" />
// メールアドレスのname属性の値が「Email」ではない場合、または変更したい場合は、以下必須設定箇所の「$Email」の値も変更下さい。


/*
★以下設定時の注意点
・値（=の後）は数字以外の文字列はすべて（一部を除く）ダブルクオーテーション（"）、またはシングルクォーテーション（'）で囲んでいます。
・これをを外したり削除したりしないでください。後ろのセミコロン「;」も削除しないください。プログラムが動作しなくなります。
・またドルマーク（$）が付いた左側の文字列は絶対に変更しないでください。数字の1または0で設定しているものは必ず半角数字でお願いします。
*/


//------------------  設定  --------------------
//サイトのトップページのURL
$site_top = "http://akimatsuri.sfc.keio.ac.jp/";

// 管理者メールアドレス ※メールを受け取るメールアドレス(複数指定する場合は「,」で区切る)
$to = "aki14-contact@googlegroups.com";


//フォームのメールアドレス入力箇所のname属性の値（メール形式チェックに使用。※2重アドレスチェック導入時にも使用）
$Email = "Email";


/*-------------------------------------------------
スパム対策設定
※このファイルとフォームページが同一ドメイン内にある必要あり（XSS対策）
-------------------------------------------------*/
//スパム防止のためのリファラチェック（フォームページが同一ドメインであるかどうかのチェック）(する=1, しない=0)
$Referer_check = 1;

//リファラチェックを「する」場合のドメイン
$Referer_check_domain = "akimatsuri.sfc.keio.ac.jp";

// このPHPファイルの名前
$file_name ="mailform.php";

// 管理者宛のメールで差出人を送信者のメールアドレスにする(する=1, しない=0)
// する場合は、メール入力欄のname属性の値を「$Email」で指定した値にする。
// メーラーなどで返信する場合に便利なので「する」推奨。
$userMail = 1;

// Bccで送るメールアドレス(複数指定する場合は「,」で区切る)
$BccMail = "";

// 管理者宛に送信されるメールのタイトル（件名）
$subject = "秋祭公式HPより問い合わせ";

// 送信確認画面の表示(する=1, しない=0)
$confirmDsp = 1;

// 送信完了後に自動的に指定のページ(サンクスページなど)に移動する(する=1, しない=0)
// CV率を解析したい場合などはサンクスページを別途用意し、URLをこの下の項目で指定してください。
// 0にすると、デフォルトの送信完了画面が表示されます。
$jumpPage = 0;

// 送信完了後に表示するページURL（上記で1を設定した場合のみ）※httpから始まるURLで指定ください。
$thanksPage = "http://";

// 必須入力項目を設定する(する=1, しない=0)
$esse = 1;

/* 必須入力項目(入力フォームで指定したname属性の値を指定。（上記で1を設定した場合のみ）
値はシングルクォーテーションで囲む。複数指定する場合は「,」で区切る)*/
$eles = array('お名前','Email','お問い合わせ内容');


//----------------------------------------------------------------------
//  自動返信メール設定
//----------------------------------------------------------------------

// 差出人に送信内容確認メール（自動返信メール）を送る(送る=1, 送らない=0)
// 送る場合は、フォーム側のメール入力欄のname属性の値が上記「$Email」で指定した値と同じである必要があります
$remail = 1;

// 自動返信メールの送信者欄に表示される名前
// ※自動返信メールの送信者名が文字化けする場合ここは空に
$refrom_name = "慶應義塾大学秋祭実行委員会";

// 差出人に送信確認メールを送る場合のメールのタイトル（上記で1を設定した場合のみ）
$re_subject = "お問い合わせ承りました";

//フォーム側の「名前」箇所のname属性の値  ※自動返信メールの「○○様」の表示で使用
//指定しない、または存在しない場合は、○○様と表示されない。あえて無効にしてもOK
$dsp_name = 'お名前';

//自動返信メールの文言す
$remail_text = <<< TEXT

お問い合わせありがとうございました。
早急にご返信致しますので今しばらくお待ちください。

送信内容は以下になります。

────────────────────────────────────────

TEXT;


//自動返信メールに署名を表示(する=1, しない=0)※管理者宛にも表示される。
$mailFooterDsp = 1;

//上記で「1」を選択時に表示する署名（FOOTER～FOOTER;）
$mailSignature = <<< FOOTER

──────────────────────
慶應義塾大学 秋祭実行委員会

E-mail:aki14-contact@googlegroups.com
URL: http://akimatsuri.sfc.keio.ac.jp/
──────────────────────

FOOTER;
//----------------------------------------------------------------------
//  自動返信メール設定END
//----------------------------------------------------------------------


//メールアドレスの形式チェックを行うかどうか。(する=1, しない=0)
//※理由がなければ変更不要。メール入力欄のname属性の値が上記「$Email」で指定した値であること。
$mail_check = 1;

//------------------  設定END  --------------------





//----------------------------------------------------------------------
//  関数定義(START)
//----------------------------------------------------------------------
function checkMail($str){
	$mailaddress_array = explode('@',$str);
	if(preg_match("/^[\.!#%&\-_0-9a-zA-Z\?\/\+]+\@[!#%&\-_0-9a-z]+(\.[!#%&\-_0-9a-z]+)+$/", "$str") && count($mailaddress_array) ==2){
		return true;
	}
	else{
		return false;
	}
}
function h($string) {
	return htmlspecialchars($string, ENT_QUOTES,'utf-8');
}
function sanitize($arr){
	if(is_array($arr)){
		return array_map('sanitize',$arr);
	}
	return str_replace("\0","",$arr);
}
if(isset($_GET)) $_GET = sanitize($_GET);//NULLバイト除去//
if(isset($_POST)) $_POST = sanitize($_POST);//NULLバイト除去//
if(isset($_COOKIE)) $_COOKIE = sanitize($_COOKIE);//NULLバイト除去//

//----------------------------------------------------------------------
//  関数定義(END)
//----------------------------------------------------------------------
$copyrights = '<a style="display:block;text-align:center;margin:15px 0;font-size:11px;color:#aaa;text-decoration:none" href="http://www.php-factory.net/" target="_blank">- PHP工房 -</a>';

if($Referer_check == 1 && !empty($Referer_check_domain)){
	if(strpos($_SERVER['HTTP_REFERER'],$Referer_check_domain) === false){
		echo '<p align="center">リファラチェックエラー。フォームページのドメインとこのファイルのドメインが一致しません</p>';exit();
	}
}
$sendmail = 0;
$empty_flag = 0;
$post_mail = '';
$errm ='';
$header ='';
foreach($_POST as $key=>$val) {
	if($val == "confirm_submit") $sendmail = 1;
	if($key == $Email && $mail_check == 1){
		if(!checkMail($val)){
					$errm .= "<p class=\"error_messe\">「".$key."」の形式が正しくありません。</p>\n";
					$empty_flag = 1;
		}else{
			$post_mail = h($val);
		}
	}
}

// 必須設定項目のチェック
if($esse == 1) {
	$length = count($eles) - 1;
	foreach($_POST as $key=>$val) {

		if($val == "confirm_submit") ;
		else {
			for($i=0; $i<=$length; $i++) {
				if($key == $eles[$i] && empty($val)) {
					$errm .= "<p class=\"error_messe\">「".$key."」は必須入力項目です。</p>\n";
					$empty_flag = 1;
				}
			}
		}
	}
	foreach($_POST as $key=>$val) {

		for($i=0; $i<=$length; $i++) {
			if($key == $eles[$i]) {
				$eles[$i] = "confirm_ok";
			}
		}
	}
	for($i=0; $i<=$length; $i++) {
		if($eles[$i] != "confirm_ok") {
			$errm .= "<p class=\"error_messe\">「".$eles[$i]."」が未選択です。</p>\n";
			$eles[$i] = "confirm_ok";
			$empty_flag = 1;
		}
	}
}
// 管理者宛に届くメールの編集
$body=$subject."がありました\n\n";
$body.="＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
foreach($_POST as $key=>$val) {

	$out = '';
	if(is_array($val)){
	foreach($val as $item){
	$out .= $item . ',';
	}
	if(substr($out,strlen($out) - 1,1) == ',') {
	$out = substr($out, 0 ,strlen($out) - 1);
	}
 }else { $out = $val;} //チェックボックス（配列）追記ここまで
	if(get_magic_quotes_gpc()) { $out = stripslashes($out); }
	if($out == "confirm_submit" or $key == "httpReferer") ;
	else $body.="【 ".$key." 】 ".$out."\n";
}
$body.="\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n";
$body.="送信された日時：".date( "Y/m/d (D) H:i:s", time() )."\n";
$body.="送信者のIPアドレス：".$_SERVER["REMOTE_ADDR"]."\n";
$body.="送信者のホスト名：".getHostByAddr(getenv('REMOTE_ADDR'))."\n";
$body.="問い合わせのページURL：".@$_POST['httpReferer']."\n";
if($mailFooterDsp == 1) $body.= $mailSignature;
//--- 管理者宛に届くメールの編集終了 --->


if($remail == 1) {
//--- 差出人への自動返信メールの編集
if(isset($_POST[$dsp_name])){ $rebody = h($_POST[$dsp_name]). " 様\n";}
$rebody.= $remail_text;
$rebody.="\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
foreach($_POST as $key=>$val) {

	$out = '';
	if(is_array($val)){
	foreach($val as $item){
	$out .= $item . ',';
	}
	if(substr($out,strlen($out) - 1,1) == ',') {
	$out = substr($out, 0 ,strlen($out) - 1);
	}
 }else { $out = $val; }//チェックボックス（配列）追記ここまで
	if(get_magic_quotes_gpc()) { $out = stripslashes($out); }
	if($out == "confirm_submit" or $key == "httpReferer") ;
	else $rebody.="【 ".$key." 】 ".$out."\n";
}
$rebody.="\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
$rebody.="送信日時：".date( "Y/m/d (D) H:i:s", time() )."\n";
if($mailFooterDsp == 1) $rebody.= $mailSignature;
$reto = $post_mail;
$rebody=mb_convert_encoding($rebody,"JIS","utf-8");
$re_subject="=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($re_subject,"JIS","utf-8"))."?=";

	if(!empty($refrom_name)){

		$default_internal_encode = mb_internal_encoding();
		if($default_internal_encode != 'utf-8'){
			mb_internal_encoding('utf-8');
		}
		$reheader="From: ".mb_encode_mimeheader($refrom_name)." <".$to.">\nReply-To: ".$to."\nContent-Type: text/plain;charset=iso-2022-jp\nX-Mailer: PHP/".phpversion();

	}else{
		$reheader="From: $to\nReply-To: ".$to."\nContent-Type: text/plain;charset=iso-2022-jp\nX-Mailer: PHP/".phpversion();
	}
}
$body=mb_convert_encoding($body,"JIS","utf-8");
$subject="=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($subject,"JIS","utf-8"))."?=";

if($userMail == 1 && !empty($post_mail)) {
	$from = $post_mail;
	$header="From: $from\n";
		if($BccMail != '') {
		$header.="Bcc: $BccMail\n";
		}
	$header.="Reply-To: ".$from."\n";
}else {
		if($BccMail != '') {
		$header="Bcc: $BccMail\n";
		}
	$header.="Reply-To: ".$to."\n";
}
	$header.="Content-Type:text/plain;charset=iso-2022-jp\nX-Mailer: PHP/".phpversion();


if(($confirmDsp == 0 || $sendmail == 1) && $empty_flag != 1){
	mail($to,$subject,$body,$header);
	if($remail == 1) { mail($reto,$re_subject,$rebody,$reheader); }
}
else if($confirmDsp == 1){


/*  ▼▼▼ 送信確認画面のレイアウト※編集可 ▼▼▼  */
?>
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<title>お問い合わせ内容確認</title>
		<link rel="stylesheet" href="css/html5reset-1.6.1.css">
		<link rel="stylesheet" href="css/style.css">
	</head>
<body id="mailform">
<header>
	<div id="toppic">
		<img src="img/mainpic/toppicture_contact.jpg" alt="お問い合わせ">
	</div>
</header>
	<!-- ▼************ 送信内容表示部 ************▼ -->
<section id="container">
<div class="contentsbox">
	<h1>お問い合わせ内容確認</h1>
	<?php if($empty_flag == 1){ ?>
	<div id="inputCheck">
		<p>入力にエラーがあります。下記をご確認の上「修正」ボタンより前のページに戻って修正をお願いします。</p>
		<?php echo $errm; ?>
		<input type="button" value=" 修正 " onClick="history.back()">
	</div>
	<?php
			}else{
	?>
	<div id="inputCheck">
		<p>以下の内容で間違いがなければ、「送信する」ボタンを押してください。</p>
		<form action="<?php echo $file_name; ?>" method="POST">
			<table>
			<?php
			foreach($_POST as $key=>$val) {
				$out = '';
				if(is_array($val)){
				foreach($val as $item){
				$out .= $item . ',';
				}
				if(substr($out,strlen($out) - 1,1) == ',') {
				$out = substr($out, 0 ,strlen($out) - 1);
				}
			 }
				else { $out = $val; }//チェックボックス（配列）追記ここまで
				if(get_magic_quotes_gpc()) { $out = stripslashes($out); }
				$out = h($out);
				$out=nl2br($out);//※追記 改行コードを<br>タグに変換
				$key = h($key);
				print("<tr><td class=\"l_Cel\">".$key."</td><td>".$out);
				$out=str_replace("<br />","",$out);//※追記 メール送信時には<br>タグを削除
			?>
			<input type="hidden" name="<?php echo $key; ?>" value="<?php echo $out; ?>">
			<?php
				print("</td></tr>\n");
			}
			?>
			</table>
			<div align="center"><input type="hidden" name="mail_set" value="confirm_submit">
			<input type="hidden" name="httpReferer" value="<?php echo $_SERVER['HTTP_REFERER'] ;?>">
			<input type="submit" value="送信する">
			<input type="button" value="修正" onClick="history.back()">
			</div>
		</form>
		<?php } ?>
	</div>
</section>
	<!-- ▲ *********** 送信内容確認部 ************ ▲-->

<!-- ▼ Footerその他コンテンツなど※編集可 ▼ -->
</body>
</html>




<?php
/* ▲▲▲ 送信確認画面のレイアウト※編集可 ▲▲▲ */
}



if(($jumpPage == 0 && $sendmail == 1) || ($jumpPage == 0 && ($confirmDsp == 0 && $sendmail == 0))) {



/* ▼▼▼送信完了画面のレイアウト※編集可 ※送信完了後に指定のページに移動しない場合のみ表示▼▼▼  */
?>
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<title>お問い合わせ完了</title>
		<link rel="stylesheet" href="css/html5reset-1.6.1.css">
		<link rel="stylesheet" href="css/style.css">
		<meta http-equiv="refresh" content="5; url=http://akimatsuri.sfc.keio.ac.jp/">
	</head>
<body id="mailform">
<header>
	<div id="toppic">
		<img src="img/mainpic/toppicture_contact.jpg" alt="お問い合わせ">
	</div>
</header>


<section id="container">
<div class="contentsbox">
	<h1>お問い合わせ完了</h1>
	<?php if($empty_flag == 1){ ?>
		<div id="inputCheck">
			<p>入力にエラーがあります。下記をご確認の上「修正」ボタンより前のページに戻って修正をお願いします。</p>
			<?php echo $errm; ?>
			<input type="button" value=" 修正 " onClick="history.back()">
		</div>
	<?php
		}else{
	?>
	<p>
		ご送信ありがとうございます。お問い合わせを承りました。<br>
		ご入力されたメールアドレスに確認メールを送信しましたので、ご確認ください。
	</p>
	<p id="refresh5sec">5秒後にトップページへ移動します。移動しない場合は<a href="http://akimatsuri.sfc.keio.ac.jp/">こちら</a></p>
</div>
</section>

</body>
</html>
<?php
/* ▲▲▲送信完了画面のレイアウト※編集可 ※送信完了後に指定のページに移動しない場合のみ表示▲▲▲  */
	}
}


//完了時、指定のページに移動する設定の場合、指定ページヘリダイレクト
else if(($jumpPage == 1 && $sendmail == 1) || $confirmDsp == 0) {
	 if($empty_flag == 1){ ?>
<div align="center"><h3>入力にエラーがあります。下記をご確認の上「戻る」ボタンにて修正をお願い致します。</h3><?php echo $errm; ?><br><br><input type="button" value=" 前画面に戻る " onClick="history.back()"></div>
<?php }else{ header("Location: ".$thanksPage); }
} ?>
