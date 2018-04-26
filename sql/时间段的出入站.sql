select
    count_id,
    location1 as location,
    time_range1 as time_range
from
    time_all_station1
where
    time_range1 =7
    left join loglat ON time_all_station1.location1 = loglat.location