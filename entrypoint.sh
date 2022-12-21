#!/bin/sh

test -n "$APP_NEXT_PUBLIC_SEASON"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_SEASON#$NEXT_PUBLIC_SEASON#g"
npx prisma migrate deploy
node server.js
