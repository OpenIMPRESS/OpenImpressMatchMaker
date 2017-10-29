import { IConnection, IClient, ISocket } from "../mm-api";

class Client implements IClient {
    name: string;
    guid: string;
    type: string;
    sockets: Array<ISocket>;
    session: any;

    constructor(
    ){
        this.name = "";
        this.guid = "";
        this.type = "";
        this.sockets = [];
        this.session = null;
    }
}

export { Client };