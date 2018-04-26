create table time_all_station (
as
SELECT
    count(id) as count_id,
    location2,
    CASE WHEN Date_format(time2, '%k') < 6 THEN 7 WHEN Date_format(time2, '%k') >= 6 THEN Date_format(time2, '%k') + 1 END AS time_range2
FROM
    cdata
group by
    time_range2,location2
order by
    time_range2 ASC);