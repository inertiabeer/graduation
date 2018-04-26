var fs = require('fs');
var path=require('path');
fs.readFile(path.resolve(__dirname, './导入.json'), "utf8", function (err, result) {
    if(err)
    {
        console.log(err);
    }
    let data = JSON.parse(result);
    console.log(data[12346]);
})