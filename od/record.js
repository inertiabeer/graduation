//将基于id的记录变为基于od的,先按照两个记录一组的方式进行划分
//
var fs = require('fs');
var path = require('path');
var out = fs.createWriteStream('./record.json');
var id=0;
fs.readFile(path.resolve(__dirname, './order.json'), "utf8", function(err, result) {
    let data = JSON.parse(result);
    out.write("[");
    for (var i = 0; i <data.length; i++) {
        let {
            timesArr,
            typesArr,
            locationsArr
        } = data[i];
        if (typesArr.length % 2 == 0) {

        } 
        else {
            if (typesArr[0] == "22") {
                typesArr.splice(0, 1);
                timesArr.splice(0, 1);
                locationsArr.splice(0, 1);
            } 
            else if (typesArr[typesArr.length - 1] == "21") {
                typesArr.splice(-1, 1);
                timesArr.splice(-1, 1);
                locationsArr.splice(-1, 1);
            }
        }
        if(i%10000==0)
        {
        	console.log(i);
        }
        if(typesArr.length==2)
        {
        	let obj = {
                times:timesArr.join(","),
                types:typesArr.join(","),
                locations: locationsArr.join(","),
                id:id
            };
            id++;
            if(i == data.length - 1)
            {        	
            	out.write(JSON.stringify(obj));

            }
            else
        	out.write(JSON.stringify(obj)+",");
        }
        else 
        {
        for (var j = 0; j < typesArr.length; j = j + 2) 
        {
            let times = [timesArr[j], timesArr[j + 1]].join(","),
                types = [typesArr[j], typesArr[j + 1]].join(","),
                locations = [locationsArr[j], locationsArr[j + 1]].join(",");
            let obj = {
                times,
                types,
                locations,
                id: id
            };
            id++;
            if (i == data.length - 1 && j == typesArr.length - 2) 
            {
                out.write(JSON.stringify(obj));
            }
             else 
             {
                out.write(JSON.stringify(obj)+",");
             }
        }
        }


    };
    out.write("]");
});