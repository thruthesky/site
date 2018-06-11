import { NgModule } from '@angular/core';
import { ForumService } from './forum.service';
import { HttpClientModule } from '@angular/common/http';

export * from './forum.service';



@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [
    ],
    providers: [
        ForumService
    ],
})
export class ForumServiceModule { }

