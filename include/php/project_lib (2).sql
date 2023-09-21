-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 21, 2023 at 08:23 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_lib`
--

-- --------------------------------------------------------

--
-- Table structure for table `lib_book`
--

CREATE TABLE `lib_book` (
  `book_id` int(11) NOT NULL,
  `book_school` int(11) NOT NULL,
  `book_isbn` varchar(50) NOT NULL,
  `book_ref` varchar(50) DEFAULT NULL,
  `book_barcode` varchar(50) NOT NULL,
  `book_name` varchar(300) NOT NULL,
  `book_year` int(11) NOT NULL DEFAULT 2566,
  `book_shelf_id` int(11) NOT NULL DEFAULT 1,
  `book_group_id` int(11) NOT NULL DEFAULT 1,
  `book_num` int(11) NOT NULL DEFAULT 1,
  `book_remark` varchar(250) DEFAULT NULL,
  `book_status` int(1) NOT NULL DEFAULT 1,
  `book_lastupdate` datetime NOT NULL DEFAULT current_timestamp(),
  `book_cover` varchar(50) NOT NULL DEFAULT 'null.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lib_book`
--

INSERT INTO `lib_book` (`book_id`, `book_school`, `book_isbn`, `book_ref`, `book_barcode`, `book_name`, `book_year`, `book_shelf_id`, `book_group_id`, `book_num`, `book_remark`, `book_status`, `book_lastupdate`, `book_cover`) VALUES
(1, 1, '123', '158.1 น239ส 2537', '123', 'เสริมพัฒนาการลูกน้อยด้วยของเล่น', 2023, 1, 2, 1, NULL, 1, '2023-09-19 23:32:36', 'null.png'),
(2, 1, '111', '441 พ639ค 2552', '111', 'วิทยาศาสตร์น่ารู้', 2023, 1, 1, 1, NULL, 1, '2023-09-19 23:33:29', '20230919-233329-JW7aD.jpg'),
(3, 1, '124', 'กข2556 กดส2', '124', 'คิดอย่างอัจฉริยะ', 2023, 1, 1, 2, NULL, 1, '2023-09-20 13:01:22', 'null.png'),
(4, 1, '125', '028.8 ถ159ก 2549', '125', 'การทำขนมไทย สูตรชาววังแท้', 2023, 3, 2, 1, NULL, 1, '2023-09-20 13:02:38', 'null.png');

-- --------------------------------------------------------

--
-- Table structure for table `lib_book_group`
--

CREATE TABLE `lib_book_group` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(50) NOT NULL,
  `group_remark` varchar(250) DEFAULT NULL,
  `group_school` int(11) NOT NULL DEFAULT 1,
  `group_status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lib_book_group`
--

INSERT INTO `lib_book_group` (`group_id`, `group_name`, `group_remark`, `group_school`, `group_status`) VALUES
(1, 'วิทยาศาสตร์', NULL, 1, 1),
(2, 'พืชผักสวนครัว', NULL, 1, 1),
(3, 'การ์ตูน', NULL, 1, 1),
(4, 'ศิลปะ', 'sdsdsdsd', 1, 1),
(5, 'คณิตศาสตร์', '', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lib_book_shelf`
--

CREATE TABLE `lib_book_shelf` (
  `shelf_id` int(11) NOT NULL,
  `shelf_code` varchar(30) NOT NULL,
  `shelf_remark` varchar(250) DEFAULT NULL,
  `shelf_school` int(11) NOT NULL DEFAULT 1,
  `shelf_status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lib_book_shelf`
--

INSERT INTO `lib_book_shelf` (`shelf_id`, `shelf_code`, `shelf_remark`, `shelf_school`, `shelf_status`) VALUES
(1, 'ก01', NULL, 1, 1),
(2, 'ก02', NULL, 1, 1),
(3, 'ขก01', NULL, 1, 1),
(4, 'ขก03', 'sdsd', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lib_borrow`
--

CREATE TABLE `lib_borrow` (
  `borrow_id` int(11) NOT NULL,
  `borrow_no` varchar(15) NOT NULL,
  `borrow_token` varchar(50) NOT NULL,
  `borrow_user_id` int(11) NOT NULL,
  `borrow_create_doc` datetime NOT NULL DEFAULT current_timestamp(),
  `borrow_create_by` int(11) NOT NULL,
  `borrow_startdate` date NOT NULL,
  `borrow_duedate` date NOT NULL,
  `borrow_status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lib_borrow`
--

INSERT INTO `lib_borrow` (`borrow_id`, `borrow_no`, `borrow_token`, `borrow_user_id`, `borrow_create_doc`, `borrow_create_by`, `borrow_startdate`, `borrow_duedate`, `borrow_status`) VALUES
(1, '23090001', 'FLcQbB', 1, '2023-09-21 01:31:52', 1, '2023-09-21', '2023-09-28', 1),
(2, '23090002', 'vhdExi', 1, '2023-09-21 01:32:07', 1, '2023-09-21', '2023-09-28', 1),
(3, '23090003', 'D0QBck', 1, '2023-09-21 10:53:06', 1, '2023-09-21', '2023-09-28', 1),
(4, '23090004', 'WAZKGv', 1, '2023-09-21 13:28:38', 1, '2023-09-21', '2023-09-28', 1),
(5, '23090005', 'qaD3Hs', 2, '2023-09-21 14:29:43', 1, '2023-09-21', '2023-09-28', 1);

-- --------------------------------------------------------

--
-- Table structure for table `lib_borrow_book`
--

CREATE TABLE `lib_borrow_book` (
  `bb_id` int(11) NOT NULL,
  `bb_borrow_id` int(11) NOT NULL,
  `bb_book_id` int(11) NOT NULL,
  `bb_return` datetime DEFAULT NULL,
  `bb_received` int(11) NOT NULL DEFAULT 0,
  `bb_status` int(1) NOT NULL DEFAULT 1,
  `bb_timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lib_borrow_book`
--

INSERT INTO `lib_borrow_book` (`bb_id`, `bb_borrow_id`, `bb_book_id`, `bb_return`, `bb_received`, `bb_status`, `bb_timestamp`) VALUES
(1, 1, 1, '2023-09-21 20:00:35', 1, 2, '2023-09-21 01:31:52'),
(2, 1, 3, '2023-09-21 22:27:57', 1, 2, '2023-09-21 01:31:52'),
(3, 2, 1, '2023-09-21 14:27:42', 1, 2, '2023-09-21 01:32:07'),
(4, 2, 3, NULL, 0, 1, '2023-09-21 01:32:07'),
(5, 3, 1, '2023-09-21 14:24:19', 1, 2, '2023-09-21 10:53:06'),
(6, 3, 3, '2023-09-21 14:28:03', 1, 2, '2023-09-21 10:53:06'),
(7, 4, 4, NULL, 0, 1, '2023-09-21 13:28:38'),
(8, 5, 2, NULL, 0, 1, '2023-09-21 14:29:43'),
(9, 5, 4, NULL, 0, 1, '2023-09-21 14:29:43');

-- --------------------------------------------------------

--
-- Table structure for table `lib_checkin`
--

CREATE TABLE `lib_checkin` (
  `checkin_id` int(11) NOT NULL,
  `checkin_school` int(11) NOT NULL,
  `checkin_user` int(11) NOT NULL,
  `checkin_time` datetime NOT NULL DEFAULT current_timestamp(),
  `checkin_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lib_checkin`
--

INSERT INTO `lib_checkin` (`checkin_id`, `checkin_school`, `checkin_user`, `checkin_time`, `checkin_status`) VALUES
(1, 1, 2, '2023-09-07 18:26:37', 1),
(2, 1, 1, '2023-09-07 18:27:39', 1),
(3, 1, 1, '2023-09-10 18:27:45', 1),
(4, 1, 1, '2023-09-11 18:29:41', 1),
(5, 1, 1, '2023-09-11 18:54:47', 1),
(6, 1, 1, '2023-09-11 18:55:04', 1),
(7, 1, 2, '2023-09-11 19:00:36', 1),
(8, 1, 2, '2023-09-11 19:22:54', 1),
(9, 1, 1, '2023-09-11 19:23:20', 1),
(10, 1, 2, '2023-09-11 19:23:26', 1),
(11, 1, 1, '2023-09-11 19:32:15', 1),
(12, 1, 1, '2023-09-16 19:43:17', 1),
(13, 1, 1, '2023-09-17 10:06:11', 1),
(14, 1, 1, '2023-09-18 14:10:20', 1),
(15, 1, 5, '2023-09-20 12:14:58', 1),
(16, 1, 1, '2023-09-20 15:44:20', 1),
(17, 1, 1, '2023-09-19 15:44:25', 1),
(18, 1, 1, '2023-09-20 15:44:34', 1),
(19, 1, 1, '2023-09-21 15:49:15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `lib_school`
--

CREATE TABLE `lib_school` (
  `school_id` int(11) NOT NULL,
  `school_name` varchar(250) NOT NULL,
  `school_package` int(11) NOT NULL DEFAULT 1,
  `school_remark` varchar(250) NOT NULL,
  `school_status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lib_school`
--

INSERT INTO `lib_school` (`school_id`, `school_name`, `school_package`, `school_remark`, `school_status`) VALUES
(1, 'โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179', 1, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `lib_users`
--

CREATE TABLE `lib_users` (
  `user_id` int(11) NOT NULL,
  `user_school` int(11) NOT NULL,
  `user_prefix` int(11) NOT NULL DEFAULT 1,
  `user_sid` varchar(10) NOT NULL,
  `user_fname` varchar(50) DEFAULT NULL,
  `user_lname` varchar(50) DEFAULT NULL,
  `user_nickname` varchar(50) DEFAULT NULL,
  `user_profile` varchar(50) NOT NULL DEFAULT 'null.png',
  `user_class` int(2) NOT NULL,
  `user_year` int(5) NOT NULL,
  `user_room` int(2) NOT NULL DEFAULT 1,
  `user_type` int(11) NOT NULL DEFAULT 1 COMMENT '1=student,2=teacher,3=other',
  `user_status` int(1) NOT NULL DEFAULT 1,
  `user_create` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lib_users`
--

INSERT INTO `lib_users` (`user_id`, `user_school`, `user_prefix`, `user_sid`, `user_fname`, `user_lname`, `user_nickname`, `user_profile`, `user_class`, `user_year`, `user_room`, `user_type`, `user_status`, `user_create`) VALUES
(1, 1, 1, '19077', 'ปฏิภาณ', 'อินธิบาล', 'ทิว', '20230919-214820-FRVRw.png', 3, 1, 1, 1, 1, '2023-09-19 14:17:14'),
(2, 1, 1, '19078', 'ชื่อจริง', 'นามสกุล', NULL, 'null.png', 1, 1, 1, 3, 1, '2023-09-19 14:17:14'),
(3, 1, 1, '19079', '1', '1', '', '20230919-142251-Nx1d7.png', 0, 1, 0, 1, 0, '2023-09-19 14:22:51'),
(4, 1, 1, '19080', '1', '1', '', '20230919-142439-yarwi.png', 0, 0, 0, 1, 0, '2023-09-19 14:24:39'),
(5, 1, 1, '19081', '111122', '2222', '', 'null.png', 0, 0, 0, 1, 1, '2023-09-19 14:25:56'),
(6, 1, 1, '19082', 'ss', 'ss', '', '20230919-143144-kTj2t.png', 0, 0, 0, 1, 0, '2023-09-19 14:31:44'),
(7, 1, 1, '19083', '0100', '01222', '00', 'null.png', 0, 0, 0, 2, 1, '2023-09-19 16:53:17');

-- --------------------------------------------------------

--
-- Table structure for table `lib_yearStudy`
--

CREATE TABLE `lib_yearStudy` (
  `year_id` int(11) NOT NULL,
  `year_forschool` int(11) NOT NULL DEFAULT 1,
  `year_digit` int(7) NOT NULL,
  `year_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lib_yearStudy`
--

INSERT INTO `lib_yearStudy` (`year_id`, `year_forschool`, `year_digit`, `year_status`) VALUES
(1, 1, 2566, 1);

-- --------------------------------------------------------

--
-- Table structure for table `master_account`
--

CREATE TABLE `master_account` (
  `MasterId` int(11) NOT NULL,
  `MasterMail` varchar(100) NOT NULL,
  `MasterPass` varchar(50) NOT NULL,
  `MasterName` varchar(100) NOT NULL,
  `MasterPhone` varchar(20) NOT NULL,
  `MasterStatus` int(1) NOT NULL DEFAULT 0,
  `MasterType` int(1) NOT NULL DEFAULT 1,
  `MasterToken` varchar(50) NOT NULL,
  `MasterRegis` varchar(15) NOT NULL,
  `MasterUpdate` varchar(15) NOT NULL,
  `MasterRole` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `master_account`
--

INSERT INTO `master_account` (`MasterId`, `MasterMail`, `MasterPass`, `MasterName`, `MasterPhone`, `MasterStatus`, `MasterType`, `MasterToken`, `MasterRegis`, `MasterUpdate`, `MasterRole`) VALUES
(1, 'patipan.int@gmail.com', 'f06d1bec7b1417d27574c2eb01d72f7b', 'Admin1', '0922959111', 1, 0, 'TyzQ9wXgzqP2', '1683357972', '1683357972', 0),
(10, 'patipan@gmail.com', '4ae652dc99509ae58e28741b8e78ec52', 'Patipan', '0922959111', 1, 1, '9hACDvoJ5Agl', '1695029271', '1695029271', 1);

-- --------------------------------------------------------

--
-- Table structure for table `system_setting`
--

CREATE TABLE `system_setting` (
  `setId` int(11) NOT NULL,
  `setKey` text NOT NULL,
  `setValue` longtext NOT NULL,
  `setValue2` text DEFAULT NULL,
  `setName` varchar(150) NOT NULL,
  `setDetail` text DEFAULT NULL,
  `setUpdate` datetime NOT NULL DEFAULT current_timestamp(),
  `setGroup` int(3) NOT NULL DEFAULT 1,
  `setType` int(1) NOT NULL DEFAULT 1,
  `setStatus` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `system_setting`
--

INSERT INTO `system_setting` (`setId`, `setKey`, `setValue`, `setValue2`, `setName`, `setDetail`, `setUpdate`, `setGroup`, `setType`, `setStatus`) VALUES
(1, 'web_logo', 'web_logo_1682927680_1_z2i6l.png', '128x128', 'ภาพ Logo', '.ico or .png ', '2023-05-01 14:54:40', 4, 1, 1),
(2, 'web_title', 'ระบบบันทึกข้อมูลการใช้บริการห้องสมุด\nโรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179', '-', 'ข้อความ Title Tab Bar', NULL, '2023-05-07 11:03:28', 4, 3, 1),
(3, 'web_des', 'เพื่อบันทึกข้อมูลการยืม-คืนหนังสือ และการเข้าใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179\nโดยให้บริการออนไลน์ ทั้งการยืม-คืน การบันทึกข้อมูลการเข้าใช้บริการ จัดการและออกบัตรประจำตัวสมาชิกผ่านระบบ รวมถึงรายงานสถิติการยืม-คืน การเข้าใช้บริการรายได้อย่างเรียลไทม์', '-', 'ข้อความ Description', NULL, '2023-05-07 11:03:28', 4, 3, 1),
(4, 'seokeyword', 'ระบบบันทึกข้อมูลการใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179', '-', 'SEO Keyword', 'คำที่ใช้ค้นหา', '2023-05-07 11:03:28', 4, 3, 1),
(5, 'facebook_title', 'ระบบบันทึกข้อมูลการใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179', '-', 'ข้อความ Title Facebook', NULL, '2023-05-06 23:36:18', 2, 2, 1),
(6, 'facebook_des', 'เพื่อบันทึกข้อมูลการยืม-คืนหนังสือ และการเข้าใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179\nโดยให้บริการออนไลน์ ทั้งการยืม-คืน การบันทึกข้อมูลการเข้าใช้บริการ จัดการและออกบัตรประจำตัวสมาชิกผ่านระบบ รวมถึงรายงานสถิติการยืม-คืน การเข้าใช้บริการรายได้อย่างเรียลไทม์', '-', 'ข้อความ Description Facebook', NULL, '2023-05-06 23:36:18', 2, 2, 1),
(7, 'facebook_image', 'facebook_image_1682929082_1_ljLI9.png', '1300x600', 'รูปภาพ Facebook', 'แสดงเมื่อแชร์ลงหน้า Facebook', '2023-05-01 15:18:02', 2, 1, 1),
(8, 'facebook_app_id', '171712511609473', '-', 'App Id', NULL, '2023-05-06 23:36:18', 2, 2, 1),
(9, 'facebook_admins', 'Patipan', '-', 'Admin', NULL, '2023-05-06 23:36:18', 2, 2, 1),
(10, 'useGoogleAnalytics', '0', 'แนะนำให้ใช้งาน', 'ใช้ Google Analytics เพื่อเก็บข้อมูลการเข้าชมเว็บไซต์', NULL, '2023-05-01 15:48:51', 21, 7, 1),
(11, 'GoogleAnalyticsCode', '<!-- Google tag (gtag.js) --><script async src=\"https://www.googletagmanager.com/gtag/js?id=G-N4VQ8KK9VK\"></script><script>  window.dataLayer = window.dataLayer || [];  function gtag(){dataLayer.push(arguments);}  gtag(\'js\', new Date());  gtag(\'config\', \'G-N4VQ8KK9VK\');</script>', 'หากไม่ทราบ โปรดติดต่อผู้พัฒนา', 'Script จาก Google มาวางที่นี่', 'คัดลองวางที่นี่ ห้ามใส่ข้อมูลอื่นนอกเหนือจาก Script จาก Google', '2023-05-01 15:48:51', 21, 3, 1),
(12, 'alertInLine', '1', 'รับการแจ้งเตือนทางไลน์', '', 'เมื่อมีลูกค้าส่งข้อความมาจากหน้าเว็บ', '2023-05-01 16:01:58', 14, 7, 1),
(13, 'lineAlertToken', 'cCL7zaqSGmsFcjQ8CzkxerHPY5BW1VdcPzv8ciCpgC2', '-', 'ระบุ Line Token สำหรับรับการแจ้งเตือน', 'เมื่อมีลูกค้าส่งข้อความมาจากหน้าเว็บ', '2023-05-01 16:01:58', 14, 2, 1),
(14, 'FacebookChatOption', '0', 'อนุญาตให้ลูกค้าแชทผ่าน Facebook ในหน้าเว็บ', 'มุมขวาล่าง', 'ต้องระบุข้อมูลจาก Facebook', '2023-05-01 16:01:58', 14, 7, 1),
(15, 'facebookDivE', '<!-- Messenger ปลั๊กอินแชท Code -->    <div id=\"fb-root\"></div>    <!-- Your ปลั๊กอินแชท code -->    <div id=\"fb-customer-chat\" class=\"fb-customerchat\">    </div>    <script>      var chatbox = document.getElementById(\'fb-customer-chat\');      chatbox.setAttribute(\"page_id\", \"104137097989218\");      chatbox.setAttribute(\"attribution\", \"biz_inbox\");    </script>    <!-- Your SDK code -->    <script>      window.fbAsyncInit = function() {        FB.init({          xfbml            : true,          version          : \'v14.0\'        });      };      (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0];        if (d.getElementById(id)) return;        js = d.createElement(s); js.id = id;        js.src = \'https://connect.facebook.net/th_TH/sdk/xfbml.customerchat.js\';        fjs.parentNode.insertBefore(js, fjs);      }(document, \'script\', \'facebook-jssdk\'));    </script>', 'หากไม่ทราบ โปรดติดต่อผู้พัฒนา', 'คัดลอกโค้ดจาก Facebook มาวางที่นี่', 'ห้ามใส่ข้อมูลนอกเหนือจาก code ของ Facebook', '2023-05-01 16:01:58', 14, 3, 1),
(16, 'social_fb_show', '1', '<img width=\"13px\" src=\"../../src/img/icon/fbA.png\"></a> แสดง icon Facebook', '', 'ปิดตัวเลือกนี้ icon จะไม่แสดงในหน้าเว็บ', '2023-05-08 08:30:24', 7, 7, 1),
(17, 'social_fb', 'https://www.facebook.com/habyhappybaby', '-', 'URL Facebok fanpage', 'ระบุ url ที่ถูกต้อง เช่น https://fb.me/plannedpro.co', '2023-05-08 08:30:24', 7, 5, 1),
(18, 'social_ig_show', '1', '<img width=\"13px\" src=\"../../src/img/icon/igA.png\"></a> แสดง icon Instagram', '', 'ปิดตัวเลือกนี้ icon จะไม่แสดงในหน้าเว็บ', '2023-05-08 08:30:24', 7, 7, 1),
(19, 'social_ig', 'https://www.instagram.com/habycarethailand', '', 'URL Instagram', 'ระบุ url ที่ถูกต้อง เช่น https://google.com', '2023-05-08 08:30:24', 7, 5, 1),
(20, 'social_yt_show', '1', '<img width=\"13px\" src=\"../../src/img/icon/ytA.png\"></a> แสดง icon Youtube', '', 'ปิดตัวเลือกนี้ icon จะไม่แสดงในหน้าเว็บ', '2023-05-08 08:30:24', 7, 7, 1),
(21, 'social_yt', 'https://www.youtube.com/channel/UCBVEYNGORhcegw7z4A9rN5A', '', 'URL Youtube', 'ระบุ url ที่ถูกต้อง เช่น https://www.youtube.com', '2023-05-08 08:30:24', 7, 5, 1),
(22, 'social_line_show', '1', '<img width=\"13px\" src=\"../../src/img/icon/lineA.png\"></a> แสดง icon Line', '', 'ปิดตัวเลือกนี้ icon จะไม่แสดงในหน้าเว็บ', '2023-05-08 08:30:24', 7, 7, 1),
(23, 'social_line', 'https://lin.ee/mTGugQF', '', 'URL Line', 'ระบุ url ที่ถูกต้อง เช่น https://lin.ee/', '2023-05-08 08:30:24', 7, 5, 1),
(24, 'social_tw_show', '0', '<i class=\"fab fa-tiktok\"></i></a> แสดง icon Tiktok', '', 'ปิดตัวเลือกนี้ icon จะไม่แสดงในหน้าเว็บ', '2023-05-08 08:30:24', 7, 7, 1),
(25, 'social_tw', 'https://lin.ee/', '', 'URL Tiktok', 'ระบุ url ที่ถูกต้อง เช่น https://lin.ee/', '2023-05-08 08:30:24', 7, 5, 1),
(26, 'PhoneContact_show', '0', '<i class=\"fas fa-phone-alt\"></i> แสดง icon โทรศัพท์หลัก', '', 'ปิดตัวเลือกนี้ icon จะไม่แสดงในหน้าเว็บ', '2023-05-08 08:30:24', 7, 7, 1),
(27, 'PhoneContact', '0922959111', '', 'หมายเลขโทรศัพท์หลัก', 'ตัวเลขเท่านั้น 1 หมายเลขเท่านั้น', '2023-05-08 08:30:24', 7, 2, 1),
(28, 'footer_logoShow', '1', 'แสดง Logo ในส่วนท้ายเว็บไซต์', '', 'แนะนำให้แสดง', '2023-05-07 19:10:56', 6, 7, 1),
(29, 'footer_logo', 'footer_logo_CleanCareTH_1_Kmeou.png', '', 'ภาพ Logo', 'อัตราส่วน 1:1 หรือ ขนาดประมาณ 250x250 px', '2023-05-01 16:58:56', 6, 1, 1),
(30, 'footer_CompanyNameShow', '1', 'แสดงชื่อบริษัทในส่วนท้ายเว็บไซต์', '', 'แนะนำให้แสดง', '2023-05-07 19:10:56', 6, 7, 1),
(31, 'footer_CompanyNameTH', 'บริษัท คลีน แคร์ คอนเซ็พท์ แมนูแฟคเจอริ่ง จำกัด', '', 'ชื่อบริษัท ', 'ภาษาไทย', '2023-05-07 19:10:56', 6, 2, 1),
(32, 'footer_CompanyNameEN', 'CLEAN CARE CONCEPT MANUFACTURING CO.,LTD.', '', 'ชื่อบริษัท ', 'English', '2023-05-07 19:10:56', 6, 2, 1),
(33, 'footer_CompanyAddressShow', '1', 'แสดง ที่ตั้ง/ที่อยู่ ในส่วนท้ายเว็บไซต์', '', 'แนะนำให้แสดง', '2023-05-07 19:10:56', 6, 7, 1),
(34, 'footer_CompanyAddressTH', '29/3 หมู่ 10 ต.บึงคำพร้อย อ.ลำลูกกา จ.ปทุมธานี 12150', '', 'ที่อยู่บริษัท ', 'ภาษาไทย', '2023-05-07 19:10:56', 6, 2, 1),
(35, 'footer_CompanyAddressEN', '29/3 Moo 10 Buengkamproi, Lumlukka, Pathumthani, Thailand. 12150', '', 'ที่อยู่บริษัท ', 'English', '2023-05-07 19:10:56', 6, 2, 1),
(36, 'footer_CompanyOtherShow', '1', 'แสดง ข้อความเพิ่มเติมในส่วนท้ายเว็บไซต์', '', 'แนะนำให้แสดง', '2023-05-07 19:10:56', 6, 7, 1),
(37, 'footer_CompanyOtherTH', 'โทรศัพท์ : 02-5772139 | ID LINE : @HABY', '', 'ข้อความเพิ่มเติม', 'ภาษาไทย', '2023-05-07 19:10:56', 6, 2, 1),
(38, 'footer_CompanyOtherEN', 'Tel : 02-5772139 | ID LINE : @HABY', '', 'ข้อความเพิ่มเติม', 'English', '2023-05-07 19:10:56', 6, 2, 1),
(39, 'social_email_show', '0', '<i class=\"fas fa-envelope\"></i> แสดง icon Email', '', 'ปิดตัวเลือกนี้ icon จะไม่แสดงในหน้าเว็บ', '2023-05-08 08:30:24', 7, 7, 1),
(40, 'social_email', 'contact@plannedpro.co', '', 'Email Address', 'email@domain', '2023-05-08 08:30:24', 7, 2, 1),
(41, 'contact_CompanyNameShow', '1', 'แสดงชื่อบริษัท', '', 'แนะนำให้แสดง', '2023-05-17 17:15:17', 10, 7, 1),
(42, 'contact_CompanyNameTH', 'บริษัท คลีน แคร์ คอนเซ็พท์ แมนูแฟคเจอริ่ง จำกัด', '', 'ชื่อบริษัท ', 'ภาษาไทย', '2023-05-17 17:15:17', 10, 2, 1),
(43, 'contact_CompanyNameEN', 'CLEAN CARE CONCEPT MANUFACTURING CO.,LTD.', '', 'ชื่อบริษัท ', 'English', '2023-05-17 17:15:17', 10, 2, 1),
(44, 'contact_CompanyAddressShow', '1', 'แสดง ที่ตั้ง/ที่อยู่', '', 'แนะนำให้แสดง', '2023-05-17 17:15:17', 10, 7, 1),
(45, 'contact_CompanyAddressTH', '29/3 หมู่ 10 ต.บึงคำพร้อย อ.ลำลูกกา จ.ปทุมธานี 12150', '', 'ที่อยู่บริษัท ', 'ภาษาไทย', '2023-05-17 17:15:17', 10, 2, 1),
(46, 'contact_CompanyAddressEN', '29/3 Moo 10 Buengkamproi, Lumlukka, Pathumthani, Thailand. 12150', '', 'ที่อยู่บริษัท ', 'English', '2023-05-17 17:15:17', 10, 2, 1),
(47, 'contact_phoneShow', '1', 'แสดงหมายเลขโทรศัพท์', '', 'แนะนำให้แสดง', '2023-05-17 17:15:17', 10, 7, 1),
(48, 'contact_phone', '02-5772139', '', 'เบอร์โทรศัพท์หลัก', '1 หมายเลข', '2023-05-17 17:15:17', 10, 2, 1),
(49, 'contact_lineShow', '1', 'แสดงข้อมูล Line ', '', 'แนะนำให้แสดง', '2023-05-17 17:15:17', 10, 7, 1),
(50, 'contact_line', '@HABY', '', 'Line ID', '', '2023-05-17 17:15:17', 10, 2, 1),
(51, 'contact_line_url', 'https://line.me/R/ti/p/@oao4937n', '', 'URL Add Line', 'https://...', '2023-05-17 17:15:17', 10, 5, 1),
(52, 'contact_emailShow', '1', 'แสดงข้อมูล Email', '', 'แนะนำให้แสดง', '2023-05-17 17:15:17', 10, 7, 1),
(53, 'contact_email', 'SALESCCARE1@GMAIL.COM', '', 'Email หลัก', '', '2023-05-17 17:15:17', 10, 2, 1),
(54, 'contact_OtherShow', '1', 'แสดงข้อความ Subtitle', '', 'แนะนำให้แสดง', '2023-05-17 17:15:17', 10, 7, 1),
(55, 'contact_OtherTH', 'แผนก OEM ติดต่อที่ไลน์ ID : @HABY', '', 'Subtitle ', 'ภาษาไทย', '2023-05-17 17:15:17', 10, 2, 1),
(56, 'contact_OtherEN', 'SECTION OEM CONTACT LINE ID : @HABY', '', 'Subtitle', 'English', '2023-05-17 17:15:17', 10, 2, 1),
(57, 'contact_titleFormShow', '0', 'แสดงฟอร์มติดต่อเรา', '', 'แนะนำให้แสดง', '2023-05-01 19:24:46', 10, 7, 0),
(58, 'contact_titleFormTH', 'ส่งข้อความถึงเรา', '', 'ชื่อหัวข้อฟอร์มติดต่อเรา', 'ภาษาไทย', '2023-05-17 17:15:17', 10, 2, 1),
(59, 'contact_titleFormEN', 'SEND US A MESSAGE', '', 'ชื่อหัวข้อฟอร์มติดต่อเรา', 'English', '2023-05-17 17:15:17', 10, 2, 1),
(60, 'contact_subtitleFormShow', '1', 'แสดงข้อความ Subtitle ', '', 'แนะนำให้แสดง', '2023-05-17 17:15:17', 10, 7, 1),
(61, 'contact_subtitleFormTH', 'ทางเจ้าหน้าที่ฝ่ายลูกค้าสัมพันธ์จะติดต่อท่านกลับภายใน 24 ชม.<br>ตามวันและเวลาทำการ โทร: 025772139 แผนก OEM ติดต่อที่ไลน์ ID : @HABY', '', 'ข้อความ Subtitle ', 'ภาษาไทย', '2023-05-17 17:15:17', 10, 3, 1),
(62, 'contact_subtitleFormEN', 'Customer service staff will contact you back within 24 hours.<br>According to business days and hours, call: 025772139, OEM department contact Line ID: linechoom', '', 'ข้อความ Subtitle', 'English', '2023-05-17 17:15:17', 10, 3, 1),
(63, 'contact_showInputAttachmentFormShow', '1', 'แสดง Input สำหรับแนบไฟล์', '', 'หากไม่ต้องการให้แนบไฟล์ โปรดปิดการตั้งค่านี้', '2023-05-17 17:15:17', 10, 7, 1),
(64, 'contact_titleBTNSubmitEN', 'SUBMIT', '', 'ข้อความแสดงบนปุ่มส่ง', 'English', '2023-05-17 17:15:17', 10, 2, 1),
(65, 'contact_titleBTNSubmitTH', 'ส่งข้อความถึงเรา', '', 'ข้อความแสดงบนปุ่มส่ง', 'ภาษาไทย', '2023-05-17 17:15:17', 10, 2, 1),
(66, 'contact_distributorsShow', '1', 'แสดงส่วนตัวแทนจำหน่าย', '', '', '2023-05-07 18:48:14', 11, 7, 1),
(67, 'contact_distributorsTH', 'ศูนย์กระจายสินค้า<br>และตัวแทนจำหน่ายสินค้า HABY', '', 'ข้อความ Title ส่วนตัวแทนจำหน่าย', 'ภาษาไทย', '2023-05-07 18:48:14', 11, 3, 1),
(68, 'contact_distributorsEN', 'DISTRIBUTION CENTER<br>AND DISTRIBUTORS OF HABY PRODUCTS', '', 'ข้อความ Title ส่วนตัวแทนจำหน่าย', 'English', '2023-05-07 18:48:14', 11, 3, 1),
(69, 'contact_distributorsSearchShow', '1', 'แสดงช่องสำหรับพิมพ์ค้นหา', '', '', '2023-05-07 18:48:14', 11, 7, 1),
(70, 'about_DetailTH', '<p><span style=\"\">&nbsp; &nbsp; &nbsp; บริษัท คลีน แคร์ คอนเซ็พท์ แมนูแฟคเจอริ่ง จำกัด ก่อตั้งขึ้นเมื่อปี พ.ศ. 2553 โดยเริ่มต้นจากกิจการภายในครอบครัว จึงมีแนวคิดที่ต้องการลดต้นทุนร้านซัก อบ รีด เสื้อผ้าของตนเองโดยเริ่มผลิตลองใช้เองในร้านปรากฎว่าได้รับคำชื่นชมจากลูกค้ามากมาย จึงพบช่องทางในการทำธุรกิจเพิ่มเติม ในปี 2554 ได้ขยายกิจการ และจดทะเบียนการค้า เมื่อวันที่ 20 มกราคม 2554 โดยเป็นโรงงานผู้ผลิต สินค้าในครัวเรือน กลุ่มผลิตภัณฑ์ดูแลผ้า (Fabric Care) ผลิตภัณฑ์ปรับผ้านุ่ม ผลิตภัณฑ์ซักผ้า ผลิตภัณฑ์ล้างจาน ผลิตภัณฑ์ ถูทำความสะอาดพื้น สเปรย์ฉีดผ้าหอม ด้วยประสบการณ์ยาวนานกว่า 10 ปี บริษัท คลีน แคร์ คอนเซ็พท์ แมนูแฟคเจอริ่ง จำกัด มุ่งเน้น ที่จะผลิตและพัฒนาสินค้าให้มีความพิเศษทั้งคุณภาพ ปริมาณ และราคาที่เหมาะสมจากผู้ผลิตถึงผู้บริโภค ทั้งในประเทศและต่างประเทศ เพื่อให้เป็นผลิตภัณฑ์ที่ได้รับความนิยมในตลาด โดยเฉพาะผลิตภัณฑ์ปรับผ้านุ่มแบบแกลลอนใส ขนาด 5600 มล. ที่มีฐานลูกค้าจำนวนมาก พิเศษด้วยความคุ้มค่าของขนาด และคุณภาพหอมติดทนนาน เป็นผลิตภัณฑ์ดูแลผ้า (Fabric Care) ที่ลูกค้าไว้วางใจเลือกใช้มายาวนาน และยังมีความพร้อมที่จะให้คำแนะนำ และให้คำปรึกษาเกี่ยวกับการผลิตสินค้าในแบรนด์ของลูกค้า (OEM) ให้ลูกค้ามั่นใจได้ว่าผลิตภัณฑ์ของ บริษัทจะมีคุณภาพ และมีคุณสมบัติตรงตามความต้องการของลูกค้า โดยได้ผ่านการรับรองมาตรฐาน ISO 9001:2015 และมาตรฐาน GHPs &amp; HACCP</span></p>', NULL, 'รายละเอียดเกี่ยวกับบริษัท', 'ภาษาไทย', '2023-05-18 15:26:52', 9, 8, 1),
(71, 'about_DetailEN', '<p><span style=\"\">&nbsp; &nbsp; &nbsp;Clean Care Concept Manufacturing Co., Ltd. was established in 2010 by starting from a family business. Therefore, there is an idea to reduce the cost of their own laundry, dry, ironing shop by starting to produce and try it yourself in the shop. It turns out that it has been appreciated by many customers. therefore found more ways to do business. And registered the trade on January 20, 2011 as a manufacturer. household goods Fabric care products (Fabric Care) fabric softener products laundry products Dishwashing products, floor cleaning products scented fabric spray With more than 10 years of experience, Clean Care Concept Manufacturing Co., Ltd. focuses on producing and developing special products in terms of quality, quantity and reasonable prices from manufacturers to consumers. both domestically and internationally to be a popular product in the market Especially the fabric softener in a clear gallon size of 5600 ml with a large customer base. Special value for money and good quality, long lasting fragrance It is a fabric care product that customers trust and use for a long time. and also ready to give advice And give advice on the production of products in the customer\'s brand (OEM) so that customers can be confident that their products The company will have quality and meet the requirements of customers It has been certified ISO 9001:2015and GHPs &amp; HACCP standards</span><br></p>', NULL, 'รายละเอียดเกี่ยวกับบริษัท', 'English', '2023-05-18 15:26:52', 9, 8, 1),
(72, 'about_DetailImg', 'about_DetailImg_CleanCareTH_8_Es2Ck.png', NULL, 'รูปภาพประกอบ', '', '2023-05-16 17:21:41', 9, 9, 1),
(73, 'about_policyShow', '1', 'แสดงส่วนนโยบายคุณภาพ', '', '', '2023-05-01 20:34:53', 12, 7, 1),
(74, 'about_textpolicyTH', 'นโยบายคุณภาพ GHPS & HACCP', '', 'ข้อความ Title ส่วนนโยบายคุณภาพ GHPS & HACCP', 'ภาษาไทย', '2023-05-01 20:34:53', 12, 2, 1),
(75, 'about_textpolicyEN', 'QUALITY POLICY GHPS & HACCP', '', 'ข้อความ Title ส่วนนโยบายคุณภาพ GHPS & HACCP', 'English', '2023-05-01 20:34:53', 12, 2, 1),
(76, 'about_policySubShow', '1', 'แสดงข้อความนโยบายคุณภาพ', '', '', '2023-05-01 20:34:53', 12, 7, 1),
(77, 'about_subtextpolicyTH', '“ ผลิตสินค้ามีคุณภาพ และปลอดภัย <br> ปฏิบัติถูกตั้งแต่เริ่มต้น มุ่งพัฒนาสู่มาตรฐานสากล ”', '', 'ข้อความ Title นโยบาย', 'ภาษาไทย', '2023-05-01 20:34:53', 12, 2, 1),
(78, 'about_subtextpolicyEN', '“ ผลิตสินค้ามีคุณภาพ และปลอดภัย <br> ปฏิบัติถูกตั้งแต่เริ่มต้น มุ่งพัฒนาสู่มาตรฐานสากล ”', '', 'ข้อความ Title นโยบาย', 'English', '2023-05-01 20:34:53', 12, 2, 1),
(79, 'about_policyImg', 'about_policyImg_CleanCareTH_1_CL0Eq.png', '', 'ภาพประกอบนโยบาย', NULL, '2023-05-01 20:33:59', 12, 9, 1),
(80, 'about_policyImg', 'about_policyImg_CleanCareTH_1_7pN0T.png', '', 'ภาพประกอบ', NULL, '2023-05-01 20:30:37', 9, 9, 0),
(81, 'about_vistionShow', '1', 'แสดงส่วนวิสัยทัศน์', '', '', '2023-05-25 11:43:37', 13, 7, 1),
(82, 'about_titlevistionTH', 'วิสัยทัศน์', '', 'ข้อความ Title ส่วนวิสัยทัศน์', 'ภาษาไทย', '2023-05-25 11:43:37', 13, 2, 1),
(83, 'about_titlevistionEN', 'Vision', '', 'ข้อความ Title ส่วนวิสัยทัศน์', 'English', '2023-05-25 11:43:37', 13, 2, 1),
(84, 'about_detailvistionTH', '<p><span style=\"\">&nbsp;บริษัท คลีน แคร์ คอนเซ็พท์ แมนูแฟคเจอริ่ง จำกัด จะเป็นบริษัทผู้ผลิต และจำหน่ายผลิตภัณฑ์สินค้าในครัวเรือน สินค้ากลุ่มทำความสะอาด ที่เติบโต และขยายฐานลูกค้าให้ทั่วประเทศ และประเทศในภูมิภาคเอเชีย เพื่อตอบสนองความต้องการของลูกค้า โดยมุ่งเน้นพัฒนาผลิตภัณฑ์ ให้มีความพิเศษทั้งคุณภาพ ราคา ด้วยการบริการที่เป็นเลิศ พร้อมกับนำเทคโนโลยี เครื่องจักร และนวัตกรรมที่ทันสมัย มาพัฒนาสินค้าให้ครองใจลูกค้าในทุกระดับ คำนึงถึงคุณภาพ ความปลอดภัยตามมาตรฐานสากล และเป็นมิตรกับสิ่งแวดล้อม เพื่อการเติบโต และการพัฒนา ที่ยั่งยืน</span><br></p>', NULL, 'รายละเอียดเกี่ยวกับวิสัยทัศน์บริษัท', 'ภาษาไทย', '2023-05-25 11:43:37', 13, 8, 1),
(85, 'about_detailvistionEN', '<p><span style=\"\">Clean Care Concept Manufacturing Co., Ltd. will be a manufacturer. and sell household products Cleaning products that grow and expand the customer base across the country. and countries in Asia to meet the needs of customers by focusing on product development To be special in both quality, price and excellent service. with the introduction of modern technology, machinery and innovation come to develop products to win the hearts of customers at all levels with regard to quality safety according to international standards environmentally friendly for sustainable growth and development</span><br></p>', NULL, 'รายละเอียดเกี่ยวกับวิสัยทัศน์บริษัท', 'English', '2023-05-25 11:43:37', 13, 8, 1),
(86, 'about_missionShow', '1', 'แสดงส่วนพันธกิจ', '', '', '2023-05-25 11:39:10', 15, 7, 1),
(87, 'about_titlemissionTH', 'พันธกิจ', '', 'ข้อความ Title ส่วนพันธกิจ', 'ภาษาไทย', '2023-05-25 11:39:10', 15, 2, 1),
(88, 'about_titlemissionEN', 'mission', '', 'ข้อความ Title ส่วนพันธกิจ', 'English', '2023-05-25 11:39:10', 15, 2, 1),
(89, 'about_detailmissionTH', '<p>&nbsp; <b>&nbsp;มุ่งเน้นการผลิตสินค้า และบริการให้มีคุณภาพและได้มาตรฐาน และเป็นที่ยอมรับ สร้างภาพลักษณ์องค์กร พัฒนาทรัพยากรบุคคลให้มีศักยภาพ ตรวจสอบ และควบคุมคุณภาพสินค้าให้ตรงตามมาตรฐาน ควบคุมและรักษาสิ่งแวดล้อมภายในและภายนอก เพื่อความพึงพอใจของลูกค้าเป็นสำคัญ เพื่อการเติบโต และการพัฒนาที่ยั่งยืน</b><br></p>', NULL, 'รายละเอียดเกี่ยวกับพันธกิจบริษัท', 'ภาษาไทย', '2023-05-25 11:39:10', 15, 8, 1),
(90, 'about_detailmissionEN', '<p><span style=\"\">focus on product production and provide quality and standardized services and is accepted Create a corporate image Develop human resources to have potential, inspect and control product quality to meet standards. protect the environment For customer satisfaction is important and sustainable growth and development.</span><br></p>', NULL, 'รายละเอียดเกี่ยวกับพันธกิจบริษัท', 'English', '2023-05-25 11:39:10', 15, 8, 1),
(91, 'about_missionImg', 'about_missionImg_CleanCareTH_1_ye8ra.png', '', 'ภาพประกอบพันธกิจ', NULL, '2023-05-01 20:57:29', 15, 9, 1),
(92, 'award_Show', '1', 'แสดงส่วนผลงานรางวัล', '', '', '2023-05-07 18:42:42', 16, 7, 1),
(93, 'award_titleTH', 'รางวัลและความภาคภูมิใจของบริษัท', '', 'ข้อความ Title ส่วนผลงาน รางวัล', 'ภาษาไทย', '2023-05-07 18:42:42', 16, 2, 1),
(94, 'award_titleEN', 'AWARDS AND PRIDE OF THE COMPANY', '', 'ข้อความ Title ส่วนผลงาน รางวัล', 'English', '2023-05-07 18:42:42', 16, 2, 1),
(97, 'warranty_Show', '1', 'แสดงส่วนมาตรฐานคุณภาพที่ได้รับ', '', '', '2023-05-07 18:46:12', 17, 7, 1),
(98, 'warranty_titleTH', 'มาตรฐานคุณภาพที่ได้รับ', '', 'ข้อความ Title ส่วนมาตรฐานคุณภาพที่ได้รับ', 'ภาษาไทย', '2023-05-07 18:46:12', 17, 2, 1),
(99, 'warranty_titleEN', 'WARRANTY', '', 'ข้อความ Title ส่วนมาตรฐานคุณภาพที่ได้รับ', 'English', '2023-05-07 18:46:12', 17, 2, 1),
(101, 'warranty_subtitleShow', '0', 'แสดงข้อความ Subtitle', '', '', '2023-05-07 18:46:12', 17, 7, 1),
(102, 'warranty_subtitleTH', 'มาตรฐานคุณภาพที่ได้รับ--', '', 'ข้อความ SubTitle ส่วนมาตรฐานคุณภาพที่ได้รับ', 'ภาษาไทย', '2023-05-07 18:46:12', 17, 2, 1),
(103, 'warranty_subtitleEN', 'Quality standards received by the factory', '', 'ข้อความ SubTitle ส่วนมาตรฐานคุณภาพที่ได้รับ', 'English', '2023-05-07 18:46:12', 17, 2, 1),
(104, 'warranty_titileShow', '0', 'แสดงชื่อ/หัวข้อรางวัล', '', '', '2023-05-07 18:46:12', 17, 7, 1),
(105, 'award_subtitleShow', '0', 'แสดง SubTitle ส่วนผลงาน รางวัล', '', '', '2023-05-07 18:42:42', 16, 7, 1),
(106, 'award_subtitleTH', 'มาตรฐานคุณภาพที่ได้รับ', '', 'ข้อความ SubTitle ส่วนส่วนผลงาน รางวัล', 'ภาษาไทย', '2023-05-07 18:42:42', 16, 2, 1),
(107, 'award_subtitleEN', 'WARRANTY', '', 'ข้อความ SubTitle ส่วนส่วนผลงาน รางวัล', 'English', '2023-05-07 18:42:42', 16, 2, 1),
(108, 'award_dateShow', '1', 'แสดงข้อมูลวันที่ (All)', '', '', '2023-05-07 18:42:42', 16, 7, 1),
(109, 'award_imgShow', '1', 'แสดงรูปภาพประกอบรางวัล (ถ้ามี)', '', '', '2023-05-07 18:42:42', 16, 7, 1),
(110, 'oemprocess_Show', '1', 'แสดงส่วนขั้นตอนการทำ OEM', '', '', '2023-05-07 18:52:20', 18, 7, 1),
(111, 'oemprocess_titleTH', 'ขั้นตอนการทำ OEM', '', 'ข้อความ Title ส่วนขั้นตอนการทำ OEM', 'ภาษาไทย', '2023-05-07 18:52:20', 18, 2, 1),
(112, 'oemprocess_titleEN', 'OEM PROCESS', '', 'ข้อความ Title ส่วนขั้นตอนการทำ OEM', 'English', '2023-05-07 18:52:20', 18, 2, 1),
(113, 'oemprocess_subtitleShow', '0', 'แสดงข้อความ Subtitle', '', '', '2023-05-07 18:52:20', 18, 7, 1),
(114, 'oemprocess_subtitleTH', 'ขั้นตอนการทำ OEM', '', 'ข้อความ SubTitle ส่วนขั้นตอนการทำ OEM', 'ภาษาไทย', '2023-05-07 18:52:20', 18, 2, 1),
(115, 'oemprocess_subtitleEN', 'OEM PROCESS', '', 'ข้อความ SubTitle ส่วนขั้นตอนการทำ OEM', 'English', '2023-05-07 18:52:20', 18, 2, 1),
(116, 'oemprocess_img', 'oemprocess_img_CleanCareTH_1_Jx6gK.png', '', 'ภาพประกอบ', NULL, '2023-05-02 20:46:44', 18, 9, 1),
(117, 'oemprocess_bgcolor', '#0082fd', '', 'สีพื้นหลัง', '', '2023-05-07 18:52:20', 18, 4, 1),
(118, 'homewarranty_Show', '1', 'แสดงส่วน warranty (Home)', '', '', '2023-05-08 14:19:48', 19, 7, 1),
(119, 'homewarranty_titleTH', 'มาตรฐานคุณภาพที่ได้รับ', '', 'ข้อความ Title ส่วน warranty (Home)', 'ภาษาไทย', '2023-05-08 14:19:48', 19, 2, 1),
(120, 'homewarranty_titleEN', 'Warranty', '', 'ข้อความ Title ส่วน warranty (Home)', 'English', '2023-05-08 14:19:48', 19, 2, 1),
(121, 'homewarranty_subtitleShow', '0', 'แสดงข้อความ Subtitle', '', '', '2023-05-08 14:19:48', 19, 7, 1),
(122, 'homewarranty_subtitleTH', 'มาตรฐานคุณภาพที่ได้รับ', '', 'ข้อความ SubTitle ส่วน warranty (Home)', 'ภาษาไทย', '2023-05-08 14:19:48', 19, 2, 1),
(123, 'homewarranty_subtitleEN', 'Warranty', '', 'ข้อความ SubTitle ส่วน warranty (Home)', 'English', '2023-05-08 14:19:48', 19, 2, 1),
(124, 'homewarranty_img', 'homewarranty_img_CleanCareTH_8_vmNIa.png', '', 'ภาพประกอบ', NULL, '2023-05-08 14:19:35', 19, 9, 1),
(125, 'homeourbrand_Show', '1', 'แสดงส่วน our brand (Home)', '', '', '2023-05-07 18:04:12', 20, 7, 1),
(126, 'homeourbrand_titleTH', 'แบรนด์ของเรา', '', 'ข้อความ Title ส่วน our brand (Home)', 'ภาษาไทย', '2023-05-07 18:04:12', 20, 2, 1),
(127, 'homeourbrand_titleEN', 'Our brand', '', 'ข้อความ Title ส่วน our brand (Home)', 'English', '2023-05-07 18:04:12', 20, 2, 1),
(128, 'homeourbrand_subtitleShow', '1', 'แสดงข้อความ Subtitle', '', '', '2023-05-07 18:04:12', 20, 7, 1),
(129, 'homeourbrand_subtitleTH', 'แบรนด์ของเรา', '', 'ข้อความ Subtitle ส่วน our brand (Home)', 'ภาษาไทย', '2023-05-07 18:04:12', 20, 2, 1),
(130, 'homeourbrand_subtitleEN', 'Our brand', '', 'ข้อความ Subtitle ส่วน our brand (Home)', 'English', '2023-05-07 18:04:12', 20, 2, 1),
(131, 'homeourbrand_img', 'homewarranty_img_CleanCareTH_1_SLW6K.png', '', 'ภาพประกอบ', NULL, '2023-05-02 20:59:43', 20, 9, 0),
(134, 'ourservice_img_service_1', 'homewarranty_img_CleanCareTH_1_SLW6K.png', '', 'ภาพหน้าปก FACRIC CARE', NULL, '2023-05-02 20:59:43', 22, 9, 0),
(135, 'ourservice_img_service_2', 'homewarranty_img_CleanCareTH_1_SLW6K.png', '', 'ภาพหน้าปก HOME CARE', NULL, '2023-05-02 20:59:43', 22, 9, 0),
(136, 'ourservice_img_service_3', 'homewarranty_img_CleanCareTH_1_SLW6K.png', '', 'ภาพหน้าปก PERSONAL CARE', NULL, '2023-05-02 20:59:43', 22, 9, 0),
(139, 'ourservice_TexttitleTH', 'บริการ', '', 'ข้อความ Title', 'ภาษาไทย', '2023-05-03 23:11:59', 22, 2, 1),
(140, 'ourservice_TexttitleEN', 'Services', '', 'ข้อความ Title', 'English', '2023-05-03 23:11:59', 22, 2, 1),
(141, 'ourservice_Textsubtitle_show', '1', 'แสดงข้อความ Subtitle', '', '', '2023-05-03 23:11:59', 22, 7, 1),
(142, 'ourservice_TextsubtitleTH', 'รับจ้างผลิต (OEM)', '', 'ข้อความ SubTitle', 'ภาษาไทย', '2023-05-03 23:11:59', 22, 2, 1),
(143, 'ourservice_TextsubtitleEN', 'CONTRACT MANUFACTURING SERVICE (OEM)', '', 'ข้อความ SubTitle ', 'English', '2023-05-03 23:11:59', 22, 2, 1),
(146, 'ourbrand_TexttitleTH', 'แบรนด์ของเรา', '', 'ข้อความ Title', 'ภาษาไทย', '2023-05-10 08:47:49', 23, 2, 1),
(147, 'ourbrand_TexttitleEN', 'Our Brand', '', 'ข้อความ Title', 'English', '2023-05-10 08:47:49', 23, 2, 1),
(148, 'ourbrand_Textsubtitle_show', '0', 'แสดงข้อความ Subtitle', '', '', '2023-05-10 08:47:49', 23, 7, 1),
(149, 'ourbrand_TextsubtitleTH', 'xvv', '', 'ข้อความ SubTitle', 'ภาษาไทย', '2023-05-10 08:47:49', 23, 2, 1),
(150, 'ourbrand_TextsubtitleEN', 'vv', '', 'ข้อความ SubTitle ', 'English', '2023-05-10 08:47:49', 23, 2, 1),
(153, 'activityblogs_TexttitleTH', 'บทความ ข่าวสาร', '', 'ข้อความ Title', 'ภาษาไทย', '2023-05-10 08:45:31', 24, 2, 1),
(154, 'activityblogs_TexttitleEN', 'Blogs / News', '', 'ข้อความ Title', 'English', '2023-05-10 08:45:31', 24, 2, 1),
(155, 'activityblogs_Textsubtitle_show', '0', 'แสดงข้อความ Subtitle', '', '', '2023-05-10 08:45:31', 24, 7, 1),
(156, 'activityblogs_TextsubtitleTH', 'cvcvc', '', 'ข้อความ SubTitle', 'ภาษาไทย', '2023-05-10 08:45:31', 24, 2, 1),
(157, 'activityblogs_TextsubtitleEN', 'cvcvcvcvcv', '', 'ข้อความ SubTitle ', 'English', '2023-05-10 08:45:31', 24, 2, 1),
(160, 'homepage_TexttitleTH', 'CLEAN CARE', '', 'ข้อความ Title', 'ภาษาไทย', '2023-05-17 13:23:38', 25, 2, 1),
(161, 'homepage_TexttitleEN', 'CLEAN CARE', '', 'ข้อความ Title', 'English', '2023-05-17 13:23:38', 25, 2, 1),
(162, 'homepage_Textsubtitle_show', '1', 'แสดงข้อความ Subtitle', '', '', '2023-05-17 13:23:38', 25, 7, 1),
(163, 'homepage_TextsubtitleTH', 'CONCEPT MANUFACTURING CO.,LTD.', '', 'ข้อความ SubTitle', 'ภาษาไทย', '2023-05-17 13:23:38', 25, 2, 1),
(164, 'homepage_TextsubtitleEN', 'CONCEPT MANUFACTURING CO.,LTD.', '', 'ข้อความ SubTitle ', 'English', '2023-05-17 13:23:38', 25, 2, 1),
(165, 'homepage_Textsubtitle2_show', '1', 'แสดงข้อความ Subtitle (Small)', '', '', '2023-05-17 13:23:38', 25, 7, 1),
(166, 'homepage_Textsubtitle2TH', 'บริษัท คลีน แคร์ คอนเซ็พท์ แมนูแฟคเจอริ่ง จำกัด', '', 'ข้อความ SubTitle (Small)', 'ภาษาไทย', '2023-05-17 13:23:38', 25, 2, 1),
(167, 'homepage_Textsubtitle2EN', 'บริษัท คลีน แคร์ คอนเซ็พท์ แมนูแฟคเจอริ่ง จำกัด', '', 'ข้อความ SubTitle (Small)', 'English', '2023-05-17 13:23:38', 25, 2, 1),
(168, 'aboutSet_TexttitleTH', 'เกี่ยวกับเรา', '', 'ข้อความ Title', 'ภาษาไทย', '2023-05-03 23:15:40', 26, 2, 1),
(169, 'aboutSet_TexttitleEN', 'ABOUT', '', 'ข้อความ Title', 'English', '2023-05-03 23:15:40', 26, 2, 1),
(170, 'aboutSet_Textsubtitle_show', '1', 'แสดงข้อความ Subtitle', '', '', '2023-05-03 23:15:40', 26, 7, 1),
(171, 'aboutSet_TextsubtitleTH', 'บริษัท คลีน แคร์ คอนเซ็พท์', '', 'ข้อความ SubTitle', 'ภาษาไทย', '2023-05-03 23:15:40', 26, 2, 1),
(172, 'aboutSet_TextsubtitleEN', 'CLEAN CARE CONCEPT', '', 'ข้อความ SubTitle ', 'English', '2023-05-03 23:15:40', 26, 2, 1),
(173, 'aboutSet_Textsubtitle2_show', '1', 'แสดงข้อความ Subtitle (Small)', '', '', '2023-05-03 23:15:40', 26, 7, 1),
(174, 'aboutSet_Textsubtitle2TH', 'แมนูแฟคเจอริ่ง จำกัด', '', 'ข้อความ SubTitle (Small)', 'ภาษาไทย', '2023-05-03 23:15:40', 26, 2, 1),
(175, 'aboutSet_Textsubtitle2EN', 'MANUFACTURING CO.,LTD.', '', 'ข้อความ SubTitle (Small)', 'English', '2023-05-03 23:15:40', 26, 2, 1),
(176, 'ourservice_Textsubtitle2_show', '0', 'แสดงข้อความ Subtitle (Small)', '', '', '2023-05-03 23:11:59', 22, 7, 1),
(177, 'ourservice_Textsubtitle2TH', 'แมนูแฟคเจอริ่ง จำกัด', '', 'ข้อความ SubTitle (Small)', 'ภาษาไทย', '2023-05-03 23:11:59', 22, 2, 1),
(178, 'ourservice_Textsubtitle2EN', 'MANUFACTURING CO.,LTD.', '', 'ข้อความ SubTitle (Small)', 'English', '2023-05-03 23:11:59', 22, 2, 1),
(179, 'ourservices_detailTH', '<p>&nbsp; &nbsp; &nbsp; &nbsp; เราให้บริการ OEM รับจ้างผลิตสินค้าในกลุ่มของผลิตภัณฑ์ซักล้าง&nbsp;และผลิตภัณฑ์ทำความสะอาด ในรูปแบบต่างๆ โดยเราได้พัฒนาสูตรเพื่อให้ตรงความต้องการของตลาด และลูกค้า จากทีมงานผู้เชี่ยวชาญที่มีประสบการณมากว่า 10 ปี มีการพัฒนาผลิตภัณฑ์อย่างต่อเนื่องทำให้ มีสินค้าที่มีจุดเด่นที่ไม่เหมือนใคร สร้างความแตกต่างระหว่างสินค้าในท้องตลาด ทั่วไป สร้างจุดเด่นให้กับสินค้า สะดวกต่อการทำการตลาดได้อย่างมีประสิทธิภาพ และไม่ทำลายสิ่งแวดล้อม</p><div class=\"simditor-table\"><br></div>', NULL, 'รายละเอียดเกี่ยวกับบริการ', 'ภาษาไทย', '2023-05-03 23:11:59', 22, 8, 1),
(180, 'ourservices_detailEN', '<p><span style=\"\">&nbsp; &nbsp; &nbsp; &nbsp; <span style=\"\">We provide OEM services, contract manufacturing of products in the group of washing products. and cleaning products in various ways We have developed formulas to meet the needs of the market and customers from a team of experts with more than 10 years of experience. There are products that have outstanding features like no other. Make a difference between products in the general market, create a distinctive feature for the product. Convenient for effective marketing and not destroying the environment.</span></span><br></p>', NULL, 'รายละเอียดเกี่ยวกับบริการ', 'English', '2023-05-03 23:11:59', 22, 8, 1),
(181, 'ourbrand_Textsubtitle2_show', '0', 'แสดงข้อความ Subtitle (Small)', '', '', '2023-05-10 08:47:49', 23, 7, 1),
(182, 'ourbrand_Textsubtitle2TH', 'แมนูแฟคเจอริ่ง จำกัด', '', 'ข้อความ SubTitle (Small)', 'ภาษาไทย', '2023-05-10 08:47:49', 23, 2, 1),
(183, 'ourbrand_Textsubtitle2EN', 'MANUFACTURING CO.,LTD.', '', 'ข้อความ SubTitle (Small)', 'English', '2023-05-10 08:47:49', 23, 2, 1),
(184, 'ourbrand_detail_TH', '', NULL, 'รายละเอียดเกี่ยวกับ Our brand', 'ภาษาไทย', '2023-05-10 08:47:49', 23, 8, 1),
(185, 'ourbrand_detail_EN', '', NULL, 'รายละเอียดเกี่ยวกับ Our brand', 'English', '2023-05-10 08:47:49', 23, 8, 1),
(186, 'activityblogs_Textsubtitle2_show', '0', 'แสดงข้อความ Subtitle (Small)', '', '', '2023-05-10 08:45:31', 24, 7, 1),
(187, 'activityblogs_Textsubtitle2TH', 'แมนูแฟคเจอริ่ง จำกัด', '', 'ข้อความ SubTitle (Small)', 'ภาษาไทย', '2023-05-10 08:45:31', 24, 2, 1),
(188, 'activityblogs_Textsubtitle2EN', 'MANUFACTURING CO.,LTD.', '', 'ข้อความ SubTitle (Small)', 'English', '2023-05-10 08:45:31', 24, 2, 1),
(189, 'activityblogs_detail_TH', '', NULL, 'รายละเอียด', 'ภาษาไทย', '2023-05-10 08:45:31', 24, 8, 1),
(190, 'activityblogs_detail_EN', '', NULL, 'รายละเอียด', 'English', '2023-05-10 08:45:31', 24, 8, 1),
(191, 'homepage_bg_img', 'homepage_bg_img_CleanCareTH_8_RYQm4.png', '', 'ภาพหน้าปกพื้นหลัง', '1920 x 1185 px', '2023-05-17 13:23:38', 25, 9, 1),
(192, 'aboutSet_bg_img', 'aboutSet_bg_img_CleanCareTH_1_hqZOo.png', '', 'ภาพหน้าปกพื้นหลัง', '1920 x 1355 px', '2023-05-03 23:15:40', 26, 9, 1),
(193, 'ourservice_bg_img', 'ourservice_bg_img_CleanCareTH_1_m82nd.png', '', 'ภาพหน้าปกพื้นหลัง', '1920 x 1355 px', '2023-05-03 23:11:59', 22, 9, 1),
(194, 'ourbrand_bg_img', 'ourbrand_bg_img_CleanCareTH_8_PEYFg.png', '', 'ภาพหน้าปกพื้นหลัง', '1920 x 1355 px', '2023-05-10 08:47:49', 23, 9, 1),
(195, 'activityblogs_bg_img', 'activityblogs_bg_img_CleanCareTH_8_bG2QQ.png', '', 'ภาพหน้าปกพื้นหลัง', '1920 x 1355 px', '2023-05-10 08:45:31', 24, 9, 1),
(196, 'contact_bg_img', 'contact_bg_img_CleanCareTH_1_q7Pb4.png', '', 'ภาพหน้าปกพื้นหลัง', '1920 x 1355 px', '2023-05-03 23:12:36', 10, 9, 1),
(197, 'buble_home_show', '1', 'แสดงเอฟเฟคฟองในหน้า Home', '', '', '2023-05-07 19:15:50', 27, 7, 1),
(198, 'buble_about_show', '1', 'แสดงเอฟเฟคฟองในหน้า About', '', '', '2023-05-07 19:15:50', 27, 7, 1),
(199, 'buble_ourservice_show', '1', 'แสดงเอฟเฟคฟองในหน้า Our Service', '', '', '2023-05-07 19:15:50', 27, 7, 1),
(200, 'buble_ourbrand_show', '1', 'แสดงเอฟเฟคฟองในหน้า Our Brand', '', '', '2023-05-07 19:15:50', 27, 7, 1),
(201, 'buble_activity_show', '1', 'แสดงเอฟเฟคฟองในหน้า Activity/Blogs', '', '', '2023-05-07 19:15:50', 27, 7, 1),
(202, 'buble_contactus_show', '0', 'แสดงเอฟเฟคฟองในหน้า Contact Us', '', '', '2023-05-07 19:15:50', 27, 7, 1),
(203, 'buble_footer_show', '1', 'แสดงเอฟเฟคฟองในหน้าส่วน Footer (ทุกหน้า)', '', '', '2023-05-07 19:15:50', 27, 7, 1),
(204, 'menufooter1_show', '1', 'แสดงเมนูนี้ #1', '', '', '2023-05-17 17:06:15', 28, 7, 1),
(205, 'menufooter1_titleTH', 'เกี่ยวกับเรา', '', 'ข้อความแสดง', 'ภาษาไทย', '2023-05-17 17:06:15', 28, 2, 1),
(206, 'menufooter1_titleEN', 'About', '', 'ข้อความแสดง', 'English', '2023-05-17 17:06:15', 28, 2, 1),
(207, 'menufooter1_link', 'https://cleancareth.com/About', '', 'URL', 'https://...', '2023-05-17 17:06:15', 28, 5, 1),
(208, 'menufooter1_opennewtab', '1', 'เปิด Tab ใหม่', '', '', '2023-05-17 17:06:15', 28, 7, 1),
(209, 'menufooter2_show', '1', 'แสดงเมนูนี้ #2', '', '', '2023-05-17 17:06:15', 28, 7, 1),
(210, 'menufooter2_titleTH', 'บริการของเรา', '', 'ข้อความแสดง', 'ภาษาไทย', '2023-05-17 17:06:15', 28, 2, 1),
(211, 'menufooter2_titleEN', 'Service', '', 'ข้อความแสดง', 'English', '2023-05-17 17:06:15', 28, 2, 1),
(212, 'menufooter2_link', 'https://cleancareth.com/OurServices', '', 'URL', 'https://...', '2023-05-17 17:06:15', 28, 5, 1),
(213, 'menufooter2_opennewtab', '1', 'เปิด Tab ใหม่', '', '', '2023-05-17 17:06:15', 28, 7, 1),
(214, 'menufooter3_show', '1', 'แสดงเมนูนี้ #3', '', '', '2023-05-17 17:06:15', 28, 7, 1),
(215, 'menufooter3_titleTH', 'แบรนด์ของเรา', '', 'ข้อความแสดง', 'ภาษาไทย', '2023-05-17 17:06:15', 28, 2, 1),
(216, 'menufooter3_titleEN', 'Brands', '', 'ข้อความแสดง', 'English', '2023-05-17 17:06:15', 28, 2, 1),
(217, 'menufooter3_link', 'https://cleancareth.com/OtherBrand', '', 'URL', 'https://...', '2023-05-17 17:06:15', 28, 5, 1),
(218, 'menufooter3_opennewtab', '1', 'เปิด Tab ใหม่', '', '', '2023-05-17 17:06:15', 28, 7, 1),
(219, 'menufooter4_show', '1', 'แสดงเมนูนี้ #4', '', '', '2023-05-17 17:06:15', 28, 7, 1),
(220, 'menufooter4_titleTH', 'ติดต่อเรา', '', 'ข้อความแสดง', 'ภาษาไทย', '2023-05-17 17:06:15', 28, 2, 1),
(221, 'menufooter4_titleEN', 'Contact Us', '', 'ข้อความแสดง', 'English', '2023-05-17 17:06:15', 28, 2, 1),
(222, 'menufooter4_link', 'https://cleancareth.com/ContactUs', '', 'URL', 'https://...', '2023-05-17 17:06:15', 28, 5, 1),
(223, 'menufooter4_opennewtab', '0', 'เปิด Tab ใหม่', '', '', '2023-05-17 17:06:15', 28, 7, 1),
(224, 'contact_distributorsImgProfileShow', '0', 'แสดงรูปภาพหน้าปก', '', '', '2023-05-07 18:48:14', 11, 7, 1),
(225, 'contact_distributorsPaginationShowNum', '3', 'จำนวนการแสดงผล/หน้า', '', '* แนะนำจำนวน หาร 3 ลงตัว เช่น 6,9,12 ', '2023-05-07 18:48:14', 11, 10, 1),
(226, 'warranty_descriptionShow', '0', 'แสดงรายละเอียดรางวัล', '', '', '2023-05-07 18:46:12', 17, 7, 1),
(227, 'activity__shownum', '3', '', 'จำนวน', 'ข่าวสาร / กิจกรรม ที่แสดงต่อหน้า', '2023-05-10 08:45:31', 24, 10, 1),
(228, 'blogs__shownum', '3', '', 'จำนวน', 'บทความ ที่แสดงต่อหน้า', '2023-05-10 08:45:31', 24, 10, 1),
(229, 'ourbrand_mainBrandName_show', '1', 'แสดงชื่อแบรนด์ใต้ Logo', '', '', '2023-05-10 08:47:49', 23, 7, 1),
(230, 'activity__showListOtherShow', '1', 'แสดงบทความ/รายการอื่นๆ (แถบข้าง)', '', '* แนะนำให้แสดง', '2023-05-10 08:45:31', 24, 7, 1),
(231, 'activity__showOthernum', '5', '', 'จำนวน ', 'รายการอื่นๆ แนะนำ (แถบข้าง)', '2023-05-10 08:45:31', 24, 10, 1),
(232, 'activity__FacebookCommentShow', '1', 'แสดง Pugin Facebook Comment', '', '', '2023-05-10 08:45:31', 24, 7, 1),
(234, 'order_showImgBank', '1', 'ภาพกราฟิกบัญชีธนาคาร หรือ ภาพ QR Code รับเงิน', '', '', '2023-05-17 17:06:15', 29, 7, 1),
(235, 'order_ImgBank', 'homepage_bg_img_CleanCareTH_8_RYQm4.png', '', 'ภาพกราฟิกบัญชีธนาคาร หรือ ภาพ QR Code รับเงิน', 'อัตราส่วน 1:1 หรือ 720x720px', '2023-05-17 13:23:38', 29, 9, 1),
(236, 'order_showTextBank', '1', 'แสดงข้อความเลขบัญชีธนาคาร', '', '', '2023-05-17 17:06:15', 29, 7, 1),
(237, 'order_TextBank1', 'ธนาคาร...', '', 'ชื่อธนาคาร', '', '2023-05-17 17:06:15', 29, 2, 1),
(238, 'order_TextBank2', '1234', '', 'เลขบัญชีธนาคาร', '', '2023-05-17 17:06:15', 29, 2, 1),
(239, 'order_TextBank3', '1234', '', 'ชื่อบัญชีธนาคาร', '', '2023-05-17 17:06:15', 29, 2, 1),
(240, 'order_shipmentMax1', '350', '', '1.ยอดสูงสุด', '', '2023-05-27 11:57:59', 30, 2, 1),
(241, 'order_shipment1', '0', '', '1.ค่าส่ง', '', '2023-05-27 11:57:59', 30, 2, 1),
(242, 'order_shipmentMax2', '600', '', '2.ยอดสูงสุด', '', '2023-05-27 11:57:59', 30, 2, 1),
(243, 'order_shipment2', '90', '', '2.ค่าส่ง', '', '2023-05-27 11:57:59', 30, 2, 1),
(244, 'order_shipmentMax3', '1000', '', '3.ยอดสูงสุด', '', '2023-05-27 11:57:59', 30, 2, 1),
(245, 'order_shipment3', '110', '', '3.ค่าส่ง', '', '2023-05-27 11:57:59', 30, 2, 1),
(246, 'order_shipmentMax4', '1500', '', '4.ยอดสูงสุด', '', '2023-05-27 11:57:59', 30, 2, 1),
(247, 'order_shipment4', '150', '', '4.ค่าส่ง', '', '2023-05-27 11:57:59', 30, 2, 1),
(248, 'order_shipment5', '200', '', 'ค่าส่ง  ยอดอื่นๆ ที่มากกว่า 4.ยอดสูงสุด', '', '2023-05-27 11:57:59', 30, 2, 1),
(249, 'order_shipment_discount', '25', '', 'ยอดบวก เพื่อจัดโปรโมชั่น', '', '2023-05-27 11:57:59', 30, 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lib_book`
--
ALTER TABLE `lib_book`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `lib_book_group`
--
ALTER TABLE `lib_book_group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `lib_book_shelf`
--
ALTER TABLE `lib_book_shelf`
  ADD PRIMARY KEY (`shelf_id`);

--
-- Indexes for table `lib_borrow`
--
ALTER TABLE `lib_borrow`
  ADD PRIMARY KEY (`borrow_id`);

--
-- Indexes for table `lib_borrow_book`
--
ALTER TABLE `lib_borrow_book`
  ADD PRIMARY KEY (`bb_id`);

--
-- Indexes for table `lib_checkin`
--
ALTER TABLE `lib_checkin`
  ADD PRIMARY KEY (`checkin_id`);

--
-- Indexes for table `lib_school`
--
ALTER TABLE `lib_school`
  ADD PRIMARY KEY (`school_id`);

--
-- Indexes for table `lib_users`
--
ALTER TABLE `lib_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `lib_yearStudy`
--
ALTER TABLE `lib_yearStudy`
  ADD PRIMARY KEY (`year_id`);

--
-- Indexes for table `master_account`
--
ALTER TABLE `master_account`
  ADD PRIMARY KEY (`MasterId`);

--
-- Indexes for table `system_setting`
--
ALTER TABLE `system_setting`
  ADD PRIMARY KEY (`setId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lib_book`
--
ALTER TABLE `lib_book`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lib_book_group`
--
ALTER TABLE `lib_book_group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `lib_book_shelf`
--
ALTER TABLE `lib_book_shelf`
  MODIFY `shelf_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lib_borrow`
--
ALTER TABLE `lib_borrow`
  MODIFY `borrow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `lib_borrow_book`
--
ALTER TABLE `lib_borrow_book`
  MODIFY `bb_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `lib_checkin`
--
ALTER TABLE `lib_checkin`
  MODIFY `checkin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `lib_school`
--
ALTER TABLE `lib_school`
  MODIFY `school_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lib_users`
--
ALTER TABLE `lib_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `lib_yearStudy`
--
ALTER TABLE `lib_yearStudy`
  MODIFY `year_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_account`
--
ALTER TABLE `master_account`
  MODIFY `MasterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `system_setting`
--
ALTER TABLE `system_setting`
  MODIFY `setId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
