import { ActionReducer, MetaReducer } from '@ngrx/store';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action): ActionReducer<any> => {
        console.log({ state, action });
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [ debug ];
