import { EventEmitter, ElementRef, Renderer } from 'angular2/core';
export declare class NgTableFiltering {
    private element;
    private renderer;
    config: any;
    tableChanged: EventEmitter<any>;
    constructor(element: ElementRef, renderer: Renderer);
    onChangeFilter(event: any): void;
}
