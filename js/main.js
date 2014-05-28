// encrypt-email.js
function EncryptEmail()
{
	/***********************************************
	* Encrypt Email script- Please keep notice intact
	* Tool URL: http://www.dynamicdrive.com/emailriddler/
	* **********************************************/

	var emailriddlerarray=[97,107,105,49,52,45,99,111,110,116,97,99,116,64,103,111,111,103,108,101,103,114,111,117,112,115,46,99,111,109];
	var encryptedemail_aki14=''; //variable to contain encrypted email
	for (var i=0; i<emailriddlerarray.length; i++)
	 encryptedemail_aki14+=String.fromCharCode(emailriddlerarray[i]);

	document.write('<a href="mailto:'+encryptedemail_aki14+'?subject=%e5%95%8f%e3%81%84%e5%90%88%e3%82%8f%e3%81%9b_HPより&amp;body=%e3%81%94%e7%bd%b2%e5%90%8d%e3%83%bb%e5%95%8f%e3%81%84%e5%90%88%e3%82%8f%e3%81%9b%e5%86%85%e5%ae%b9%e3%82%92%e3%81%94%e8%a8%98%e5%85%a5%e3%81%ae%e4%b8%8a%e3%80%81%e3%81%8a%e9%80%81%e3%82%8a%e3%81%84%e3%81%9f%e3%81%a0%e3%81%8d%e3%81%be%e3%81%99%e6%a7%98%e3%81%8a%e9%a1%98%e3%81%84%e3%81%97%e3%81%be%e3%81%99%e3%80%82">'+encryptedemail_aki14+'</a>');
}