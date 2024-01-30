-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema vitalityvaultdb
-- -----------------------------------------------------
-- 
-- 
-- 
-- \
DROP SCHEMA IF EXISTS `vitalityvaultdb` ;

-- -----------------------------------------------------
-- Schema vitalityvaultdb
--
-- 
-- 
-- 
-- \
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `vitalityvaultdb` DEFAULT CHARACTER SET utf8 ;
USE `vitalityvaultdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(2000) NOT NULL,
  `enabled` TINYINT(1) NOT NULL,
  `role` VARCHAR(45) NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `birthdate` DATE NULL,
  `sex` VARCHAR(45) NULL,
  `biography` TEXT NULL,
  `image_url` VARCHAR(2000) NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT(2000) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `log_entry_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `log_entry_type` ;

CREATE TABLE IF NOT EXISTS `log_entry_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` TEXT(2000) NULL,
  `image_url` VARCHAR(2000) NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_log_entry_type_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_log_entry_type_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `unit` ;

CREATE TABLE IF NOT EXISTS `unit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `log_entry`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `log_entry` ;

CREATE TABLE IF NOT EXISTS `log_entry` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `log_entry_type_id` INT NOT NULL,
  `create_date` DATETIME NULL,
  `last_update` DATETIME NULL,
  `entry_date` DATE NULL,
  `description` TEXT NULL,
  `degree` INT NULL,
  `user_id` INT NOT NULL,
  `amount` VARCHAR(45) NULL,
  `unit_id` INT NULL,
  `entry_time` TIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_log_entry_log_entry_type1_idx` (`log_entry_type_id` ASC),
  INDEX `fk_log_entry_user1_idx` (`user_id` ASC),
  INDEX `fk_log_entry_unit1_idx` (`unit_id` ASC),
  CONSTRAINT `fk_log_entry_log_entry_type1`
    FOREIGN KEY (`log_entry_type_id`)
    REFERENCES `log_entry_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_entry_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_entry_unit1`
    FOREIGN KEY (`unit_id`)
    REFERENCES `unit` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trial`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trial` ;

CREATE TABLE IF NOT EXISTS `trial` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME NULL,
  `purpose` TEXT NULL,
  `user_id` INT NOT NULL,
  `last_update` DATETIME NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `title` VARCHAR(100) NULL,
  `published` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_trial_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_trial_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT(2000) NULL,
  `date_time` DATETIME NULL,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chat_user1_idx` (`sender_id` ASC),
  INDEX `fk_chat_user2_idx` (`receiver_id` ASC),
  CONSTRAINT `fk_chat_user1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chat_user2`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trial_has_log_entry_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trial_has_log_entry_type` ;

CREATE TABLE IF NOT EXISTS `trial_has_log_entry_type` (
  `trial_id` INT NOT NULL,
  `log_entry_type_id` INT NOT NULL,
  PRIMARY KEY (`trial_id`, `log_entry_type_id`),
  INDEX `fk_trial_has_log_entry_type_log_entry_type1_idx` (`log_entry_type_id` ASC),
  INDEX `fk_trial_has_log_entry_type_trial1_idx` (`trial_id` ASC),
  CONSTRAINT `fk_trial_has_log_entry_type_trial1`
    FOREIGN KEY (`trial_id`)
    REFERENCES `trial` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trial_has_log_entry_type_log_entry_type1`
    FOREIGN KEY (`log_entry_type_id`)
    REFERENCES `log_entry_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `log_entry_type_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `log_entry_type_comment` ;

CREATE TABLE IF NOT EXISTS `log_entry_type_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `content_date` DATETIME NULL,
  `user_id` INT NOT NULL,
  `log_entry_type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_log_entry_type_comment_user1_idx` (`user_id` ASC),
  INDEX `fk_log_entry_type_comment_log_entry_type1_idx` (`log_entry_type_id` ASC),
  CONSTRAINT `fk_log_entry_type_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_entry_type_comment_log_entry_type1`
    FOREIGN KEY (`log_entry_type_id`)
    REFERENCES `log_entry_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS vitalityvault@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'vitalityvault'@'localhost' IDENTIFIED BY 'vitalityvault';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'vitalityvault'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `birthdate`, `sex`, `biography`, `image_url`, `email`) VALUES (1, 'admin', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, NULL, 'admin', 'admin', NULL, 'male', 'admin', NULL, 'admin@admin.com');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `birthdate`, `sex`, `biography`, `image_url`, `email`) VALUES (2, 'kettlebellking', 'crossfit', 1, NULL, 'Ido', 'Crossfit', '2000-01-30', 'male', 'I\'m a huge crossfitter. I eat sleep and breathe crossfit.', 'https://stock.adobe.com/search?k=crossfit&asset_id=242396695', 'kettlebellking@crossfit.com');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `birthdate`, `sex`, `biography`, `image_url`, `email`) VALUES (3, 'iminpain', 'pain', 1, NULL, 'Ihave', 'Lotsofpain', '1960-01-30', 'female', 'I have lots of pain and do lots of trials and take lots of medications', 'https://stock.adobe.com/search?k=rx+symbol&asset_id=87767692', 'painandmeds@pain.com');

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `category` (`id`, `name`, `description`) VALUES (1, 'Food', 'A brief description of the food item eg. \"Apple\" or \"Hamburger\"');
INSERT INTO `category` (`id`, `name`, `description`) VALUES (2, 'Workout', 'Provide type of workout (Weights, Cardio, etc), duration, and effort level');
INSERT INTO `category` (`id`, `name`, `description`) VALUES (3, 'Sleep', 'Provide duration of sleep, number of wakeups or interruptions');
INSERT INTO `category` (`id`, `name`, `description`) VALUES (4, 'Pain', 'Pain scale from 1-10');
INSERT INTO `category` (`id`, `name`, `description`) VALUES (5, 'Medication', 'Provide dosage, frequency, and purpose');
INSERT INTO `category` (`id`, `name`, `description`) VALUES (6, 'Supplement', 'Provide amount, frequency, and purpose');

COMMIT;


-- -----------------------------------------------------
-- Data for table `log_entry_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `log_entry_type` (`id`, `name`, `description`, `image_url`, `category_id`) VALUES (1, 'Oatmeal', NULL, NULL, 1);
INSERT INTO `log_entry_type` (`id`, `name`, `description`, `image_url`, `category_id`) VALUES (2, 'Kettlebell Swings', '10x200', 'https://cdn4.volusion.store/dtwfe-bjanx/v/vspfiles/photos/IM-0350WH-2.gif', 2);
INSERT INTO `log_entry_type` (`id`, `name`, `description`, `image_url`, `category_id`) VALUES (3, 'Lower Back Pain', 'center of back', NULL, 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `unit`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `unit` (`id`, `name`) VALUES (1, 'cup');
INSERT INTO `unit` (`id`, `name`) VALUES (DEFAULT, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `log_entry`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (1, 1, NULL, NULL, NULL, 'Brown Sugar', NULL, 1, '1', 1, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (2, 2, NULL, NULL, '2024-01-30', 'I did 4 hrs of kettlebell swings', NULL, 2, NULL, NULL, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (3, 3, NULL, NULL, '2024-01-30', 'I had immense pain in my lower back', 10, 3, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trial`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `trial` (`id`, `create_date`, `purpose`, `user_id`, `last_update`, `start_date`, `end_date`, `title`, `published`) VALUES (1, NULL, 'testing', 1, NULL, NULL, NULL, 'TEST', 0);
INSERT INTO `trial` (`id`, `create_date`, `purpose`, `user_id`, `last_update`, `start_date`, `end_date`, `title`, `published`) VALUES (2, NULL, 'I want to exclusively do kettlebell swings and see how ripped I get', 2, NULL, '2024-01-01', '2024-02-02', 'Kettlebell Kingdom', 1);
INSERT INTO `trial` (`id`, `create_date`, `purpose`, `user_id`, `last_update`, `start_date`, `end_date`, `title`, `published`) VALUES (3, NULL, 'I want to see if lower back stretches reduce pain', 3, NULL, '2024-01-30', '2024-02-28', 'Lower Back Stretches', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `message`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `message` (`id`, `content`, `date_time`, `sender_id`, `receiver_id`) VALUES (1, 'test', NULL, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trial_has_log_entry_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `trial_has_log_entry_type` (`trial_id`, `log_entry_type_id`) VALUES (1, 1);
INSERT INTO `trial_has_log_entry_type` (`trial_id`, `log_entry_type_id`) VALUES (2, 2);
INSERT INTO `trial_has_log_entry_type` (`trial_id`, `log_entry_type_id`) VALUES (3, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `log_entry_type_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `log_entry_type_comment` (`id`, `content`, `content_date`, `user_id`, `log_entry_type_id`) VALUES (1, 'Was good', '2024-01-25', 1, 1);
INSERT INTO `log_entry_type_comment` (`id`, `content`, `content_date`, `user_id`, `log_entry_type_id`) VALUES (2, 'Crushed it', '2024-01-30', 2, 2);
INSERT INTO `log_entry_type_comment` (`id`, `content`, `content_date`, `user_id`, `log_entry_type_id`) VALUES (3, 'Pain was bad', '2024-01-30', 3, 3);

COMMIT;

