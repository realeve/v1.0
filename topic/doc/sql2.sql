产品工艺分流图	SELECT a.ProductName AS [品种] , a.TechTypeName AS [工艺类型],a.ProcName AS [工序], a.TeamName AS [班组], a.MachineName AS [机台], count(*) as 大万数 FROM dbo.CartInfoData AS a WHERE a.NoteAnayID > 0 and CONVERT(varchar,a.StartDate,112) between ? And ? group by ProductName,TechTypeName,ProcName,TeamName,MachineName,CaptainName order by 1,2,3,4,5,6	tstart,tend	编辑	删除
事件河流图1	SELECT CAST ( LEFT (a.生产日期, 4) AS VARCHAR ) + '/' + CAST ( SUBSTRING (cast(a.生产日期 as varchar), 5, 2) AS VARCHAR ) + '/' + CAST ( RIGHT (a.生产日期, 2) AS VARCHAR ) as 日期, round(CAST (a.数量 AS FLOAT) * 100 / b.数量,2) AS 比率, a.品种 FROM ( SELECT a.品种, a.生产日期, COUNT (*) AS 数量 FROM dbo.view_print_hecha AS a WHERE a.生产日期 BETWEEN ? AND ? AND 好品率 > 70 GROUP BY a.品种, a.生产日期 ) a INNER JOIN ( SELECT a.生产日期, COUNT (*) AS 数量 FROM dbo.view_print_hecha AS a WHERE a.生产日期 BETWEEN ? AND ? AND 好品率 > 70 GROUP BY a.生产日期 ) b ON a.生产日期 = b.生产日期	tstart,tend,tstart2,tend2	编辑	删除
Sankey Test	SELECT a.TeamName AS [班组], a.MachineName AS [机台], count(*) as 大万数 FROM dbo.CartInfoData AS a WHERE a.NoteAnayID > 0 and CONVERT(varchar,a.StartDate,112) between ? And ? group by TeamName,MachineName order by 1,2


产品未检事件河流

SELECT CAST ( LEFT (a.生产日期, 4) AS VARCHAR ) + '/' + CAST ( SUBSTRING ( CAST (a.生产日期 AS VARCHAR), 5, 2 ) AS VARCHAR ) + '/' + CAST ( RIGHT (a.生产日期, 2) AS VARCHAR ) AS 日期, SUM (a.未检条数) AS 未检数, a.机台 FROM [dbo].[view_print_hecha] a WHERE a.生产日期 BETWEEN ? AND ? GROUP BY a.生产日期, a.机台 ORDER BY 1, 2 

//168 DASHBOARD统计信息
SELECT a.当月质量, a.上传大万数, b.实时质量, a.异常产品 FROM ( SELECT SUM ( CASE WHEN 好品率 < 70 THEN 1 ELSE 0 END ) AS 当月质量, COUNT (*) 上传大万数, SUM ( CASE WHEN ( 正面1缺陷数 = 0 OR 正2 = 0 OR 正3 = 0 OR 正4 = 0 OR 正5 = 0 OR 背精1缺陷数 = 0 OR 精2 = 0 OR 精3 = 0 OR 精4 = 0 ) THEN 1 ELSE 0 END ) AS 异常产品 FROM dbo.view_print_hecha WHERE 生产日期 / 100 = convert(varchar(6),GETDATE(),112) ) a, ( SELECT COUNT (*) AS 实时质量 FROM dbo.view_print_online_quality WHERE 好品率 < 80 AND CONVERT (VARCHAR, 上传时间, 112) = convert(varchar,GETDATE(),112) ) b


//169 最近一天质量信息
SELECT max( CASE WHEN 品种 = '9602A' THEN 平均好品率 ELSE 0 END ) AS '9602A', max( CASE WHEN 品种 = '9603A' THEN 平均好品率 ELSE 0 END ) AS '9603A' , max( CASE WHEN 品种 = '9604A' THEN 平均好品率 ELSE 0 END ) AS '9604A', max( CASE WHEN 品种 = '9606A' THEN 平均好品率 ELSE 0 END ) AS '9606A', max( CASE WHEN 品种 = '9607T' THEN 平均好品率 ELSE 0 END ) AS '9607T' FROM ( SELECT a.品种, round(AVG(a.好品率), 2) AS 平均好品率 FROM dbo.view_print_hecha AS a WHERE a.生产日期 = ( SELECT MAX (生产日期) FROM view_print_hecha ) GROUP BY 品种 ) a 

SELECT a.品种, round(AVG(a.好品率), 2) AS 平均好品率 FROM dbo.view_print_hecha AS a WHERE a.生产日期 = ( SELECT MAX (生产日期) FROM view_print_hecha ) GROUP BY 品种 

//170本周

SELECT isnull(max( CASE WHEN 品种 = '9602A' THEN 平均好品率 ELSE 0 END ),0) AS '9602A', isnull(max( CASE WHEN 品种 = '9603A' THEN 平均好品率 ELSE 0 END ),0) AS '9603A' , isnull(max( CASE WHEN 品种 = '9604A' THEN 平均好品率 ELSE 0 END ),0) AS '9604A', isnull(max( CASE WHEN 品种 = '9606A' THEN 平均好品率 ELSE 0 END ),0) AS '9606A', isnull(max( CASE WHEN 品种 = '9607T' THEN 平均好品率 ELSE 0 END ),0) AS '9607T' FROM ( SELECT a.品种, round(AVG(a.好品率), 2) AS 平均好品率 FROM dbo.view_print_hecha AS a WHERE DATEDIFF(week, 生产时间, getdate())=0 GROUP BY 品种 ) a 

 SELECT a.品种, round(AVG(a.好品率), 2) AS 平均好品率 FROM dbo.view_print_hecha AS a WHERE DATEDIFF(week, 生产时间, getdate())=0 GROUP BY 品种 		

//171本月

SELECT isnull(max( CASE WHEN 品种 = '9602A' THEN 平均好品率 ELSE 0 END ),0) AS '9602A', isnull(max( CASE WHEN 品种 = '9603A' THEN 平均好品率 ELSE 0 END ),0) AS '9603A' , isnull(max( CASE WHEN 品种 = '9604A' THEN 平均好品率 ELSE 0 END ),0) AS '9604A', isnull(max( CASE WHEN 品种 = '9606A' THEN 平均好品率 ELSE 0 END ),0) AS '9606A', isnull(max( CASE WHEN 品种 = '9607T' THEN 平均好品率 ELSE 0 END ),0) AS '9607T' FROM ( SELECT a.品种, round(AVG(a.好品率), 2) AS 平均好品率 FROM dbo.view_print_hecha AS a WHERE DATEDIFF(mm, 生产时间, getdate())=0 GROUP BY 品种 ) a 

 SELECT a.品种, round(AVG(a.好品率), 2) AS 平均好品率 FROM dbo.view_print_hecha AS a WHERE DATEDIFF(mm, 生产时间, getdate())=0 GROUP BY 品种 
 
 //过去一年机检月度平均好品率
 172
select left(生产日期,4)+'-'+substring(cast(生产日期 as varchar),5,2) as 月份,round(avg(好品率),2) as 平均好品率 from view_print_hecha where DATEDIFF(month, 生产时间, getdate())<=12 group by left(生产日期,4)+'-'+substring(cast(生产日期 as varchar),5,2) 

//实时质量
173
SELECT a.机台, a.好品率, a.D盘可用, a.显示站DB, a.上传大万数,a.machineTypeID FROM dbo.view_print_online_quality AS a WHERE DATEDIFF(day, 上传时间, GETDATE()) = 0 

//今日/今月质量
xxx
select b.品种,isnull(a.今日,0) as 最近一日,b.本月 from (SELECT 品种, round(AVG(好品率), 2) AS 今日 FROM dbo.view_print_hecha WHERE 生产日期 = ( SELECT MAX (producedate) FROM MaHouData ) GROUP BY 品种, 生产日期) a RIGHT JOIN (SELECT 品种, round(AVG(好品率), 2) AS 本月 FROM dbo.view_print_hecha WHERE 生产日期 / 100 = ( SELECT TOP 1 producedate / 100 FROM MaHouData WHERE ProduceDate < ( SELECT MAX (ProduceDate) FROM mahoudata ) ORDER BY ProduceDate DESC ) GROUP BY 品种, 生产日期 / 100)b on b.品种= a.品种 

//174 某设备近期好品率
SELECT top 15 a.CartNumber as 车号, a.GoodRate as 好品率 FROM dbo.MaHouData AS a INNER JOIN dbo.MachineData b on a.machineid=b.machineid where b.MachineName = ？ order by a.ID desc 

//175过程质量控制水平
SELECT a.ProductType AS 品种, round(AVG(a.cutRatio), 2) AS 机检得分, round(AVG(a.ManualCutScore), 2) AS 人工得分, round(  AVG (  a.ManualCutScore * 0.3 + a.cutRatio * 0.7  ),  2 ) AS 评价总分 FROM dbo.view_print_note_ananysis_score AS a WHERE a.ProcName LIKE '裁%' AND a.date BETWEEN ? AND ? GROUP BY ProductType 

检封机台 176
SELECT a.CaptainName AS 机长, round(AVG(a.cutRatio), 2) AS 机检得分, round(AVG(a.ManualCutScore), 2) AS 人工得分, round( AVG ( a.ManualCutScore * 0.3 + a.cutRatio * 0.7 ), 2 ) AS 总分 FROM dbo.view_print_note_ananysis_score AS a WHERE a.ProcName LIKE '裁%' AND left(a.date,6)=CONVERT(varchar(6),GETDATE(),112) GROUP BY CaptainName ORDER BY 4 desc
