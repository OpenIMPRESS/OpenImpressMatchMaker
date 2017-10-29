import { Response } from '@angular/http';
import { SessionService } from './session.service';
import { ClientService } from '../client/client.service';
import { Session } from './session.model';
import { Client } from '../client/client.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.html',
  styleUrls: ['./session-list.scss']
})
export class SessionListComponent implements OnInit {
  noSession: Session;
  
  constructor(
    private sessionService: SessionService,
    private clientService: ClientService
  ) {
    this.noSession = new Session();
    this.noSession._id = null;
    this.noSession.isUnassigned = true;
    this.noSession.description = "Clients in this list will not be matched.";
    this.noSession.name = "Unassigned Clients";
  }

  sessions: Session[] = [];
  newSession: Session = new Session();
  newClient: Client = new Client();

  ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.sessionService.getSessions().subscribe(sessions => {
      this.sessions = sessions;
    });

    this.clientService.getUnassignedClients().subscribe(clients => {
      this.noSession.clients = clients;
    });
  }

  createSession(): void {
    this.sessionService.createSession(this.newSession)
      .subscribe((res) => {
        this.newSession = new Session();
        this.refresh();
      })
  }

  remove(session: Session): void {
    console.log("TODO: remove session");
  }
  
  createClient(): void {
    console.log("CREATE");
    this.clientService.createClient(this.newClient)
      .subscribe((res) => {
        this.newSession = new Session();
        this.refresh();
      })
  }

  submit(event, o){
    if(event.keyCode == 13) {
      if (o instanceof Client) {
        this.createClient();
      } else if (o instanceof Session) {
        this.createSession();
      }
    } else if (event.keyCode == 27) {
      if (o instanceof Client) {
        this.newClient = new Client();
      } else if (o instanceof Session) {
        this.newSession = new Session();
      }
    }
  }

}