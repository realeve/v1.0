CREATE TABLE [dbo].[Paper_Penalty_Operator] (
[ID] int NOT NULL IDENTITY(1,1) ,
[rec_ID] int NOT NULL ,
[Name] nchar(10) NOT NULL ,
[Proc_ID] int NULL DEFAULT ((0)) ,
[bHide] int NULL DEFAULT ((0)) 
)
