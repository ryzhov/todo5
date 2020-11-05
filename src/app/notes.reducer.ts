import { Action, createReducer, on } from '@ngrx/store';
import * as NotesActions from './notes.actions';
import { NotesService } from './notes.service';

export interface Note {
    title: string;
    body: string;
    updatedAt: Date;
}

export interface UpdateNoteDTO {
    title?: string;
    body?: string;
}

export interface NotesState {
    notes: Note[];
    selectedNote: Note;
}

export type Tag = string;

export const initialState: NotesState = { notes: [], selectedNote: null };

const noteFactory = (): Note => ({ title: '', body: '', updatedAt: new Date() });

const reducer = createReducer(
    initialState,
    on(NotesActions.create, ({ notes, selectedNote }): NotesState => {
        const note = noteFactory();
        return { notes: notes.concat(note), selectedNote };
    }),
    on(NotesActions.remove, ({ notes, selectedNote }, { note }): NotesState => {
        return { notes: notes.filter(item => item !== note), selectedNote: note === selectedNote ? null : selectedNote };
    }),
    on(NotesActions.select, ({ notes }, { note }): NotesState => ({ notes, selectedNote: note })),
    on(NotesActions.unselect, ({ notes }): NotesState => ({ notes, selectedNote: null })),
    on(NotesActions.update, ({ notes, selectedNote }, { updateNoteDTO }): NotesState => {
        const updatedNote = { ...selectedNote, ...updateNoteDTO, updatedAt: new Date() };
        return  {
            notes: [ ...notes.filter(item => selectedNote !== item), updatedNote ],
            selectedNote: updatedNote
        };
    }),
    on(NotesActions.loaded, ({}, { notes }): NotesState => ({ notes, selectedNote: null })),
);

export function notesReducer(state: NotesState, action: Action): NotesState {
    return reducer(state, action);
}
