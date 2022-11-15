#!/bin/bash

SCRIPT_RESTORE=restore
SCRIPT_GENERATE_MODELS=generate-models
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ntnp
GENERATED_MODELS_OUTPUT=generated-models

if [[ $1 == "" ]]; then
  printf "%s\n" "available scripts:" \
    "  $SCRIPT_RESTORE" \
    "  $SCRIPT_GENERATE_MODELS"
elif [[ $1 == $SCRIPT_RESTORE ]]; then
  sudo su postgres <<EOF
  psql
  DROP DATABASE IF EXISTS $DB_NAME;
  CREATE DATABASE $DB_NAME;
EOF
  psql postgres://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME -f ./schema.sql
  psql postgres://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME -f ./data.sql
elif [[ $1 == $SCRIPT_GENERATE_MODELS ]]; then
  npx typeorm-model-generator -u $DB_USER -x $DB_PASSWORD -h $DB_HOST -p $DB_PORT -d $DB_NAME -e postgres -o ./$GENERATED_MODELS_OUTPUT
else
  printf "\e[91mERROR!\e[0m missing script: \"$1\"\n"
fi
