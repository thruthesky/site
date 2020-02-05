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
        show: 'hours'
    };

    formOptions = {
        begin_hours: Array(24).fill(0).map((e, i) => i),
        end_hours: Array(24).fill(0).map((e, i) => i + 1)
    };

    constructor(
        public a: AppService
    ) {

    }
    onSearchSubmit(close = false) {
        this.change.emit();
        if ( close ) {
            setTimeout(() => this.chip.show = '', 1000);
        }
    }
}
