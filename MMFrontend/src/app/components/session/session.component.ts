import { Response } from '@angular/http';
import { Session } from './session.model';
import { SessionListComponent } from './session-list.component';
import { Editable } from '../mm-frontend';
import { SessionService } from './session.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[sessionview]',
  templateUrl: './session.html'
})
export class SessionComponent extends Editable {
  constructor(
    private sessionService: SessionService
  ) { super(); }

  @Input() model:Session;
  @Input() sessions:Session[];
  @Input() mainComponent: SessionListComponent;

  update() {
    this.editing = false;
    this.sessionService.updateSession(this.model).subscribe(session => {
        this.model = session;
    }, err => {
        console.error('Update Unsuccesful: '+err);
        this.reset();
    });
  }

  reset() {
    this.sessionService.getSession(this.model._id).subscribe(session => {
      this.model = session;
      this.editing = false;
    });
  }

  delete() {
    this.sessionService.deleteSession(this.model._id).subscribe(err => {
      if (err != null) {
        console.log(err);
      }
      this.mainComponent.refresh();
    });
  }

}