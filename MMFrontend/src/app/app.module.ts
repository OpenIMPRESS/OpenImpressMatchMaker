import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SessionService } from './components/session/session.service';
import { ClientService } from './components/client/client.service';
import { SocketService } from './components/socket/socket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { ClientFilter } from './shared/pipes/client.filter';
import { SessionNameFilter } from './shared/pipes/session-name';
import { FormatGUIDFilterPipe } from './shared/pipes/format-guid';

import { SessionListComponent } from './components/session/session-list.component';
import { SessionComponent } from './components/session/session.component';
import { ClientComponent } from './components/client/client.component';
import { SocketComponent } from './components/socket/socket.component';
import { ConnectionComponent } from './components/connection/connection.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SessionListComponent,
    SessionComponent,
    ClientComponent,
    SocketComponent,
    ConnectionComponent,
    SessionNameFilter,
    ClientFilter,
    FormatGUIDFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    SessionService,
    ClientService,
    SocketService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
