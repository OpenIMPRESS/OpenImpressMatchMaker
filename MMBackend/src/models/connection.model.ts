import mongoose = require('mongoose');
import IConnection from "./IConnection";

export interface IConnectionModel extends IConnection, mongoose.Document {
}

const ConnectionSchema = new mongoose.Schema({
    publicIP: String,
    localIP: String,
    port: Number
});

const Connection = mongoose.model<IConnectionModel>("Connection", ConnectionSchema);

export { Connection, ConnectionSchema, IConnection };
