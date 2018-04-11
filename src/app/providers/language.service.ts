import { Injectable } from '@angular/core';
import { Library as _ } from '../modules/firelibrary/providers/etc/library';
import { FireService } from '../modules/firelibrary/core';

const LANGUAGE_CODE = 'language_code';

@Injectable()
export class LanguageService {
    constructor(
        private fire: FireService
    ) {

        this.loadUserLanguage();
    }

    /**
     * Loads user language.
     */
    loadUserLanguage() {
        const ln = this.getUserLanguage();
        this.fire.setLanguage( ln ).then(re => console.log('lang: ', re)).catch( e => alert(e.message) );
    }
    /**
     * Returns language code like 'ko', 'en', 'jp'.
     *
     * It first checks if user has selected his language manually.
     * If not, it returns browser language.
     *
     * @return language code.
     */
    getUserLanguage(): string {
        const ln = _.get( LANGUAGE_CODE );
        if ( ln && ln.length === 2 ) {
            return ln;
        } else {
            return _.getBrowserLanguage();
        }
    }


    /**
     * This sets user language on `localStorage` and loads language JSON file
     *  so, the user's language will be changed to it.
     *
     * Use this to chagne language by user.
     *
     * @param ln User language
     *
     * @example
     *              language.resetUserLanguage('ko');
     */
    resetUserLanguage( ln ) {
        _.set( LANGUAGE_CODE, ln );
        this.loadUserLanguage();
    }

}

