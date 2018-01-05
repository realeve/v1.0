CREATE TABLE [dbo].[paper_cutwaste] (
[id] int NOT NULL IDENTITY(1,1) ,
[reel_code] varchar(255) NULL ,
[prod_id] int NULL ,
[reel_weight] int NULL ,
[ream_package] int NULL ,
[ream_check] int NULL ,
[ream_69] int NULL ,
[ream_49] int NULL ,
[ream_reel_head_tail] int NULL ,
[suspect_num] int NULL ,
[waste_num] int NULL ,
[class_name] varchar(255) NULL ,
[class_time] varchar(1) NULL ,
[operator_guide_edge] varchar(255) NULL ,
[operator_quality_check] varchar(255) NULL ,
[operator_paper_container] varchar(255) NULL ,
[operator_paper_check] varchar(255) NULL ,
[operator_counter] varchar(255) NULL ,
[operator_package] varchar(255) NULL ,
[operator_captain] varchar(255) NULL ,
[remark] varchar(255) NULL ,
[rec_time] datetime NULL 
)

ALTER TABLE [dbo].[paper_cutwaste] ADD PRIMARY KEY ([id])


// id:486
// SELECT a.reel_code,CONVERT (VARCHAR, rec_time, 120) AS rec_time,a.reel_weight,a.waste_num,a.suspect_num,a.ream_package,a.ream_check,a.ream_69,a.ream_49,a.ream_reel_head_tail,a.class_name,a.class_time,a.operator_guide_edge,a.operator_quality_check,a.operator_paper_container,a.operator_paper_check,a.operator_counter,a.operator_package,a.operator_captain,a.remark FROM paper_cutwaste a WHERE a.machine_id =? AND DATEDIFF(DAY, [rec_time], getdate()) <= 1


