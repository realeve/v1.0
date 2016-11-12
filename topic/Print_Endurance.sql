CREATE TABLE [dbo].[Print_Endurance] (
[id] int NOT NULL IDENTITY(1,1) ,
[gznumber] varchar(10) NULL ,
[prod_id] int NULL ,
[rec_date] datetime NULL ,
[remark] varchar(MAX) NULL ,
[anti_CreaseF] float(53) NOT NULL DEFAULT ((0)) ,
[anti_CreaseB] float(53) NULL DEFAULT ((0)) ,
[anti_CreaseOVMI] float(53) NULL DEFAULT ((0)) ,
[washF] float(53) NULL DEFAULT ((0)) ,
[washB] float(53) NULL DEFAULT ((0)) ,
[rec_time] datetime NULL 
)



//view_print_endurance
SELECT
a.gznumber 冠字,
b.ProductName 品种,
convert(varchar,a.rec_date,112) 检测日期,
a.remark 备注,
a.anti_CreaseF 耐干皱折正,
a.anti_CreaseB 耐干皱折背,
a.anti_CreaseOVMI 耐干皱折OVMI,
a.washF 耐机洗正,
a.washB 耐机洗背,
a.rec_time 记录时间
from Print_Endurance a inner join ProductData b on a.prod_id = b.ProductID

//耐性指标原始数据
//SELECT * FROM dbo.view_print_endurance AS a where a.检测日期 BETWEEN ? and ? order by 记录时间 desc






