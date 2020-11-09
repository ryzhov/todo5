import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { NotesService } from './notes.service';
import * as NotesActions from './notes.actions';
import { getNotes } from './getters';
import { Store } from '@ngrx/store';

@Injectable()
export class NotesEffects {

    loadNotes$ = createEffect(() => this.actions$.pipe(
        ofType(NotesActions.load),
        mergeMap(() => this.notesService.getAll()
            .pipe(
                map(notes => NotesActions.loaded({ notes })),
                catchError(() => EMPTY)
            )
        )
    ));

    saveNotes$ = createEffect(() => this.actions$.pipe(
        ofType(NotesActions.create, NotesActions.update, NotesActions.remove),
        mergeMap(() => this.store.select(getNotes)
            .pipe(
                tap(notes => this.notesService.setAll(notes)),
                catchError(() => EMPTY)
            )
        )
    ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly notesService: NotesService,
        private readonly store: Store
    ) {}
}
