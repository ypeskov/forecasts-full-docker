#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER divination WITH PASSWORD 'divination';
	CREATE DATABASE forecasts;
	GRANT ALL PRIVILEGES ON DATABASE forecasts TO divination;
EOSQL