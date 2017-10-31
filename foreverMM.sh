#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"/MMFrontend &&
ng build --environment=prod &&
cd ../MMBackend &&
tsc -p ./tsconfig.json &&
forever stopall &&
forever start ./startServer.js &&
forever start ./startMM.js

