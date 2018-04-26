SET
    group_concat_max_len = 15000;

create TABLE person_od
AS
SELECT
    GROUP_CONCAT(time_trs SEPARATOR ',') times,
    GROUP_CONCAT(type_trs SEPARATOR ',') types,
    GROUP_CONCAT(name_location SEPARATOR ',') locations
FROM
    (select * from subway_main order by time_trs asc ) tt

GROUP BY
   tt.id_card


