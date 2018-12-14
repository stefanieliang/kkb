/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : kkb

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2018-12-14 18:26:13
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='公开课表';

-- ----------------------------
-- Records of open_course
-- ----------------------------
INSERT INTO `open_course` VALUES ('1', '互联网海量分布式架构演进之路', '互联网海量分布式架构演进之路', '2011-11-11 20:00:00', '0', '1542376410117.jpg');
INSERT INTO `open_course` VALUES ('2', 'Python多线程故事', '理解多线程编程的意义和作用', '2011-11-18 20:00:00', '0', '1542376410117.jpg');
INSERT INTO `open_course` VALUES ('3', 'aaa2', 'bbb2', '2019-11-15 04:00:00', '0', '1544176952491.jpeg');
INSERT INTO `open_course` VALUES ('14', 'dd1', 'dd1', '2018-12-08 18:02:00', '0', '1544173589126.jpeg');
INSERT INTO `open_course` VALUES ('16', 'xx', 'xx', '2019-12-07 03:03:00', '0', '1544176986985.jpeg');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('Ji6OzBOx4-tZlZoMPheMNZuLB_qfVTne', '1544847543', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2275736572223A7B226964223A332C22757365726E616D65223A22E5ADA6E5919831353434363938343636363930222C2270686F6E65223A223133323639303636303934227D7D);
INSERT INTO `sessions` VALUES ('OZJQIqdPPweHDTkJV08mED15SWzUrE21', '1544859250', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2275736572223A7B226964223A332C22757365726E616D65223A22E5ADA6E5919831353434363938343636363930222C2270686F6E65223A223133323639303636303934227D7D);
INSERT INTO `sessions` VALUES ('UzRYUQ4mQGMJN-teNg3AE9WK_r32XYhg', '1544847496', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2275736572223A7B226964223A332C22757365726E616D65223A22E5ADA6E5919831353434363938343636363930222C2270686F6E65223A223133323639303636303934227D7D);
INSERT INTO `sessions` VALUES ('VICc9Dzjj8XlIj8e4oVR7TrueLzXPJqu', '1545365964', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A3630343830303030302C2265787069726573223A22323031382D31322D32315430343A31393A32332E3735315A222C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2275736572223A7B226964223A332C22757365726E616D65223A22E5ADA6E5919831353434363938343636363930222C2270686F6E65223A223133323639303636303934227D7D);
INSERT INTO `sessions` VALUES ('x_lR4NTWMIpX4f8NySU_OJyDgU3n7rbP', '1544847463', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2275736572223A7B226964223A332C22757365726E616D65223A22E5ADA6E5919831353434363938343636363930222C2270686F6E65223A223133323639303636303934227D7D);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `phone` varchar(11) NOT NULL,
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('3', '学员1544698466690', '13269066094', 'd0535ff17eeb19cf75275569132ea6b3');
INSERT INTO `user` VALUES ('4', '学员1544698793186', '13269066095', 'd0535ff17eeb19cf75275569132ea6b3');
INSERT INTO `user` VALUES ('5', '学员1544698803212', '13269066096', 'd0535ff17eeb19cf75275569132ea6b3');
INSERT INTO `user` VALUES ('6', '学员1544698813509', '13269066097', 'd0535ff17eeb19cf75275569132ea6b3');
INSERT INTO `user` VALUES ('7', '学员1544698827754', '13269066098', 'd0535ff17eeb19cf75275569132ea6b3');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='手机验证码存储表';

-- ----------------------------
-- Records of verify_code
-- ----------------------------
INSERT INTO `verify_code` VALUES ('3', '13269066094', '000624', '2018-12-10 17:17:07');
INSERT INTO `verify_code` VALUES ('4', '13269066094', '776400', '2018-12-12 11:55:14');
INSERT INTO `verify_code` VALUES ('5', '13269066094', '008137', '2018-12-13 17:29:35');
INSERT INTO `verify_code` VALUES ('6', '13269066094', '334201', '2018-12-13 17:37:53');
INSERT INTO `verify_code` VALUES ('7', '13269066094', '443649', '2018-12-13 18:36:41');
INSERT INTO `verify_code` VALUES ('8', '13269066094', '780650', '2018-12-13 18:40:26');
INSERT INTO `verify_code` VALUES ('9', '13269066094', '002131', '2018-12-13 18:41:29');

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
