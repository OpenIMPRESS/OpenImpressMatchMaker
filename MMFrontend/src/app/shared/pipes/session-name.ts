import { Pipe, PipeTransform } from '@angular/core';
import { Session } from '../../components/session/session.model';

@Pipe({
    name: 'sessionName',
    pure: false
})
export class SessionNameFilter implements PipeTransform {
    transform(sessions: Session[], name: String): any {
        if (!sessions) {
            return sessions;
        }
        if (name[0] === '!') {
            name = name.substr(1);
            return sessions.filter(session => session.name !== name);
        } else {
            return sessions.filter(session => session.name === name);
        }
    }
}