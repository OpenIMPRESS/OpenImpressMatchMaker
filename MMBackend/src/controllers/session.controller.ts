import { MMAPIService } from '../services/mmapi.service';
import ISession from "../models/ISession";
import IClient from "../models/IClient";

import { Request, Response } from 'express';
var util = require('util');

export class SessionController {
    constructor() {}

    static async getSessions(req : Request, res : Response, next : any) {
        try {
            var sessions = await MMAPIService.getSessions({});
            return res.status(200).json({status: 200, data: sessions, message: "OK"});
        } catch (e) {
            return res.status(400).json({status: 400, message: "Get Sessions Failed: "+e.message});
        }
    }

    static async getSession(req : Request, res : Response, next : any) {
        try {
            var sessions = await MMAPIService.getSession(req.params.id);
            return res.status(200).json({status: 200, data: sessions, message: "OK"});
        } catch (e) {
            return res.status(400).json({status: 400, message: "Get Session Failed: "+e.message});
        }
    }

    static async createSession(req : Request, res : Response, next : any) {
        var session : ISession = {
            name: req.body.name,
            description: req.body.description,
            clients: []
        };
    
        try {
            var createdSession = await MMAPIService.createSession(session)
            return res.status(201).json({status: 201, data: createdSession, message: "OK"})
        } catch (e) {
            return res.status(400).json({status: 400, message: "Session Creation was Unsuccesfull: "+e.message})
        }
    }

    static async updateSession(req : Request, res : Response, next : any) {
        if (!req.params.id) {
            return res.status(400).json({status: 400, message: "ERR: Session guid to be updated must be present in params."});
        }
        var id = req.params.id;
        var session : ISession = {
            name: req.body.name ? req.body.name : null,
            description: req.body.description ? req.body.description : null,
            clients: null
        };

        try {
            var resUpdate = await MMAPIService.updateSession(id, session);
            return res.status(200).json({status: 200, data: resUpdate, message: "OK"});
        } catch (e) {
            return res.status(400).json({status: 400, message: "ERR: Failed to update Session: "+e.message});
        }
    }

    static async removeSession(req : Request, res : Response, next : any) {
        if (!req.params.id) {
            return res.status(400).json({status: 400., message: "ERR: Session id to be removed must be present in params."});
        }
    
        var id = req.params.id;
        try {
            var removed = await MMAPIService.removeSession(id);
            return res.status(204).json({status: 204, message: "OK" });
        } catch (e) {
            return res.status(400).json({status: 400, message: "ERR: Failed to remove Session,"+e.message});
        }
    }
}
