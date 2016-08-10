CREATE TABLE [dbo].[Paper_Batch_Waste] (
[ID] int NOT NULL IDENTITY(1,1),
[reel_code] char(10) NULL  ,
[rec_date] datetime NULL,
[prod_id] int NULL,
[machine_id] int NULL,
[fake_reason] char(30) NULL ,
[fake_num] float NULL ,
[remark] char(100) NULL 
)


