import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './providers/app.service';
import { FireService, FirelibraryModule } from './modules/firelibrary/core';


import { OntueHeaderComponentModule } from './sites/ontue/components/ontue-header/ontue-header.component.module';
import {
    KatalkEnglishHeaderComponentModule
} from './sites/katalkenglish/components/katalkenglish-header/katalkenglish-header.component.module';

import { LanguageService } from './providers/language.service';
import { XapiModule, XapiService, XapiUserService, XapiLMSService, XapiFileService } from './modules/xapi/xapi.module';
import { TranslatePipeModule } from './modules/firelibrary/pipes/translate/translate.pipe.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FirelibraryModule.forRoot({ functions: true }),
    OntueHeaderComponentModule,
    KatalkEnglishHeaderComponentModule,
    XapiModule,
    TranslatePipeModule
  ],
  exports: [
  ],
  providers: [
    FireService,
    AppService,
    LanguageService,
    XapiService, XapiUserService, XapiFileService, XapiLMSService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


