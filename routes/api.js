var express = require('express');
var router = express.Router();
var pool = require('../config/pool');
var polish = require('../js/polish');
/* post api . */
router.post('/lines', function (req, res, next) {
    let samp = req.body.samp;
    if (!samp) {
        samp = 3;
    }
    let sql = "select lnglat1,lnglat2,location1,location2 from bdata where id%" + samp + "=0";
    query_promise(sql).then(result => {
        res.send(JSON.stringify(result));
    }).catch(error => {
        console.log(error);
    })

});
router.post('/station_od', function (req, res, next) {
    let samp = req.body.samp;
    if (!samp) {
        samp = 3;
    }
    let sql = "select * from loglat";
    query_promise(sql).then(result => {
            return Promise.all(result.map(station => {
                //let sql_inner = `select lnglat1,lnglat2,location1,location2 from bdata where id%" +${samp}+ "=0  and location1='${station.name_location}'`;
                let sql_inner = `select lnglat1,lnglat2,location1,location2 from samp_200 where location1='${station.name_location}'`;
                return query_promise(sql_inner);
            }))
        })
        .then(result => {
            console.log(result.length);
            console.log(result[0].length);
            res.send(JSON.stringify(result));
        })
        .catch(error => {
            console.log(error);
        });


})
router.post('/stations', function (req, res, next) {

    let sql = "select * from loglat";
    query_promise(sql).then(result => {
        res.send(JSON.stringify(result));
    }).catch(error => {
        console.log(error);
    });
});

router.post('/timeline', function (req, res, next) {
    let name = req.body.name;
    name_count(name)
        .then(data => {
            res.send(JSON.stringify(data));
        })
        .catch(error => {
            console.log(error);
        });

    //num :[1,2] 1是进站，2是出站

});
router.post('/line_chart', function (req, res, next) {
    let line = req.body.line;
    console.log(line);


});
router.post('/all_station', function (req, res, next) {
    function time_to_number(time) {
        //1是进站 2是出站
        let p1 = query_promise(number_to_sql(1, time));
        let p2 = query_promise(number_to_sql(2, time));
        return Promise.all([p1, p2])

    }

    function number_to_sql(number, time) {
        return `select
    count_id,
    location${number} as location,
    time_range${number} as time_range,
    loglat.lnglat as lnglat
from
    time_all_station${number}
    left join loglat ON time_all_station${number}.location${number} = loglat.name_location
where
    time_range${number} =${time}`
    }
    Array.prototype.findLocation = function (location) {
        let that = this;
        for (var i = 0; i < that.length; i++) {
            if (this[i].location == location) {
                return i;
            }
        }
        return -1;
    };
    let time = req.body.time;
    time_to_number(time).then(
        (results) => {
            let temps = [];
            let short
            console.log(results[0].length);
            console.log(results[1].length);
            for (var i = 0; i < results[0].length; i++) {
                let temp = {};
                temp.location = results[0][i].location;
                temp.lnglat = results[0][i].lnglat;
                temp.count_id1 = results[0][i].count_id;
                let temp_i = results[1].findLocation(temp.location);
                temp.count_id2 = temp_i > -1 ? results[1][temp_i].count_id : 0;
                temp.time = time;
                temps.push(temp);
            }
            return temps
        }

    ).then(result => {
        res.send(JSON.stringify(result));
    }).catch(function (error) {
        console.log(error);
    });
})
// name string
// return [array]
function name_count(name) {
    let p1 = query_promise(splice_sql(1, name));
    let p2 = query_promise(splice_sql(2, name));
    return Promise.all([p1, p2])
        .then((results, error) => {
            return results;
        })
        .then((result) => {
            let count_all = [];
            let time_ranges = [];
            var long_number = result[0].length > result[1].length ? 0 : 1;
            //深湾站点有错误

            //输入一个两个可能缺失的数组，对缺失部分补齐。
            polish(result[0], result[1]);

            for (var i = 0; i < result[long_number].length; i++) {
                count_all.push(result[0][i].count_id + result[1][i].count_id);
                time_ranges.push(result[long_number][i].time_range);

            }
            for (var j = 0; j < result.length; j++) {
                for (var i = 0; i < result[j].length; i++) {
                    result[j][i] = result[j][i].count_id;
                }
            }

            result.unshift(time_ranges);
            result.push(count_all);
            return result;


        })
        .catch(error => {
            console.log("最终处理", error);
        })

}

function query_promise(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, result) {
            if (error) {
                reject("数据库查询出错" + error);
            } else {
                resolve(result);
            }
        })
    })

}

function splice_sql(num, name) {
    return `SELECT
    count(id) as count_id,
    CASE 
    WHEN Date_format(time${num}, '%k') <6 THEN 7
    WHEN Date_format(time${num}, '%k') >=6
    THEN Date_format(time${num}, '%k')+1
    END AS time_range
    FROM
    cdata
    where location${num} like '${name}%'
    group by time_range
    order by time_range ASC;`

};


module.exports = router;