import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'page-navigator-component',
    templateUrl: 'page-navigator.component.html',
    styleUrls: ['page-navigator.component.scss']
})
export class PageNavigatorComponent implements OnChanges {

    numbers = [];
    no_of_total_pages = 0;
    currentDisplay = 0;

    @Input() scoll_to_element_Id: string = null;
    @Input() no_of_total_items: number = null;
    @Input() no_of_items_in_one_page: number = null;
    @Input() no_of_pages_in_navigator: number = null;
    @Input() no_of_current_page = 1;
    @Input() show_prev_next = true;
    @Input() show_first_last = true;

    @Input() text_prev = '&lsaquo;';
    @Input() text_next = '&rsaquo;';
    @Input() text_first = '&laquo;';
    @Input() text_last = '&raquo;';

    @Input() structureClass = {
        ul: 'pagination',
        li: 'page-item',
        a: 'page-link',
        active: 'active',
        pageIn: 'page-indicator'
    };

    @Output() pageClick = new EventEmitter();

    constructor() {
    }

    ngOnChanges() {
        if (this.no_of_total_items > 0) {
            this.showPagination();
        }
    }

    showPagination() {
        this.no_of_total_pages = Math.ceil(this.no_of_total_items / this.no_of_items_in_one_page);

        this.currentDisplay = Math.floor((this.no_of_current_page - 1) / this.no_of_pages_in_navigator);
        this.numbers = [];
        for (let i = 0; i < this.no_of_pages_in_navigator; i++) {
            const current_page_no = this.currentDisplay * this.no_of_pages_in_navigator + i;
            const next_block_page_no = ( this.currentDisplay + 1) * this.no_of_pages_in_navigator;
            if (current_page_no < this.no_of_total_pages && current_page_no < next_block_page_no) {
                this.numbers.push(current_page_no + 1);
            }
        }
    }

    nextPage() {
        const nextPage = (this.currentDisplay + 1) * this.no_of_pages_in_navigator + 1;
        this.pageClick.emit(nextPage);
        this.scrollToView();
    }

    previousPage() {
        const prevPage = (this.currentDisplay) * this.no_of_pages_in_navigator;
        this.pageClick.emit(prevPage);
        this.scrollToView();
    }

    gotoPage(page) {
        this.pageClick.emit(page);
        this.scrollToView();
    }

    gotoLast() {
        this.pageClick.emit(this.no_of_total_pages);
        this.scrollToView();
    }

    gotoFirst() {
        this.pageClick.emit(1);
        this.scrollToView();
    }

    scrollToView() {
        if (this.scoll_to_element_Id) {
            const element = document.getElementById(this.scoll_to_element_Id);
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        }
    }

}
