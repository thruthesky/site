import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyPagePage } from './my-page.page';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';

const routes: Routes = [
    {path: '', component: MyPagePage}
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        TranslatePipeModule,
        MaterialModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        MyPagePage
    ],
    entryComponents: [
        MyPagePage
    ],
    bootstrap: [MyPagePage],
    schemas: []
})
export class MyPagePageModule {
}
