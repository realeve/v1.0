CREATE TABLE [dbo].[Paper_Penalty] (
[ID] int NOT NULL IDENTITY(1,1) ,
[oper_id] int NULL ,
[rec_date] datetime NULL  ,
[serious_fake] int NULL   ,
[serious_fake_money] int NULL   ,
[normal_fake] int NULL   ,
[normal_fake_money] int NULL   ,
[user_feedback] char(100) NULL ,
[dpt_feedback] char(100) NULL ,
[remark] char(100) NULL
)
