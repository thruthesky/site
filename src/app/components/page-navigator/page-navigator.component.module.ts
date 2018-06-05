import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageNavigatorComponent } from './page-navigator.component';


@NgModule({
    declarations: [
        PageNavigatorComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        PageNavigatorComponent
    ]
})
export class PageNavigatorComponentModule { }
