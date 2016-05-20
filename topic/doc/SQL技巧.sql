//本周
select * from view_print_hecha where DATEDIFF(week, [生产时间], getdate())=0


//上周
select * from view_print_hecha where DATEDIFF(week, [生产时间], getdate())=1

//上月
select * from view_print_hecha where DATEDIFF(mm, [生产时间], getdate())=1


//上月
select * from view_print_hecha where DATEDIFF(mm, [生产时间], getdate())=1


//本月
select * from view_print_hecha where DATEDIFF(mm, [生产时间], getdate())=0


//下月
select * from view_print_hecha where DATEDIFF(mm, [生产时间], getdate())=-1


//昨天
select * from view_print_hecha where DATEDIFF(day, [生产时间], getdate())=1


//上年
select * from view_print_hecha where DATEDIFF(year, [生产时间], getdate())=1