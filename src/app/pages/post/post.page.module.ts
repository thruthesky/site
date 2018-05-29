import { NgModule } from '@angular/core';
import { PostPage } from './post.page';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
    {
        path: '', component: PostPage, pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild( routes ),
        HttpClientModule
    ],
    exports: [],
    declarations: [
        PostPage
    ],
    providers: [],
})
export class PostPageModule { }
