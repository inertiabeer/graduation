var mysql = require('mysql');
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shenzhenbus"
});


var fs = require('fs');
var path = require('path');
var out = fs.createWriteStream('./导入.json');
fs.readFile(path.resolve(__dirname, './record.json'), "utf8", function (err, result) {


    let data = JSON.parse(result);
    let sql = 'insert into record (id,times,types,locations) values';
    for (let i = 0; i < data.length; i++) {
        if(i%10000==0)
        {
            console.log(i);
        }
        

       let  sql_item = sql + '(' + (data[i].id+1) + ',"' + data[i].times + '","' + data[i].types + '","' + data[i].locations + '")';
        pool.query(sql_item, function (error, result) 
        {
            if (error) {
                console.log(error);
            } else {
            
            }
        });
        delete data[i];
        delete sql_item;

    }
})