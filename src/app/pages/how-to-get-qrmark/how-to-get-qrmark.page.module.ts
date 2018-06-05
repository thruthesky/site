import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HowToGetQRMARKPage } from './how-to-get-qrmark.page';
import { MaterialModule } from '../../app.material.module';

const routes: Routes = [
    {path: '', component: HowToGetQRMARKPage}
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        MaterialModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        HowToGetQRMARKPage
    ],
    entryComponents: [
        HowToGetQRMARKPage
    ],
    bootstrap: [HowToGetQRMARKPage],
    schemas: []
})
export class HowToGetQRMARKPageModule {
}
