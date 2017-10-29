import { ISession, IClient } from "../mm-api";

class Session implements ISession {
    _id: any;
    name: string;
    description: string;
    clients: Array<IClient>;
    
    isUnassigned: boolean;

    constructor(
    ){
        this.name = "";
        this.description = "";
        this.clients = [];
        this.isUnassigned = false;
    }
}

export { Session };