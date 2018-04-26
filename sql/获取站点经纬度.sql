select
    `分段2`.location1,
    `分段2`.location2,
    ll1.lnglat,
    ll2.lnglat
from
    `分段2`
    left JOIN loglat as ll1 ON `分段2`.location1 = ll1.name_location
    left join loglat as ll2 on `分段2`.location2 = ll2.name_location
where
    `分段2`.sq = 8