import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


import { ProfilePage } from './profile.page';
import { DataComponentModule } from '../../components/data/data.component.module';

const routes: Routes = [
    { path: '', component: ProfilePage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        DataComponentModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        ProfilePage
    ],
    entryComponents: [
        ProfilePage
    ],
    bootstrap: [ProfilePage],
    schemas: []
})
export class ProfilePageModule { }
