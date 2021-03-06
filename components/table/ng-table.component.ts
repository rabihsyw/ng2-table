import {Component, Directive, EventEmitter, ElementRef, Renderer} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgFor} from 'angular2/common';

import {NgTableSorting} from './ng-table-sorting.directive';

@Component(
    {
        selector   : 'ngTable, [ngTable]',
        inputs   : [ 'rows', 'columns', 'config' ],
        outputs  : [ 'tableChanged' ],
        template : `
    <table [attr.class]="config && config.class ? config.class : 'table table-striped table-bordered dataTable'"
           role="grid" style="width: 100%;">
      <thead>
      <tr role="row">
        <th *ngFor="#column of columns" [ngTableSorting]="config" [column]="column" (clearSort)="clearColumnsSort($event)" (sortChanged)="onChangeTable($event)">
          {{column.title}}
          <i *ngIf="config && column.sort" class="pull-right glyphicon"
            [ngClass]="{'glyphicon-chevron-down': column.sort === 'desc', 'glyphicon-chevron-up': column.sort === 'asc'}"></i>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="#row of rows">
        <td *ngFor="#column of columns" [innerHTML]="column.formatter ? column.formatter(row[column.name], row) : row[column.name]"></td>
      </tr>
      </tbody>
    </table>
`,
        directives : [ NgTableSorting, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES ]
    }
)
export class NgTable {
    // Table values
    public rows : Array<any>      = [];
    private _columns : Array<any> = [];
    public config : any           = {};

    // Outputs (Events)
    public tableChanged : EventEmitter<any> = new EventEmitter();

    public set columns(values : Array<any>) {
        values.forEach(
            (value) => {
                let column = this._columns.find((col) => col.name === value.name);
                if (column) {
                    Object.assign(column, value);
                }
                if (!column) {
                    this._columns.push(value);
                }
            }
        );
    }

    public get columns() {
        return this._columns;
    }

    public get configColumns() {
        let sortColumns : Array<any> = [];

        this.columns.forEach(
            (column) => {
                if (column.sort) {
                    sortColumns.push(column);
                }
            }
        );

        return {columns : sortColumns};
    }

    ngOnInit() {

        this.tableChanged.emit(null);
    }

    clearColumnsSort(_column : any) {

        this.columns.forEach(
            (column) => {
                if (_column.name !== column.name) {
                    column.sort = null
                }
            }
        );
    }

    onChangeTable(column : any) {
        this.columns = [ column ];
        this.tableChanged.emit({sorting : this.configColumns});
    }
}
