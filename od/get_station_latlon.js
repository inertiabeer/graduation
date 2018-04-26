var fs=require('fs');
var path=require('path');
var station_name=fs.readFileSync(path.resolve(__dirname,"../json/station_name.json"),{encoding:"utf8"});
var stations=JSON.parse(station_name).RECORDS;
console.log(stations.length);
var count=0;
var locations = fs.readFileSync(path.resolve(__dirname, "../json/location_of_position.json"), { encoding: "utf8" });
var lonlats =JSON.parse(locations).RECORDS;
console.log(lonlats.length);
for(var i=0;i<stations.length;i++)
{
    let name = stations[i].name_location.split("站")[0];
    for(var j=0;j<lonlats.length;j++)
    {
        if(lonlats[j].location.indexOf(name)>-1)
        {
            stations[i].lnglat = [lonlats[j].longitude, lonlats[j].latitude];
            count++;
            break;
        }
    }

}
fs.writeFile("../json/loglat.json",JSON.stringify(stations));
console.log(count);