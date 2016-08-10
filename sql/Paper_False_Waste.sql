CREATE TABLE [dbo].[Paper_False_Waste] (
[ID] int NOT NULL IDENTITY(1,1) ,
[month] int NULL ,
[checkNum] int NULL DEFAULT ((0)) ,
[wasteNum] int NULL ,
[wasteRatio] float(53) NULL ,
[Describe] char(100) NULL 
)
