import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageNavigatorComponent } from './page-navigator.component';


@NgModule({
    declarations: [
        PageNavigatorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        PageNavigatorComponent
    ]
})
export class PageNavigatorComponentModule { }
