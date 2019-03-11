import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DomSanitizer } from '@angular/platform-browser';

import { Base } from './base';



@Injectable()
export class XapiService extends Base {


    private serverUrl = '';


    constructor(
        private http: HttpClient,
        private zone: NgZone,
        private domSanitizer: DomSanitizer
    ) {
        super();
    }

    setServerUrl(url: string): void {
        this.serverUrl = url + '/wp-json/xapi/v2/do';
        // console.log("serverUrl: ", this.serverUrl);
    }

    getServerUrl(): string {
        return this.serverUrl;
    }

    /**
     * Request to server through POST method.
     * @param data request data
     *
     *      data['session_id'] - user session id
     *      data['route'] - route
     *
     */
    post(data): Observable<any> {

        const q = this.httpBuildQuery(data);
        console.log('xapi.service::post() url: ', this.serverUrl + '?' + q);
        if (!this.serverUrl) {
            console.error(`Error. Server URL is not set.`);
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        return this.http.post(this.serverUrl, q, httpOptions)
            .map(e => this.checkResult(e, data));
    }

    query(req): Observable<any> {
        req['route'] = 'wordpress.wp_query';
        req['paged'] = req['paged'] ? req['paged'] : 1;
        return this.post(req);
    }

    httpBuildQuery(params): string {

        return this.http_build_query(params);

        // const keys = Object.keys(params);
        // if (keys.length === 0) {
        //     return null; //
        // }

        // const esc = encodeURIComponent;
        // const query = keys
        //     .map(k => esc(k) + '=' + esc(params[k]))
        //     .join('&');
        // return query;
    }


    http_build_query(formdata, numericPrefix?, argSeparator?, encType?) { // eslint-disable-line camelcase
        //  discuss at: http://locutus.io/php/http_build_query/
        // original by: Kevin van Zonneveld (http://kvz.io)
        // improved by: Legaev Andrey
        // improved by: Michael White (http://getsprink.com)
        // improved by: Kevin van Zonneveld (http://kvz.io)
        // improved by: Brett Zamir (http://brett-zamir.me)
        //  revised by: stag019
        //    input by: Dreamer
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
        // improved by: Will Rowe
        //      note 1: If the value is null, key and value are skipped in the
        //      note 1: http_build_query of PHP while in locutus they are not.
        //   example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;')
        //   returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
        //   example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_')
        //   returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'
        //   example 3: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;', 'PHP_QUERY_RFC3986')
        //   returns 3: 'foo=bar&amp;php=hypertext%20processor&amp;baz=boom&amp;cow=milk'

        // let encodeFunc = this.urlencode;

        // switch (encType) {
        //     case 'PHP_QUERY_RFC3986':
        //         encodeFunc = require('../url/rawurlencode');
        //         break;
        //     case 'PHP_QUERY_RFC1738':
        //     default:
        //         encodeFunc = require('../url/urlencode');
        //         break;
        // }


        const tmp = [];
        const _httpBuildQueryHelper = (key: any, val: any, argSeparator) => {
            let k: any;
            const tmp2 = [];
            if (val === true) {
                val = '1';
            } else if (val === false) {
                val = '0';
            }
            if (val !== null) {
                if (typeof val === 'object') {
                    for (k in val) {
                        if (val[k] !== null) {
                            tmp2.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator));
                        }
                    }
                    return tmp2.join(argSeparator);
                } else if (typeof val !== 'function') {
                    return this.encodeFunc(key) + '=' + this.encodeFunc(val);
                } else {
                    throw new Error('There was an error processing for http_build_query().');
                }
            } else {
                return '';
            }
        };

        if (!argSeparator) {
            argSeparator = '&';
        }

        for (let key2 in formdata) {
            const value = formdata[key2];
            if (numericPrefix && !isNaN(<any>key2)) {
                key2 = String(numericPrefix) + key2;
            }
            const query = _httpBuildQueryHelper(key2, value, argSeparator);
            if (query !== '') {
                tmp.push(query);
            }
        }

        return tmp.join(argSeparator);
    }
    encodeFunc(str) {
        //       discuss at: http://locutus.io/php/urlencode/
        //      original by: Philip Peterson
        //      improved by: Kevin van Zonneveld (http://kvz.io)
        //      improved by: Kevin van Zonneveld (http://kvz.io)
        //      improved by: Brett Zamir (http://brett-zamir.me)
        //      improved by: Lars Fischer
        //         input by: AJ
        //         input by: travc
        //         input by: Brett Zamir (http://brett-zamir.me)
        //         input by: Ratheous
        //      bugfixed by: Kevin van Zonneveld (http://kvz.io)
        //      bugfixed by: Kevin van Zonneveld (http://kvz.io)
        //      bugfixed by: Joris
        // reimplemented by: Brett Zamir (http://brett-zamir.me)
        // reimplemented by: Brett Zamir (http://brett-zamir.me)
        //           note 1: This reflects PHP 5.3/6.0+ behavior
        //           note 1: Please be aware that this function
        //           note 1: expects to encode into UTF-8 encoded strings, as found on
        //           note 1: pages served as UTF-8
        //        example 1: urlencode('Kevin van Zonneveld!')
        //        returns 1: 'Kevin+van+Zonneveld%21'
        //        example 2: urlencode('http://kvz.io/')
        //        returns 2: 'http%3A%2F%2Fkvz.io%2F'
        //        example 3: urlencode('http://www.google.nl/search?q=Locutus&ie=utf-8')
        //        returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'

        str = (str + '');

        // Tilde should be allowed unescaped in future versions of PHP (as reflected below),
        // but if you want to reflect current
        // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/%20/g, '+');
    }

    /**
     * Gets a page
     * @param req request data
     *
     * @code
     * a.xapi.page({ name: 'ontue.reminders' }).subscribe( re => this.reminders = re, e => a.alert(e.message));
     * @endcode
     */
    page(req): any {
        req['route'] = 'wordpress.page';

        return this.post(req)
            .map(e => {
                const re = this.safe(e);
                this.render(500);
                return re;
            });
    }




    checkResult(res, data) {
        // console.log("checkResult() => res: ", res, " data: ", data);
        if (!res) {
            // console.error(`Response from backend is empty`);
            // console.log(`Requested data(that cause empty response): `, data);
            this.throw(-4008, 'Response from backend is empty');
        } else if (res['code'] === void 0) {
            // console.log(`=========> re:`, res);
            this.throw(-4009, 'Response has no code');
        } else if (res['code'] !== 0) {
            // console.log("WordPressApiService::checkResult => error : ", res);
            if (res['message'] === void 0) {
                res['message'] = 'no message';
            }
            this.throw(res['code'], res['message']);
        } else {
            return res['data'];
        }
    }


    version() {
        // console.log("version: ");
        return this.post({ route: 'wordpress.version' });
    }


    /**
     * .set() automatically JSON.stringify()
     * .get() automatically JSON.parse()
     *
     * @return .get() returns null if there is error or the value is falsy.
     *
     */
    get(key) {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    /**
     * It saves data into LocalStorage. It does try/catch.
     * @param key key
     * @param data data to save
     */
    set(key, data) {
        // console.log("storage::set()", data);
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            // console.log('Failed to set localStorage(). 5MB exhausted?');
            return false;
        }
    }


    /**
     * Returns true if the app is running as Cordova mobile app.
     */
    isCordova(): boolean {
        if (window['cordova']) {
            return true;
        } else {
            return false;
        }
    }

    isWeb(): boolean {
        if (document.URL.indexOf('http://') !== -1
            || document.URL.indexOf('https://') !== -1) {
            return true;
        } else {
            return false;
        }
    }



    render(timer = 10) {
        setTimeout(() => this.zone.run(() => {
            // console.log("zone ran.");
        }), timer);
    }


    safe(html: string): any {
        return <any>this.domSanitizer.bypassSecurityTrustHtml(html);
    }


}



