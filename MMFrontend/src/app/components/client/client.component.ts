import { Response } from '@angular/http';
import { Session } from '../session/session.model';
import { SessionListComponent } from '../session/session-list.component';
import { Editable } from '../mm-frontend';
import { Client } from './client.model';
import { ClientService } from './client.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[clientview]',
  templateUrl: './client.html'
})
export class ClientComponent extends Editable {
  constructor(
    private clientService: ClientService
  ) { super(); }

  @Input() model: Client;
  @Input() session: Session;
  @Input() sessions: Session[];
  @Input() mainComponent: SessionListComponent;

  assign(session : Session) {
    this.model.session = session._id;
    this.clientService.updateClient(this.model).subscribe(res => {
      this.mainComponent.refresh();
    });
  }

  unassign() {
    this.model.session = null;
    this.clientService.updateClient(this.model).subscribe(res => {
      this.mainComponent.refresh();
    });
  }

  update() {
    this.clientService.updateClient(this.model).subscribe(res => {
      this.reset();
    }, err => {
      this.reset();
    });
  }

  delete() {
    this.clientService.deleteClient(this.model).subscribe(res => {
        console.log("I SHOULD REMOVE MYSELF");
      // ...
    })
  }


  reset() {
    this.clientService.getClient(this.model.guid).subscribe(client => {
      this.model = client;
      this.editing = false;
    });
  }

}