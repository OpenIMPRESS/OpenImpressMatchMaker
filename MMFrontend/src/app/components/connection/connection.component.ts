import { Response } from '@angular/http';
import { Connection } from './connection.model';
import { SocketComponent } from '../socket/socket.component';
import { SocketService } from '../socket/socket.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[connectionview]',
  templateUrl: './connection.html'
})
export class ConnectionComponent {
  constructor(
    private socketService: SocketService
  ) { }

  @Input() model:  Connection;
  @Input() socket: SocketComponent;

  update() {/*
    this.socketService.editSocket(this.model).subscribe(res => {
        console.log('Update Succesful');
        this.model.editing = false;
    }, err => {
        console.error('Update Unsuccesful: '+err);
        this.model.editing = true;
    });*/
  }

  delete() {
      /*
    this.socketService.deleteSocket(this.model).subscribe(res => {
        console.log("I SHOULD REMOVE MYSELF");
      // ...
    })*/
  }

}