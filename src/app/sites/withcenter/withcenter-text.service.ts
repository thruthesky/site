import { Injectable } from '@angular/core';
import { texts } from './withenter-text';
import { Library } from '../../etc/library';

export const WITHCENTER_LANGUAGE_CODE = 'withcenterLanguageCode';
@Injectable()
export class WithcenterTextService {


    languageCode = 'en';
    ln: any = {};

    constructor() {
        this.getTexts();
    }
    getTexts() {
        this.languageCode = this.getLanguageCode();
        // this.t = getTexts(this.languageCode);

        const keys = Object.keys(texts);
        // console.log('keys: ', keys);
        // console.log('texts: ', texts);
        for (const key of keys) {
            this.ln[key] = texts[key][this.languageCode];
        }

        // console.log('selectedTexts: ', this.ln);
        return this.ln;
    }

    getLanguageCode(): string {

        const ln = Library.get(WITHCENTER_LANGUAGE_CODE);
        if (ln) {
            return ln;
        } else {
            return Library.getBrowserLanguage();
        }
    }

    setLanguageCode(ln) {
        Library.set(WITHCENTER_LANGUAGE_CODE, ln);
    }

}
