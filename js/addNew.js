// 更新情報にNEW!!!追加
(function addNew()
{
	$(".newInfo").after("<div id='addedNew'>←<div><div>N</div><div>E</div><div>W</div><div>!</div><div>!</div><div>!</div></div></div>");
})();

function newAni(on, revease, count)
{
	for(var i = 0; i < on.length; i++)
	{
		if(on[i])
		{
			if(i == 0)
			{
				alert(count[0]);
			}
			if(!revease[i])
			{
				count[i]++;
				$("#addedNew div div").eq(i).css("top", "-=1");
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
				$("#addedNew div div").eq(i).css("top", "+=1");
				if(count[i] == 28)
				{
					on[i] = false;
					if(i == 5)
					{
						setTimeout('newAnistart()', 1000);
						return;
					}
				}
			}

		}
	}

	setTimeout('newAni(on, revease, count)', 15);
}

function newAnistart()
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
	newAni(on, revease, count);
}

setTimeout("newAnistart()", 500);