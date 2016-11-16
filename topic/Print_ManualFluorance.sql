CREATE TABLE [dbo].[Print_ManualFluorance] (
[id] int NOT NULL IDENTITY(1,1) ,
[cartnumber] varchar(10) NULL ,
[rec_date] datetime NULL ,
[gznumber] varchar(10) NULL ,
[monitor] varchar(10) NULL ,
[captain] varchar(10) NULL ,
[print_date] datetime NULL ,
[kilo] int NULL ,
[codenum] varchar(MAX) NULL ,
[desc] varchar(10) NULL ,
[formatpos] varchar(10) NULL ,
[type] varchar(10) NULL ,
[remark] varchar(MAX) NULL ,
[user_id] int NULL,
[rec_time] datetime NULL 
)
