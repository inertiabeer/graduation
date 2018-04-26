create table bdata as (
    select
        location1,location2,lnglat1,lnglat2
    from
        cdata_fix
    order by
        location1 asc,
        location2 asc
);
alter table bdata add id int auto_increment primary key;
create table samp_data as (select * from bdata where id%3=1);