import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-create',
    template: `
        <button mat-mini-fab color="primary" aria-label="Create note" (click)="create.emit()">
            <mat-icon>add</mat-icon>
        </button>
    `,
    styleUrls: ['./create.component.scss']
})
export class CreateComponent {
    @Output() create = new EventEmitter<void>();
}
