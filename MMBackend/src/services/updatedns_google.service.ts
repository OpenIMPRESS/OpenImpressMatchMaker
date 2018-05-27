var GoogleDynamicDNS = require('google-dynamic-dns/lib');
const BPromise = require('bluebird'),
        Wreck = require("wreck"),
        argv = require('optimist');

BPromise.promisifyAll(require('fs'));
BPromise.promisifyAll(require('dns'));
Wreck.getAsync = (function (uri, options) {

return new BPromise((resolve, reject) => {
    Wreck.get(uri, options, (err, response, payload) => {
            if (err) return reject(err);
            resolve([response, payload]);
        });
    });
}).bind(Wreck);

export class UpdateDNSService {
    config : any;
    gd : any;

    constructor(config : any) {
	    this.config = config;
	    this.gd = new GoogleDynamicDNS(this.config);
    }

    UpdateDNS() {
        console.log("# Updating DNS... ");
        this.gd.runDynamic();
    }
    
}
