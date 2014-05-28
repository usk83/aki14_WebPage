var sitesearch_paging = 0;
function sitesearch_next_result(){
	var d = window.document;
	sitesearch_paging++;
	if(d.getElementById('sitesearch_paging_'+sitesearch_paging)){
		sitesearch_setOpacity('sitesearch_paging_'+sitesearch_paging,50);
		d.getElementById('sitesearch_paging_'+sitesearch_paging).style.display = "block";
		setTimeout('sitesearch_setOpacity("sitesearch_paging_'+sitesearch_paging+'",100)',70);
	}
	if(!d.getElementById('sitesearch_paging_'+(sitesearch_paging+1)))
		d.getElementById('sitesearch_next_result_button').style.display = "none";
}
function sitesearch(obj){
	sitesearch_paging = 0;
	var query = obj.elements["q"].value;
	sitesearchObj = createXMLHttpRequest();
	sitesearchObj.onreadystatechange = sitesearchResult;
	sitesearchObj.open("GET",obj.action+"?ajax=1&q="+encodeURI(query),true);
	sitesearchObj.send(null);
	return false;
}
function sitesearchResult(){
	if ((sitesearchObj.readyState == 4) && (sitesearchObj.status == 200))
		document.getElementById("search_result").innerHTML = decodeURI(sitesearchObj.responseText);
}
function sitesearch_setOpacity(id,opt){
	var d = window.document;
	if(navigator.appVersion.indexOf("Safari") > -1 || navigator.userAgent.indexOf("Opera") > -1)
		d.getElementById(id).style.opacity = (opt/100);
	else if(navigator.userAgent.indexOf('Gecko') != -1)
		d.getElementById(id).style.MozOpacity = (opt/100);
	else if(document.all) {
		d.all(id).style.filter = "alpha(opacity=0)";
		d.all(id).filters.alpha.Opacity = opt;
	}
}

function createXMLHttp() {
	try {
		return new ActiveXObject ("Microsoft.XMLHTTP");
	}
	catch(e){
		try {
			return new XMLHttpRequest();
		}
		catch(e) {
			return null;
		}
	}
	return null;
}
function createXMLHttpRequest(){
	var XMLsitesearchObject = null;
	try{
		XMLsitesearchObject = new XMLHttpRequest();
	}
	catch(e){
		try{
			XMLsitesearchObject = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e){
			try{
				XMLsitesearchObject = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				return null;
			}
		}
	}
	return XMLsitesearchObject;
}
