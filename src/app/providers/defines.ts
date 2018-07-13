/**
 * If the domain contains `katalkenglish`, then it is considered as katalkenglish.com website
 *  except the domain does not contain `withcenter`. like `withcenterxxxx.katalkenglish.com` will be withcenter site.
 */
export const SITE_KATALKENGLISH = 'katalkenglish';
export const SITE_ENGLISHAS = 'englishas';
export const SITE_ONTUE = 'ontue';
/**
 * If the domain contains `withcenter`, then it is considered as withcenter.com website.
 */
export const SITE_WITHCENTER = 'withcenter';
export const SITE_ADMIN = 'admin';


export const CLASS_SOFTWARE_KAKAOTALK = 'kakaotalk';

export interface SITE {
    ontue: boolean;
    withcenter: boolean;
    katalkenglish: boolean;
    englishas: boolean;
    admin: boolean;
}



export const SKYPE = 'skype';
export const KAKAOTALK = 'kakaotalk';
export const WECHAT = 'wechat';
export const LINE = 'line';

export const DEFAULT_CLASS_SOFTWARE = SKYPE;
