import ISession from    '../../../../MMBackend/src/models/ISession';
import IClient from     '../../../../MMBackend/src/models/IClient';
import ISocket from     '../../../../MMBackend/src/models/ISocket';
import IConnection from '../../../../MMBackend/src/models/IConnection';

class MMApi {
    apiUrl : string = '';
    resourceUrl : string;
    constructor(resource : string) { 
        this.resourceUrl = `${this.apiUrl}/api/${resource}`;
    }
}

export { MMApi, IConnection, IClient, ISession, ISocket };