import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatGUID',
    pure: false
})
export class FormatGUIDFilterPipe implements PipeTransform {
    transform(guid: string): any {
        if (!guid) return guid;
        let squareSide = Math.ceil(Math.sqrt(guid.length)*1.5);
        let resString = "";
        for (let x = 0; x < guid.length; x+=squareSide) {
            resString += guid.substring(x, x+squareSide)+"\n";
        }

        return resString;
    }
}
