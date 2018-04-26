-- 出站
SELECT
count(id) as count_id,
    location2,
    CASE 
    WHEN Date_format(time2, '%k') <6 THEN 7
    WHEN Date_format(time2, '%k') >=6
    THEN Date_format(time2, '%k')+1
    END AS time_range2
FROM
    cdata
    where location2='上梅林'
    group by time_range2
order by time_range2 ASC;

-- 进站
SELECT
    count(id) as count_id,
    location1,
    CASE WHEN Date_format(time1, '%k') < 6 THEN 7 WHEN Date_format(time1, '%k') >= 6 THEN Date_format(time1, '%k') + 1 END AS time_range1
FROM
    cdata
where
    location1 = '上梅林'
group by
    time_range1
order by
    time_range1 ASC