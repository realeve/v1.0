/*
Navicat SQL Server Data Transfer

Source Server         : MS SQLServer
Source Server Version : 105000
Source Host           : localhost:1433
Source Database       : NotaCheck_DB
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 105000
File Encoding         : 65001

Date: 2016-05-04 00:43:50
*/


-- ----------------------------
-- Table structure for Paper_Validate
-- ----------------------------
DROP TABLE [dbo].[Paper_Validate]
GO
CREATE TABLE [dbo].[Paper_Validate] (
[ID] int NOT NULL IDENTITY(1,1) ,
[reel_code] char(10) NULL ,
[prod_id] int NULL ,
[oper_id] int NULL ,
[machine_id] int NULL ,
[rec_date] datetime NULL ,
[validate_num] int NULL ,
[number_right] int NULL ,
[package_weight] int NULL ,
[cut_weight] int NULL  ,
[serious_fake] int NULL ,
[normal_fake_h] int NULL ,
[normal_fake_m] int NULL ,
[normal_fake_l] int NULL ,
[reel_end] varchar(100) NULL ,
[suspect_paper] varchar(100) NULL ,
[well_paper] varchar(100) NULL ,
[other] varchar(100) NULL ,
[record_Time] datetime NULL ,
[passed] int NULL
)


GO
DBCC CHECKIDENT(N'[dbo].[Paper_Validate]', RESEED, 3)
GO
