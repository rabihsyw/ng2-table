import { EventEmitter } from 'angular2/core';
export declare class NgTablePaging {
    config: boolean;
    tableChanged: EventEmitter<any>;
    onChangePage(event: any): void;
}
