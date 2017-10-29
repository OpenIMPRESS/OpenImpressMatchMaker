import { Pipe, PipeTransform } from '@angular/core';
import { Session } from '../../components/session/session.model';
import { Client } from '../../components/client/client.model';

@Pipe({
    name: 'clientInSession',
    pure: false
})
export class ClientFilter implements PipeTransform {
    transform(clients: Client[], id: any): any {
        if (!clients) return clients;

        if (id == null) {
            return clients.filter(client => !client.session || client.session._id == null);
        } else {
            return clients.filter(client => client.session && (
                client.session == id || client.session._id && client.session._id == id
            ));
        }
    }
}