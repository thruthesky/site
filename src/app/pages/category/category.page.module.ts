import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Route } from '@angular/router';
import { CategoryPage } from './category.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const AppRoutes: Array<Route> = [
    { component: CategoryPage, path: ''  }
];

@NgModule({
    declarations: [
        CategoryPage
    ],
    entryComponents: [
        CategoryPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild( AppRoutes )
    ],
    bootstrap: [
        CategoryPage
    ]
})
export class CategoryPageModule {}
