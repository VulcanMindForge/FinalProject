-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `enabled` TINYINT(1) NOT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vital`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vital` ;

CREATE TABLE IF NOT EXISTS `vital` (
  `id` INT NOT NULL,
  `height` DECIMAL(2) NULL,
  `weight` DECIMAL(2) NULL,
  `gender` VARCHAR(45) NULL,
  `current_issues` TEXT(4000) NULL,
  `medID` INT NULL,
  `supplementID` INT NULL,
  `goals` TEXT(4000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `food`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `food` ;

CREATE TABLE IF NOT EXISTS `food` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` TEXT(200) NULL,
  `servings` TEXT(50) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pain`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pain` ;

CREATE TABLE IF NOT EXISTS `pain` (
  `id` INT NOT NULL,
  `level` VARCHAR(45) NOT NULL,
  `location` TEXT(50) NULL,
  `description` TEXT(2000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `daily_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `daily_log` ;

CREATE TABLE IF NOT EXISTS `daily_log` (
  `id` INT NOT NULL,
  `create_date` DATE NULL,
  `foodID` INT NULL,
  `workoutID` INT NULL,
  `sleepID` INT NULL,
  `painID` INT NULL,
  `moodID` INT NULL,
  `supplementID` INT NULL,
  `medID` INT NULL,
  `food_id` INT NOT NULL,
  `pain_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_daily_log_food1_idx` (`food_id` ASC) VISIBLE,
  INDEX `fk_daily_log_pain1_idx` (`pain_id` ASC) VISIBLE,
  INDEX `fk_daily_log_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_daily_log_food1`
    FOREIGN KEY (`food_id`)
    REFERENCES `food` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_daily_log_pain1`
    FOREIGN KEY (`pain_id`)
    REFERENCES `pain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_daily_log_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sup_med_tracker`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sup_med_tracker` ;

CREATE TABLE IF NOT EXISTS `sup_med_tracker` (
  `id` INT NOT NULL,
  `supplementID` INT NULL,
  `medID` INT NULL,
  `custom_name` TEXT(200) NULL,
  `duration` TEXT(50) NULL,
  `create_date` DATE NULL,
  `purpose` TEXT(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `medication` ;

CREATE TABLE IF NOT EXISTS `medication` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `dosage` VARCHAR(45) NULL,
  `schedule` VARCHAR(45) NULL,
  `purpose` VARCHAR(45) NULL,
  `daily_log_id` INT NOT NULL,
  `table1_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_medication_daily_log1_idx` (`daily_log_id` ASC) VISIBLE,
  INDEX `fk_medication_table11_idx` (`table1_id` ASC) VISIBLE,
  CONSTRAINT `fk_medication_daily_log1`
    FOREIGN KEY (`daily_log_id`)
    REFERENCES `daily_log` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medication_table11`
    FOREIGN KEY (`table1_id`)
    REFERENCES `sup_med_tracker` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supplement`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supplement` ;

CREATE TABLE IF NOT EXISTS `supplement` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `schedule` VARCHAR(45) NULL,
  `purpose` VARCHAR(45) NULL,
  `dosage` VARCHAR(45) NULL,
  `daily_log_id` INT NOT NULL,
  `table1_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_supplement_daily_log1_idx` (`daily_log_id` ASC) VISIBLE,
  INDEX `fk_supplement_table11_idx` (`table1_id` ASC) VISIBLE,
  CONSTRAINT `fk_supplement_daily_log1`
    FOREIGN KEY (`daily_log_id`)
    REFERENCES `daily_log` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_supplement_table11`
    FOREIGN KEY (`table1_id`)
    REFERENCES `sup_med_tracker` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workout`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workout` ;

CREATE TABLE IF NOT EXISTS `workout` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `duration` VARCHAR(45) NULL,
  `description` TEXT(2000) NULL,
  `pain` TINYINT(1) NULL,
  `daily_log_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_workout_daily_log_idx` (`daily_log_id` ASC) VISIBLE,
  CONSTRAINT `fk_workout_daily_log`
    FOREIGN KEY (`daily_log_id`)
    REFERENCES `daily_log` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sleep`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sleep` ;

CREATE TABLE IF NOT EXISTS `sleep` (
  `id` INT NOT NULL,
  `duration` VARCHAR(45) NULL,
  `quality` VARCHAR(45) NULL,
  `description` TEXT(2000) NULL,
  `daily_log_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sleep_daily_log1_idx` (`daily_log_id` ASC) VISIBLE,
  CONSTRAINT `fk_sleep_daily_log1`
    FOREIGN KEY (`daily_log_id`)
    REFERENCES `daily_log` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mood`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mood` ;

CREATE TABLE IF NOT EXISTS `mood` (
  `id` INT NOT NULL,
  `feeling` TEXT(30) NULL,
  `energy_level` TEXT(40) NULL,
  `description` TEXT(2000) NULL,
  `daily_log_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mood_daily_log1_idx` (`daily_log_id` ASC) VISIBLE,
  CONSTRAINT `fk_mood_daily_log1`
    FOREIGN KEY (`daily_log_id`)
    REFERENCES `daily_log` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sup_med_tracker_has_daily_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sup_med_tracker_has_daily_log` ;

CREATE TABLE IF NOT EXISTS `sup_med_tracker_has_daily_log` (
  `sup_med_tracker_id` INT NOT NULL,
  `daily_log_id` INT NOT NULL,
  `daily_log_user_id` INT NOT NULL,
  PRIMARY KEY (`sup_med_tracker_id`, `daily_log_id`, `daily_log_user_id`),
  INDEX `fk_sup_med_tracker_has_daily_log_daily_log1_idx` (`daily_log_id` ASC, `daily_log_user_id` ASC) VISIBLE,
  INDEX `fk_sup_med_tracker_has_daily_log_sup_med_tracker1_idx` (`sup_med_tracker_id` ASC) VISIBLE,
  CONSTRAINT `fk_sup_med_tracker_has_daily_log_sup_med_tracker1`
    FOREIGN KEY (`sup_med_tracker_id`)
    REFERENCES `sup_med_tracker` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sup_med_tracker_has_daily_log_daily_log1`
    FOREIGN KEY (`daily_log_id` , `daily_log_user_id`)
    REFERENCES `daily_log` (`id` , `user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `id` INT NOT NULL,
  `create_date` DATETIME NOT NULL,
  `message` TEXT(2000) NULL,
  `senderID` INT NULL,
  `receiverID` INT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_message_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
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
USE `mydb`;
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (1, 'admin', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, NULL);

COMMIT;

