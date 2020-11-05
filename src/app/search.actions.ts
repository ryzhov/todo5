import { createAction, props } from '@ngrx/store';

export const search = createAction('search/search', props<{ search: string }>());
export const tag = createAction('search/tag', props<{ tag: string }>());
