import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './loader.service';
import { LoaderDialogComponent } from './loader-dialog-component/loader-dialog-component';
import { MaterialModule } from '../../app.material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
  ],
  declarations: [
    LoaderDialogComponent
  ],
  entryComponents: [
    LoaderDialogComponent
  ],
  providers: [ LoaderService ]
})
export class LoaderSerivceModule { }

