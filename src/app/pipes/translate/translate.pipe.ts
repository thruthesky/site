import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../providers/language.service';

@Pipe({
    name: 't',
    pure: true
})
export class TranslatePipe implements PipeTransform {
    constructor( public lang: LanguageService ) {}
    transform(value, args) {
        return this.lang.t(value, args);
    }
}

