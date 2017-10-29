import IClient from "./IClient";

interface ISession {
    name: string;
    description: string;
    clients?: Array<IClient>;
}

export default ISession;
