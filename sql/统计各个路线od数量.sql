create table count_od as
select
    count(id) as count_od,
    location1,
    location2
from
    cdata_fix
group by
    location1,
    location2
order by
count_od 