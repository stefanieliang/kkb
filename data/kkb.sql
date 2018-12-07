/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : kkb

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2018-12-07 18:14:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for opencourse
-- ----------------------------
DROP TABLE IF EXISTS `opencourse`;
CREATE TABLE `opencourse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of opencourse
-- ----------------------------

-- ----------------------------
-- Table structure for opencourses
-- ----------------------------
DROP TABLE IF EXISTS `opencourses`;
CREATE TABLE `opencourses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `poster` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of opencourses
-- ----------------------------

-- ----------------------------
-- Table structure for open_course
-- ----------------------------
DROP TABLE IF EXISTS `open_course`;
CREATE TABLE `open_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(200) NOT NULL,
  `time` datetime DEFAULT NULL,
  `count` int(11) DEFAULT '0',
  `poster` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='公开课表';

-- ----------------------------
-- Records of open_course
-- ----------------------------
INSERT INTO `open_course` VALUES ('1', '互联网海量分布式架构演进之路', '互联网海量分布式架构演进之路', '2011-11-11 20:00:00', '0', '1542376410117.jpg');
INSERT INTO `open_course` VALUES ('2', 'Python多线程故事', '理解多线程编程的意义和作用', '2011-11-18 20:00:00', '0', '1542376410117.jpg');
INSERT INTO `open_course` VALUES ('3', 'aaa2', 'bbb2', '2019-11-15 04:00:00', '0', '1544176952491.jpeg');
INSERT INTO `open_course` VALUES ('14', 'dd1', 'dd1', '2018-12-08 18:02:00', '0', '1544173589126.jpeg');
INSERT INTO `open_course` VALUES ('16', 'xx', 'xx', '2019-12-07 03:03:00', '0', '1544176986985.jpeg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'tom', 'cruise', null);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'tom', 'cruise', null, '2018-12-07 09:06:27', '2018-12-07 09:06:27');

-- ----------------------------
-- Table structure for verify_code
-- ----------------------------
DROP TABLE IF EXISTS `verify_code`;
CREATE TABLE `verify_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(11) NOT NULL,
  `code` varchar(6) NOT NULL,
  `expires` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of verify_code
-- ----------------------------
INSERT INTO `verify_code` VALUES ('1', '17337952504', '949439', '2018-11-21 21:16:43');
INSERT INTO `verify_code` VALUES ('2', '17337952504', '210939', '2018-11-21 21:31:26');

-- ----------------------------
-- Table structure for vip_course
-- ----------------------------
DROP TABLE IF EXISTS `vip_course`;
CREATE TABLE `vip_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `poster` varchar(256) DEFAULT NULL,
  `icon` varchar(256) DEFAULT NULL,
  `desc` varchar(200) DEFAULT NULL,
  `cooperation` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='VIP课程表';

-- ----------------------------
-- Records of vip_course
-- ----------------------------
INSERT INTO `vip_course` VALUES ('1', 'WEB全栈架构师', '/vip-course/web', 'https://img.kaikeba.com/web_vip.png', 'https://img.kaikeba.com/web_menu.png', '授课深度对标百度，。。。。。。。。。。。。https://img.kaikeba.com/baidu.png', 'https://img.kaikeba.com/baidu.png,https://img.kaikeba.com/toutiao.png');
INSERT INTO `vip_course` VALUES ('2', 'Python爬虫训练营', '/vip-course/python', 'https://img.kaikeba.com/web_vip.png', 'https://img.kaikeba.com/web_menu.png', '授课深度对标百度，。。。。。。。。。。。。https://img.kaikeba.com/baidu.png', 'https://img.kaikeba.com/baidu.png,https://img.kaikeba.com/toutiao.png');
