import { INCREMENT } from './actions';

export interface IAppState {
    counter: number;
    anotherCounter: number;
}

export const INITIAL_STATE = {
    counter: 25,
    anotherCounter: 10
}

export function rootReducer( state: IAppState, action ): IAppState {
    switch ( action.type ) {
        case INCREMENT: return {
            counter: state.counter + action.payload.amount,
            anotherCounter: state.anotherCounter
        }
    }
    return state;
}
