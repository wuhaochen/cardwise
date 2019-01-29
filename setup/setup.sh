#!/bin/bash

echo "Setting up cardwise..."

echo "Please enter password for MySql user root:"
read -s password
mysql -uroot -p$password < schema.sql

echo "Enter new user for cardwise:"
read cuser
echo "Enter password for cardwise:"
read cpwd

CREATE="GRANT USAGE ON *.* TO '"$cuser"'@'localhost' IDENTIFIED BY '"$cpwd"';"
GRANT="GRANT SELECT, INSERT on cardwise.cashback TO '"$cuser"'@'localhost';"

mysql -uroot -p$password -e "$CREATE"
mysql -uroot -p$password -e "$GRANT"

users='SetEnv PHPMYSQLUSER "'$cuser'"'
pwds='SetEnv PHPMYSQLPWD "'$cpwd'"'

echo "" >> ../.htaccess
echo $users >> ../.htaccess
echo $pwds >> ../.htaccess
