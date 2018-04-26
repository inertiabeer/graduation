CREATE TABLE `分段2` AS
SELECT
    *,
    CASE 
    WHEN Date_format(time2, "%k") IN (0, 1, 2, 3, 4, 5, 6, 7) THEN 8 
    WHEN Date_format(time2, "%k") IN (8)
    and Date_format(time2, "%i") between 0
    and 29 THEN "8.30" 
    WHEN Date_format(time2, "%k") IN (8)
    and Date_format(time2, "%i") between 30
    and 59 THEN "9" WHEN Date_format(time2, "%k") IN (9)
    and Date_format(time2, "%i") between 0
    and 29 THEN "9.30" WHEN Date_format(time2, "%k") IN (9)
    and Date_format(time2, "%i") between 30
    and 59 THEN "10" 
    WHEN Date_format(time2, "%k") IN (10, 11) 
    THEN "11-12" 
    WHEN Date_format(time2, "%k") IN (12, 13) 
    THEN "13-14" 
    WHEN Date_format(time2, "%k") IN (14, 15) 
    THEN "15-16" 
    WHEN Date_format(time2, "%k") IN (16, 17) 
    THEN "16-17" 
    WHEN Date_format(time2, "%k") IN (18)
    and Date_format(time2, "%i") between 0
    and 29 THEN "18.30" 
    WHEN Date_format(time2, "%k") IN (18)
    and Date_format(time2, "%i") between 30
    and 59 THEN "19" 
    WHEN Date_format(time2, "%k") IN (19)
    and Date_format(time2, "%i") between 0
    and 29 THEN "19.30" 
    WHEN Date_format(time2, "%k") IN (19)
    and Date_format(time2, "%i") between 30
    and 59 THEN "20" 
    WHEN Date_format(time2, "%k") IN (20, 21) 
    THEN "21-22" 
    WHEN Date_format(time2, "%k") IN (22, 23) THEN '23-24' END AS sq
FROM
    adata