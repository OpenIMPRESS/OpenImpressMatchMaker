# OpenIMPRESS MatchMaker

1. Install nodejs/npm and angular client, typescript and forever:

   `npm install -g @angular/cli@1.4.9 typescript forever`
   
2. Install and run MongoDB. Create a readwrite user for a 'mm' database.
3. Configure mongodb and (optionally) dns auth in MMBackend/mm.config.json
4. Install dependencies in MMBackend and MMFrontend (in the respective folders, run `npm install`).
5. Build frontend: `cd MMFrontend && ng build`
6. Build backend: `cd MMBackend && tsc -p ./tsconfig.json`
7. Run webserver & api: `cd MMBackend && ./startServer.js`
8. Run mm backend: `cd MMBackend && ./startMM.js`
9. (6-9 can also be achieved using the foreverMM.sh script)
