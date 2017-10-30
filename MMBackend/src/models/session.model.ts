import mongoose = require('mongoose');
import ISession from "./ISession";

export interface ISessionModel extends ISession, mongoose.Document {
}

const SessionSchema = new mongoose.Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    description: String
}, { toJSON: { virtuals: true } });

SessionSchema.virtual('clients', {
    ref: 'Client',
    localField: '_id',
    foreignField: 'session', 
    justOne: false
});

const Session = mongoose.model<ISessionModel>("Session", SessionSchema);

export { Session, SessionSchema, ISession };