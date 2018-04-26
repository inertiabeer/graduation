//这次改成标准格式
var mysql = require('mysql');
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shenzhenbus"
});


var fs = require('fs');
var path = require('path');
fs.readFile(path.resolve(__dirname, './record.json'), "utf8", function (err, result) {

    var data = JSON.parse(result);
    let count=0;
    let sql = 'insert into record_copy (id,time1,time2,type1,type2,location1,location2) values';
    for (let i = 0; i < data.length; i++) {
        if (i % 10000 == 0) {
            console.log(data[i]);
        }
        var [time1,time2]=data[i].times.split(",");
        if(time2=="")
        {
            console.log(data[i]);
            console.log((count++)+"缺少数据");
            continue;
        }
        var [type1,type2]=data[i].types.split(",");
        var [location1,location2]=data[i].locations.split(",");
        

        let sql_item = sql + '(' + (data[i].id + 1) + ',"' + time1 + '","' + time2 + '",' + type1 + ',' + type2 + ',"' + location1 + '","' + location2 + '")';
        pool.query(sql_item, function (error, result) {
            if (error) {
                console.log(error);
            } else {

            }
        });
        delete data[i];

    }
})