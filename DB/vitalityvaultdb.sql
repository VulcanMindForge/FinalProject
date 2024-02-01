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
  `height` VARCHAR(45) NULL,
  `weight` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT(2000) NULL,
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
  `log_entry_type_id` INT NOT NULL,
  PRIMARY KEY (`id`, `log_entry_type_id`),
  INDEX `fk_trial_user1_idx` (`user_id` ASC),
  INDEX `fk_trial_log_entry_type1_idx` (`log_entry_type_id` ASC),
  CONSTRAINT `fk_trial_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trial_log_entry_type1`
    FOREIGN KEY (`log_entry_type_id`)
    REFERENCES `log_entry_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trial_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trial_comment` ;

CREATE TABLE IF NOT EXISTS `trial_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `content_date` DATETIME NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_log_entry_type_comment_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_log_entry_type_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trial_has_trial_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trial_has_trial_comment` ;

CREATE TABLE IF NOT EXISTS `trial_has_trial_comment` (
  `trial_id` INT NOT NULL,
  `trial_comment_id` INT NOT NULL,
  PRIMARY KEY (`trial_id`, `trial_comment_id`),
  INDEX `fk_trial_has_trial_comment_trial_comment1_idx` (`trial_comment_id` ASC),
  INDEX `fk_trial_has_trial_comment_trial1_idx` (`trial_id` ASC),
  CONSTRAINT `fk_trial_has_trial_comment_trial1`
    FOREIGN KEY (`trial_id`)
    REFERENCES `trial` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trial_has_trial_comment_trial_comment1`
    FOREIGN KEY (`trial_comment_id`)
    REFERENCES `trial_comment` (`id`)
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
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `birthdate`, `sex`, `biography`, `image_url`, `email`, `height`, `weight`) VALUES (1, 'admin', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, NULL, 'admin', 'admin', NULL, 'male', 'admin', NULL, 'admin@admin.com', NULL, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `birthdate`, `sex`, `biography`, `image_url`, `email`, `height`, `weight`) VALUES (2, 'FitExplorer23', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, NULL, 'Sarah', 'Johnson', '2000-01-30', 'female', 'Fitness enthusiast and adventure seeker. Sarah loves exploring new workout routines and healthy recipes. As a busy professional, she relies on our platform to streamline her supplement regimen and track her progress on the journey to a balanced and active lifestyle.', 'https://images.pexels.com/photos/669578/pexels-photo-669578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'sarahjohnson@email.com', '5\'8\"', '150 lbs');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `birthdate`, `sex`, `biography`, `image_url`, `email`, `height`, `weight`) VALUES (3, 'WellnessWarrior', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, NULL, 'Michael', 'Rodriguez', '1960-01-30', 'male', 'Dedicated to optimizing health through holistic practices, Michael is passionate about fitness and mindfulness. As a regular user of our platform, he relies on the medication tracking feature to manage his health routine seamlessly, allowing him more time to focus on his wellness journey.', 'https://stock.adobe.com/search?k=rx+symbol&asset_id=87767692', 'michael.rodriguez@email.com', '6\'2\"', '200 lbs');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `birthdate`, `sex`, `biography`, `image_url`, `email`, `height`, `weight`) VALUES (4, 'MindfulMover', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, NULL, 'Emily', 'Chen', '1980-01-30', 'female', 'Yoga enthusiast and mental wellness advocate, Emily embraces a balanced lifestyle. Using our platform, she combines mindful movement with personalized supplement tracking, creating a holistic approach to health. Join Emily on her journey to cultivate a harmonious mind-body connection.', 'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'emily.chen@email.com', '5\'4\"', '120 lbs');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `birthdate`, `sex`, `biography`, `image_url`, `email`, `height`, `weight`) VALUES (5, 'ActiveExplorer', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, NULL, 'Alex', 'Thompson', '1990-01-30', 'male', 'Outdoor enthusiast and fitness lover, Alex is on a mission to conquer new physical challenges. Through our platform, he effortlessly manages his workout routines and supplement intake, enabling him to stay active and reach his fitness goals. Join Alex as he explores the world one step at a time.\nOutdoor enthusiast and fitness lover, Alex is on a mission to conquer new physical challenges. Through our platform, he effortlessly manages his workout routines and supplement intake, enabling him to stay active and reach his fitness goals. Join Alex as he explores the world one step at a time.\nOutdoor enthusiast and fitness lover, Alex is on a mission to conquer new physical challenges. Through our platform, he effortlessly manages his workout routines and supplement intake, enabling him to stay active and reach his fitness goals. Join Alex as he explores the world one step at a time.', 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'alex.thompson@email.com', '6\'0\"', '180 lbs');
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `first_name`, `last_name`, `birthdate`, `sex`, `biography`, `image_url`, `email`, `height`, `weight`) VALUES (6, 'NutritionNinja', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, NULL, 'Olivia', 'Davis', '1995-01-30', 'female', 'Nutritionist and wellness coach, Olivia is dedicated to helping others achieve their health goals. As a user of our platform, she leverages the medication and supplement tracking features to stay organized and informed, providing valuable insights to her clients on their own wellness journeys. Join Olivia in the pursuit of a balanced and nourished life.', 'https://images.pexels.com/photos/8844387/pexels-photo-8844387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'olivia.davis@email.com', '5\'6', '140 lbs');

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `category` (`id`, `name`) VALUES (1, 'Food');
INSERT INTO `category` (`id`, `name`) VALUES (2, 'Workout');
INSERT INTO `category` (`id`, `name`) VALUES (3, 'Sleep');
INSERT INTO `category` (`id`, `name`) VALUES (4, 'Pain');
INSERT INTO `category` (`id`, `name`) VALUES (5, 'Medication');
INSERT INTO `category` (`id`, `name`) VALUES (6, 'Supplement');

COMMIT;


-- -----------------------------------------------------
-- Data for table `log_entry_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `log_entry_type` (`id`, `name`, `description`, `category_id`) VALUES (1, 'Weights', 'Strong Lifts 5x5', 2);
INSERT INTO `log_entry_type` (`id`, `name`, `description`, `category_id`) VALUES (2, 'Protein', 'Unflavored. Zero Sugar. Pure Whey', 6);
INSERT INTO `log_entry_type` (`id`, `name`, `description`, `category_id`) VALUES (3, 'Sleep', 'New Memory Foam', 3);
INSERT INTO `log_entry_type` (`id`, `name`, `description`, `category_id`) VALUES (4, 'Zzquill', 'Sleep Meds', 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `unit`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `unit` (`id`, `name`) VALUES (1, 'cup');
INSERT INTO `unit` (`id`, `name`) VALUES (2, 'grams');
INSERT INTO `unit` (`id`, `name`) VALUES (3, 'ounces');
INSERT INTO `unit` (`id`, `name`) VALUES (4, 'pounds');
INSERT INTO `unit` (`id`, `name`) VALUES (5, 'mililiters');
INSERT INTO `unit` (`id`, `name`) VALUES (6, 'tablespoons');
INSERT INTO `unit` (`id`, `name`) VALUES (7, 'teaspoons');
INSERT INTO `unit` (`id`, `name`) VALUES (8, 'servings');
INSERT INTO `unit` (`id`, `name`) VALUES (9, 'scoop');
INSERT INTO `unit` (`id`, `name`) VALUES (10, 'small');
INSERT INTO `unit` (`id`, `name`) VALUES (11, 'medium');
INSERT INTO `unit` (`id`, `name`) VALUES (12, 'large');
INSERT INTO `unit` (`id`, `name`) VALUES (13, 'repitition');
INSERT INTO `unit` (`id`, `name`) VALUES (14, 'set');
INSERT INTO `unit` (`id`, `name`) VALUES (15, 'hours');
INSERT INTO `unit` (`id`, `name`) VALUES (16, 'minutes');
INSERT INTO `unit` (`id`, `name`) VALUES (17, 'calories');
INSERT INTO `unit` (`id`, `name`) VALUES (18, 'miligrams');

COMMIT;


-- -----------------------------------------------------
-- Data for table `log_entry`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (2, 2, NULL, NULL, '2024-01-19', 'Protein Shake', 1, 2, '3', 9, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (3, 1, NULL, NULL, '2024-01-20', 'Cardio. The worst. Crushed 5 miles', 9, 2, '20', 16, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (4, 2, NULL, NULL, '2024-01-20', 'Protein Shake', 1, 2, '3', 9, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (5, 1, NULL, NULL, '2024-01-21', 'Upper Body. No spotter.', 10, 2, '10', 14, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (6, 2, NULL, NULL, '2024-01-21', 'Protein Shake', 1, 2, '3', 9, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (7, 3, NULL, NULL, '2024-01-22', 'Mattress was a little stiff.', 5, 3, '6', 15, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (8, 3, NULL, NULL, '2024-01-23', 'Slept better. Starting to break in', 7, 3, '8', 15, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (9, 3, NULL, NULL, '2024-01-24', 'Tossed and turned. Worried about final presentation.', 3, 3, '4', 15, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (10, 3, NULL, NULL, '2024-01-25', 'I\'m certain I didn\'t move at all', 10, 3, '12', 15, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (11, 3, NULL, NULL, '2024-01-26', 'Mattress was a good choice', 8, 3, '8', 15, NULL);
INSERT INTO `log_entry` (`id`, `log_entry_type_id`, `create_date`, `last_update`, `entry_date`, `description`, `degree`, `user_id`, `amount`, `unit_id`, `entry_time`) VALUES (12, 4, NULL, NULL, '2024-01-26', 'Zzqul', 1, 3, '10', 5, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trial`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `trial` (`id`, `create_date`, `purpose`, `user_id`, `last_update`, `start_date`, `end_date`, `title`, `published`, `log_entry_type_id`) VALUES (1, NULL, 'I want to see how ripped I get from taking 5 supplements', 2, NULL, '2024-01-19', '2024-01-30', 'Jacked', 1, 1);
INSERT INTO `trial` (`id`, `create_date`, `purpose`, `user_id`, `last_update`, `start_date`, `end_date`, `title`, `published`, `log_entry_type_id`) VALUES (2, NULL, 'I want to track my sleep patterns in my new mattress', 3, NULL, '2024-01-22', '2024-01-30', 'New Mattress', 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `trial_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `vitalityvaultdb`;
INSERT INTO `trial_comment` (`id`, `content`, `content_date`, `user_id`) VALUES (1, 'Was good', '2024-01-25', 1);
INSERT INTO `trial_comment` (`id`, `content`, `content_date`, `user_id`) VALUES (2, 'Crushed it', '2024-01-30', 2);
INSERT INTO `trial_comment` (`id`, `content`, `content_date`, `user_id`) VALUES (3, 'Pain was bad', '2024-01-30', 3);

COMMIT;

