myData = JSON.parse(data);

function createArray()
{
	var rows = [];
	var flag;
	for (var i = 0; i < myData.length; i++) 
	{
		for(var j=0;j<myData[i].stops.length;j++)
		{
			flag = 0;
			for(var x=0;x < rows.length;x++)
			{
				if(rows[x] == myData[i].stops[j])
				{
					flag = 1;
					break;
				}
			}
			if(flag==0)
				rows.push.apply(rows, myData[i].stops[j]);
		}
	}
	alert(rows);
}