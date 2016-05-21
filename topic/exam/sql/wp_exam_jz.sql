-- phpMyAdmin SQL Dump
-- version 3.3.8.1
-- http://www.phpmyadmin.net
--
-- 主机: w.rdc.sae.sina.com.cn:3307
-- 生成日期: 2016 年 05 月 22 日 03:08
-- 服务器版本: 5.6.23
-- PHP 版本: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: 'app_cbpc540'
--

-- --------------------------------------------------------

--
-- 表的结构 'wp_exam_jz'
--

CREATE TABLE IF NOT EXISTS wp_exam_jz (
  id int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  user_name varchar(255) DEFAULT NULL COMMENT '用户名',
  user_id int(10) DEFAULT NULL COMMENT '用户ID',
  score float DEFAULT NULL COMMENT '得分',
  `errors` varchar(255) DEFAULT NULL COMMENT '错误题目',
  rec_time datetime DEFAULT NULL COMMENT '记录时间',
  PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;
