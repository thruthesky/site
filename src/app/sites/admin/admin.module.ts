import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHomePage } from './pages/admin-home/admin-home.page';
import { AdminLayoutPage } from './pages/admin-layout/admin-layout.page';
import { AdminLoginPage } from './pages/admin-login/admin-login.page';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutPage,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AdminHomePage
            },
            {
                path: 'login',
                component: AdminLoginPage
            }
        ]
    }

];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AdminLayoutPage,
        AdminHomePage,
        AdminLoginPage
    ],
    entryComponents: [
        AdminLayoutPage,
        AdminHomePage,
        AdminLoginPage
    ],
    providers: [],
    bootstrap: [AdminLayoutPage],
    schemas: []
})
export class AdminModule { }
