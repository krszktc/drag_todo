#!/bin/sh
CONTAINER_RUN_PLACEHOLDER="CONTAINER_ALREAY_RUN_MARKER"
if [ ! -e $CONTAINER_RUN_PLACEHOLDER ]; then
    touch $CONTAINER_RUN_PLACEHOLDER
    npm run db:seed
else
    npm start
fi