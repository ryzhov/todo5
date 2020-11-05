import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-search',
    template: `
        <mat-form-field  appearance="outline">
            <mat-label>Search note</mat-label>
            <input matInput type="text" #input (keyup)="search.emit(input.value)">
            <button mat-button mat-icon-button [disabled]="!input.value" matSuffix aria-label="Clear"
                (click)="search.emit(input.value='')">
                <mat-icon>close</mat-icon>
            </button>
        </mat-form-field>
    `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    @Output() search = new EventEmitter<string>();
}
