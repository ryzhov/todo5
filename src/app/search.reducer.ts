import { Action, createReducer, on } from '@ngrx/store';
import * as SearchActions from './search.actions';

export interface SearchState {
    search: string;
    tag: string;
}

export const initialState: SearchState = { search: '', tag: '' };

const reducer = createReducer(
    initialState,
    on(SearchActions.search, (state: SearchState, { search }): SearchState => ({ ...state, search })),
    on(SearchActions.tag, (state: SearchState, { tag }): SearchState => ({ ...state, tag })),
);

export function searchReducer(state: SearchState, action: Action): SearchState {
    return reducer(state, action);
}
