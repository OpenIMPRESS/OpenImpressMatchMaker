import { Session } from './session.model';
import { Client } from '../client/client.model';
import { MMApi } from '../mm-api';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class SessionService extends MMApi {
  constructor(private http: HttpClient) { 
    super('session');
  }

  getSession(id : any) : Observable<Session>{
    return this.http.get(`${this.resourceUrl}/${id}`).map(res  => {
      return res["data"] as Session;
    });
  }

  getSessions() : Observable<Session[]>{
    return this.http.get(`${this.resourceUrl}`).map(res  => {
      return res["data"] as Session[];
    });
  }
  
  createSession(session : Session) : Observable<Session> {
    return this.http.post(`${this.resourceUrl}`, session).map(res  => {
      return res["data"] as Session;
    });
  }

  deleteSession(id : string) : any {
    let deleteUrl = `${this.resourceUrl}/${id}`
    return this.http.delete(deleteUrl).map(res  => {
      return res; // null if no error
    });
  }

  /*
  // put: /api/session/:id?update
  // put: /api/session/:id?createClient&
  // put: /api/session/:id?assignClient&guid=:guid
  assignClient(session : Session, client : Client) : Observable<any> {
    return this.http.put(`${this.resourceUrl}/${session._id}?assignClient&guid=${client.guid}`, {});
  }

  // Add new client to session
  addClient(session : Session, client : Client) : Observable<any> {
    return this.http.put(`${this.resourceUrl}/${session._id}?createClient`, client);
  }

  // Create new client in DEFAULT session
  createClient(client : Client) : Observable<any> {
    return this.http.put(`${this.resourceUrl}/DEFAULT?createClient`, client);
  }
*/

  updateSession(session : Session) : Observable<Session> {
    let editUrl = `${this.resourceUrl}/${session._id}`
    return this.http.put(editUrl, session).map(res => {
      return res["data"] as Session;
    });
  }

}