import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { KatalkEnglishHomePage } from './katalkenglish-home.page';
// import { UserInfoComponentModule } from '../../../../components/user-info/user-info.component.module';

import { KatalkEnglishIntroComponentModule } from '../../components/katalkenglish-intro/katalkenglish-intro.component.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { KatalkEnglishMainBannerComponentModule } from '../../components/katalkenglish-main-banner/katalkenglish-main-banner.component.module';

const routes: Routes = [
    {path: '', component: KatalkEnglishHomePage}
];
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        // UserInfoComponentModule,
        TranslatePipeModule,
        KatalkEnglishIntroComponentModule,
        KatalkEnglishMainBannerComponentModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        KatalkEnglishHomePage
    ],
    entryComponents: [
        KatalkEnglishHomePage
    ],
    bootstrap: [KatalkEnglishHomePage],
    schemas: []
})
export class KatalkEnglishHomePageModule {
}
