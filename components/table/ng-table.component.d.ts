import { EventEmitter } from 'angular2/core';
export declare class NgTable {
    rows: Array<any>;
    private _columns;
    config: any;
    tableChanged: EventEmitter<any>;
    columns: Array<any>;
    configColumns: {
        columns: any[];
    };
    onChangeTable(column: any): void;
}
