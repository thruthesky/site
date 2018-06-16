import { Injectable } from '@angular/core';
import { texts } from './withenter-text';
import { Library as _ } from './../../etc/library';

export const WITHCENTER_LANGUAGE_CODE = 'withcenterLanguageCode';

@Injectable()
export class WithcenterTextService {


    languageCode = 'en';
    selectedTexts = {};
    getTexts() {
        this.languageCode = this.getLanguageCode();
        // this.t = getTexts(this.languageCode);

        const keys = Object.keys(texts);
        for (const key of keys) {
            this.selectedTexts[key] = texts[this.languageCode][key];
        }
        return this.selectedTexts;
    }

    getLanguageCode(): string {

        const ln = _.get(WITHCENTER_LANGUAGE_CODE);
        console.log('got ln: ', ln);
        if (ln) {
            return ln;
        } else {
            return _.getBrowserLanguage();
        }
    }

    setLanguageCode() {
        _.set(WITHCENTER_LANGUAGE_CODE, this.languageCode);
    }

}
