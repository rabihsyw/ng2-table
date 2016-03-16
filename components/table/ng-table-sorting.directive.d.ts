import { EventEmitter } from 'angular2/core';
export declare class NgTableSorting {
    config: any;
    column: any;
    sortChanged: EventEmitter<any>;
    clearSort: EventEmitter<any>;
    onToggleSort(event: any): void;
}
