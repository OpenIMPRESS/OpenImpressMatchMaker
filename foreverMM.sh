#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"/MMBackend &&
forever stopall &&
forever start ./startServer.js &&
forever start ./startMM.js

