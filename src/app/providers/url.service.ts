import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    constructor() {
    }

    get register(): string {
        return '/register';
    }
}
