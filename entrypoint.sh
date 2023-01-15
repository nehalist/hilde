#!/bin/sh

test -n "$APP_ADMIN_PASSWORD"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_ADMIN_PASSWORD#$ADMIN_PASSWORD#g"
npx prisma migrate deploy
node server.js
