import ISession from '../../../../MMBackend/models/ISession';
import IClient from '../../../../MMBackend/models/IClient';
import ISocket from '../../../../MMBackend/models/ISocket';
import IConnection from '../../../../MMBackend/models/IConnection';

class MMApi {
    apiUrl : string = '';
    resourceUrl : string;
    constructor(resource : string) { 
        this.resourceUrl = `${this.apiUrl}/api/${resource}`;
    }
}

export { MMApi, IConnection, IClient, ISession, ISocket };