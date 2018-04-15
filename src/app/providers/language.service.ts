import { Injectable } from '@angular/core';
import { Library as _ } from '../modules/firelibrary/providers/etc/library';
import { FireService } from '../modules/firelibrary/core';

import env from '../../environment';


const LANGUAGE_CODE = 'language_code';

@Injectable()
export class LanguageService {
    constructor(
        private fire: FireService
    ) {

        /**
         * Load user's language when it is injected by AppService.
         */
        this.loadUserLanguage();
    }

    /**
     * Loads user language.
     */
    loadUserLanguage() {
        const ln = this.getUserLanguage();
        this.fire.setLanguage( ln, '/assets/lang/' + ln + '.json?reloadTag=' + env['reloadTag'] )
            .then(re => {
                /// re draw?
            }).
            catch( e => alert(e.message) );
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
     * @example how to change into another language.
     *              a.language.setUserLanguage('en');
     */
    setUserLanguage( ln ) {
        _.set( LANGUAGE_CODE, ln );
        this.loadUserLanguage();
    }

}

