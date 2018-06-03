import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../providers/app.service';


@Component({
    selector: 'schedule-table-options-component',
    templateUrl: './schedule-table-options.component.html',
    styleUrls: ['./schedule-table-options.component.scss']
})
export class ScheduleTableOptionsComponent {

    @Input() form = null;
    @Output() change = new EventEmitter<void>();
    chip = {
        show: ''
    };

    formOptions = {
        begin_hours: Array(24).fill(0).map((e, i) => i),
        end_hours: Array(24).fill(0).map((e, i) => i + 1)
    };

    constructor(
        public a: AppService
    ) {

    }
    onSearchSubmit() {
        this.change.emit();
    }
}
