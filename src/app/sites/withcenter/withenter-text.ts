export const WITHCENTER_LANGUAGE_CODE = 'withcenterLanguageCode';
const texts = {};

texts['ko'] = {
    withcenter: '위세너',
    franchise: '프랜차이즈'
};

texts['en'] = {
    withcenter: 'Withcenter',
    franchise: 'Franchise'
};

texts['ch'] = {
    withcenter: 'Withcenter',
    franchise: '专营权'
};

texts['jp'] = {
    withcenter: 'Withcenter',
    franchise: 'フランチャイズ'
};


export function getTexts(ln) {
    return texts[ln];
}
