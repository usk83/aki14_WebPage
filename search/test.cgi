#!/usr/bin/perl -w

#�� ���̍s�̓T�[�o�̊��ɍ��킹�ď��������ĉ������B
#Internal Server Error ���o�Ă��܂��ꍇ�A���L�̋L�ڂ������ĉ������B

#!/usr/local/bin/perl -w
#!C:/Perl/bin/perl.exe -w

#######################################################################
=pod
�����g����CGI Perl���@�`�F�b�N&������CGI Ver. 1.0
$RCSfile: test.cgi,v $
$Revision: 1.13 $

Copyright(c) web-ware.org All rights reserved.
http://sugutsukaeru.jp/

����CGI�͖����ł��g�����������܂��B
���쌠�͍�҂��ۗL���Ă��܂��B
�����g�ł����p�ɂȂ�ꍇ���ς͎��R�ł����A�Ĕz�z����щ��ϕi�̍Ĕz�z��
�֎~�ł��B
=cut
#######################################################################

#use strict;
#use warnings;

binmode STDOUT;
print "Content-type: text/html;charset=shift_jis\r\n";

my (
%val,
@modules,
@modules_check,
@jclibs,
@smcommands,
@in,
$temp,
);

#�f�t�H���g�`�F�b�N�̐ݒ�
@modules = qw( 
CGI
File::Basename
File::Path
Jcode
); 

@jclibs = qw( 
jcode.pl
/usr/lib/jcode.pl
/lib/jcode.pl
);

@smcommands = qw(
/usr/sbin/sendmail
/usr/bin/sendmail
/usr/lib/sendmail
/sbin/sendmail
/bin/sendmail
/lib/sendmail
);

#���M�l
if ($ENV{'REQUEST_METHOD'} eq "POST") {
	read(STDIN, $temp, $ENV{'CONTENT_LENGTH'});
}
@in = split(/[&;]/, $temp || $ENV{'QUERY_STRING'});

$val{perlversion} = $] >= 5.006?
	sprintf(
		'%s (%vd)',
		$],
		$^V,
	)
		:
	sprintf(
		'%s',
		$],
	)
;

$val{os} = $^O;
($val{myname}) = $0 =~ /([^\/\\:]+)$/;

$val{currentdir} = `pwd`;
unless ($val{currentdir}){
	($val{currentdir}) = ($ENV{'SCRIPT_FILENAME'}||$0) =~ /(.*?)[^\/\\:]+$/;
}

$val{perlpath} = $^X;

foreach (qw(currentdir perlpath)){
	$val{$_} =~ s@\\@/@g;
}

$val{process_user} = sprintf(
	'%s (%s)',
	$> || '',
	eval{ scalar getpwuid($>) },
);

$val{if_owned_by_user} = -o $0;

if (scalar @in){
	foreach my $i (0 .. $#in) {
		# Convert plus to space
		$in[$i] =~ s/\+/ /g;

		# Split into key and value.  
		my ($key, $val) = split(/=/,$in[$i],2); # splits on the first =.

		# Convert %XX from hex numbers to alphanumeric
		$key =~ s/%([A-Fa-f0-9]{2})/pack("c",hex($1))/ge;
		$val =~ s/%([A-Fa-f0-9]{2})/pack("c",hex($1))/ge;

		if ($key eq 'targetfile' and $val ne ''){ #�`�F�b�N�Ώۃt�@�C���̎w��
			if ($val =~ /^[\.\/]/ or $val =~ /\//){
				$val{checkresult_error} = sprintf(
					'�����f�B���N�g�����̃t�@�C�����������w�肵�ĉ������B�i%s�j',
					$val,
				);
			} elsif ($val =~ /^[\w~-][\w~\.-]*$/){
				$val{targetfile} = $val;
			} else {
				$val{checkresult_error} = sprintf(
					'����ȃt�@�C�����͎g���܂���B�i%s�j',
					$val,
				);
			}
			if ($val{targetfile}){
				if (-f $val{targetfile}){
					open (COMMAND, "$val{perlpath} -c $val{targetfile} 2>\&1 |")
						and $val{checkresult_checked} = join('', (<COMMAND>))
						or $val{checkresult_error} = sprintf(
							'���@�`�F�b�N�Ɏ��s���܂����B�i%s: %s�j',
							$val{targetfile},
							$!
						);
					close (COMMAND);
				} else {
					$val{checkresult_error} = sprintf(
						'�w�肳�ꂽ�t�@�C���̓T�[�o��ɂ���܂���B�i%s�j',
						$val{targetfile},
					);
				}
			}
		} elsif ($key eq 'modulelist'){ #�`�F�b�N�Ώۃ��W���[���̎w��
			my $count = 0;
			push (@modules, 
				map {s/-/::/g; $_}
				grep {/^[\w:-]+$/ and ++$count <= 10}
				split(/\r?\n/, $val)
			);
		}
	}
}

#���@�`�F�b�N�̌��ʂ��p�[�X
if ($val{checkresult_checked}){
	$val{stdstr} = sprintf(
		'%s syntax OK',
		$val{targetfile},
	);
	$val{checkresult_checked} =~ m/^\s*$val{stdstr}\s*$/
		and $val{checkresult_error} = sprintf(
			'%s: �G���[�͂���܂���B',
			$val{targetfile},
			)
		or $val{checkresult_error}  = sprintf(
			'%s: �G���[������܂��B',
			$val{targetfile},
			)
		;
}
	
$val{checkresult_checked} ||= ($val{checkresult_error} || '�i���@�`�F�b�N�̌��ʂ͂����ɕ\������܂��j');

#���W���[���̃`�F�b�N
for (my $i=0; $i<=$#modules; $i++){
	eval "use $modules[$i];";
	$modules_check[$i]->{name} = $modules[$i];
	$modules_check[$i]->{version} = eval "\$$modules[$i]::VERSION" || undef;
	if ($modules_check[$i]->{version}) {
		$modules_check[$i]->{version_str} = sprintf(
			'���p�\�iVer. %s�j',
			$modules_check[$i]->{version},
		);
		if ($modules_check[$i]->{name} eq 'Jcode'){
			$val{if_jcode_pm_avail} = $modules_check[$i]->{name};
		}
	} else {
		$modules_check[$i]->{version_str} = '���p�ł��܂���';
	}
}

#���C�u�����̃`�F�b�N
for (my $i=0; $i<=$#jclibs; $i++){
	eval "require '$jclibs[$i]';"
		and $val{if_jcode_pl_avail} = $jclibs[$i]
		and last;
}

#�R�}���h�̃`�F�b�N
for (my $i=0; $i<=$#smcommands; $i++){
	(-x $smcommands[$i])
		and $val{if_sendmail_avail} = $smcommands[$i]
		and last;
}

#�\������
if ($val{if_jcode_pl_avail}){
	$val{jcodeinfo} = sprintf(
			q{jcode.pl ���g���܂��B�irequire '%s';�j},
			$val{if_jcode_pl_avail},
		);
}
if ($val{if_jcode_pm_avail}){
	$val{jcodeinfo} .= "\n" if $val{jcodeinfo};
	$val{jcodeinfo} .= sprintf(
			q{%s ���W���[�����g���܂��B�iuse %s;�j},
			$val{if_jcode_pm_avail},
			$val{if_jcode_pm_avail},
		);
}
if ($val{if_sendmail_avail}){
	$val{sendmailinfo} = sprintf(
			q{%s ���g���܂��B},
			$val{if_sendmail_avail},
		);
}

foreach (@modules_check){
	$val{modulelist} .= sprintf("<tr> 
		<td nowrap>%s</td>
		<td nowrap>%s</td>
		</tr>\n",
		$_->{name},
		$_->{version_str}
	);
}

if ($val{if_owned_by_user}){ #SuExec��
$val{pmtn_list} = '
<tr> 
<th colspan="2" class="subheader">CGI�t�@�C��</th>
<td class="pmtn">700</td>
<td class="pmtn">rwx------</td>
</tr>
<tr> 
<th colspan="2" class="subheader">CGI�t�@�C����u���Ă���f�B���N�g��</th>
<td class="pmtn">755</td>
<td class="pmtn">rwxr-xr-x</td>
</tr>
<tr> 
<th rowspan="2" class="subheader">�������݃t�@�C��</th>
<th class="subheader"> �u���E�U�Ō��Ȃ���2</th>
<td class="pmtn">600</td>
<td class="pmtn">rw-------</td>
</tr>
<tr> 
<th class="subheader"> �u���E�U�Ō��� ��3</th>
<td class="pmtn">644</td>
<td class="pmtn">rw-r--r--</td>
</tr>
<tr> 
<th rowspan="2" class="subheader">�������݃f�B���N�g��<br>
�i���Ƀt�@�C�����������<br>
�폜�����肷��ꍇ�j </th>
<th class="subheader"> ���̃t�@�C�����u���E�U�Ō��Ȃ� ��2</th>
<td class="pmtn">700</td>
<td class="pmtn">rwx------</td>
</tr>
<tr> 
<th class="subheader"> ���̃t�@�C�����u���E�U�Ō��� ��3</th>
<td class="pmtn">755</td>
<td class="pmtn">rwxr-xr-x</td>
</tr>
';
} else {
$val{pmtn_list} = '
<tr> 
<th colspan="2" class="subheader">CGI�t�@�C��</th>
<td class="pmtn">755</td>
<td class="pmtn">rwxr-xr-x</td>
</tr>
<tr> 
<th colspan="2" class="subheader">CGI�t�@�C����u���Ă���f�B���N�g��</th>
<td class="pmtn">755</td>
<td class="pmtn">rwxr-xr-x</td>
</tr>
<tr> 
<th rowspan="2" class="subheader">�������݃t�@�C��</th>
<th class="subheader"> �u���E�U�Ō��Ȃ���2</th>
<td class="pmtn">646</td>
<td class="pmtn">rw-r--rw-</td>
</tr>
<tr> 
<th class="subheader"> �u���E�U�Ō��� ��3</th>
<td class="pmtn">646</td>
<td class="pmtn">rw-r--rw-</td>
</tr>
<tr> 
<th rowspan="2" class="subheader">�������݃f�B���N�g��<br>
�i���Ƀt�@�C�����������<br>
�폜�����肷��ꍇ�j </th>
<th class="subheader"> ���̃t�@�C�����u���E�U�Ō��Ȃ� ��2</th>
<td class="pmtn">757</td>
<td class="pmtn">rwxr-xrwx</td>
</tr>
<tr> 
<th class="subheader"> ���̃t�@�C�����u���E�U�Ō��� ��3</th>
<td class="pmtn">757</td>
<td class="pmtn">rwxr-xrwx</td>
</tr>
';
}

$val{template} = '
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>�����g����CGI Perl���@�`�F�b�N&������CGI</title>
<meta http-equiv="Content-Type" content="text/html; charset=shift_jis">
<style type="text/css">
<!--
p, ol, ul, li {
	line-height: 150%;
}
h1 {
	margin: 0.5em 0px 0.5em 0px;
	padding: 0.3em 0.3em 0.3em 0.3em;
	background-color: #6699cc;
	color: #ffffff;
	font-size: 1.3em;
}
h2 {
	margin: 2em 0.5em 0.5em 0px;
	padding: 0.3em 0.3em 0.3em 0.3em;
	border-top: #336699 dashed 1px;
	border-bottom: #336699 dashed 1px;
	font-size: 1.2em;
}
h2.first {
	margin-top: 0.5em;
}
h3 {
	margin: 0.5em 0em 0.5em 0em;
	padding: 0.1em 0.1em 0.1em 0.1em;
	border-top: #999999 solid 1px;
	border-bottom: #999999 solid 1px;
	background-color: #dfdfdf;
	color: #333333;
	font-size: 1em;
}
table {
	margin: 8px 0px 8px 8px;
	border-collapse: collapse;
	border: 1px solid #999999;
	padding: 1px;
}
table th.header {
	background-color: #dfdfdf;
	padding: 3px;
	border: 1px solid #999999;
	text-align: left;
}
table th.subheader {
	padding: 3px;
	border: 1px solid #999999;
	text-align: left;
}
table td {
	padding: 3px;
	font-family: monospace;
}
table td.pmtn {
	text-align: center;
}
code {
	display: block;
	border: solid 1px #999999;
	padding: 8px;
	background-color: #333333;
	color: #ffffff;
	overflow: auto;
	margin: 10px;
}
.msg_info {
	font-size: 0.9em;
}
.msg_error {
	color: #ff0000;
}
-->
</style>
</head>

<body bgcolor="#FFFFFF" text="#000000">
<h1>�����g����CGI Perl������CGI</h1>
<h2 class="first">Perl ���@�`�F�b�N</h2>
<ol>
<li>���́u�`�F�b�N�Ώ�CGI�t�@�C�����v�Ƀ`�F�b�N������ Perl CGI �̃t�@�C��������͂��āA�u���@�`�F�b�N�v�{�^���������ĉ������B</li>
<li>���ʂ́A�u���@�`�F�b�N���ʁv���ɕ\������܂��B</li>
</ol>
<form method="post" action="%_myname_%">
�`�F�b�N�Ώ�CGI�t�@�C�����i��F target.cgi �j
<input type="text" name="targetfile" value="">
<input type="submit" value="���@�`�F�b�N">
<h3>���@�`�F�b�N���� </h3>
<p class="msg_error">%_checkresult_error_%</p>
<code>%_checkresult_checked_%</code>
<h2>�T�[�o���`�F�b�N�̌���</h2>
<table border="1">
<tr> 
<th class="header">OS</th>
<td>%_os_%</td>
</tr>
<tr> 
<th class="header">Perl �̃p�X</th>
<td>%_perlpath_%</td>
</tr>
<tr> 
<th class="header">���݂̃f�B���N�g���̐�΃p�X�\�L</th>
<td>%_currentdir_%</td>
</tr>
<tr> 
<th class="header">Perl �̃o�[�W����</th>
<td>%_perlversion_%</td>
</tr>
<tr> 
<th class="header">���{�ꕶ���R�[�h�֌W</th>
<td>%_jcodeinfo_%</td>
</tr>
<tr> 
<th class="header"> ���[���c�[��</th>
<td>%_sendmailinfo_%</td>
</tr>
<tr> 
<th class="header">���W���[��</th>
<td> 
<table border="1">
%_modulelist_%
</table>
<p class="msg_info">�� �ꕔ�̕W�����W���[���͗��p�ł���ꍇ�ł��u���p�ł��܂���v�ƕ\�������ꍇ������܂��B</p>
</td>
</tr>
<tr> 
<th class="header">���̑��̃��W���[��</th>
<td>1���W���[��/1�s�Ń`�F�b�N���������W���[�����L�����ĉ������B<br>
�i10�s�܂ŁB���ʂ͏�ɕ\������܂��B�j<br>
<textarea name="modulelist" cols="20" rows="4"></textarea>
<input type="submit" value="���W���[���`�F�b�N">
</td>
</tr>
</table>
<h2>CGI�ݒ�`�F�b�N�̌���</h2>
<p class="msg_info">�����̃p�[�g��UNIX�n�̊��̂ݑΉ����Ă��܂��B</p>
<p>CGI �̓��[�U %_process_user_% �̌����Ŏ��s����Ă��܂��B </p>
<table border="1">
<thead> 
<tr> 
<th colspan="2" class="header">�Ώۃt�@�C��</th>
<th colspan="2" class="header">�K�����p�[�~�b�V���� ��1</th>
</tr>
</thead>
%_pmtn_list_%
</table>
<p>��1 ����ȊO�̃p�^�[�������肦�܂��B���g���̃T�[�o�̃}�j���A�����Ŏw��������΂������D�悵�ĉ������B<br>
��2 �Ǘ��җp�̃��O�t�@�C���ȂǁBFTP�_�E�����[�h�݂̂̏ꍇ�B <br>
��3 �摜��A�z�[���y�[�W�̓��e���X�V�����肷��ꍇ�B �u���E�U����_�E�����[�h����ꍇ���܂݂܂��B</p>
</form>
<div>
<hr>
<a href="http://sugutsukaeru.jp/">�����g����CGI</a> Perl���@�`�F�b�N&������CGI Ver. 1.0
</div>
</body>
</html>
';

foreach (qw(
	checkresult_error
	checkresult_checked
	os
	perlpath
	currentdir
	perlversion
	jcodeinfo
	sendmailinfo
	process_user
)){
	if ($val{$_}){
		$val{template} =~ s/%_${_}_%/&text2html($val{$_})/eg;
	} else {
		$val{template} =~ s/%_${_}_%//g;
	}
}

foreach (qw(
	myname
	modulelist
	pmtn_list
)){
	$val{template} =~ s/%_${_}_%/$val{$_}/g;
}

print "Content-Lenght: ".length($val{template})."\r\n";
print "\r\n";
print "$val{template}";

sub text4textarea($){
	my $string = shift;
	if ($string){
		$string =~ s/\&/\&amp;/g;
		$string =~ s/#/\&#35;/g;
		$string =~ s/</\&lt;/g;
		$string =~ s/>/\&gt;/g;
		$string =~ s/"/\&quot;/g;
		$string =~ s/'/\&#39;/g;
		$string =~ s/%/\&#37;/g;
	}
	return $string;
}

sub text2html($){
	my $string = &text4textarea(shift);
	($string) or return $string;

	$string =~ s/\t/\&nbsp;\&nbsp;\&nbsp;\&nbsp;/g;
	$string =~ s/ (?= )/\&nbsp;/g;
	$string =~ s/\&nbsp; /\&nbsp;\&nbsp;/g;

	my $br = '<br>';
	$string =~ s/\r?\n/$br/g;
	return $string;
}
