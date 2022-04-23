#!/usr/bin/env bash

cd src/database
npx knex migrate:latest
node db_init.js
cd ..
npx fastify start server.js