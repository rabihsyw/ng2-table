import {Directive, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass} from 'angular2/common';

@Directive(
    {
        selector : '[ngTableSorting]',
        inputs   : [ 'config: ngTableSorting', 'column' ],
        outputs  : [ 'sortChanged', 'clearSort' ],
        host     : {
            '(click)' : 'onToggleSort($event, $target)'
        }
    }
)
export class NgTableSorting {
    public config : any;
    public column : any;
    public sortChanged : EventEmitter<any> = new EventEmitter();
    public clearSort : EventEmitter<any>   = new EventEmitter();

    onToggleSort(event : any) {
        if (event) {
            event.preventDefault();
        }

        this.clearSort.emit(this.column);

        if (this.config && this.column && this.column.sort !== false) {
            switch (this.column.sort) {
                case 'asc':
                    this.column.sort = 'desc';
                    break;
                case 'desc':
                    this.column.sort = '';
                    break;
                default:
                    this.column.sort = 'asc';
                    break;
            }
            this.sortChanged.emit(this.column);
        }
    }
}
