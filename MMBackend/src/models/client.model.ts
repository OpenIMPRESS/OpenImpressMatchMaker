import mongoose = require('mongoose');
import IClient from "./IClient";
//import { Socket, SocketSchema } from './socket.model';
//import { Session, SessionSchema } from './session.model';

interface IClientModel extends IClient, mongoose.Document {
}

const ClientSchema = new mongoose.Schema({
    guid: { type : String , unique : true, required : true, dropDups: true },
    name: String,
    type: String,
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    //sockets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Socket' }]//[ SocketSchema ]
}, { toJSON: { virtuals: true } });

ClientSchema.virtual('sockets', {
    ref: 'Socket',
    localField: '_id',
    foreignField: 'client', 
    justOne: false
});

const Client = mongoose.model<IClientModel>("Client", ClientSchema);

export { Client, ClientSchema, IClient, IClientModel };
