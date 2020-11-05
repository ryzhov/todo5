import { Action, ActionReducerMap } from '@ngrx/store';
import { notesReducer, NotesState } from './notes.reducer';
import { searchReducer, SearchState } from './search.reducer';

export interface AppState {
    notes: NotesState;
    search: SearchState;
}

export const appReducers: ActionReducerMap<AppState, Action> = {
    notes: notesReducer,
    search: searchReducer,
};
