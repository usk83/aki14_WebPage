// 更新情報にNEW!!!追加
(function addNew()
{
	$(".newInfo").after("<div id='addedNew'>←<div><div>N</div><div>E</div><div>W</div><div>!</div><div>!</div><div>!</div></div></div>");
})();

function newAni(on, revease)
{
	for(var i = 0; i < on.length; i++)
	{
		if(on[i])
		{
			if(!revease[i])
			{
				$("#addedNew div div").eq(i).css("top", "-=1")
				if($("#addedNew div div").eq(i).css("top") == "12px")
				{
					on[i+1] = true;
				}
				else if($("#addedNew div div").eq(i).css("top") == "5px")
				{
					revease[i] = true;
				}
			}
			else if(revease[i])
			{
				$("#addedNew div div").eq(i).css("top", "+=1")
				if($("#addedNew div div").eq(i).css("top") == "19px")
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

	setTimeout('newAni(on, revease)', 15);
}

function newAnistart()
{
	on = new Array(6);
	revease = new Array(6);
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
	}
	newAni(on, revease);
}

setTimeout("newAnistart()", 500);