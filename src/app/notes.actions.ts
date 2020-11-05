import { createAction, props } from '@ngrx/store';
import { Note, UpdateNoteDTO } from './notes.reducer';

export const create = createAction('notes/create');
export const remove = createAction('notes/remove', props<{ note: Note }>());
export const select = createAction('notes/select', props<{ note: Note }>());
export const unselect = createAction('notes/unselect');
export const update = createAction('notes/update', props<{ updateNoteDTO: UpdateNoteDTO }>());
export const load = createAction('notes/load');
export const loaded = createAction('notes/loaded', props<{ notes: Note[] }>());
