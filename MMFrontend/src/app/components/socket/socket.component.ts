import { Response } from '@angular/http';
import { Socket } from './socket.model';
import { Client } from '../client/client.model';
import { Editable } from '../mm-frontend';
import { SocketService } from './socket.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[socketview]',
  templateUrl: './socket.html'
})
export class SocketComponent extends Editable {
  constructor(
    private socketService: SocketService
  ) { super(); }

  @Input() model:  Socket;
  @Input() client: Client;

  update() {
    this.editing = false;
    this.socketService.updateSocket(this.client, this.model).subscribe(socket => {
        this.model = socket;
    }, err => {
        console.error('Update Unsuccesful: '+err);
        this.reset();
    });
  }

  reset() {
    this.socketService.getSocket(this.client, this.model.identifier).subscribe(socket => {
      this.model = socket;
      this.editing = false;
    });
  }


  delete() {
    this.socketService.deleteSocket(this.client, this.model).subscribe(res => {
        console.log("I SHOULD REMOVE MYSELF");
      // ...
    })
  }

}