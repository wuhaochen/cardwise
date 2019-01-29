#!/bin/bash

echo "Setting up cardwise..."

echo "Please enter password for MySql user root:"
read -s password
mysql -uroot -p$password < schema.sql

echo "Enter new user for cardwise:"
read cuser
echo "Enter password for cardwise:"
read cpwd

COMMAND_S="set @username:='"$cuser"';set @password:='"$cpwd"';source grant.sql;"

mysql -uroot -p$password -e "$COMMAND_S"

users='SetEnv PHPMYSQLUSER "'$cuser'"'
pwds='SetEnv PHPMYSQLPWD "'$cpwd'"'

echo "" >> ../.htaccess
echo $users >> ../.htaccess
echo $passs >> ../.htaccess
