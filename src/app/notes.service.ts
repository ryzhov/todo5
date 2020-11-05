import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from './notes.reducer';

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    constructor() {
        if (null === localStorage.getItem('notes')) {
            localStorage.setItem('notes', JSON.stringify([]));
        }
    }

    getAll(): Observable<Note[]> {
        return of(JSON.parse(
            localStorage.getItem('notes'),
            (key, value) => key === 'updatedAt' ? new Date(value) : value
        ));
    }

    setAll(notes: Note[]): void {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}
