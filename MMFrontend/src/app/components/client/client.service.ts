import { Client } from '../client/client.model';
import { Session } from '../session/session.model';
import { MMApi } from '../mm-api';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ClientService extends MMApi {
  constructor(private http: HttpClient) { 
    super('client');
  }

  getClient(guid : string) : Observable<Client>{
    return this.http.get(`${this.resourceUrl}/${guid}`).map(res  => {
      console.log(res);
      return res["data"] as Client;
    });
  }

  getClients() : Observable<Client[]>{
    return this.http.get(this.resourceUrl).map(res  => {
      return res["data"] as Client[];
    });
  }

  createClient(client : Client) : Observable<Client[]>{
    return this.http.post(this.resourceUrl, client).map(res  => {
      return res["data"] as Client[];
    });
  }

  getUnassignedClients() : Observable<Client[]>{
    return this.http.get(`${this.resourceUrl}?unassigned`).map(res  => {
      return res["data"] as Client[];
    });
  }

  // Update name/description/etc.
  updateClient(client : Client) : Observable<Client> {
    let editUrl = `${this.resourceUrl}/${client.guid}`
    return this.http.put(editUrl, client).map(res  => {
      return res["data"] as Client;
    });
  }

  // Remove client from db
  deleteClient(guid : any) : Observable<any> {
    let deleteUrl = `${this.resourceUrl}/${guid}`
    return this.http.delete(deleteUrl).map(res  => {
      return res; // null if no error
    });
  }
  
}