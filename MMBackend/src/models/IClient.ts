import ISocket from "./ISocket";

interface IClient {
    name: string;
    guid: string;
    type: string; // Where does the GUID come from?
    sockets?: Array<ISocket>;
    session?: any;
}

export default IClient;