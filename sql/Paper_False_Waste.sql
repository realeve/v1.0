CREATE TABLE [dbo].[Paper_False_Waste] (
[ID] int NOT NULL IDENTITY(1,1) ,
[prod_id] int NULL ,
[month] int NULL ,
[checkNum] int NULL DEFAULT ((0)) ,
[wasteNum] int NULL ,
[wasteRatio] float(53) NULL ,
[remark] char(100) NULL ,
[rec_date] datetime NULL 
)
