create Table subway_main AS
Select
    id_card ,type_trs,cost_money,rest_money,time_trs,name_company,name_location
from
    subway
    order by
    time_trs
