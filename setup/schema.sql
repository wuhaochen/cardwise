CREATE DATABASE	cardwise;

USE cardwise;

CREATE TABLE cashback (
    cardname VARCHAR(100),
    category VARCHAR(100),
    startdate DATETIME,
    enddate DATETIME,
    percentage FLOAT
);
