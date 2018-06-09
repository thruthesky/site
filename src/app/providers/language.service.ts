import { Injectable, EventEmitter } from '@angular/core';
import { Library as _ } from './../etc/library';

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';



const LANGUAGE_CODE = 'language_code';

@Injectable()
export class LanguageService {

    /**
     * Holds currently selected language set.
     * This is for easy to use. It's same as ` texts[lang] `.
     */
    static ln = {};

    /**
     *
     * The selected language.
     * 'en' by default.
     * You can change user language with loadLanguage()
     */
    static language = 'en';
    /**
     * Language file folder.
     * It can be changed by settings ` LanguageService.languageFolder = '.../...'; `
     */
    static languageFolder = 'assets/lang';

    /**
     * Sets language texts in `Base.texts` static object.
     */
    static texts: { [language: string]: any } = {};


    /**
     * Fires an event when language is loaded.
     *
     * @example
        this.language.load.subscribe( ln => {
            // console.log('language load ln: ', ln);
            this.languageLoaded(ln);
        });
     */
    load: EventEmitter<any> = new EventEmitter();

    /**
     * Fires when user changes langauge.
     *
     * @description 'load' event is fired whenever a language file is loaded. It automatically fires by constructor.
     * while 'change' is only fired when user is selecting a language.
     */
    change: EventEmitter<string> = new EventEmitter();
    constructor(
        private http: HttpClient
    ) {

        /**
         * Load user's language when it is injected by AppService.
         */
        this.loadUserLanguage();
    }

    /**
     * Loads user language.
     */
    loadUserLanguage(callback?) {
        const ln = this.getUserLanguage();
        this.loadLanguage(ln, LanguageService.languageFolder + ln + '.json?reloadTag=' + environment['reloadTag'])
            .then(re => {
                this.load.emit(re);
                /// re draw?
                if (callback) {
                    callback();
                }
            }).
            catch(e => alert(e.message));
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
        const ln = _.get(LANGUAGE_CODE);
        if (ln && ln.length === 2) {
            return ln;
        } else {
            return _.getBrowserLanguage();
        }
    }


    /**
     * This sets user language on `localStorage` and loads language JSON file
     *  so, the user's language will be changed to it.
     *
     * @desc Use this to chagne language by user. Do not use loadUserLanguage() for language change.
     *
     * @param ln User language
     *
     * @example how to change into another language.
     *              a.language.setUserLanguage('en');
     */
    setUserLanguage(ln, callback?) {
        _.set(LANGUAGE_CODE, ln);
        this.change.emit(ln);
        this.loadUserLanguage(callback);
    }


    /**
     *
     * Sets a language and loads the language file.
     *
     *
     * @see README ## Langulage Translation for more information.
     *
     * @code You can load many languages. But the last one will be set as current language.
     *
     *          fire.loadLanguage('ko');
     *          fire.loadLanguage('jp');
     *          fire.setLanguage('cn')
                    .catch( e => alert('Failed to load language file. ' + e.message) );
     *
     *
     * @param url URL to load langauge.
     *
     * @returns
     *      a Promise of the langauge object on success.
     *      Otherwise error will be thrown.
     *
     */
    loadLanguage(ln: string, url?: string): Promise<any> {
        LanguageService.language = ln;
        if (LanguageService.texts[ln]) {
            // console.log(`Language file is already loaded. Does not going to load again.`);
            LanguageService.ln = LanguageService.texts[ln];
            // this.ln = Object.assign(this.ln, Base.texts[ln]);                   /// Sets reference of current language texts. @see README
            return Promise.resolve(LanguageService.ln);
        }
        if (!url) {
            url = `/${LanguageService.languageFolder}/${ln}.json`;
        }
        return this.http.get(url).toPromise()
            .then(re => {
                if (re) {
                    const keys = Object.keys(re);
                    if (keys.length) {                /// Make the case of keys uppercase. @see README.
                        for (const k of keys) {
                            const uppercase = k.toLocaleUpperCase();
                            if (k !== uppercase) {
                                re[uppercase] = re[k];
                                delete re[k];
                            }
                        }
                    }
                }
                LanguageService.texts[ln] = re;
                LanguageService.ln = LanguageService.texts[ln];               /// Sets reference of current language texts. @see README
                // console.log(` =========== >>>>> Language ${ln} has been set.`);
                return LanguageService.ln;
            });
    }



    /**
     * Gets the current language that is set for language translation.
     * @see ## Language Translation
     */
    getLanguage(): string {
        return LanguageService.language;
    }


    /**
     * Returns the text of the code.
     *
     * It does not translates. Meaning it does not add `information` to the result text. It simply returns.
     * If the language is not `en`, then it gets the text of the language.
     *
     * @param code code. The code will be transformed to uppercase.
     *
     * @returns text of that code.
     *      - if the code does not exist on text file, then it returns the code itself.
     *
     *      - if `code` is falsy, it returns the whole texts of the language.
     *
     * @example How to display texts on template
     *          {{ fire.getText() | json }}
     */
    getText(code?: string): string {
        const ln = this.getLanguage();
        if (!code) {
            return LanguageService.texts[ln];
        }
        code = code.toUpperCase();

        /**
         * `text` should hold the text of the language code.
         */
        let text = null;
        if (this.getLanguage() !== 'en') { // if not English,
            if (LanguageService.texts[ln] !== void 0 && LanguageService.texts[ln][code] !== void 0) { // check if the text of the language exists
                text = LanguageService.texts[ln][code];
            }
        }

        // console.log('code: ', code, 'text: ', text);
        /**
         * If `text` has not any value, then the language( language file ) has no text for that code.
         * So, it is going to get text from English langauge file by default.
         */
        if (!text) { // if current language is `English` or the text of that language not found,
            if (LanguageService.texts['en'] && LanguageService.texts['en'][code]) { // get the text of the code in English
                text = LanguageService.texts['en'][code];
            }
        }
        if (!text) { // if no text found, return the code.
            text = code;
        }
        return text;
    }

    /**
     * Returns translated text string.
     * @param code code to translate
     * @param info information to add on the translated text
     *
     * @example
     *          {{ fire.translate('HOME') }}
     *          {{ fire.t('HOME') }}
     *          {{ fire.ln.HOME }}
     */
    translate(code: string, info?): string {
        return _.patchMarker(this.getText(code), info);
    }

    /**
     * Alias of translate()
     * @param code same as translate()
     * @param info same as transate()
     */
    t(code: any, info?: any): string {
        // console.log('code', code);
        return this.translate(code, info);
    }


}

