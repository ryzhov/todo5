import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note, Tag, UpdateNoteDTO } from './app/notes.reducer';
import { getNotesOrderedByDate, getSelectedNote, getTag, getTags } from './app/getters';
import * as NotesActions from './app/notes.actions';
import * as SearchActions from './app/search.actions';

@Component({
    selector: 'app-root',
    template: `
        <div class="todo-wrapper">
            <div class="control">
                <div class="header">
                    <app-search (search)=onSearch($event)></app-search>
                    <app-create (create)=onCreate()></app-create>
                </div>
                <app-list [selected]="selected$ | async" [notes]="notes$ | async" (remove)=onRemove($event)
                    (noteSelect)=onSelect($event)></app-list>
                <app-tags [selectedTag]="selectedTag$ | async" [tags]="tags$ | async" (tagSelect)=onTagSelect($event)></app-tags>
            </div>
            <div class="content">
                <app-note [note]="selected$ | async" [selectedTag]="selectedTag$ | async" (update)=onUpdate($event)></app-note>
            </div>
        </div>
    `,
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    notes$: Observable<Note[]> = this.store.select(getNotesOrderedByDate);
    selected$: Observable<Note> = this.store.select(getSelectedNote);
    tags$: Observable<Tag[]> = this.store.select(getTags);
    selectedTag$: Observable<Tag> = this.store.select(getTag);

    constructor(private readonly store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(NotesActions.load());
    }

    onSearch(search: string): void {
        this.store.dispatch(NotesActions.unselect());
        this.store.dispatch(SearchActions.search({ search }));
    }

    onCreate(): void {
        this.store.dispatch(NotesActions.create());
    }

    onRemove(note: Note): void {
        this.store.dispatch(NotesActions.remove({ note }));
    }

    onSelect(note: Note): void {
        this.store.dispatch(NotesActions.select({ note }));
    }

    onUpdate(updateNoteDTO: UpdateNoteDTO): void {
        this.store.dispatch(NotesActions.update({ updateNoteDTO }));
    }

    onTagSelect(tag: Tag): void {
        this.store.dispatch(SearchActions.tag({ tag }));
    }
}
