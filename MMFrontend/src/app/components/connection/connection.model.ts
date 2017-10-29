import { IConnection } from "../mm-api";

class Connection implements IConnection {
    publicIP: string;
    localIP: string;
    port: number;

    editing: boolean;

    constructor(
    ){
        this.publicIP = "";
        this.localIP = "";
        this.port = 0;
    }
}

export { Connection };