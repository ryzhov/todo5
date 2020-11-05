import { createSelector } from '@ngrx/store';
import { Note, Tag } from './notes.reducer';
import { AppState } from './reducers';

export const getSearch = (state: AppState): string => state.search.search;
export const getTag = (state: AppState): Tag => state.search.tag;
export const getNotes = (state: AppState): Note[] => state.notes.notes;
export const getSelectedNote = (state: AppState): Note => state.notes.selectedNote;

export const getTags = createSelector(
    getNotes,
    (notes: Note[]): Tag[] => notes.reduce(
        (tags: Tag[], note: Note): Tag[] => {
            const newTags: Tag[] = [ ...tags, ...Array.from(note.body.matchAll(/#[^#\s]+/g), m => m[0])];
            return newTags.filter((tag, index) => index === newTags.indexOf(tag));
        },
        []
    )
);

export const getNotesFilteredBySearch = createSelector(
    getNotes,
    getSearch,
    (notes: Note[], search: string): Note[] =>  notes.filter(item => -1 !== item.title.indexOf(search))
);

export const getNotesFilteredByTagAndSearch = createSelector(
    getNotesFilteredBySearch,
    getTag,
    (notes: Note[], tag: Tag): Note[] =>  notes.filter(item => -1 !== item.body.indexOf(tag))
);

export const getNotesOrderedByDate = createSelector(
    getNotesFilteredByTagAndSearch,
    (notes: Note[]): Note[] => [ ...notes].sort((a: Note, b: Note) => b.updatedAt.getTime() - a.updatedAt.getTime())
);
