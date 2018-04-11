import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { XapiService } from './xapi.service';
export { XapiService } from './xapi.service';

import { XapiUserService } from './user.service';
export { XapiUserService } from './user.service';

import { XapiFileService } from './file.service';
export { XapiFileService } from './file.service';

import { XapiLMSService } from './lms.service';
export { XapiLMSService } from './lms.service';




export { SERVER_ERROR_CODE } from './interfaces';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [XapiService, XapiUserService, XapiFileService, XapiLMSService],
})
export class XapiModule { }
