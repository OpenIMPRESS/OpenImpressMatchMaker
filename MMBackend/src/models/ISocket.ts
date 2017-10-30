import IConnection from "./IConnection";

interface ISocket {
    connection: IConnection;
    identifier: string;
    dataType: string;
    role: string;
    client?: any;
}

export default ISocket;
