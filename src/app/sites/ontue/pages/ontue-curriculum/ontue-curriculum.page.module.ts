import { NgModule } from '@angular/core';
import { OntueCurriculumPage } from './ontue-curriculum.page';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: OntueCurriculumPage
    }
];


@NgModule({
    imports: [
        RouterModule.forChild( appRoutes )
    ],
    exports: [],
    declarations: [
        OntueCurriculumPage
    ],
    providers: [],
    bootstrap: [ OntueCurriculumPage ]
})
export class OntueCurriculumPageModule { }
