import mongoose = require('mongoose');
import ISession from "./ISession";
//import { Client, ClientSchema } from './client.model';

export interface ISessionModel extends ISession, mongoose.Document {
}

const SessionSchema = new mongoose.Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    description: String
    //clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }] //[ ClientSchema ]
}, { toJSON: { virtuals: true } });

SessionSchema.virtual('clients', {
    ref: 'Client',
    localField: '_id',
    foreignField: 'session', 
    justOne: false
});

const Session = mongoose.model<ISessionModel>("Session", SessionSchema);

export { Session, SessionSchema, ISession };
