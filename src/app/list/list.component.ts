import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../notes.reducer';

@Component({
    selector: 'app-list',
    template: `
            <mat-toolbar>
                <ng-template ngFor let-note [ngForOf]="notes" let-i="index">
                    <mat-toolbar-row [ngClass]="{ 'selected': note === selected }">
                        <span>
                            <a href="#note{{i}}" (click)="noteSelect.emit(note)">{{ note.title || '#unnamed' }}</a><br/>
                            <span class="date">{{ note.updatedAt | date:'medium' }}</span>
                        </span>
                        <span class="fill-spacer"></span>
                        <button mat-button mat-icon-button (click)="remove.emit(note)">
                            <mat-icon>close</mat-icon>
                        </button>
                    </mat-toolbar-row>
                </ng-template>
            </mat-toolbar>
   `,
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    @Input() public readonly notes: Note[];
    @Input() public readonly selected: Note;
    @Output() public readonly remove = new EventEmitter<Note>();
    @Output() public readonly noteSelect = new EventEmitter<Note>();
}
