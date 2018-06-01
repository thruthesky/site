import { Component, Input } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
    selector: 'katalkenglish-main-teacher-list',
    templateUrl: 'katalkenglish-main-teacher-list.component.html',
    styleUrls: ['katalkenglish-main-teacher-list.component.scss'],
})
export class KatalkEnglishMaiTeacherListComponent {
    @Input() total_teachers;
    @Input() teachers;
    constructor(public a: AppService) { }
}

