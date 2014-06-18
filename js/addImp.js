(function addimp()
{
	$(".impInfo").after("<div id='addedImp'>←<div><div>募</div><div>集</div><div>中</div><div>!</div><div>!</div><div>!</div></div></div>");
})();

function impAni(on, revease, count)
{
	for(var i = 0; i < on.length; i++)
	{
		if(on[i])
		{
			if(!revease[i])
			{
				count[i]++;
				$("#addedImp div div").eq(i).css("top", "-=1");
				if(count[i] == 7)
				{
					on[i+1] = true;
				}
				else if(count[i] == 14)
				{
					revease[i] = true;
				}
			}
			else if(revease[i])
			{
				count[i]++;
				$("#addedImp div div").eq(i).css("top", "+=1");
				if(count[i] == 28)
				{
					on[i] = false;
					if(i == 5)
					{
						setTimeout('impAnistart()', 1000);
						return;
					}
				}
			}

		}
	}

	setTimeout(function(){impAni(on, revease, count);}, 15);
}

function impAnistart()
{
	on = new Array(6);
	revease = new Array(6);
	count = new Array(6);
	for(var i = 0; i < on.length; i++)
	{
		if(i == 0)
		{
			on[i] = true;
		}
		else
		{
			on[i] = false;
			revease[i] = false;
		}
		count[i] = 0;
	}
	impAni(on, revease, count);
}

setTimeout("impAnistart()", 500);