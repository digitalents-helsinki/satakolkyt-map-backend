#!/usr/bin/env bash

RED='\033[0;31m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

describe_echo() {
  echo -e "${BLUE}\n$1\n${NC}\n"
}

success_echo() {
  echo -e "${GREEN}$1${NC}"
  sleep 1
}

fail_echo() {
  echo -e "${RED}$1${NC}"
}

# Start the docker containers with docker-compose
up_func() {
  describe_echo "Starting the arangodb container..."
  docker-compose up -d --build

  if [ $? -eq 0 ] 
  then
    success_echo "Containers are up!"
  else
    fail_echo "Could not start the containers. Aborting..."
    exit 1
  fi
}

# Remove any previous containers specified in docker-compose file.
down_func() {
  if [ $1 == 'volumes' ]; then
    describe_echo "Downing previous containers with volumes."
    docker-compose down --volumes
  else
    describe_echo "Downing previous containers."
    docker-compose down
  fi
}

# Execute `createDatabase` method on arangosh to init the working database.
init_db_func() {
  describe_echo "Creating '$1' database..."

  # Wait couple of seconds before executing...
  SECONDS=5 #
  echo "Waiting for containers to initialize... ($SECONDS seconds)"
  sleep $SECONDS

  ## execute stuff on the arangodb container...
  docker exec satakolkyt-arangodb arangosh \
    --server.password '' \
    --javascript.execute-string "db._createDatabase('$1')"

  if [ $? -eq 0 ] 
  then
    success_echo "Database '$1' created successfully."
  else
    fail_echo "Could not create database '$1'. Aborting..."
    exit 1
  fi
}

down_func $2
up_func
init_db_func $1
success_echo "All Done!"