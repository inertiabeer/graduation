create Table cdata_fix AS
(select
    adata.*,
    ll1.lnglat as lnglat1,
    ll2.lnglat as lnglat2
from
    adata
    left JOIN loglat as ll1 ON adata.location1 = ll1.name_location
    left join loglat as ll2 on adata.location2 = ll2.name_location
)