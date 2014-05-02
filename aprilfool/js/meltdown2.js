// meltdown2.js
// Copyright (c) 2008 KAZUMiX
// http://d.hatena.ne.jp/KAZUMiX/20081229/meltdown2
// Licensed under the MIT License:
// http://www.opensource.org/licenses/mit-license.php

// 履歴
// 2008-12-29 公開
// 2008-12-30 元の要素のCSSプロパティleft,topが負数の場合を考慮してなかった部分を修正
// 2008-12-30 上に関連して、right,bottomを考慮してなかった部分を修正(IE)
// 2009-01-22 ページの高さの計算に問題があり、逆再生しないページがあった問題を修正

window.onload = function aprilfool(){

	var opacity = 0;

   var d = document;
   var frameInterval = 50;
   var height = Math.max(Math.max(d.body.scrollHeight, (window.scrollMaxY || 0)+(window.innerHeight || 0)), (d.documentElement.clientHeight || d.body.clientHeight));
   var width = Math.max(d.body.scrollWidth, Math.max(d.body.clientWidth, d.documentElement.clientWidth));

   d.body._innerHTML = d.body.innerHTML;
   addWrapper();

   var IE = false;
   if(window.attachEvent && !window.opera){
	 IE = true;
   }

   var computedStyle;
   if(window.getComputedStyle){
	 computedStyle = function(ele,prop){return window.getComputedStyle(ele,null)[prop];};
   }else if(d.body.currentStyle){
	 computedStyle = function(ele,prop){return ele.currentStyle[prop];};
   }

   if(!IE){
	 addDivInCells();
   }

   var targetElms = getTargetElms();
   var animationElms = [];
   var reverseTargetElms = [];
   var reverseAnimationElms = [];

   meltdown();

   //

   function getTargetElms(){
	 var result = [];
	 var allElms = d.body.getElementsByTagName('*');
	 for(var i=0, len=allElms.length; i<len; i++){
	   var elm = allElms[i];
	   if(elm.tagName.match(/^(tbody|tr|script|noscript|label)$/i) || computedStyle(elm, 'display').match(/^(none|inline)$/i) || computedStyle(elm, 'visibility').match(/^hidden$/i)){
		 continue;
	   }
	   if(!IE && elm.tagName.match(/(th|td)/i)){
		 continue;
	   }
	   if(computedStyle(elm, 'position').match(/absolute/i)){
		 var top = computedStyle(elm, 'top');
		 var right = computedStyle(elm, 'right');
		 var bottom = computedStyle(elm, 'bottom');
		 var left = computedStyle(elm, 'left');
		 if(top == 'auto' && right == 'auto' && bottom == 'auto' && left == 'auto'){
		   continue;
		 }
		 if(top.match(/%$/) || right.match(/%$/) || bottom.match(/%$/) || left.match(/%$/)){
		   continue;
		 }
	   }
	   elm.pos = getPoint(elm);
	   result.push(elm);
	 }
	 result.shift();
	 return result;
   }

	function message()
	{
		var element = document.createElement('div');
		element.id = 'message';
		document.getElementById("layer").appendChild(element);
		$("#message").css({
			"height": "98px",
			"width": "1140px",
			"margin": "auto",
			"top": "50%",
			"left": "50%",
			"margin": "-49px 0 0 -570px",
			"font-size": "4em",
			"font-weight": "bold",
			"position": "fixed",
			"z-index":  "11"
		});

		msgorigin="今年も秋祭をよろしくお願いします。";
		cnt=0;
		var timer = setInterval(setMsg, 200);
		function setMsg()
		{
			if(cnt-5 <= msgorigin.length)
			{
				msg=msgorigin.substring(0,cnt++);
				document.getElementById("message").innerHTML=msg;
			}
			else
			{
				clearInterval(timer);
				location.href="http://akimatsuri.sfc.keio.ac.jp";
			}
		}
	}
	function aftermeltdown()
	{
		var changecss = setInterval(changeopa, 100);
		function changeopa()
		{
			if(opacity<30)
			{
				opacity = opacity+1;
				if(opacity<=10)
				{
					$("#layer").css("opacity", opacity/10);
				}
			}
			else
			{
				clearInterval(changecss);
				message();
				// location.href="http://akimatsuri.sfc.keio.ac.jp";
			}
		}
	}
	function meltdown(){
		if(targetElms.length > 0)
		{
			var elm = targetElms.pop();
			ready4animation(elm);
			animationElms.push(elm);
		}
		animateElms();
		if(targetElms.length == 0 && animationElms.length == 0)
		{
			var element = document.createElement('div');
			element.id = 'layer';
			var objBody = document.getElementsByTagName("body").item(0);
			objBody.appendChild(element);
			$("#layer").css({
				"height": "100%",
				"width": "100%",
				"background": "#fff",
				"position": "fixed",
				"z-index":  "10",
				"opacity": "0.0"
			});

			aftermeltdown();

		}
		else
		{
			setTimeout(function(){meltdown.apply(this);},frameInterval);
		}


	 function ready4animation(elm){
	   var position = computedStyle(elm, 'position');
	   if(!position.match(/(relative|absolute)/i)){
		 elm.style.position = 'relative';
		 elm.axisX = 0;
		 elm.axisY = 0;
		 elm.propX = 'left';
		 elm.propY = 'top';
	   }else{
		 var left = computedStyle(elm, 'left');
		 var right = computedStyle(elm, 'right');
		 if(left != 'auto' || (left == 'auto' && right == 'auto')){
		   elm.axisX = parseInt(left,10) || 0;
		   elm.propX = 'left';
		 }else{
		   elm.axisX = parseInt(right,10) || 0;
		   elm.propX = 'right';
		 }

		 var top = computedStyle(elm, 'top');
		 var bottom = computedStyle(elm, 'bottom');
		 if(top != 'auto' || (top == 'auto' && bottom == 'auto')){
		   elm.axisY = parseInt(top,10) || 0;
		   elm.propY = 'top';
		 }else{
		   elm.axisY = parseInt(bottom,10) || 0;
		   elm.propY = 'bottom';
		 }
	   }
	   elm._axisX = elm.axisX;
	   elm._axisY = elm.axisY;
	   elm._position = position;

	   elm.vx = Math.random()*4;
	   //elm.ax = 0.1;
	   if(elm.propX == 'right'){
		 elm.vx *= -1;
	   }
	   elm.vy = 1;
	   elm.ay = 1.5;
	   elm.limitY = height - elm.pos.y;

	   elm.posHistory = [];
	   reverseTargetElms.push(elm);
	 }

	 function animateElms(){
	   var nextAnimationElms = [];
	   for(var i=0,len=animationElms.length; i<len; i++){
		 var elm = animationElms[i];
		 if(animateElm(elm)){
		   nextAnimationElms.push(elm);
		 }
	   }
	   animationElms = nextAnimationElms;

	   function animateElm(elm){
		 //elm.vx += elm.ax;
		 elm.vy *= elm.ay;
		 elm.axisY += elm.vy;
		 elm.axisX += elm.vx;

		 var axisY = Math.floor(elm.axisY);
		 var axisX = Math.floor(elm.axisX);

		 elm.posHistory.push({axisY:axisY, axisX:axisX});

		 elm.style[elm.propY] = axisY + 'px';
		 elm.style[elm.propX] = axisX + 'px';

		 if(elm.limitY <= elm.axisY){
		   elm.style.visibility = 'hidden';
		   return false;
		 }else{
		   return true;
		 }
	   }
	 }
   }

   function meltdownReverse(){
	 if(reverseTargetElms.length > 0){
	   var elm = reverseTargetElms.pop();
	   ready4reverse(elm);
	   reverseAnimationElms.push(elm);
	 }
	 reverseElms();
	 if(reverseElms.length == 0 && reverseAnimationElms.length == 0){
	   d.body.innerHTML = d.body._innerHTML;
	 }else{
	   setTimeout(function(){meltdownReverse.apply(this);},frameInterval);
	 }

	 function ready4reverse(elm){
	   elm.style.visibility = 'visible';
	 }

	 function reverseElms(){
	   var nextReverseElms = [];
	   for(var i=0,len=reverseAnimationElms.length; i<len; i++){
		 var elm = reverseAnimationElms[i];
		 if(reverseElm(elm)){
		   nextReverseElms.push(elm);
		 }
	   }
	   reverseAnimationElms = nextReverseElms;

	   function reverseElm(elm){
		 if(elm.posHistory.length == 0){
		   elm.style.position = elm._position;
		   elm.style[elm.propX] = elm._axisX + 'px';
		   elm.style[elm.propY] = elm._axisY + 'px';
		   return false;
		 }
		 var pos = elm.posHistory.pop();
		 elm.style[elm.propX] = pos.axisX + 'px';
		 elm.style[elm.propY] = pos.axisY + 'px';
		 return true;
	   }
	 }
   }

   function getPoint(ele){
	 var x=0,y=0;
	 while(ele){
	   x += ele.offsetLeft;
	   y += ele.offsetTop;
	   ele = ele.offsetParent;
	 }
	 return {x:x, y:y};
   }


   function addDivInCells(){
	 var ths = d.body.getElementsByTagName('th');
	 addDiv(ths);
	 var tds = d.body.getElementsByTagName('td');
	 addDiv(tds);

	 function addDiv(elmObjs){
	   for(var i=0,len=elmObjs.length; i<len; i++){
		 var elm = elmObjs[i];
		 elm.innerHTML = '<div>' + elm.innerHTML + '</div>';
	   }
	 }
   }

   function addWrapper(){
	 d.body.innerHTML = '<div style="position:absolute;top:0px;left:0px;margin:0;padding:0;width:' + width + 'px;height:'+height+'px;overflow:hidden;">' + d.body.innerHTML + '</div>';
   }

 }