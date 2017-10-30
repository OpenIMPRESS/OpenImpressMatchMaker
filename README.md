# OpenIMPRESS MatchMaker

1. Have MongoDB running.
2. Configure mongodb and dns auth in MMBackend/mm.config.json
3. Build frontend: `cd MMFrontend && ng build`
4. Build backend: `cd MMBackend && tsc -p ./tsconfig.json`
5. Run webserver & api: `cd MMBackend && ./startServer.js`
6. Run mm backend: `cd MMBackend && ./startMM.js`
