import { Session, ISession } from '../models/session.model';
import { Socket, ISocket } from '../models/socket.model';
import { Connection, IConnection } from '../models/connection.model';
import { Client, IClient } from '../models/client.model';
import { MMAPIService } from './mmapi.service';

var publicIp = require('public-ip'); 
var dgram = require('dgram');
var util = require('util');
var hash = require('object-hash');

export class MMService {
    udp_port : number;
    updateHistory : any;
    udp_socket : any;

    constructor(port : number) {
        var self = this;
        this.udp_port = port;
        this.updateHistory = {};
        this.Connect();
    }


    Connect() {
        var self = this;
        if (self.udp_port < 1) {
            console.log("! Cannot create mm server, no port specified"); 
        }
    
        if (self.udp_socket != null) {
            self.udp_socket.close(function() {
                self.udp_socket = dgram.createSocket('udp4');
                self.Rebind();
            });
        } else {
            self.udp_socket = dgram.createSocket('udp4');
            self.Rebind();
        }
    }
    
    Listening() {
        var self = this;
        publicIp.v4().then(ip => {
            var address = self.udp_socket.address();
            console.log('# MatchMaker listening on: %s:%s', ip, address.port);
        });
    }
    
    OnMatch(senderClient, receiverClient) {
        var self = this;
    }
    
    async HandleMessage(raw, rinfo) {
        var self = this;
        if (raw[0] != 100) return;
        try {
            var data = JSON.parse(raw.toString().substring(1));
        } catch (e) {
            return console.log('! Couldn\'t parse data (%s):\n%s', e, data);
        }
        if (data.packageType != 'register') return console.log("! unknown package type: "+data.packageType);
        if (!data.UID) return console.log("! Need UID field.");

        const conn : IConnection = {
            publicIP: rinfo.address,
            port: rinfo.port,
            localIP: data.localIP
        };

        const role = (data.isSender ? "sender" : "receiver");
        console.log("# got register for: " + data.socketID + " ("+role+") from " + conn.publicIP + ':' + conn.port+" ("+conn.localIP+")");

        const _client : IClient = {
            guid: data.UID,
            name: data.name ? data.name : "C"+data.UID.substring(1,5),
            type: data.type ? data.type : "D"+data.UID.substring(1,5),
            sockets: [],
            session: null
        }

        let client = await Client.findOneAndUpdate({ guid: data.UID },
            { $setOnInsert: _client }, { upsert: true, new: true });
        
        const _socket : ISocket = {
            client: client._id,
            connection: conn,
            identifier: data.socketID,
            dataType: data.dataType ? data.dataType : "",
            role: role
        }

        // Add/update socket 
        let socket = await Socket.findOneAndUpdate({ client: _socket.client, identifier: _socket.identifier },
            { $set: _socket }, { upsert: true, new: true });

        if (client.session == null) {
            return console.log("Not part of session...");
        }

        try {
            let session = await MMAPIService.getSession(client.session);
        } catch (e) {
            throw Error("Failed to get session: "+e);
        }
        var connectedEndpoints : IConnection[] = self.GetConnectedEndpoints(socket, session);
        for (var soIdx in connectedEndpoints) {
            self.SendAnswer(socket.connection, connectedEndpoints[soIdx]);
            self.SendAnswer(connectedEndpoints[soIdx], socket.connection);
        }
    }
    
    GetConnectedEndpoints(socket: ISocket, session: ISession) {
        var self = this;
        var otherEndpoint = (socket.role == "receiver") ? "sender" : "receiver";
        
        var res : IConnection[] = [];
        //console.log("\tClients in session: "+session.clients.length);
        for (var cIdx in session.clients) {
            //console.log("\t\tSockets in client: "+session.clients[cIdx].sockets.length);
            for (var sIdx in session.clients[cIdx].sockets) {
                var otherSocket = session.clients[cIdx].sockets[sIdx];
                if (otherSocket.identifier != socket.identifier ||
                    otherSocket.role != otherEndpoint) continue;
                res.push(otherSocket.connection);
            }
        }

        return res;
    }
    

    SendAnswer(c_to: IConnection, c_match: IConnection) {
        // Check if we haven't recently sent this. TODO: this doesn't work anymore..
        /*
        var ts = Math.round((new Date()).getTime() / 1000);
        var updateHash = hash({ t:c_to, m:c_match });
        if (this.updateHistory.hasOwnProperty(updateHash) &&
            this.updateHistory[updateHash] + 5.0 > ts) {
                console.log("too recent..");
           return; 
        } else this.updateHistory[updateHash] = ts;
        */

        // Prepare answer packet.
        var address = c_match.publicIP;
        if (c_to.publicIP == c_match.publicIP) address = c_match.localIP;
        var answerObj = { type: 'answer', address: address, port: c_match.port };
        var data = new Buffer(String.fromCharCode(100)+JSON.stringify(answerObj));

        // Send answer
        this.udp_socket.send(data, 0, data.length, c_to.port, c_to.publicIP, function (err, bytes) {
            if (err) console.log("! Error sending: answer: "+err);
            else console.log('# MM Answer sent to ' + c_to.publicIP + ':' + c_to.port+"...\n\t"+util.inspect(answerObj));
        });
    }
    
    Rebind() {
        var self = this;
        console.log("# Binding MM callbacks to service.");
        self.udp_socket.on('listening', self.Listening.bind(self));
        self.udp_socket.on('message', self.HandleMessage.bind(self));
        self.udp_socket.bind(self.udp_port);
    }

}
