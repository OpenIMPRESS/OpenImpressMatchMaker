import { Client, IClient } from '../models/client.model';
import { Session, ISession } from '../models/session.model';
import mongoose = require('mongoose');
import util = require('util');

export class MMAPIService {
    constructor() {}

    static async getSessions(query : any) {
        try {
            var sessions = await Session.find(query).populate({
                path: 'clients',
                populate: {
                  path: 'sockets'
                }
              }).exec();
            return sessions;
        } catch (e) {
            throw Error('Error while Loading Sessions: '+e);
        }
    }

    static async getSession(id : any) {
        try {
            var session = await Session.findById(id).populate({
                path: 'clients',
                populate: {
                  path: 'sockets'
                }
              }).exec();
            return session;
        } catch (e) {
            throw Error('Error while Loading Session: '+e);
        }
    }

    static async updateSession(id : any, session : ISession) {
        try {
            var oldSession = await Session.findById(id);
        } catch(e) {
            throw Error("Error occured while Finding the Session to be updated: "+e);
        }
    
        if (!oldSession) {
            throw Error("Error occured while Finding the Session to be updated... ");
        } else {
            if (session.name !== null) oldSession.name = session.name;
            if (session.description !== null) oldSession.description = session.description;
            try {
                return await oldSession.save(); 
            } catch(e) {
                throw Error("And Error occured while updating the Session: "+e);
            }
        }
    }

    static async createSession(session : ISession) {
        var newSession = new Session({
            name: session.name,
            description: session.description,
            clients: []
        });
    
        try {
            return await newSession.save();
        } catch (e) {
            throw Error('Error while Creating Session: '+e);
        }
    }

    static async removeSession(id : any) {
        // TODO: check if it is not default/unassigned session...
        // TODO: move clients to default/unassigned session
        try {
            return await Session.remove({_id: id});
        } catch(e) {
            throw Error("Error Occured while Deleting the Session: "+e);
        }
    }

    static async getClients(query : any) {
        try {
            var clients = await Client.find(query).populate('sockets');
            return clients;
        } catch (e) {
            throw Error('Error while Loading Clients: '+e);
        }
    }

    static async getClient(guid: string) {
        try {
            var client = await Client.findOne({ guid: guid }).populate('sockets');
            return client;
        } catch (e) {
            throw Error('Error while Loading Client: '+e);
        }
    }

    static async updateClient(guid : string, client : IClient) {
        console.log("UPDATE CLIENT 1");
        try {
            var oldClient = await Client.findOne({ guid: guid });
        } catch(e) {
            throw Error("Error occured while Finding the Client to be updated: "+e);
        }

        if (!oldClient){
            return false;
        }
        console.log(util.inspect(oldClient));

        if (client.type !== null) oldClient.type = client.type;
        if (client.name !== null) oldClient.name = client.name;
        if (client.session !== null) { //&& oldClient.session._id
            try {
                var sessionID = mongoose.Types.ObjectId(client.session);
                var session = await Session.findById(sessionID);
                console.log(util.inspect(session));
                oldClient.session = session;
            } catch(e) {
                throw Error("Couldn't assign: "+e);
            }
        } else {
            oldClient.session = null;
        }
    
        console.log(util.inspect(oldClient));
        try {
            var updatedClient = await oldClient.save()
            return updatedClient; 
        } catch(e) {
            throw Error("And Error occured while updating the Client: "+e);
        }

    }

    static async createClient(client : IClient) {
        var newClient = new Client({
            name: client.name,
            guid: client.guid,
            type: client.type,
            sockets: client.sockets,
            session: null
        });

        try {
            return await newClient.save();
        } catch(e) {
            throw Error("Error occured while assiging client to session: "+e)
        }
    }

    static async removeClient(id : any) {
        try {
            return await Client.remove({_id: id});
        } catch(e) {
            throw Error("Error Occured while Deleting the Client: "+e);
        }
    }
}