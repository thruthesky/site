// import { Injectable } from '@angular/core';
// import { XapiLMSService, Branch } from '../modules/xapi/lms.service';
// import { SiteService } from './site.service';
// import { DEFAULT_CLASS_SOFTWARE } from './defines';

// @Injectable()
// export class BranchService {
//     info: Branch = <any> {};
//     branchInfoLoaded = false;
//     constructor(
//         public readonly lms: XapiLMSService,
//         public readonly site: SiteService
//     ) {
//         this.lms.branch_information(this.site.getDomain()).subscribe(res => {
//             console.log('branch_information: ', res);
//             this.info = res;
//             this.branchInfoLoaded = true;
//         }, e => console.log('Error on getting branch_information'));
//     }

//     /**
//      * Returns true if branch information has been properly loaded.
//      */
//     get loaded(): boolean {
//         if ( ! this.branchInfoLoaded ) {
//             return false;
//         }
//         if ( this.info.idx === void 0 || ! this.info.idx ) {
//             return false;
//         }
//         return true;
//     }
//     /**
//      * Returns the default messenger chosen by branch manager.
//      *
//      * If default messenger is not set in branch configuration or branch information is empty by accident,
//      *  it will return DEFAULT_CLASS_SOFTWARE by default. which is defined in defines.ts
//      *
//      * @desc Since this method will have proper value only after `lms.branch_information()` has loaded branch information,
//      *  Be careful not to use it to copy into another variable before when it is ready.
//      *
//      * @desc Using it in template is fine.
//      *  But copying the value of it before it has been loaded into another variable in TS file is no good.
//      */
//     get defaultClassSoftware(): string {
//         if ( this.loaded && this.info.class_software ) {
//             return this.info.class_software;
//         } else {
//             return DEFAULT_CLASS_SOFTWARE;
//         }
//     }

// }
