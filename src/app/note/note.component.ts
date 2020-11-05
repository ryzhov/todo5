import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note, Tag } from '../notes.reducer';

@Component({
    selector: 'app-note',
    template: `
        <ng-template [ngIf]="note">
            <mat-form-field  appearance="outline">
                <mat-label>Title</mat-label>
                <input matInput type="text" #title placeholder="Note title ..." [value]="note.title"
                    (blur)="title.value !== note.title && update.emit({title: title.value})" />
            </mat-form-field>
            <div class="body" #body [innerHtml]="styleTag(note.body)" contenteditable="true"
                (blur)="update.emit({body: body.innerText})">
            </div>
        <ng-template>
    `,
    styleUrls: ['./note.component.scss']
})
export class NoteComponent {
    @Input() note: Note;
    @Input() selectedTag: Tag;
    @Output() update = new EventEmitter<Note>();

    styleTag(body: string): string {
        return body
                .replace(/#[^#\s]+/g, match => {
                    const tagClass = this.selectedTag === match ? 'selected-tag' : 'tag';
                    return `<span class="${tagClass}">${match}</span>`;
                })
                .replace(/\n/g, '<br>')
        ;
    }
}
