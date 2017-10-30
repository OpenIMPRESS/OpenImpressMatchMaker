import mongoose = require('mongoose');
import ISocket from "./ISocket";
import { Connection } from './connection.model';

export interface ISocketModel extends ISocket, mongoose.Document {
}

const SocketSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    connection: { type: Connection.schema, default: Connection.schema },
    identifier: String,
    dataType: String,
    role: {
        type: String,
        enum: ['sender', 'receiver']
    }
});

const Socket = mongoose.model<ISocketModel>("Socket", SocketSchema);

export { Socket, SocketSchema, ISocket };
