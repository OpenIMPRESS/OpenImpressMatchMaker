import { MMAPIService } from '../services/mmapi.service';
import ISession from "../models/ISession";
import IClient from "../models/IClient";

import { Request, Response } from 'express';
var util = require('util');

export class ClientController {
    constructor() {}

    static async getClients(req : Request, res : Response, next : any) {
        var filter = {};
        if (req.query.unassigned != undefined) {
            filter = { session: null };
        }
        
        try {
            var clients = await MMAPIService.getClients(filter);
            return res.status(200).json({status: 200, data: clients, message: "OK"});
        } catch (e) {
            return res.status(400).json({status: 400, message: "Get Clients Failed: "+e.message});
        }
    }

    static async getClient(req : Request, res : Response, next : any) {
        try {
            var client = await MMAPIService.getClient(req.params.guid);
            console.log(util.inspect(client));
            return res.status(200).json({status: 200, data: client, message: "OK"});
        } catch (e) {
            return res.status(400).json({status: 400, message: "Get Client Failed: "+e.message});
        }
    }
    
    static async createClient(req : Request, res : Response, next : any) {
        var client : IClient = {
            guid: req.body.guid,
            name: req.body.name ? req.body.name : "",
            type: req.body.type ? req.body.type : "",
            session: req.body.session ? req.body.session : null,
            sockets: null,
        };

        try {
            var newClient = await MMAPIService.createClient(client);
            return res.status(200).json({status: 200, data: newClient, message: "OK"});
        } catch (e) {
            return res.status(400).json({status: 400, message: "Failed to create Client: "+e.message});
        }
    }

    static async updateClient(req : Request, res : Response, next : any) {
        if (!req.params.guid){
            return res.status(400).json({status: 400, message: "Client guid to be updated must be present in params."});
        }

        console.log(util.inspect(req.body));
    
        var guid = req.params.guid;
        var client : IClient = {
            name: req.body.name ? req.body.name : null,
            type: req.body.type ? req.body.type : null,
            session: req.body.session ? req.body.session : null,
            sockets: null,
            guid: null
        };
    
        try {
            var updatedClient = await MMAPIService.updateClient(guid, client);
            return res.status(200).json({status: 200, data: updatedClient, message: "OK"});
        } catch (e) {
            return res.status(400).json({status: 400, message: "Failed to update Client: "+e.message});
        }
    }

    static async removeClient(req : Request, res : Response, next : any) {
        if (!req.params.guid) {
            return res.status(400).json({status: 400., message: "Client guid to be removed must be present in params."});
        }
    
        var guid = req.params.guid;
        try {
            var removed = await MMAPIService.removeClient(guid);
            return res.status(204).json({status: 204, message: "OK"});
        } catch (e) {
            return res.status(400).json({status: 400, message: "Failed to remove Client: "+e.message});
        }
    }
}