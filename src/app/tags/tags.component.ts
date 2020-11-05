import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../notes.reducer';

@Component({
    selector: 'app-tags',
    template: `
        <mat-chip-list selectable aria-label="Tags selection">
            <ng-template ngFor let-tag [ngForOf]="tags">
                <mat-chip [selected]="tag === selectedTag" (click)="tagSelect.emit(tag)"> {{ tag }} </mat-chip>
            </ng-template>
        </mat-chip-list>
        <button mat-button mat-icon-button [disabled]="!tags.length" aria-label="Reset Tags"
            (click)="tagSelect.emit('')">
            <mat-icon>close</mat-icon>
        </button>
    `,
    styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
    @Input() public readonly tags: Tag[];
    @Input() public readonly selectedTag: Tag;
    @Output() public readonly tagSelect = new EventEmitter<Tag>();
}
