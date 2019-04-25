DROP DATABASE IF EXISTS mydata_db;

CREATE DATABASE mydata_db;

USE mydata_db;

CREATE TABLE players (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  age INTEGER NOT NULL,
  position VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

INSERT INTO players (name, age, position)
VALUES ("Carmelo Anthony", 34, "Power Forward");

INSERT INTO players (name, age, position)
VALUES ("Kobe Bryant", 41, "Shooting Guard");

INSERT INTO players (name, age, position)
VALUES ("Kyrie Irving", 28, "Point Guard");
