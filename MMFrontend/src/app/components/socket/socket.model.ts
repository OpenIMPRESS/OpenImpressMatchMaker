import { ISocket, IConnection } from "../mm-api";

class Socket implements ISocket {
    name: string;
    identifier: string;
    dataType: string;
    connection: IConnection;
    role: string;

    constructor(
    ){
        this.name = "";
        this.identifier = "";
        this.dataType = "";
        this.role = "";
    }
}

export { Socket };