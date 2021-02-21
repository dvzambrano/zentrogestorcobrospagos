-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 02-05-2015 a las 18:55:01
-- Versión del servidor: 5.5.16
-- Versión de PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `zentrogestorcopa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_forgot_password`
--

CREATE TABLE IF NOT EXISTS `sf_guard_forgot_password` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `unique_key` varchar(255) DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_group`
--

CREATE TABLE IF NOT EXISTS `sf_guard_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `sf_guard_group`
--

INSERT INTO `sf_guard_group` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Administradores', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 'colectormanger', 'Gestor cobrador', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(3, 'accountant', 'Tenedor de libros', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(4, 'recepcionist', 'Recepcionistas', '2015-05-02 14:44:08', '2015-05-02 14:44:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_group_permission`
--

CREATE TABLE IF NOT EXISTS `sf_guard_group_permission` (
  `group_id` bigint(20) NOT NULL DEFAULT '0',
  `permission_id` bigint(20) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`group_id`,`permission_id`),
  KEY `sf_guard_group_permission_permission_id_sf_guard_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sf_guard_group_permission`
--

INSERT INTO `sf_guard_group_permission` (`group_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 2, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 3, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 4, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 5, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 6, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 7, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 8, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 9, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 10, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 11, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 12, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 13, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(1, 14, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 15, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 16, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 17, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 18, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 19, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 20, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(3, 15, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(3, 16, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(3, 17, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(3, 19, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(3, 20, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(3, 21, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(4, 15, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(4, 19, '2015-05-02 14:44:08', '2015-05-02 14:44:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_login_attempt`
--

CREATE TABLE IF NOT EXISTS `sf_guard_login_attempt` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(15) DEFAULT NULL,
  `host_name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_permission`
--

CREATE TABLE IF NOT EXISTS `sf_guard_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=55 ;

--
-- Volcado de datos para la tabla `sf_guard_permission`
--

INSERT INTO `sf_guard_permission` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'manageperson', 'Administrar personas', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 'managelocation', 'Administrar localizaciones', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(3, 'manageplace', 'Administrar lugares de trabajo', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(4, 'manageelement', 'Administrar elementos de gastos', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(5, 'manageservice', 'Administrar servicios', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(6, 'managetransaction', 'Administrar balances', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(7, 'manageconfiguration', 'Administrar configuracion global', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(8, 'manageuser', 'Administrar usuarios', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(9, 'manageactivity', 'Administrar actividades', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(10, 'managetax', 'Administrar impuestos', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(11, 'manageactivitygroup', 'Administrar grupos de actividades', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(12, 'managelog', 'Administrar trazas', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(13, 'managemodule', 'Administrar módulos', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(14, 'managefiles', 'Administrar archivos', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(15, 'managepersonadd', 'Administrar personas (adicionar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(16, 'managepersonedit', 'Administrar personas (editar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(17, 'managepersondelete', 'Administrar personas (eliminar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(18, 'managepersonpayment', 'Administrar pagos de obligaciones', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(19, 'managepersonreport', 'Administrar reportes', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(20, 'managepersonsignout', 'Administrar bajas', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(21, 'managepersontransaction', 'Administrar comprobantes', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(22, 'managesex', 'Administrar sexos', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(23, 'managesexadd', 'Administrar sexos (adicionar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(24, 'managesexedit', 'Administrar sexos (editar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(25, 'managesexdelete', 'Administrar sexos (eliminar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(26, 'managelocationadd', 'Administrar localizaciones (adicionar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(27, 'managelocationedit', 'Administrar localizaciones (editar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(28, 'managelocationdelete', 'Administrar localizaciones (eliminar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(29, 'manageplaceadd', 'Administrar lugares de trabajo (adicionar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(30, 'manageplaceedit', 'Administrar lugares de trabajo (editar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(31, 'manageplacedelete', 'Administrar lugares de trabajo (eliminar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(32, 'manageactivityadd', 'Administrar actividades (adicionar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(33, 'manageactivityedit', 'Administrar actividades (editar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(34, 'manageactivitydelete', 'Administrar actividades (eliminar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(35, 'manageelementadd', 'Administrar elementos de gastos (adicionar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(36, 'manageelementedit', 'Administrar elementos de gastos (editar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(37, 'manageelementdelete', 'Administrar elementos de gastos (eliminar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(38, 'managetaxadd', 'Administrar impuestos (adicionar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(39, 'managetaxedit', 'Administrar impuestos (editar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(40, 'managetaxdelete', 'Administrar impuestos (eliminar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(41, 'manageserviceadd', 'Administrar servicios (adicionar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(42, 'manageserviceedit', 'Administrar servicios (editar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(43, 'manageservicedelete', 'Administrar servicios (eliminar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(44, 'manageuseradd', 'Administrar usuarios (adicionar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(45, 'manageuseredit', 'Administrar usuarios (editar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(46, 'manageuserdelete', 'Administrar usuarios (eliminar)', '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(47, 'manageactivitygroupadd', 'Administrar grupos de actividades (adicionar)', '2015-05-02 14:44:09', '2015-05-02 14:44:09'),
(48, 'manageactivitygroupedit', 'Administrar grupos de actividades (editar)', '2015-05-02 14:44:09', '2015-05-02 14:44:09'),
(49, 'manageactivitygroupdelete', 'Administrar grupos de actividades (eliminar)', '2015-05-02 14:44:09', '2015-05-02 14:44:09'),
(50, 'managecharts', 'Administrar graficos', '2015-05-02 14:44:09', '2015-05-02 14:44:09'),
(51, 'managecalendar', 'Administrar calendario', '2015-05-02 14:44:09', '2015-05-02 14:44:09'),
(52, 'managemoduleadd', 'Administrar módulos (adicionar)', '2015-05-02 14:44:09', '2015-05-02 14:44:09'),
(53, 'managemoduleedit', 'Administrar módulos (editar)', '2015-05-02 14:44:09', '2015-05-02 14:44:09'),
(54, 'managemoduledelete', 'Administrar módulos (eliminar)', '2015-05-02 14:44:09', '2015-05-02 14:44:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_remember_key`
--

CREATE TABLE IF NOT EXISTS `sf_guard_remember_key` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `remember_key` varchar(32) DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_user`
--

CREATE TABLE IF NOT EXISTS `sf_guard_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `username` varchar(128) NOT NULL,
  `algorithm` varchar(128) NOT NULL DEFAULT 'sha1',
  `salt` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_super_admin` tinyint(1) DEFAULT '0',
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `is_active_idx_idx` (`is_active`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `sf_guard_user`
--

INSERT INTO `sf_guard_user` (`id`, `first_name`, `last_name`, `email_address`, `username`, `algorithm`, `salt`, `password`, `is_active`, `is_super_admin`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'Administrador', 'del Sistema', 'zentro@nauta.cu', 'admin', 'sha1', '69870eee1a72ace3ab2dd188c5695535', '2652d68ccf92603de5d08a37b4df067d583a6f0a', 1, 1, NULL, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 'Reynerio', 'Cruz Hechavarria', 'cobransa@nauta.cu', 'reynerio', 'sha1', '761aaaf88246f1d8a5ee172749658264', '955c8f76c7c37d8214c60adb7690a26e3a90abd7', 1, 0, NULL, '2015-05-02 14:44:08', '2015-05-02 14:44:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_user_group`
--

CREATE TABLE IF NOT EXISTS `sf_guard_user_group` (
  `user_id` bigint(20) NOT NULL DEFAULT '0',
  `group_id` bigint(20) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `sf_guard_user_group_group_id_sf_guard_group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sf_guard_user_group`
--

INSERT INTO `sf_guard_user_group` (`user_id`, `group_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 2, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 3, '2015-05-02 14:44:08', '2015-05-02 14:44:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_user_password`
--

CREATE TABLE IF NOT EXISTS `sf_guard_user_password` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `algorithm` varchar(128) NOT NULL DEFAULT 'sha1',
  `salt` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sf_guard_user_permission`
--

CREATE TABLE IF NOT EXISTS `sf_guard_user_permission` (
  `user_id` bigint(20) NOT NULL DEFAULT '0',
  `permission_id` bigint(20) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`permission_id`),
  KEY `sf_guard_user_permission_permission_id_sf_guard_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sf_guard_user_permission`
--

INSERT INTO `sf_guard_user_permission` (`user_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(2, 2, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 3, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 4, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 5, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 8, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 9, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 10, '2015-05-02 14:44:08', '2015-05-02 14:44:08'),
(2, 11, '2015-05-02 14:44:08', '2015-05-02 14:44:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_activity`
--

CREATE TABLE IF NOT EXISTS `sgab_activity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fixed` tinyint(1) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `comment` text,
  `name` varchar(130) NOT NULL,
  `code` varchar(30) NOT NULL,
  `activitygroupid` bigint(20) DEFAULT NULL,
  `onatcode` varchar(30) DEFAULT NULL,
  `mtsscode` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `activitygroupid_idx` (`activitygroupid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=189 ;

--
-- Volcado de datos para la tabla `sgab_activity`
--

INSERT INTO `sgab_activity` (`id`, `fixed`, `amount`, `comment`, `name`, `code`, `activitygroupid`, `onatcode`, `mtsscode`) VALUES
(1, 1, '700.00', NULL, 'Elaborador vendedor de alimentos y bebidas mediante servicio gastronomico en Restaurantes (Paladares).', '1dbfbe975b980e79b5c31fb478e2e4', 1, NULL, NULL),
(2, 1, '250.00', NULL, 'Elaborador vendedor de alimentos y bebidas no alcoholicas a domicilio.', '21d50338669894d4ed1bb966875a80', 1, NULL, NULL),
(3, 1, '400.00', NULL, 'Elaborador vendedor de alimentos y bebidas en punto fijo de venta (Cafeteria).', 'bf97399629e413f1a55028ab1fa5a5', 1, NULL, NULL),
(4, 1, '200.00', NULL, 'Cafeteria de alimentos ligeros.', '77a78fde9b8d1f740c3edb7c2e56a4', 1, NULL, NULL),
(5, 1, '120.00', NULL, 'Elaborador vendedor de vinos.', '1cee965df43e18ca545f8a08bf86cb', 1, NULL, NULL),
(6, 1, '500.00', NULL, 'Vendedor mayorista de productos agropecuarios.', 'ba37b3f09f1f40eec536b7c68bb782', 1, NULL, NULL),
(7, 1, '300.00', NULL, 'Vendedor minorista de productos agropecuarios.', 'f34f7c25b04c6128c9ac4f1910d3b5', 1, NULL, NULL),
(8, 1, '300.00', NULL, 'Artesano.', '53c393a03b30b0853f5700f62b8258', 2, NULL, NULL),
(9, 1, '70.00', NULL, 'Constructor vendedor o reparador de articulos de mimbre.', 'fea72b20bc4ef68a7f92eeed5bd8b3', 2, NULL, NULL),
(10, 1, '80.00', NULL, 'Elaborador vendedor de jabon, betun, tintas y otros similares.', 'c8479ad1453ab977c0b8d45e7f2e6b', 2, NULL, NULL),
(11, 1, '80.00', NULL, 'Productor vendedor de accesorios de goma.', '4aa9e977ebc0e53fed57ee9263476c', 2, NULL, NULL),
(12, 1, '80.00', NULL, 'Productor vendedor de articulos de alfareria.', 'eb80e42ac3238de32612bf9161e1d1', 2, NULL, NULL),
(13, 1, '80.00', NULL, 'Productor vendedor de articulos de fundicion no ferrosa.', 'db4509e788923df4e64a4c5160eb82', 2, NULL, NULL),
(14, 1, '100.00', NULL, 'Productor vendedor de articulos religiosos (excepto las piezas que tengan valor patrimonial segun regula el Ministerio de Cultura)', '179cdde69a3af6b7a2856e90ea5009', 2, NULL, NULL),
(15, 1, '300.00', NULL, 'Productor vendedor de bisuteria de metal y recursos naturales.', '5f41bdaaab6778817af3b2cadffb45', 2, NULL, NULL),
(16, 1, '400.00', NULL, 'Productor vendedor de calzado.', '3c4fc936dbd6470102cc2a4415bac3', 2, NULL, NULL),
(17, 1, '50.00', NULL, 'Talabartero.', '3f9f219b2d0219edfefe691cdcdc90', 2, NULL, NULL),
(18, 1, '250.00', NULL, 'Alquiler de trajes.', 'f4a35268a49cde9d07ffa5cdf093e8', 3, NULL, NULL),
(19, 1, '60.00', NULL, 'Aserrador.', '70f04a81df7eb6822ce1ae65c2904e', 3, NULL, NULL),
(20, 1, '100.00', NULL, 'Barbero.', '20a9abd036f1056eea3f88ac1760e6', 3, NULL, NULL),
(21, 1, '40.00', NULL, 'Bordadora - tejedora.', '9205c163a93bcba3f67c775701d4b6', 3, NULL, NULL),
(22, 1, '60.00', NULL, 'Cantero.', '755cfb767ceb320346231ff2d920f3', 3, NULL, NULL),
(23, 1, '300.00', NULL, 'Chapistero.', '0a423dbba38580e6d5ff8a54923548', 3, NULL, NULL),
(24, 1, '100.00', NULL, 'Chapistero de bienes muebles.', '99c2ccb483187a55f9aa5a29058641', 3, NULL, NULL),
(25, 1, '150.00', NULL, 'Decorador.', 'dce19e9abbdeeab0eb981ff1a1a2b8', 3, NULL, NULL),
(26, 1, '250.00', NULL, 'Elaborador vendedor de articulos de marmol.', '7b738f8800cfae86d2540c340c917d', 3, NULL, NULL),
(27, 1, '150.00', NULL, 'Electricista automotriz.', '94b3e8de601a25f0153460d9dae188', 3, NULL, NULL),
(28, 1, '100.00', NULL, 'Enrollador de motores, bobinas, y otros equipos.', '3f0f0215c5adf9267df298d111e5b0', 3, NULL, NULL),
(29, 1, '200.00', NULL, 'Fotografo.', '47331e6f387a56d2cc77a5b956fdd2', 3, NULL, NULL),
(30, 1, '50.00', NULL, 'Fundidor.', '00243569f0795d9c038ca065d70bf6', 3, NULL, NULL),
(31, 1, '50.00', NULL, 'Herrero.', '1979a3893cf62a613d1e7053ac6aa2', 3, NULL, NULL),
(32, 1, '60.00', NULL, 'Manicura.', '1e61ea3409656618cadd3f7e97836f', 3, NULL, NULL),
(33, 1, '45.00', NULL, 'Maquillista.', '3063a463ef16161f6bb9004c2a9fea', 3, NULL, NULL),
(34, 1, '100.00', NULL, 'Mecanico de equipos de refrigeracion.', '521d092a2221e7806ba3baf6483993', 3, NULL, NULL),
(35, 1, '45.00', NULL, 'Oxicortador.', 'fc3bd2ca78539733edb1829492fe98', 3, NULL, NULL),
(36, 1, '300.00', NULL, 'Organizador de servicios integrales para fiestas de quince, bodas y otras actividades.', '082d226c4680b7ca80ed302bce6512', 3, NULL, NULL),
(37, 1, '150.00', NULL, 'Peluquera.', 'e7d0bd72eee035f5a1bc460a7eb8fa', 3, NULL, NULL),
(38, 1, '60.00', NULL, 'Peluquero de animales domesticos.', '2858cc707e4100ad1ee042dac5a512', 3, NULL, NULL),
(39, 1, '300.00', NULL, 'Pintor automotriz.', '663e959351b5d74234a80cafa4564e', 3, NULL, NULL),
(40, 1, '80.00', NULL, 'Pintor de bienes muebles o barnizador.', '49838b2d1543c8e953ef1e1224d0e6', 3, NULL, NULL),
(41, 1, '60.00', NULL, 'Pintor rotulista.', '42a3bfbacd571555d4ff749b329ce1', 3, NULL, NULL),
(42, 1, '100.00', NULL, 'Productor vendedor o recolector vendedor de articulos de alfareria u otros materiales con fines constructivos.', '8f7237e582801c8dafd214571ffc6e', 3, NULL, NULL),
(43, 1, '40.00', NULL, 'Pulidor de metales.', 'a77516d51ad6b01d169fb0895d6cc9', 3, NULL, NULL),
(44, 1, '200.00', NULL, 'Reparador de articulos de joyeria.', 'a8942af1301a7149b9f3ec1ec627e4', 3, NULL, NULL),
(45, 1, '100.00', NULL, 'Reparador de colchones.', 'c27e418366294ccb5548e1b3365268', 3, NULL, NULL),
(46, 1, '60.00', NULL, 'Reparador de enseres menores.', 'c35f2396db37e5153be8382f68cb1b', 3, NULL, NULL),
(47, 1, '90.00', NULL, 'Reparador de equipos electricos y electronicos.', '8c3e68fe4867d50a889e680f0e9f61', 3, NULL, NULL),
(48, 1, '100.00', NULL, 'Reparador de equipos mecanicos y de combustion.', '86f517a25774fbf1537f125d077c27', 3, NULL, NULL),
(49, 1, '60.00', NULL, 'Soldador.', '108871d8bc6e2f4eb93f1a741d159b', 3, NULL, NULL),
(50, 1, '100.00', NULL, 'Tapicero.', '08dbbd52dd473ed0f5462a1e3589ad', 3, NULL, NULL),
(51, 1, '60.00', NULL, 'Tornero.', '0d409ce679ba858d4a35534b645d83', 3, NULL, NULL),
(52, 1, '250.00', NULL, 'Restaurador de obras de arte.', '7a20c4c7cf1fc10943242a0cf8c562', 3, NULL, NULL),
(53, 1, '400.00', NULL, 'Anticuario.', 'f792b16e6aea9c4d9f9954302e39da', 3, NULL, NULL),
(54, 1, '750.00', NULL, 'Arrendamiento de viviendas (por habitacion). Modalidad CUC.', '0f08b9ed5987b51eb4cfd24eb1f9f7', 4, NULL, NULL),
(55, 1, '30.00', NULL, 'Arrendamiento de viviendas (por habitacion). Modalidad CUP.', 'e797fe41715d49012e7fc5a3188668', 4, NULL, NULL),
(56, 1, '875.00', NULL, 'Arrendamiento de habitaciones (por habitacion). Modalidad CUC.', '789493237b87822cdf988c7eff0eaf', 4, NULL, NULL),
(57, 1, '40.00', NULL, 'Arrendamiento de habitaciones (por habitacion). Modalidad CUP.', 'bd5958e08a3def76cffd63a7659093', 4, NULL, NULL),
(58, 1, '125.00', NULL, 'Arrendamiento de espacios: Garaje (Uno). Modalidad CUC.', '465c52811e0af1556baeb465289981', 4, NULL, NULL),
(59, 1, '25.00', NULL, 'Arrendamiento de espacios: Garaje (Uno). Modalidad CUP.', '550e96e585857a8e19cee2699cbec4', 4, NULL, NULL),
(60, 1, '125.00', NULL, 'Arrendamiento de espacios: Piscina (Por m2). Modalidad CUC.', '37304c901d62899075328afeac77e1', 4, NULL, NULL),
(61, 1, '40.00', NULL, 'Arrendamiento de espacios: Piscina (Por m2). Modalidad CUP.', '80010a00f6baf93c4476f43d627ee3', 4, NULL, NULL),
(62, 1, '200.00', NULL, 'Arrendamiento de espacios: Otros espacios. Modalidad CUC.', '4f692c9dcf068e65b5ba569f6eaf6b', 4, NULL, NULL),
(63, 1, '80.00', NULL, 'Alquiler de animales.', '5cee0049de738de95e7f8706e1f5d3', 5, NULL, NULL),
(64, 1, '100.00', NULL, 'Animador de fiestas, payasos o magos.', '7bbbfddd220406e77ea4a6daa5ed9d', 5, NULL, NULL),
(65, 1, '80.00', NULL, 'Servicio de coche de uso infantil tirado por animales.', '11440993ed25fb5cd3efcdc65aa123', 5, NULL, NULL),
(66, 1, '60.00', NULL, 'Criador vendedor de animales afectivos.', '5f486bede6f305db241f4a8f4e1712', 5, NULL, NULL),
(67, 1, '150.00', NULL, 'Instructor de practicas deportivas.', '381796af67c7779dd81bb13bac0562', 5, NULL, NULL),
(68, 1, '100.00', NULL, 'Operador de audio.', 'f2dc542477f809e2d2a9821a9db126', 5, NULL, NULL),
(69, 1, '100.00', NULL, 'Operador de equipos de recreacion.', '7227c62edafb4f59688088acbecf3b', 5, NULL, NULL),
(70, 1, '80.00', NULL, 'Productor, recolector vendedor de hierbas para alimento animal o Productor, recolector vendedor de hierbas medicinales.', '3d8cb7790b69ff1552874cf7d12306', 5, NULL, NULL),
(71, 1, '100.00', NULL, 'Productor vendedor de flores y plantas ornamentales.', 'd3f36e32bf2b37206f2fa71bcd710c', 5, NULL, NULL),
(72, 1, '100.00', NULL, 'Profesor de musica y otras artes.', '04e5238ee0d2f39a33d353a07af2cd', 5, NULL, NULL),
(73, 1, '80.00', 'Res. Org. Rector: 42/2013. Res. MFP: 353/2013.', 'Programador de equipos de computo.', '5d6f1b871ce6b68e42da3d977c6f1b', 5, '607', '103'),
(74, 1, '500.00', NULL, 'Gestor de permutas y compra-venta de viviendas.', '7b28df2f54c1fd390f32666412f266', 5, NULL, NULL),
(75, 1, '80.00', NULL, 'Albañil.', '784f3a6ab20b7e39fdde2668decc6d', 6, NULL, NULL),
(76, 1, '200.00', NULL, 'Carpintero.', 'f32654ee87b882fa1190ce436547b9', 6, NULL, NULL),
(77, 1, '70.00', NULL, 'Cristalero.', 'b0c5f48b668708ade697b7f8b19b8f', 6, NULL, NULL),
(78, 1, '100.00', NULL, 'Electricista.', '4b2a84a2d7cec0e904ea4d3d60001b', 6, NULL, NULL),
(79, 1, '80.00', NULL, 'Plomero.', '4be4df393a020a83f022103f400aa0', 6, NULL, NULL),
(80, 1, '40.00', NULL, 'Pulidor de Pisos.', '5f1a9cb7b645654218cd8e0f9134d4', 6, NULL, NULL),
(81, 1, '150.00', NULL, 'Granitero.', '20cfbf8164394b98e8e9181d34c9f3', 6, NULL, NULL),
(82, 1, '75.00', NULL, 'Transporte de carga con medios de traccion de motor con capacidad de: Hasta una tonelada.', '685cbb8250996a6a6a577a6d8d8cbf', 7, NULL, NULL),
(83, 1, '150.00', NULL, 'Transporte de carga con medios de traccion de motor con capacidad de: Mas de una y hasta tres toneladas.', '10b4c26d2e01304561424ac75e58f6', 7, NULL, NULL),
(84, 1, '350.00', NULL, 'Transporte de carga con medios de traccion de motor con capacidad de: Mas de tres y hasta diez toneladas.', '930d249fd71d64338005c0625616db', 7, NULL, NULL),
(85, 1, '350.00', NULL, 'Transporte de carga con medios de traccion de motor con capacidad de: Mas de diez y hasta veinte toneladas.', 'd3920b7327887d1cceb0c77f1649e8', 7, NULL, NULL),
(86, 1, '450.00', NULL, 'Transporte de carga con medios de traccion de motor con capacidad de: Mas de veinte toneladas.', '83585280e7b183ebc5ff78fa6cfa17', 7, NULL, NULL),
(87, 1, '30.00', NULL, 'Transporte de carga en lanchas o botes.', '2c4eaadfa4e1ffb2e6a3d0b8f2caa2', 7, NULL, NULL),
(88, 1, '350.00', NULL, 'Transporte de pasajeros con medios de traccion de motor con capacidad de: Hasta seis pasajeros.', '9404e0fe794b9475ab8053cf90f25a', 7, NULL, NULL),
(89, 1, '450.00', NULL, 'Transporte de pasajeros con medios de traccion de motor con capacidad de: Mas de seis y hasta quince pasajeros.', '659687cffb6565a5d3ffc35b128086', 7, NULL, NULL),
(90, 1, '575.00', NULL, 'Transporte de pasajeros con medios de traccion de motor con capacidad de: Mas de quince pasajeros.', 'c3f85d785efca112e30e9e4e3cc320', 7, NULL, NULL),
(91, 1, '30.00', NULL, 'Transporte de pasajeros en lanchas o botes.', '7cd1278b12b4df6ce6b5d50823ec33', 7, NULL, NULL),
(92, 1, '100.00', NULL, 'Transporte de pasajeros con medios de traccion animal.', '2edda1fa4c50e814cdc0fc34f6af3b', 7, NULL, NULL),
(93, 1, '250.00', NULL, 'Transporte de pasajeros en motos.', '12a16813cc5d9cdd7f2ecd10106946', 7, NULL, NULL),
(94, 1, '90.00', NULL, 'Afinador y reparador de instrumentos musicales.', '42840e5504a992644ef23fe945d3e4', NULL, NULL, NULL),
(95, 1, '20.00', NULL, 'Agente de Seguros.', '0535a618f77fa638532c1ed2cbc8b2', NULL, NULL, NULL),
(96, 1, '70.00', NULL, 'Aguador.', '0447cce2a68451741fb8c194e6ab15', NULL, NULL, NULL),
(97, 1, '40.00', NULL, 'Amolador.', '52560270d54e2b264d202b6ad178cf', NULL, NULL, NULL),
(98, 1, '30.00', NULL, 'Arriero.', '56a18c265022a755bbd38e53be8704', NULL, NULL, NULL),
(99, 1, '50.00', NULL, 'Boyero o carretero.', '49fecc1ed58edb6f5c2d248368a2de', NULL, NULL, NULL),
(100, 1, '70.00', NULL, 'Carretillero o vendedor de productos agricolas en forma ambulatoria.', '8dd0f679e4ef0f59297e1799f5ec8b', NULL, NULL, NULL),
(101, 1, '80.00', NULL, 'Cerrajero.', '3c58d32b47390318dcb29ef4d9fdcf', NULL, NULL, NULL),
(102, 1, '100.00', NULL, 'Cobrador pagador.', 'cc090f0ec8b4da215431cc15dffdb6', NULL, NULL, NULL),
(103, 1, '60.00', NULL, 'Comprador vendedor de libros de uso.', '9d5f1bb1ae77f77743629541b9ff8b', NULL, NULL, NULL),
(104, 1, '80.00', NULL, 'Constructor vendedor o montador de antenas de radio y television.', '73327846eb912f8f2deefd4597d33b', NULL, NULL, NULL),
(105, 1, '120.00', NULL, 'Cuidador de animales.', 'fcbeff0e74bdd4e27bc9a5c301cc37', NULL, NULL, NULL),
(106, 1, '70.00', NULL, 'Cuidador de baños publicos y taquillas.', 'f1a8d1eb79dd9d20082849869c18ab', NULL, NULL, NULL),
(107, 1, '20.00', NULL, 'Cuidador de enfermos, personas con discapacidad y ancianos.', '9c7417512960ac89ffed377e627055', NULL, NULL, NULL),
(108, 1, '80.00', NULL, 'Asistente para el cuidado de niños.', 'ad3ce4ced2c2404f3943fc1a10ee85', NULL, NULL, NULL),
(109, 1, '50.00', NULL, 'Cuidador de parques.', '029298abb82917027d5129edf02c96', NULL, NULL, NULL),
(110, 1, '60.00', NULL, 'Curtidor de pieles.', '4cf81f42df0c69b65604e0efee6d43', NULL, NULL, NULL),
(111, 1, '20.00', NULL, 'Desmochador de palmas.', '7fd7901d6ab52d2333ac6b491a28e3', NULL, NULL, NULL),
(112, 1, '150.00', NULL, 'Elaborador vendedor de alimentos y bebidas no alcoholicas de forma ambulatoria.', 'ca9ced61eaa6674f0e5e7a40ec5036', NULL, NULL, NULL),
(113, 1, '30.00', NULL, 'Elaborador vendedor de carbon.', 'eb41d9d84121f9623079fa97b2f61f', NULL, NULL, NULL),
(114, 1, '40.00', NULL, 'Elaborador vendedor de yugos, frontiles y sogas.', 'e015fc305033d58ec3f5879373dcee', NULL, NULL, NULL),
(115, 1, '30.00', NULL, 'Encargado, limpiador y turbinero de inmuebles.', 'a1571d8eeaec951e84dc90b96435d7', NULL, NULL, NULL),
(116, 1, '80.00', NULL, 'Entrenador de animales.', '8aca4af9e03f6f742043076f6cde0c', NULL, NULL, NULL),
(117, 1, '80.00', NULL, 'Fabricante vendedor de coronas y flores.', 'bf16cb806ecc3d4343733e944b2f46', NULL, NULL, NULL),
(118, 1, '30.00', NULL, 'Forrador de botones.', '26652e38908f12190efde4be525ee4', NULL, NULL, NULL),
(119, 1, '40.00', NULL, 'Fregador engrasador de equipos automotores.', '315cdb8e86f7f60819aa6311538982', NULL, NULL, NULL),
(120, 1, '40.00', NULL, 'Grabador cifrador de objetos.', 'd16bb066c183299158a0fa8f87210d', NULL, NULL, NULL),
(121, 1, '80.00', NULL, 'Gestor de pasaje en piquera.', '4424f4b3493f2ca03b1066ef66dd10', NULL, NULL, NULL),
(122, 1, '30.00', NULL, 'Herrador de animales o productor vendedor de herraduras y clavos.', '86af7fb7b7102d0182c7e73bb0c6f8', NULL, NULL, NULL),
(123, 1, '40.00', NULL, 'Hojalatero.', '699ddf7333a05f12b84e4c237de7a6', NULL, NULL, NULL),
(124, 1, '100.00', NULL, 'Instructor de automovilismo.', '217c83373e9365d9d355b7341bc374', NULL, NULL, NULL),
(125, 1, '60.00', NULL, 'Jardinero.', 'f7d57acc425614985fe169746ca639', NULL, NULL, NULL),
(126, 1, '30.00', NULL, 'Lavandero o planchador.', '91a5f5dd98663f51b4cab97d40e827', NULL, NULL, NULL),
(127, 1, '30.00', NULL, 'Leñador.', '0d4758e1159e62bc3a46fbd72836c6', NULL, NULL, NULL),
(128, 1, '20.00', NULL, 'Limpiabotas.', '18ea1fec4ea9676441c84beaddf9a6', NULL, NULL, NULL),
(129, 1, '40.00', NULL, 'Limpiador y comprobador de bujias.', '92ac4c3512036ccdb0fca18a1f7855', NULL, NULL, NULL),
(130, 1, '20.00', NULL, 'Limpiador y reparador de fosas.', 'e3919af82669dc37f2caff676a319d', NULL, NULL, NULL),
(131, 1, '80.00', NULL, 'Masajista.', '462188e154188a5f50e88627759f84', NULL, NULL, NULL),
(132, 1, '50.00', NULL, 'Masillero.', '854dce8912a89ce1ba8a486a2dd13c', NULL, NULL, NULL),
(133, 1, '30.00', NULL, 'Mecanografo.', '352b179fd3c71aef661b280c85c064', NULL, NULL, NULL),
(134, 1, '40.00', NULL, 'Mensajero.', '304e62fa97849b4a7a98da04334e40', NULL, NULL, NULL),
(135, 1, '80.00', NULL, 'Modista o sastre.', '1c18efaf4e60d7b086302f5b05ef0a', NULL, NULL, NULL),
(136, 1, '60.00', NULL, 'Molinero.', '8c231256752e14a6fb449e91346a74', NULL, NULL, NULL),
(137, 1, '100.00', NULL, 'Operador de compresor de aire, ponchero o reparador de neumaticos.', '82c04072a69094cda66880aca14370', NULL, NULL, NULL),
(138, 1, '80.00', NULL, 'Parqueador cuidador de equipos automotores, ciclos y triciclos.', '81e4c25af9291ea46f66ceb8f91c09', NULL, NULL, NULL),
(139, 1, '30.00', NULL, 'Trabajador domestico.', '575d0348bd2a091b837b156c334dea', NULL, NULL, NULL),
(140, 1, '100.00', NULL, 'Pintor de inmuebles.', '6f30b3013b40de2dc8813634ca8224', NULL, NULL, NULL),
(141, 1, '45.00', NULL, 'Piscicultor.', '484dbb96ba9e31fed022b3803c7241', NULL, NULL, NULL),
(142, 1, '30.00', NULL, 'Plasticador.', 'fceb8321a52d98a9f03a0609cc5fd2', NULL, NULL, NULL),
(143, 1, '30.00', NULL, 'Pocero.', '5feadf1cfb44dfbca6aa337e75fe13', NULL, NULL, NULL),
(144, 1, '70.00', NULL, 'Productor vendedor de articulos varios de uso en el hogar.', '419d6524e68d62901e8805d2e179a3', NULL, NULL, NULL),
(145, 1, '100.00', NULL, 'Productor vendedor de articulos de aluminio.', '245cf4adfc4e91eda91ed834f959e5', NULL, NULL, NULL),
(146, 1, '40.00', NULL, 'Productor vendedor de bastos, paños y monturas.', '37933c5f63497000598c675f045c7e', NULL, NULL, NULL),
(147, 1, '40.00', NULL, 'Productor vendedor de figuras de yeso.', '04e737f02347dfb5dbf99c5712582a', NULL, NULL, NULL),
(148, 1, '80.00', NULL, 'Productor vendedor de piñatas y otros articulos similares para cumpleaños.', 'a95ddd6f4a65f8a6dc4064862e5dd1', NULL, NULL, NULL),
(149, 1, '60.00', NULL, 'Productor vendedor de escobas, cepillos y similares.', 'af086fd53e836aab214235cc743744', NULL, NULL, NULL),
(150, 1, '20.00', NULL, 'Recolector vendedor de recursos naturales.', '0962d8048dd5f97d64aeda44677927', NULL, NULL, NULL),
(151, 1, '100.00', NULL, 'Profesor de taquigrafia, mecanografia e idiomas.', '72b5643cec64d218681b016c26c7e2', NULL, NULL, NULL),
(152, 1, '30.00', NULL, 'Recolector vendedor de materias primas.', '541f4c0870723b49fa57ac25e537fd', NULL, NULL, NULL),
(153, 1, '50.00', NULL, 'Relojero.', '17824a9802556b6af5eff424f8a839', NULL, NULL, NULL),
(154, 1, '40.00', NULL, 'Reparador de articulos de cuero y similares.', '7e7b9c03919829c3c16e5945191f87', NULL, NULL, NULL),
(155, 1, '40.00', NULL, 'Reparador de bastidores de cama.', '92d6db5eccd024c6f9b8d9df11be13', NULL, NULL, NULL),
(156, 1, '60.00', NULL, 'Reparador de baterias automotrices.', '76f563b26a7b273204765b21e9cfc2', NULL, NULL, NULL),
(157, 1, '60.00', NULL, 'Reparador de bicicletas.', '20d65ff23d66e745d933b0bf7314eb', NULL, NULL, NULL),
(158, 1, '60.00', NULL, 'Reparador de bisuteria.', '4afd338187a0b4c0487676ebcea707', NULL, NULL, NULL),
(159, 1, '20.00', NULL, 'Reparador de cercas y caminos.', '262e635348c066fd2320820036d695', NULL, NULL, NULL),
(160, 1, '50.00', NULL, 'Reparador de cocinas.', '068c9c467dbb4a429e47c896eab600', NULL, NULL, NULL),
(161, 1, '45.00', NULL, 'Reparador de equipos de oficina.', 'd1ef3958d893f09d492c29fbda7c68', NULL, NULL, NULL),
(162, 1, '30.00', NULL, 'Reparador de espejuelos.', '4aabebdc14c09adf0cedd6a8437d87', NULL, NULL, NULL),
(163, 1, '35.00', NULL, 'Reparador de maquinas de coser.', '930ea7fa1e5ff58ef523469d1e3f76', NULL, NULL, NULL),
(164, 1, '50.00', NULL, 'Reparador de monturas y arreos.', 'd14f4ff0149f0be9aa5ad061c1a0e0', NULL, NULL, NULL),
(165, 1, '30.00', NULL, 'Reparador de paraguas y sombrillas.', 'a79e636dabb2dd11c7f0802b45e71a', NULL, NULL, NULL),
(166, 1, '40.00', NULL, 'Reparador y llenador de fosforeras.', '884629fad8b801ecc403626d35d954', NULL, NULL, NULL),
(167, 1, '60.00', NULL, 'Repasador (excepto a los maestros en activo).', 'a0b4dbdff28fc9e20328005fe25398', NULL, NULL, NULL),
(168, 1, '30.00', NULL, 'Restaurador de muñecos y otros juguetes.', 'c145585ef4f04dc0fd32b47eab1f99', NULL, NULL, NULL),
(169, 1, '20.00', NULL, 'Sereno o portero de edificio de viviendas.', '17b05cb457592fd6cfd4c8f996f86c', NULL, NULL, NULL),
(170, 1, '30.00', NULL, 'Techador.', '0f0ef164affc178a2609337bb96af7', NULL, NULL, NULL),
(171, 1, '120.00', NULL, 'Tenedor de libros.', 'cbdfe68d799df243cfc07d43b17189', NULL, NULL, NULL),
(172, 1, '30.00', NULL, 'Teñidor de textiles.', 'f86312b915b4df088b0577119826bd', NULL, NULL, NULL),
(173, 1, '40.00', NULL, 'Tostador.', 'c72e2886f69a9d86fc2608eb9f8520', NULL, NULL, NULL),
(174, 1, '50.00', NULL, 'Trabajador agropecuario eventual.', 'a1f3787df0809275fb6b27beeed4ea', NULL, NULL, NULL),
(175, 0, '10.00', NULL, 'Trabajador contratado.', '9b305e723c2f85ff9d2070349e7a62', NULL, NULL, NULL),
(176, 1, '60.00', NULL, 'Traductor de documentos.', '1afd876904e3df63357cf11b2c30bf', NULL, NULL, NULL),
(177, 1, '40.00', NULL, 'Transporte de carga con medios de traccion humana.', '195272053377ab7d9a08f16e3cbbf3', NULL, NULL, NULL),
(178, 1, '30.00', NULL, 'Transporte de carga con medios de traccion animal.', 'b6e868ed1e8995255c74f58b38b5a4', NULL, NULL, NULL),
(179, 1, '60.00', NULL, 'Transporte de pasajeros con medios de traccion humana.', '38771db7c71ceb7a499d553eda7cc5', NULL, NULL, NULL),
(180, 1, '40.00', NULL, 'Trasquilador.', '46ca5a5259674f834d482505ad3b5d', NULL, NULL, NULL),
(181, 1, '50.00', NULL, 'Trillador.', '503e4e168ea0e3af6dff294450b0b3', NULL, NULL, NULL),
(182, 1, '50.00', NULL, 'Vendedor de produccion agricola en puntos de ventas y quioscos.', '07e96b58e19e01ae5cbd16e930cdfd', NULL, NULL, NULL),
(183, 1, '50.00', NULL, 'Zapatero remendon.', '28b69da91f5110a2894d496fe94d14', NULL, NULL, NULL),
(184, 1, '90.00', NULL, 'Reparador de instrumentos de medicion.', 'bd9559ae059e2818b78f11353f183a', NULL, NULL, NULL),
(185, 1, '100.00', NULL, 'Gestor de Alojamiento para viviendas o habitaciones que se arriendan.', 'cc46e5ae6343b08ce1c010650cde0f', NULL, NULL, NULL),
(186, 1, '20.00', NULL, 'Agente postal.', '8b1deaf53364e0fa525b3056251680', NULL, NULL, NULL),
(187, 1, '20.00', NULL, 'Agente de telecomunicaciones.', 'b2b79eace99f5c6a8939d86dae1ebe', NULL, NULL, NULL),
(188, 1, '60.00', NULL, 'Reparador montador de equipos para el bombeo de agua.', 'fdd9a9ce4e9a5ac1311ac13e36b6df', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_activitygroup`
--

CREATE TABLE IF NOT EXISTS `sgab_activitygroup` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fixed` tinyint(1) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `comment` text,
  `name` varchar(130) NOT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `sgab_activitygroup`
--

INSERT INTO `sgab_activitygroup` (`id`, `fixed`, `amount`, `comment`, `name`, `code`) VALUES
(1, 0, '50.00', 'Elaboracion y venta de productos alimenticios y agropecuarios: hasta un cincuenta por ciento (50 %) de los ingresos obtenidos.', 'Grupo I', 'db8768e7470373df96c2003b08b5bb'),
(2, 0, '30.00', 'Elaboracion y comercializacion de productos industriales y artesanales: hasta un treinta por ciento (30 %) de los ingresos obtenidos.', 'Grupo II', '41b5ed0598adc439b4ba97cdaf8d6f'),
(3, 0, '25.00', 'Actividades de servicios personales, tecnicos y mantenimiento constructivo: hasta el veinticinco por ciento (25 %) de los ingresos obtenidos.', 'Grupo III', '21a0dc53b1d870e6ac2c92e5269b4e'),
(4, 0, '20.00', 'Arrendamiento de viviendas, habitaciones y espacios que sean parte integrante de la vivienda: hasta el veinte por ciento (20 %) de los ingresos obtenidos.', 'Grupo IV', '1f4269ebaf64c1c7de4b363e3d086b'),
(5, 0, '10.00', 'Otras actividades: hasta el diez (10 %) de los ingresos obtenidos.', 'Grupo V', 'cd78fc4019aab9195fc5b52e1b1452'),
(6, 0, '30.00', 'Actividades de servicios de construccion, mantenimiento y reparacion de bienes muebles e inmuebles: hasta el treinta por ciento (30 %) de los ingresos obtenidos.', 'Grupo VI', '41bd17af31afb5e9b7e65ddad5acb6'),
(7, 0, '40.00', 'Actividades de Transporte de Carga y Pasajeros: hasta un cuarenta por ciento (40 %) de los ingresos obtenidos.', 'Grupo VII', 'e6d7afa3fe3c3701b8fd579fb0495a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_bar`
--

CREATE TABLE IF NOT EXISTS `sgab_bar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `taxid` bigint(20) DEFAULT NULL,
  `simplified` text,
  `general` text,
  `month` bigint(20) DEFAULT NULL,
  `year` bigint(20) DEFAULT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `taxid_idx` (`taxid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `sgab_bar`
--

INSERT INTO `sgab_bar` (`id`, `taxid`, `simplified`, `general`, `month`, `year`, `code`) VALUES
(1, 2, '411-11', '380-33', 11, 2013, '2013114'),
(2, 4, '511-11', '480-43', 11, 2013, '2013112'),
(3, 2, '411-11', '588-33', 12, 2013, '2013124'),
(4, 4, '511-11', '688-43', 12, 2013, '2013122'),
(5, 5, '511-11', '189-03', 12, 2013, '20135');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_calendar`
--

CREATE TABLE IF NOT EXISTS `sgab_calendar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `color` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `sgab_calendar`
--

INSERT INTO `sgab_calendar` (`id`, `code`, `name`, `comment`, `color`) VALUES
(1, '09476c3cf5f13e5c36d0e812f7364d88', 'Trabajo', NULL, 6),
(2, 'e41ee28e036aab0388bea90110a2ec74', 'Casa', NULL, 15),
(3, '17d311bb72096d252c26b3b926786211', 'Escuela', NULL, 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_element`
--

CREATE TABLE IF NOT EXISTS `sgab_element` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` text,
  `name` varchar(130) NOT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `sgab_element`
--

INSERT INTO `sgab_element` (`id`, `comment`, `name`, `code`) VALUES
(1, NULL, 'Hoja', '242d2d20424d0f9eaa8cdd38c192e1'),
(2, NULL, 'Lapicero', 'fdaa420f1b27d177c564ed40bda7c0'),
(3, NULL, 'Toner de impresora', '08dbe4bfa5c4751f09aff039eb4089'),
(4, NULL, 'Arina', '63e2b1ddf3a97a0b5189fef6fc8cdd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_elementactivityrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_elementactivityrelation` (
  `element_id` bigint(20) NOT NULL DEFAULT '0',
  `activity_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`element_id`,`activity_id`),
  KEY `sgab_elementactivityrelation_activity_id_sgab_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_entityuserrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_entityuserrelation` (
  `entity_id` bigint(20) NOT NULL DEFAULT '0',
  `sf_guard_user_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`entity_id`,`sf_guard_user_id`),
  KEY `sgab_entityuserrelation_sf_guard_user_id_sf_guard_user_id` (`sf_guard_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_event`
--

CREATE TABLE IF NOT EXISTS `sgab_event` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `allday` tinyint(1) DEFAULT '0',
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `calendarid` bigint(20) DEFAULT NULL,
  `reminderid` bigint(20) DEFAULT NULL,
  `location` text,
  `link` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `calendarid_idx` (`calendarid`),
  KEY `reminderid_idx` (`reminderid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Volcado de datos para la tabla `sgab_event`
--

INSERT INTO `sgab_event` (`id`, `code`, `name`, `comment`, `allday`, `start`, `end`, `calendarid`, `reminderid`, `location`, `link`) VALUES
(1, '0d57c220a3ef147e1cf35430e303a603', 'Vacaciones', 'Tiempo de diversion...', 0, '2015-04-11 14:00:00', '2015-04-22 15:00:00', 2, 1, NULL, NULL),
(2, '40336cf3edc079a4f64446dffa121fdb', 'Almuerzo con Dcita', 'Debo estar una hora antes en el restaurant', 0, '2015-05-02 11:30:00', '2015-05-02 13:00:00', 1, 1, NULL, NULL),
(3, '9ff0c2c742ef6eff9ebb0a8160898008', 'Pagar la electricidad', NULL, 0, '2015-05-02 15:00:00', '2015-05-02 15:00:00', 1, NULL, NULL, NULL),
(4, 'd61915029953cccd22cc4df817b398c8', 'Cumpleaños de Mayra', 'Hay q comprar un regalo', 1, '2015-05-02 00:00:00', '2015-05-02 00:00:00', 2, NULL, NULL, NULL),
(5, 'bdbcb6692ff90ceeb50a26847d306f2f', 'Hacer ejercicios', NULL, 1, '2015-04-20 00:00:00', '2015-05-11 23:59:59', 1, NULL, NULL, NULL),
(6, 'e141a4c2bd74aa2c4efd27d07541c718', 'Pelarme', NULL, 0, '2015-05-02 09:00:00', '2015-05-02 09:30:00', 2, NULL, NULL, NULL),
(7, '4cbf1a8c26a033b0331597a48c3187a1', 'Consejo de direccion', NULL, 0, '2015-04-30 13:00:00', '2015-04-30 18:00:00', 1, NULL, NULL, NULL),
(8, '43568a3b57377c8866c644f3707a12aa', 'Noche de peliculas', NULL, 0, '2015-05-04 19:00:00', '2015-05-04 23:00:00', 2, NULL, NULL, NULL),
(9, '3ff2953c341b75df009234886ae7019f', 'Forum nacional', NULL, 0, '2015-05-10 08:00:00', '2015-05-15 16:00:00', 3, NULL, 'Ciudad de la Habana', 'www.forum.cuba.cu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_example`
--

CREATE TABLE IF NOT EXISTS `sgab_example` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `nick` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `path` text,
  `parentid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_file`
--

CREATE TABLE IF NOT EXISTS `sgab_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `url` text,
  `content` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_location`
--

CREATE TABLE IF NOT EXISTS `sgab_location` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `parentid` bigint(20) DEFAULT NULL,
  `path` text,
  `icon` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=92 ;

--
-- Volcado de datos para la tabla `sgab_location`
--

INSERT INTO `sgab_location` (`id`, `code`, `name`, `comment`, `parentid`, `path`, `icon`) VALUES
(1, '1153', 'Holguin', NULL, NULL, NULL, NULL),
(2, '11531', 'GIBARA', NULL, 1, NULL, NULL),
(3, '11532', 'RAFAEL FREIRE', NULL, 1, NULL, NULL),
(4, '11533', 'BANES', NULL, 1, NULL, NULL),
(5, '11534', 'ANTILLA', NULL, 1, NULL, NULL),
(6, '11535', 'BAGUANOS', NULL, 1, NULL, NULL),
(7, '11536', 'HOLGUIN', NULL, 1, NULL, NULL),
(8, '115361', 'Alcides Pino', NULL, 7, NULL, NULL),
(9, '1153611', 'Alcides Pino', NULL, 8, NULL, NULL),
(10, '115362', 'Vista Alegre', NULL, 7, NULL, NULL),
(11, '1153621', 'Vista Alegre', NULL, 10, NULL, NULL),
(12, '1153622', 'La Quinta', NULL, 10, NULL, NULL),
(13, '115363', 'Pedro Díaz Coello', NULL, 7, NULL, NULL),
(14, '1153631', 'San Field', NULL, 13, NULL, NULL),
(15, '1153632', 'Revolución', NULL, 13, NULL, NULL),
(16, '1153633', 'El Bosque', NULL, 13, NULL, NULL),
(17, '1153634', 'Hermanos Aguilera', NULL, 13, NULL, NULL),
(18, '115364', 'Pueblo Nuevo', NULL, 7, NULL, NULL),
(19, '1153641', '26 de julio', NULL, 18, NULL, NULL),
(20, '1153642', 'Villa Nueva', NULL, 18, NULL, NULL),
(21, '1153643', 'Hilda Torres', NULL, 18, NULL, NULL),
(22, '1153644', 'Pueblo Nuevo', NULL, 18, NULL, NULL),
(23, '115365', 'Harlem', NULL, 7, NULL, NULL),
(24, '1153651', 'Santiesteban', NULL, 23, NULL, NULL),
(25, '1153652', 'El Piti', NULL, 23, NULL, NULL),
(26, '1153653', 'Ciudad Jardín', NULL, 23, NULL, NULL),
(27, '1153654', 'Harlem', NULL, 23, NULL, NULL),
(28, '115366', 'Alex Urquiola', NULL, 7, NULL, NULL),
(29, '1153661', 'Alex Urquiola', NULL, 28, NULL, NULL),
(30, '1153662', 'Ramón Quintana', NULL, 28, NULL, NULL),
(31, '1153663', 'Emilio Barcenas', NULL, 28, NULL, NULL),
(32, '1153664', 'Fabrica de Cervezas', NULL, 28, NULL, NULL),
(33, '115367', 'Edecio Pérez', NULL, 7, NULL, NULL),
(34, '1153671', 'El Jardín', NULL, 33, NULL, NULL),
(35, '1153672', 'Oscar Lucero', NULL, 33, NULL, NULL),
(36, '1153673', 'Matamoros', NULL, 33, NULL, NULL),
(37, '1153674', 'ITH', NULL, 33, NULL, NULL),
(38, '1153675', 'MINFAR', NULL, 33, NULL, NULL),
(39, '1153676', 'El Coco', NULL, 33, NULL, NULL),
(40, '115368', 'Distrito Lenin', NULL, 7, NULL, NULL),
(41, '1153681', 'Lenin', NULL, 40, NULL, NULL),
(42, '1153682', 'Libertad', NULL, 40, NULL, NULL),
(43, '1153683', 'Nuevo Llano', NULL, 40, NULL, NULL),
(44, '1153684', 'Salida de San Andrés', NULL, 40, NULL, NULL),
(45, '115369', 'Centro Ciudad Norte', NULL, 7, NULL, NULL),
(46, '115369122', 'Sayas', NULL, 45, NULL, NULL),
(47, '115369211', 'El Llano', NULL, 45, NULL, NULL),
(48, '1153692134', 'Centro Ciudad Norte', NULL, 45, NULL, NULL),
(49, '1153691', 'Centro Ciudad Sur', NULL, 7, NULL, NULL),
(50, '11536911', 'Centro Ciudad Sur', NULL, 49, NULL, NULL),
(51, '11536912', 'Peralta', NULL, 49, NULL, NULL),
(52, '11536913', 'Palomo', NULL, 49, NULL, NULL),
(53, '1153692', 'Purnio', NULL, 7, NULL, NULL),
(54, '1153693', 'San Andrés', NULL, 7, NULL, NULL),
(55, '11536931', 'Loma Blanca', NULL, 54, NULL, NULL),
(56, '11536932', 'San Andrés', NULL, 54, NULL, NULL),
(57, '1153694', 'Aguas Claras', NULL, 7, NULL, NULL),
(58, '11536941', 'Yaraniquén', NULL, 57, NULL, NULL),
(59, '11536942', 'Aguas Claras', NULL, 57, NULL, NULL),
(60, '11536943', 'La Trocha', NULL, 57, NULL, NULL),
(61, '11536944', 'Managuaco', NULL, 57, NULL, NULL),
(62, '1153695', 'El Purial', NULL, 7, NULL, NULL),
(63, '1153696', 'Sao Arriba', NULL, 7, NULL, NULL),
(64, '1153697', 'San Rafael', NULL, 7, NULL, NULL),
(65, '11536971', 'San Rafael', NULL, 64, NULL, NULL),
(66, '11536972', 'Las Biajacas', NULL, 64, NULL, NULL),
(67, '1153698', 'La Cuaba', NULL, 7, NULL, NULL),
(68, '11536981', 'La Cuaba', NULL, 67, NULL, NULL),
(69, '1153699', 'Pedernales', NULL, 7, NULL, NULL),
(70, '1153699111', '28 de septiembre', NULL, 69, NULL, NULL),
(71, '11536992123', 'Teresa', NULL, 69, NULL, NULL),
(72, '11536993321', 'El Pazón', NULL, 69, NULL, NULL),
(73, '11536991', 'Yareyal', NULL, 7, NULL, NULL),
(74, '115369911', 'Brisas de Yareyal', NULL, 73, NULL, NULL),
(75, '115369912', 'La Ceiba', NULL, 73, NULL, NULL),
(76, '115369913', 'Damian', NULL, 73, NULL, NULL),
(77, '115369914', 'Tomy', NULL, 73, NULL, NULL),
(78, '11536992', 'Zona Industrial', NULL, 7, NULL, NULL),
(79, '115369921', 'Guirabito', NULL, 78, NULL, NULL),
(80, '115369922', 'Campuchea', NULL, 78, NULL, NULL),
(81, '115369923', 'Zona Industrial', NULL, 78, NULL, NULL),
(82, '115369924', 'Certeneja', NULL, 78, NULL, NULL),
(83, '11536993', 'La Yuraguana', NULL, 7, NULL, NULL),
(84, '115369931', 'La Yuraguana', NULL, 83, NULL, NULL),
(85, '11538', 'URBANO NORIS', NULL, 1, NULL, NULL),
(86, '11539', 'CUETO', NULL, 1, NULL, NULL),
(87, '115391', 'MAYARI', NULL, 1, NULL, NULL),
(88, '115392', 'FRANK PAIS', NULL, 1, NULL, NULL),
(89, '115393', 'MOA', NULL, 1, NULL, NULL),
(90, '115394', 'CACOCM', NULL, 1, NULL, NULL),
(91, '115395', 'SAGUA DE TANAMO', NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_metadata`
--

CREATE TABLE IF NOT EXISTS `sgab_metadata` (
  `name` varchar(50) NOT NULL DEFAULT '',
  `comment` text,
  `value` text,
  `category` text,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgab_metadata`
--

INSERT INTO `sgab_metadata` (`name`, `comment`, `value`, `category`) VALUES
('app_authldapfilterdn', 'Establece la ubicación de los usuarios en el LDAP', 'OU=Unit,DC=domain,DC=com', 'LDAP'),
('app_authldaprootdn', 'Establece la ubicación del usuario de búsqueda en el LDAP', 'CN=Users,DC=domain,DC=com', 'LDAP'),
('app_authldapsearchinguser', 'Establece el usuario usado para realizar la conexión con el LDAP', 'administrador', 'LDAP'),
('app_authldapsearchinguserpass', 'Establece la contraseña del usuario usado para realizar la conexión con el LDAP', 'C0ntrasenna', 'LDAP'),
('app_authldapserver', 'Permite definir el Nombre o Dirección IP del servidor LDAP', '192.168.3.22', 'LDAP'),
('app_authmode', 'Establece el tipo de autenticación a usar en el sistema: "local" (sin comillas) para usar la base de datos, "ldap" (sin comillas) para usar un directorio activo y "mixed" (sin comillas) para combinar ambos métodos', 'local', 'Seguridad'),
('app_businessmail', 'Permite definir la cuenta de correo que será utilizada para la realización de las transferencias de pago mediante PayPal y para el envío de las notificaciones generadas por el sistema.', 'dvz@domain.com', 'Sistema'),
('app_characteramounttofind', 'Permite definir a partir de cuántos caracteres se realizan búsquedas', '1', 'Sistema'),
('app_clientname', NULL, 'COBRAN-SA', 'Negocio'),
('app_defaultlanguaje', 'Define el idioma en que por defecto se cargarán las interfaces del sistema aun cuando pueden ser variadas localmente mediante el uso de la Barra superior.', 'es-Es', 'Sistema'),
('app_elementsongrid', 'Establece la cantidad de elementos a mostrar en una página de interfaz tabular correspondiente al área de trabajo. De esta forma el sistema se encarga de generar la paginación que entre otras cosas permite elevar el rendimiento de las consultas realizadas a las bases de datos.', '20', 'Tablas de datos'),
('app_fileintegrity', 'Establece la suma de chequeo de integridad de los archivos del sistema', 'aa6fa362971eb0d7c378da620a7440a4', 'Archivos'),
('app_filemaxsize', 'Establece el tamaño (en bytes) máximo de los archivos subidos del sistema', '5242880', 'Archivos'),
('app_filereadcontent', 'Permite definir la forma de leer los contenidos de un archivo. ("text" solo texto y "all" todo el contenido)', 'text', 'Archivos'),
('app_indexablefiles', 'Permite definir los tipos de archivos subidos al servidor que seran indexados para búsquedas. Deben ser especificados separados por coma.', 'doc,docx,xls,xlsx,pdf', 'Archivos'),
('app_lockaccountfor', 'Permite definir el tiempo en segundos por el que se bloquea a los usuarios que superan el máximo de intentos fallidos de autenticación', '300', 'Seguridad'),
('app_mailencryption', 'Establece el Tipo de Encriptado utilizado por el servidor de correo: ~, ssl, tls', '~', 'Correo'),
('app_mailhost', 'Establece el Nombre o la Dirección IP del servidor de correo', '10.0.0.1', 'Correo'),
('app_mailhostport', 'Establece el Puerto por el que escucha el servidor de correo', '25', 'Correo'),
('app_mailpassword', 'Establece el la Contraseña del usuario de correo utilizado para enviar las notificaciones', 'C0ntrasenna', 'Correo'),
('app_mailusername', 'Establece el Usuario de correo utilizado para enviar las notificaciones', 'administrador@domain.com', 'Correo'),
('app_multiactivitypercent', 'Permite definir el porciento que se paga cuando se tiene más de una actividad', '70', 'Negocio'),
('app_name', 'Permite variar el nombre del sistema mostrado el banner superior', 'Zentro&reg; Gestor de Cobros y Pagos', 'Sistema'),
('app_patentcode', 'Permite definir el código de Impuesto sobre los Ingresos Personales. A este código se asocia el valor del pago de la patente por la ejecución de la actividad', '051012', 'Negocio'),
('app_publicservice', 'Permite definir el código de Impuesto sobre los Servicios Públicos.', '020102', 'Negocio'),
('app_sendsystememails', 'Permite definir si el sistema enviará notificaciones por correo o no', '1', 'Sistema'),
('app_showgridtitle', 'Permite personalizar las vistas de las interfaces de gestión usando o no los títulos en las tablas.', '1', 'Tablas de datos'),
('app_showmessageonformloadfailed', 'Permite establecer si el sistema mostrará mensajes de notificación cuando NO se hayan cargado datos a un formulario satisfactoriamente', '1', 'Notificaciones'),
('app_showmessageonformloadposition', 'Permite establecer cómo el sistema mostrará mensajes de notificación (top: notificacion superior, window: en una ventana de información).', 'top', 'Notificaciones'),
('app_showmessageonformloadsuccessful', 'Permite establecer si el sistema mostrará mensajes de notificación cuando se hayan cargado datos a un formulario satisfactoriamente', '', 'Notificaciones'),
('app_showmessageonmoduleloadsuccessful', 'Permite establecer si el sistema mostrará mensajes de notificación cuando se active un módulo satisfactoriamente', '1', 'Notificaciones'),
('app_showmessageonstoreloadfailed', 'Permite establecer si el sistema mostrará mensajes de notificación cuando NO se hayan cargado satisfactoriamente las fuentes de datos', '1', 'Notificaciones'),
('app_showmessageonstoreloadsuccessful', 'Permite establecer si el sistema mostrará mensajes de notificación cuando se hayan cargado satisfactoriamente las fuentes de datos', '', 'Notificaciones'),
('app_unsuccessfulloginattempts', 'Permite definir la cantidad de intentos de autenticación fallidos antes de bloquear el acceso al usuario', '3', 'Seguridad'),
('app_uploadimagedestination', 'Permite definir el lugar donde se desean guardar las imagenes de usuarios del sistema. ("file" como archivos y "db" en la base de datos)', 'file', 'Archivos'),
('app_xpercent', 'Permite definir el porciento que se paga como Impuesto los Ingresos Personales', '10', 'Negocio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_module`
--

CREATE TABLE IF NOT EXISTS `sgab_module` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `nick` varchar(130) NOT NULL,
  `icon` varchar(130) DEFAULT NULL,
  `comment` text,
  `attributes` text,
  `relations` text,
  `is_active` tinyint(1) DEFAULT '1',
  `is_multientity` tinyint(1) DEFAULT '0',
  `is_multientidable` tinyint(1) DEFAULT '0',
  `is_base` tinyint(1) DEFAULT '0',
  `parentid` bigint(20) DEFAULT NULL,
  `path` text,
  `increase` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Volcado de datos para la tabla `sgab_module`
--

INSERT INTO `sgab_module` (`id`, `code`, `name`, `nick`, `icon`, `comment`, `attributes`, `relations`, `is_active`, `is_multientity`, `is_multientidable`, `is_base`, `parentid`, `path`, `increase`) VALUES
(1, 'a1bc2d6ebcc1280df1d2d35cb69eb038', 'Personas', 'Person', 'user_suit.png', 'Personas', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 1, 0, 0, 0, NULL, NULL, NULL),
(2, '7054f79fdf544224152181f3fb8b023f', 'Sexos', 'Sex', 'male.png', NULL, '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 0, 0, 0, 0, NULL, NULL, NULL),
(3, '5ccc852b901c562665fa9adc13dbf9fc', 'Localizaciones', 'Location', 'flag_orange.png', 'Localizaciones', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Padre","nick":"parent","type":"integer","restriction":"","nulleable":true}]', '[{"attributeid":"parent","attribute":"Padre","typeid":"onetomany","type":"Uno a muchos","moduleid":"Location","module":"Ã?rbol paginado"}]', 1, 0, 0, 0, NULL, NULL, NULL),
(4, 'd1844b3b8627e806fdd0f2018add7202', 'Lugar de trabajo', 'Place', 'house.png', 'Lugar de trabajo del trabajador por cuenta propia', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 1, 0, 0, 0, NULL, NULL, NULL),
(5, '531034c747663a655b4951f529e3172a', 'Actividades', 'Activity', 'book_open.png', 'Actividades para el trabajo por cuenta propia', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Prohibida","nick":"forbidden","type":"boolean","restriction":"","nulleable":true},{"name":"Ayuda","nick":"help","type":"boolean","restriction":"","nulleable":true}]', NULL, 1, 0, 0, 0, NULL, NULL, NULL),
(6, 'c14fdea8d4a13423a6ab13ccea444015', 'Elementos de gasto', 'Element', 'bricks.png', 'Elementos de gasto', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 1, 0, 0, 0, NULL, NULL, NULL),
(7, '1472e47657724d3d9afd6a3897ffe5fa', 'Impuestos', 'Tax', 'coins.png', 'Impuestos', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', '[{"attributeid":"parent","attribute":"Padre","typeid":"manytomany","type":"Muchos a muchos","moduleid":"Tax","module":"Impuestos"}]', 1, 0, 0, 0, NULL, NULL, NULL),
(8, 'd1cd0a605cfa6b16c5b94b4eb5650fd5', 'Servicios', 'Service', 'cup.png', 'Servicios', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Cantidad","nick":"amount","type":"decimal","restriction":""}]', NULL, 1, 0, 0, 0, NULL, NULL, NULL),
(9, '0abc28bcb832a6bbd1c673309cbad21a', 'Usuarios', 'User', 'wtop-users.png', 'Gestión de usuarios del sistema', NULL, NULL, 1, 0, 0, 1, NULL, NULL, '9000000000'),
(10, '267cf24edd9f5f09964b575ccc693494', 'Grupos de actividades', 'Activitygroup', 'package.png', 'Grupos de las Actividades para el trabajo por cuenta propia', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Cantidad","nick":"amount","type":"decimal","restriction":""},{"name":"Tipo","nick":"fixed","type":"boolean","restriction":""}]', NULL, 1, 0, 0, 0, NULL, NULL, NULL),
(11, 'cc9aee2e5955cc065a92c2106af9998c', 'Balances', 'Transaction', 'creditcards.png', 'Balance de comprobación de saldos', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"30","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true},{"name":"Cantidad","nick":"amount","type":"decimal","restriction":""}]', NULL, 1, 0, 0, 0, NULL, NULL, NULL),
(12, 'e7af0863035207943f53f63d68f6f170', 'Gráficos', 'Chart', 'wtop-charts.png', 'Generador de gráficos del sistema', NULL, NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(13, 'a6d080f2730d57c1da1e777002102139', 'Calendario', 'Calendar', 'wtop-calendars.png', 'Visor de eventos del sistema', '[{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":false}]', NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(14, 'a7c68a28d40f282bae2ee54b5abcb65a', 'Recordatorios', 'Reminder', 'wtop-reminders.png', 'Gestión de recordatorios del sistema', '[{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":false},{"name":"Valor","nick":"value","type":"int","restriction":"","nulleable":false},{"name":"Periodo","nick":"period","type":"int","restriction":"","nulleable":false}]', NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(15, 'f77828c55becd4d2013f22bfbf5ccf94', 'Configuración', 'Metadata', 'wtop-config.png', 'Configuraci&oacute;n general del sistema', NULL, NULL, 1, 0, 0, 1, NULL, NULL, '9000000000'),
(16, 'bf2d27ca3e7f635e06ac60a586240083', 'Trazas', 'Log', 'wtop-logs.png', 'Auditoría de trazas del sistema', NULL, NULL, 1, 0, 0, 1, NULL, NULL, '9000000000'),
(17, 'a95374dafe28f54b7ce7729f8378c819', 'Módulos', 'Module', 'wtop-modules.png', 'Gestión de módulos del sistema', '[{"name":"Código","nick":"code","type":"string","restriction":"","nulleable":false},{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Alias","nick":"nick","type":"string","restriction":"","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":false},{"name":"Ícono","nick":"icon","type":"string","restriction":"","nulleable":true}]', NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(18, '88a72558f6d824e814086ec6abd3854c', 'Editor de contenido', 'Contenteditor', 'page_paintbrush.png', 'Editor de contenido', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"50","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 0, 0, 0, 0, NULL, NULL, '9000000000'),
(19, '566e353f89a32c0ff6d3f1374a7d54d1', 'Explorador', 'Explorer', 'wtop-explorer.png', 'Gestión de archivos y carpetas del sistema', '[{"name":"Nombre","nick":"name","type":"string","restriction":"","nulleable":false},{"name":"Fecha de modificación","nick":"lastmod","type":"string","restriction":"","nulleable":false},{"name":"Tamaño","nick":"size","type":"string","restriction":"","nulleable":false}]', NULL, 0, 0, 0, 1, NULL, NULL, '9000000000'),
(20, '80b5b2da7cd15147b2806b3538203255', 'Editor de notas', 'Note', 'page_paintbrush.png', 'Editor de notas', '[{"ispk":true,"name":"Código","nick":"code","type":"string","restriction":"50","nulleable":false},{"isak":true,"name":"Nombre","nick":"name","type":"string","restriction":"130","nulleable":false},{"name":"Descripción","nick":"comment","type":"string","restriction":"","nulleable":true}]', NULL, 0, 0, 0, 0, NULL, NULL, '9000000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_moduledependencyrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_moduledependencyrelation` (
  `module_id` bigint(20) NOT NULL DEFAULT '0',
  `dependency_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`module_id`,`dependency_id`),
  KEY `sgab_moduledependencyrelation_dependency_id_sgab_module_id` (`dependency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgab_moduledependencyrelation`
--

INSERT INTO `sgab_moduledependencyrelation` (`module_id`, `dependency_id`) VALUES
(11, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(5, 6),
(5, 7),
(1, 8),
(1, 9),
(14, 9),
(17, 9),
(13, 14),
(20, 18),
(18, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_modulepermission`
--

CREATE TABLE IF NOT EXISTS `sgab_modulepermission` (
  `module_id` bigint(20) NOT NULL DEFAULT '0',
  `permission_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`module_id`,`permission_id`),
  KEY `sgab_modulepermission_permission_id_sf_guard_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgab_modulepermission`
--

INSERT INTO `sgab_modulepermission` (`module_id`, `permission_id`) VALUES
(1, 1),
(3, 2),
(4, 3),
(6, 4),
(8, 5),
(11, 6),
(15, 7),
(9, 8),
(5, 9),
(7, 10),
(10, 11),
(16, 12),
(17, 13),
(18, 13),
(20, 13),
(19, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(2, 22),
(2, 23),
(2, 24),
(2, 25),
(3, 26),
(3, 27),
(3, 28),
(4, 29),
(4, 30),
(4, 31),
(5, 32),
(5, 33),
(5, 34),
(6, 35),
(6, 36),
(6, 37),
(7, 38),
(7, 39),
(7, 40),
(8, 41),
(8, 42),
(8, 43),
(9, 44),
(9, 45),
(9, 46),
(10, 47),
(10, 48),
(10, 49),
(12, 50),
(13, 51),
(14, 51),
(17, 52),
(18, 52),
(20, 52),
(17, 53),
(18, 53),
(20, 53),
(17, 54),
(18, 54),
(20, 54);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_note`
--

CREATE TABLE IF NOT EXISTS `sgab_note` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` longtext,
  `amount` decimal(18,2) DEFAULT NULL,
  `json` longtext,
  `person_id` bigint(20) DEFAULT NULL,
  `parentid` bigint(20) DEFAULT NULL,
  `entityid` text,
  `entity` text,
  `increase` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id_idx` (`person_id`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_person`
--

CREATE TABLE IF NOT EXISTS `sgab_person` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `cellphone` varchar(50) DEFAULT NULL,
  `address` text,
  `comment` text,
  `picture` text,
  `profile` text,
  `patent` varchar(50) DEFAULT NULL,
  `inscription` varchar(50) DEFAULT NULL,
  `nit` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `patented` tinyint(1) DEFAULT '0',
  `usufructuary` tinyint(1) DEFAULT '0',
  `client` tinyint(1) DEFAULT '0',
  `collectday` bigint(20) DEFAULT '20',
  `creationdate` date DEFAULT NULL,
  `deletiondate` date DEFAULT NULL,
  `locationid` bigint(20) DEFAULT NULL,
  `placeid` bigint(20) DEFAULT NULL,
  `sexid` bigint(20) DEFAULT NULL,
  `sf_guard_user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `locationid_idx` (`locationid`),
  KEY `placeid_idx` (`placeid`),
  KEY `sexid_idx` (`sexid`),
  KEY `sf_guard_user_id_idx` (`sf_guard_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_personactivityrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_personactivityrelation` (
  `activity_id` bigint(20) NOT NULL DEFAULT '0',
  `person_id` bigint(20) NOT NULL DEFAULT '0',
  `fromdate` date DEFAULT NULL,
  PRIMARY KEY (`activity_id`,`person_id`),
  KEY `sgab_personactivityrelation_person_id_sgab_person_id` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_personpaymentrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_personpaymentrelation` (
  `person_id` bigint(20) NOT NULL DEFAULT '0',
  `payment_id` bigint(20) NOT NULL DEFAULT '0',
  `amount` decimal(18,2) DEFAULT NULL,
  `deposited` tinyint(1) DEFAULT NULL,
  `paymentdate` date DEFAULT NULL,
  `colector_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`person_id`,`payment_id`),
  KEY `colector_id_idx` (`colector_id`),
  KEY `sgab_personpaymentrelation_payment_id_sgab_bar_id` (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_personpersonrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_personpersonrelation` (
  `employer_id` bigint(20) NOT NULL DEFAULT '0',
  `employee_id` bigint(20) NOT NULL DEFAULT '0',
  `amount` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`employer_id`,`employee_id`),
  KEY `sgab_personpersonrelation_employee_id_sgab_person_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_place`
--

CREATE TABLE IF NOT EXISTS `sgab_place` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` text,
  `name` varchar(130) NOT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `sgab_place`
--

INSERT INTO `sgab_place` (`id`, `comment`, `name`, `code`) VALUES
(1, NULL, 'Domicilio', '685c56a068419301fbfced5c870513'),
(2, NULL, 'Otro local o Espacio arrendado', '0cabcc06860ca81a1f3cf780f56949'),
(3, NULL, 'Areas comunes', '1f65a670a36c50cb870cac6eaaae4f'),
(4, NULL, 'Domicilio del usuario', 'edf13d07cc9e2b616d772f80d822ae'),
(5, NULL, 'Lugares anteriores', '55e19e022a9088d84b71ea54adcc17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_regannex`
--

CREATE TABLE IF NOT EXISTS `sgab_regannex` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `element_id` bigint(20) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL,
  `transaction_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `element_id_idx` (`element_id`),
  KEY `transaction_id_idx` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_reminder`
--

CREATE TABLE IF NOT EXISTS `sgab_reminder` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `comment` text,
  `value` bigint(20) DEFAULT NULL,
  `period` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `sgab_reminder`
--

INSERT INTO `sgab_reminder` (`id`, `code`, `name`, `comment`, `value`, `period`) VALUES
(1, '756a6b48859d658ec3677872a53fc934', 'Al inicio', 'Avisar en el momento de inicio del evento', 0, 1),
(2, '9be1b75865373d2ea6c48ce39d5041de', '5 minutos', 'Avisar cinco minutos antes del inicio del evento', 5, 1),
(3, '0eba28b497bd9a2719838c64fa2da75a', '15 minutos', 'Avisar quince minutos antes del inicio del evento', 15, 1),
(4, 'af50f6844262a64524344ed43e4e57ab', '30 minutos', 'Avisar media hora antes del inicio del evento', 30, 1),
(5, '6528b3bfd5e926a2146ff8237c759a07', '1 hora', 'Avisar una hora antes del inicio del evento', 1, 2),
(6, '28e3e9a4319d4e0ae062a0e79fba6eca', '2 horas', 'Avisar dos horas antes del inicio del evento', 2, 2),
(7, '734856e2910d50a0ff28d267659c87c0', '12 horas', 'Avisar doce horas antes del inicio del evento', 12, 2),
(8, '97174f95fec450fb8a789f8a3c6cfb4d', '1 dia', 'Avisar un dia antes del inicio del evento', 1, 3),
(9, '47945f7637940feee7369351aeac3aed', '2 dias', 'Avisar dos dias antes del inicio del evento', 2, 3),
(10, 'dab3c7d8a981b8a30f2f0ffe96584f80', '1 semana', 'Avisar una semana antes del inicio del evento', 1, 4),
(11, 'd46ee87531f388b6a745fca5bdc86c44', '2 semanas', 'Avisar dos semanas antes del inicio del evento', 2, 4),
(12, 'b6c87ba0a8df385e1f3831a40ea6951a', '1 mes', 'Avisar un mes antes del inicio del evento', 1, 5),
(13, 'bede15262f936e48f8a6a5aeddddd2ce', '1 año', 'Avisar un año antes del inicio del evento', 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_service`
--

CREATE TABLE IF NOT EXISTS `sgab_service` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(18,2) NOT NULL,
  `comment` text,
  `name` varchar(130) NOT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Volcado de datos para la tabla `sgab_service`
--

INSERT INTO `sgab_service` (`id`, `amount`, `comment`, `name`, `code`) VALUES
(1, '40.00', NULL, 'Contabilidad', 'c6d62beeb8046a4dcab73d3c099a35'),
(2, '25.00', NULL, 'Declaración jurada', '38b30e4a2509318022354adb5db86f'),
(3, '10.00', NULL, 'Mecanografía', '3818b09c92c3b4fcf0abeb28279a70'),
(4, '60.00', NULL, 'Mensajería', 'fb557376f7c1be99ccb76dd1a41086'),
(5, '15.00', NULL, 'Cobro de impuestos', 'f50d04399daf5a3e8eaf7d3d9ee805'),
(6, '15.00', NULL, 'Cobro de chequeras', '0ab20400a13d2e67e54ba469e7176e'),
(7, '15.00', NULL, 'Pago de áreas de trabajo', '319aa48b26244af859dd81ad5e33c4'),
(8, '10.00', NULL, 'Pago de patentes', '754d676d9abaf560e68434df3207aa'),
(9, '15.00', NULL, 'Pago de seguridad social', 'f695b8a6e0af6f0544198f861c9c69'),
(10, '15.00', NULL, 'Pago de efectos electodomésticos', 'c0c0cd780cb956015844b238357863'),
(11, '10.00', NULL, 'Pago de viviendas', '07399d94d6c6d72f9736bf05a5348d'),
(12, '10.00', NULL, 'Pago de multas', '6df8842e39f75f48d35cc1a7381416'),
(13, '5.00', NULL, 'Pago de agua y alcantarillado', '8d951ec54b0a9e73eafc4c7297783f'),
(14, '5.00', NULL, 'Pago de electricidad', 'e63b0a44195c797591ae36fa8a28c1'),
(15, '10.00', NULL, 'Pago de teléfono', '9f289712dc2419d7d6f41786088f42'),
(16, '10.00', NULL, 'Otros pagos', 'ab8eacd8079a6932e1c4edc638ed2f');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_servicepersonrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_servicepersonrelation` (
  `person_id` bigint(20) NOT NULL DEFAULT '0',
  `service_id` bigint(20) NOT NULL DEFAULT '0',
  `amount` decimal(18,2) DEFAULT NULL,
  `collectday` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`person_id`,`service_id`),
  KEY `sgab_servicepersonrelation_service_id_sgab_service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_sex`
--

CREATE TABLE IF NOT EXISTS `sgab_sex` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` text,
  `name` varchar(130) NOT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `sgab_sex`
--

INSERT INTO `sgab_sex` (`id`, `comment`, `name`, `code`) VALUES
(1, NULL, 'Masculino', 'MALE'),
(2, NULL, 'Femenino', 'FEMALE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_tax`
--

CREATE TABLE IF NOT EXISTS `sgab_tax` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `period` varchar(1) DEFAULT 'M',
  `comment` text,
  `name` varchar(130) NOT NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `sgab_tax`
--

INSERT INTO `sgab_tax` (`id`, `period`, `comment`, `name`, `code`) VALUES
(1, 'M', NULL, 'Impuesto sobre Ventas Personas Naturales', '011402'),
(2, 'M', NULL, 'Impuesto sobre los Servicios', '020102'),
(3, 'M', NULL, 'Impuesto por el Arrendamiento de Viviendas, Habitaciones o Espacios', '020082'),
(4, 'M', NULL, 'Impuesto sobre los Ingresos Personales', '051012'),
(5, 'Y', NULL, 'Impuesto sobre los Ingresos Personales Liquidación Adicional', '053022'),
(6, 'M', NULL, 'Régimen Simplificado Personas Naturales', '051052'),
(7, 'M', NULL, 'Impuesto por la Utilización de la Fuerza de Trabajo Personas Naturales', '061032'),
(8, 'T', NULL, 'Contribución Especial de los Trabajadores a la Seguridad Social', '082013'),
(9, 'M', NULL, 'Ingresos Personales Eventuales', '053032'),
(10, 'M', NULL, 'Impuesto sobre Transmisión de Bienes y Herencias', '072012'),
(11, 'M', NULL, 'Contribución Especial de Trabajadores a la Seguridad Social. Retenciones', '082023'),
(12, 'M', NULL, 'Impuesto por anuncio comercial', '090012'),
(13, 'M', NULL, 'Recargo', '106012');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_taxactivityrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_taxactivityrelation` (
  `activity_id` bigint(20) NOT NULL DEFAULT '0',
  `tax_id` bigint(20) NOT NULL DEFAULT '0',
  `amount` decimal(18,2) DEFAULT NULL,
  `fixed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`activity_id`,`tax_id`),
  KEY `sgab_taxactivityrelation_tax_id_sgab_tax_id` (`tax_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_taxpersonrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_taxpersonrelation` (
  `person_id` bigint(20) NOT NULL DEFAULT '0',
  `tax_id` bigint(20) NOT NULL DEFAULT '0',
  `amount` decimal(18,2) DEFAULT NULL,
  `fixed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`person_id`,`tax_id`),
  KEY `sgab_taxpersonrelation_tax_id_sgab_tax_id` (`tax_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_taxtaxrelation`
--

CREATE TABLE IF NOT EXISTS `sgab_taxtaxrelation` (
  `tax_id` bigint(20) NOT NULL DEFAULT '0',
  `taxrelated_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`tax_id`,`taxrelated_id`),
  KEY `sgab_taxtaxrelation_taxrelated_id_sgab_tax_id` (`taxrelated_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_testing`
--

CREATE TABLE IF NOT EXISTS `sgab_testing` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parentid` bigint(20) DEFAULT NULL,
  `comment` text,
  `nick` varchar(50) NOT NULL,
  `name` varchar(130) NOT NULL,
  `code` varchar(50) NOT NULL,
  `path` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parentid_idx` (`parentid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgab_transaction`
--

CREATE TABLE IF NOT EXISTS `sgab_transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `creationdate` date DEFAULT NULL,
  `comment` text,
  `debit` decimal(18,2) DEFAULT NULL,
  `credit` decimal(18,2) DEFAULT NULL,
  `person_id` bigint(20) DEFAULT NULL,
  `activity_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id_idx` (`person_id`),
  KEY `activity_id_idx` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sf_guard_forgot_password`
--
ALTER TABLE `sf_guard_forgot_password`
  ADD CONSTRAINT `sf_guard_forgot_password_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sf_guard_group_permission`
--
ALTER TABLE `sf_guard_group_permission`
  ADD CONSTRAINT `sf_guard_group_permission_group_id_sf_guard_group_id` FOREIGN KEY (`group_id`) REFERENCES `sf_guard_group` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sf_guard_group_permission_permission_id_sf_guard_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `sf_guard_permission` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sf_guard_remember_key`
--
ALTER TABLE `sf_guard_remember_key`
  ADD CONSTRAINT `sf_guard_remember_key_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sf_guard_user_group`
--
ALTER TABLE `sf_guard_user_group`
  ADD CONSTRAINT `sf_guard_user_group_group_id_sf_guard_group_id` FOREIGN KEY (`group_id`) REFERENCES `sf_guard_group` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sf_guard_user_group_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sf_guard_user_password`
--
ALTER TABLE `sf_guard_user_password`
  ADD CONSTRAINT `sf_guard_user_password_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`);

--
-- Filtros para la tabla `sf_guard_user_permission`
--
ALTER TABLE `sf_guard_user_permission`
  ADD CONSTRAINT `sf_guard_user_permission_permission_id_sf_guard_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `sf_guard_permission` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sf_guard_user_permission_user_id_sf_guard_user_id` FOREIGN KEY (`user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_activity`
--
ALTER TABLE `sgab_activity`
  ADD CONSTRAINT `sgab_activity_activitygroupid_sgab_activitygroup_id` FOREIGN KEY (`activitygroupid`) REFERENCES `sgab_activitygroup` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `sgab_bar`
--
ALTER TABLE `sgab_bar`
  ADD CONSTRAINT `sgab_bar_taxid_sgab_tax_id` FOREIGN KEY (`taxid`) REFERENCES `sgab_tax` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_elementactivityrelation`
--
ALTER TABLE `sgab_elementactivityrelation`
  ADD CONSTRAINT `sgab_elementactivityrelation_activity_id_sgab_activity_id` FOREIGN KEY (`activity_id`) REFERENCES `sgab_activity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_elementactivityrelation_element_id_sgab_element_id` FOREIGN KEY (`element_id`) REFERENCES `sgab_element` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_entityuserrelation`
--
ALTER TABLE `sgab_entityuserrelation`
  ADD CONSTRAINT `sgab_entityuserrelation_sf_guard_user_id_sf_guard_user_id` FOREIGN KEY (`sf_guard_user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_event`
--
ALTER TABLE `sgab_event`
  ADD CONSTRAINT `sgab_event_calendarid_sgab_calendar_id` FOREIGN KEY (`calendarid`) REFERENCES `sgab_calendar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_event_reminderid_sgab_reminder_id` FOREIGN KEY (`reminderid`) REFERENCES `sgab_reminder` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_example`
--
ALTER TABLE `sgab_example`
  ADD CONSTRAINT `sgab_example_parentid_sgab_example_id` FOREIGN KEY (`parentid`) REFERENCES `sgab_example` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_location`
--
ALTER TABLE `sgab_location`
  ADD CONSTRAINT `sgab_location_parentid_sgab_location_id` FOREIGN KEY (`parentid`) REFERENCES `sgab_location` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_module`
--
ALTER TABLE `sgab_module`
  ADD CONSTRAINT `sgab_module_parentid_sgab_module_id` FOREIGN KEY (`parentid`) REFERENCES `sgab_module` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_moduledependencyrelation`
--
ALTER TABLE `sgab_moduledependencyrelation`
  ADD CONSTRAINT `sgab_moduledependencyrelation_dependency_id_sgab_module_id` FOREIGN KEY (`dependency_id`) REFERENCES `sgab_module` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_moduledependencyrelation_module_id_sgab_module_id` FOREIGN KEY (`module_id`) REFERENCES `sgab_module` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_modulepermission`
--
ALTER TABLE `sgab_modulepermission`
  ADD CONSTRAINT `sgab_modulepermission_module_id_sgab_module_id` FOREIGN KEY (`module_id`) REFERENCES `sgab_module` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_modulepermission_permission_id_sf_guard_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `sf_guard_permission` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_note`
--
ALTER TABLE `sgab_note`
  ADD CONSTRAINT `sgab_note_parentid_sgab_note_id` FOREIGN KEY (`parentid`) REFERENCES `sgab_note` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_note_person_id_sgab_person_id` FOREIGN KEY (`person_id`) REFERENCES `sgab_person` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_person`
--
ALTER TABLE `sgab_person`
  ADD CONSTRAINT `sgab_person_locationid_sgab_location_id` FOREIGN KEY (`locationid`) REFERENCES `sgab_location` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `sgab_person_placeid_sgab_place_id` FOREIGN KEY (`placeid`) REFERENCES `sgab_place` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `sgab_person_sexid_sgab_sex_id` FOREIGN KEY (`sexid`) REFERENCES `sgab_sex` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `sgab_person_sf_guard_user_id_sf_guard_user_id` FOREIGN KEY (`sf_guard_user_id`) REFERENCES `sf_guard_user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_personactivityrelation`
--
ALTER TABLE `sgab_personactivityrelation`
  ADD CONSTRAINT `sgab_personactivityrelation_activity_id_sgab_activity_id` FOREIGN KEY (`activity_id`) REFERENCES `sgab_activity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_personactivityrelation_person_id_sgab_person_id` FOREIGN KEY (`person_id`) REFERENCES `sgab_person` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_personpaymentrelation`
--
ALTER TABLE `sgab_personpaymentrelation`
  ADD CONSTRAINT `sgab_personpaymentrelation_colector_id_sgab_person_id` FOREIGN KEY (`colector_id`) REFERENCES `sgab_person` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_personpaymentrelation_payment_id_sgab_bar_id` FOREIGN KEY (`payment_id`) REFERENCES `sgab_bar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_personpaymentrelation_person_id_sgab_person_id` FOREIGN KEY (`person_id`) REFERENCES `sgab_person` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_personpersonrelation`
--
ALTER TABLE `sgab_personpersonrelation`
  ADD CONSTRAINT `sgab_personpersonrelation_employee_id_sgab_person_id` FOREIGN KEY (`employee_id`) REFERENCES `sgab_person` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_personpersonrelation_employer_id_sgab_person_id` FOREIGN KEY (`employer_id`) REFERENCES `sgab_person` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_regannex`
--
ALTER TABLE `sgab_regannex`
  ADD CONSTRAINT `sgab_regannex_element_id_sgab_element_id` FOREIGN KEY (`element_id`) REFERENCES `sgab_element` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_regannex_transaction_id_sgab_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `sgab_transaction` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_servicepersonrelation`
--
ALTER TABLE `sgab_servicepersonrelation`
  ADD CONSTRAINT `sgab_servicepersonrelation_person_id_sgab_person_id` FOREIGN KEY (`person_id`) REFERENCES `sgab_person` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_servicepersonrelation_service_id_sgab_service_id` FOREIGN KEY (`service_id`) REFERENCES `sgab_service` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_taxactivityrelation`
--
ALTER TABLE `sgab_taxactivityrelation`
  ADD CONSTRAINT `sgab_taxactivityrelation_activity_id_sgab_activity_id` FOREIGN KEY (`activity_id`) REFERENCES `sgab_activity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_taxactivityrelation_tax_id_sgab_tax_id` FOREIGN KEY (`tax_id`) REFERENCES `sgab_tax` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_taxpersonrelation`
--
ALTER TABLE `sgab_taxpersonrelation`
  ADD CONSTRAINT `sgab_taxpersonrelation_person_id_sgab_person_id` FOREIGN KEY (`person_id`) REFERENCES `sgab_person` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_taxpersonrelation_tax_id_sgab_tax_id` FOREIGN KEY (`tax_id`) REFERENCES `sgab_tax` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_taxtaxrelation`
--
ALTER TABLE `sgab_taxtaxrelation`
  ADD CONSTRAINT `sgab_taxtaxrelation_tax_id_sgab_tax_id` FOREIGN KEY (`tax_id`) REFERENCES `sgab_tax` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_taxtaxrelation_taxrelated_id_sgab_tax_id` FOREIGN KEY (`taxrelated_id`) REFERENCES `sgab_tax` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_testing`
--
ALTER TABLE `sgab_testing`
  ADD CONSTRAINT `sgab_testing_parentid_sgab_testing_id` FOREIGN KEY (`parentid`) REFERENCES `sgab_testing` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sgab_transaction`
--
ALTER TABLE `sgab_transaction`
  ADD CONSTRAINT `sgab_transaction_activity_id_sgab_activity_id` FOREIGN KEY (`activity_id`) REFERENCES `sgab_activity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sgab_transaction_person_id_sgab_person_id` FOREIGN KEY (`person_id`) REFERENCES `sgab_person` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
