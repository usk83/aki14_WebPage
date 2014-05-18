#!/usr/bin/perl --
# use CGI::Carp qw(fatalsToBrowser);

## 京
use Encode;
require './init.cgi';
&_GET;

my(@keys) = split(/ /,$_GET{'q'});

## int
$totime = time();

if((-f $config{'cache'}) && (((stat($config{'cache'}))[9] + 60 * $config{'expiration'})  > $totime)){
	## Load Cache
	@pages = &_LOAD($config{'cache'});
}
else{
	## Create Cache
	push @dirs,$config{'dir'};
	while($cnt < @dirs){
		$dir = $dirs[$cnt];
		opendir DH, $dir or die "$dir:$!";
		while (my $file = readdir DH) {
			next if $file =~ /^\.{1,2}$/;
			$currentpath = $dir . $file;
			if(-d $currentpath && (grep(/^${file}$/,@excluded_dirs_name)) == 0){
				push @dirs, "${currentpath}/";
			}
			elsif((split(/\./,$currentpath))[-1] =~ /htm/si){
				$html = join("",&_LOAD($currentpath));
				$html =~ s/\t//ig;
				$html =~ s/\r//ig;
				$html =~ s/\n//ig;
				my ($tilte,$snippet,$keywords,$contents,$thumbnail);
				if($html =~ /<title>(.*?)<\/title>/si){
					$title = $1;
					if($title =~ /$config{'title_regex'}/){
						($title,$surplus) = split(/ \| /, $title);
					}
				}
				if($html =~ /<meta.*?name=\"Description\".*?content=\"(.*?)\"/si){
					$snippet = $1;
				}
				if($html =~ /<meta.*?name=\"Keywords\".*?content=\"(.*?)\"/si){
					$keywords = $1;
				}
				if($html =~ /$config{'body_regex'}/){
					$contents = $1;
					$contents =~ s/<script.*?\/script>//g;
					$contents =~ s/<.*?>//g;
				}
				## Thumbnail
				$thumbnail_path = "${dir}images/thumb_${file}\.jpg";
				if(-f $thumbnail_path){
					$thumbnail = $thumbnail_path;
					$thumbnail =~ s/$config{'uri_replace_before'}/$config{'uri_replace_after'}/i;
				}

				@file_info = stat($currentpath);
				($sec,$min,$hour,$day,$mon,$year) = localtime($file_info[9]);
				$file_updatetime = sprintf("%04d-%02d-%02d %02d:%02d:%02d",$year+1900,$mon+1,$day,$hour,$min,$sec);
				$file_size = int($file_info[7] / 1024);
				$currentpath =~ s/$config{'uri_replace_before'}/$config{'uri_replace_after'}/i;
				@page = ($currentpath,$thumbnail,$title,$snippet,$keywords,$contents,$file_updatetime,$file_size);
				push @pages,join("\t",@page);
			}
		}
		closedir DH;
		$cnt++;
	}
	for($cnt=0;$cnt<@excluded_dirs;$cnt++){
		@pages = grep(!/^${excluded_dirs[$cnt]}/,@pages);
	}
	for($cnt=0;$cnt<@excluded_files;$cnt++){
		@pages = grep(!/${excluded_files[$cnt]}\t/,@pages);
	}
	@pages = sort { (split(/\t/,$a))[0] cmp (split(/\t/,$b))[0]} @pages;
	@pages = sort { (split(/\t/,$b))[1] cmp (split(/\t/,$a))[1]} @pages;
	$pages = join("\n",@pages);
	Encode::from_to($pages,$config{'charset'},'utf8');
	&_SAVE($config{'cache'},$pages);
}
for($cnt=0;$cnt<@keys;$cnt++){
	@pages = grep(/$keys[$cnt]/ig,@pages);
}

## build result
($sec,$min,$hour,$day,$mon,$year) = localtime(time);$mon++;$year += 1900;
$stmp = sprintf("%04d-%02d-%02d %02d:%02d:%02d",$year,$mon,$day,$hour,$min,$sec);
@searchlog = ($stmp,$_GET{'q'},$ENV{'REMOTE_ADDR'});
if(@pages > 0 && $_GET{'q'} ne $null){
	$count = @pages;
	$resultHTML = "<p class=\"search_result_stat\"><strong>$_GET{'q'}</strong> で検索した結果 ${count} 件のページがヒットしました。</p>\n";
	$paging_count = 0;
	$resultHTML .= "<div id=\"sitesearch_paging_0\">\n";
	for($cnt=0;$cnt<@pages;$cnt++){
		if($cnt % $config{'paging'} == 0 && $cnt != 0){
			$paging_count++;
			$resultHTML .= "</div>\n<div id=\"sitesearch_paging_${paging_count}\" class=\"sitesearch_hidden_result\">\n";
		}
		($path,$thumbnail,$title,$snippet,$keywords,$contents,$file_updatetime,$size) = split(/\t/,$pages[$cnt]);
		$resultHTML .= "<div class=\"search_result_section\">\n";
		$className = "search_result";
		if($thumbnail){
			$className = "search_result_pickup";
			$resultHTML .= "<div class=\"search_result_thumbnail\"><img src=\"${thumbnail}\" \/></div>\n";
		}
		$resultHTML .= "<dl class=\"${className}\">\n";
		$resultHTML .= "<dt><a href=\"${path}\">${title}</a></dt>\n";
		$resultHTML .= "<dd>${snippet}<span>${path} - ${size}KB</span></dd>\n";
		$resultHTML .= "</dl>\n";
		$resultHTML .= "</div>\n";
	}
	$resultHTML .= "</div>\n";
	if($paging_count > 0){
		$resultHTML .= "<div id=\"sitesearch_next_result_button\" onclick=\"sitesearch_next_result()\">もっと見る</div>\n";
	}
	$config{'title'} = "$_GET{'q'} というキーワードでの検索結果";
	&_ADDSAVE($config{'log.match'},join("\t",@searchlog));
}
elsif($_GET{'q'} eq $null) {
	Encode::from_to($config{'title'},$config{'charset'},'utf8');
	$resultHTML = "<p class=\"search_default\">キーワードを入力してください。</p>";
}
else {
	$config{'title'} = "$_GET{'q'} というキーワードでの検索結果";
	$resultHTML = "<p class=\"search_result_stat\"><strong>$_GET{'q'}</strong> というキーワードでは見つかりませんでした。</p>";
	&_ADDSAVE($config{'log.not.match'},join("\t",@searchlog));
}

## display
if($_GET{'ajax'}){
	print "Pragma: no-cache\n";
	print "Cache-Control: no-cache\n";
	print "Content-type: text/plain; charset=UTF-8\n\n";
	print $resultHTML;
}
else {
	$html = join("\n",&_LOAD($config{'template'}));
	$html =~ s/_%%search_keywrod%%_/$_GET{'q'}/ig;
	$html =~ s/_%%search_result%%_/$resultHTML/ig;
	$html =~ s/_%%search_title%%_/$config{'title'}/ig;
	print "Pragma: no-cache\n";
	print "Cache-Control: no-cache\n";
	print "Content-type: text/html; charset=UTF-8\n\n";
	print $html;
}
exit;
sub _GET {
	if ($ENV{'REQUEST_METHOD'} eq "POST") {
		read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
	}
	else {
		$buffer = $ENV{'QUERY_STRING'};
	}
	@pairs = split(/&/, $buffer);
	foreach $pair (@pairs) {
		($name, $value) = split(/=/, $pair);
		$name =~ tr/+/ /;
		$name =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
		$value =~ tr/+/ /;
		$value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
		$value =~ s/</&lt;/ig;
		$value =~ s/>/&gt;/ig;
		$value =~ s/\"//ig;
		$value =~ s/\'//ig;
		$value =~ s/\n//ig;
		$value =~ s/\r//ig;
		$value =~ s/　/ /ig;
		$_GET{$name} = $value;
	}
}
sub _ADDSAVE {
	my($path,$str) = @_;
	chmod 0777, "${path}";
	flock(FH, LOCK_EX);
		open(FH,">>${path}");
			print FH $str . "\n";
		close(FH);
	flock(FH, LOCK_NB);
	chmod 0600, "${path}";
}

sub _SAVE {
	my($path,$str) = @_;
	chmod 0777, "${path}";
	flock(FH, LOCK_EX);
		open(FH,">${path}");
			print FH $str;
		close(FH);
	flock(FH, LOCK_NB);
	chmod 0600, "${path}";
}
sub _LOAD {
	my($path) = @_;
	my(@loader) = ();
	flock(FH, LOCK_EX);
		open(FH,$path);
			@loader = <FH>;
		close(FH);
	flock(FH, LOCK_NB);
	$loader = join('',@loader);
	$loader =~ s/\r//ig;
	@loader = split(/\n/,$loader);
	return @loader;
}
