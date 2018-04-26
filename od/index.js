//这是输入filter.json
var fs = require('fs');
var path = require('path');
var out = fs.createWriteStream('./order.json');
out.write("[");
fs.readFile(path.resolve(__dirname, './person_od.json'), "utf8", function (err, result) {

    data = JSON.parse(result).RECORDS;
    for (var i = 0; i < data.length; i++) {
        var {
            times,
            types,
            locations
        } = data[i];
        var timesArr = times.split(',');
        var typesArr = types.split(',');
        var locationsArr = locations.split(',');
        for (var j = 0; j < timesArr.length - 1; j++) {
            for (var k = j+1; k < timesArr.length; k++) {

                if (Date.parse(timesArr[j]) > Date.parse(timesArr[k])) {
                    [timesArr[j], timesArr[k]] = [timesArr[k], timesArr[j]];
                    [typesArr[j], typesArr[k]] = [typesArr[k], typesArr[j]];
                    [locationsArr[j], locationsArr[k]] = [locationsArr[k], locationsArr[j]];

                }
            }

        }
        data[i] = {
            timesArr,
            typesArr,
            locationsArr
        }
        if(i==data.length-1)
        {out.write(JSON.stringify(data[i])+"");


        }
        else
        out.write(JSON.stringify(data[i])+",");

    }
    out.write("]");
 
    
})