import { Socket } from './socket.model';
import { Client } from '../client/client.model';
import { MMApi } from '../mm-api';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


// /api/client/:clientid/socket/:socketid

@Injectable()
export class SocketService extends MMApi {
  constructor(private http: HttpClient) { 
    super('socket');
  }

  getSocket(client: Client, identifier: string) : Observable<Socket> {
    return this.http.get(this.resourceUrl).map(res  => {
      return res["data"] as Socket;
    });
  }

  getSockets(client: Client) : Observable<Socket[]>{
    return this.http.get(this.resourceUrl).map(res  => {
      return res["data"] as Socket[];
    });
  }

  updateSocket(client: Client, socket : Socket) : Observable<Socket> {
    var id : string = socket.identifier;
    let editUrl = `${this.resourceUrl}/${id}`
    return this.http.put(editUrl, socket).map(res  => {
      return res["data"] as Socket;
    });
  }

  deleteSocket(client: Client, socket : Socket) : any {
    let deleteUrl = `${this.resourceUrl}/${socket.identifier}`
    return this.http.delete(deleteUrl).map(res  => {
      return res;
    });
  }

}