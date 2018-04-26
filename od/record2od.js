//将基于id的记录变为基于od的,先按照两个记录一组的方式进行划分
//
var fs = require('fs');
var path = require('path');
var out = fs.createWriteStream('./导入2.json');
var id = 1;
var count=0;
fs.readFile(path.resolve(__dirname, './record.json'), "utf8", function (err, result) {
    let data = JSON.parse(result);
    out.write("[");
    for (var i = 0; i < data.length; i++) {
       
        if (i % 10000 == 0) {
            console.log(i);
        }
        var [time1, time2] = data[i].times.split(",");
        if (time2 == "") {
            console.log(data[i]);
            console.log((count++) + "缺少数据");
            continue;
        }
        var [type1, type2] = data[i].types.split(",");
        var [location1, location2] = data[i].locations.split(",");
        //处理出站和入战相同的
        if(location1==location2)
        {
            continue;
        }
        let obj = {
            id:id,
            time1,
            time2,
            type1,
            type2,
            location1,
            location2
        };
        id++;
        if (i == data.length - 1) {
            out.write(JSON.stringify(obj));
        }
        else {
            out.write(JSON.stringify(obj) + ",");
            delete obj;
        }
       
       



    };
    out.write("]");
});