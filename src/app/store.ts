import { UPDATE_AUTH_USER } from './actions';
import { UPDATE_QUESTION_FILTER } from './actions';

export interface IAppState {
    authUserData;
    headers;
    filters;
}

export const INITIAL_STATE = {
    authUserData: {},
    headers: {},
    filters: {
        topics: [],
        tags: []
    }
}

export function rootReducer( state: IAppState, action ): IAppState {
    switch ( action.type ) {
        case UPDATE_AUTH_USER: return {
            authUserData: action.payload.userData,
            headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'access-token': action.payload.authHeaders.accessToken,
                    'client': action.payload.authHeaders.client,
                    'expiry': action.payload.authHeaders.expiry,
                    'token-type': action.payload.authHeaders.tokenType,
                    'uid': action.payload.authHeaders.uid
            },
            filters: state.filters,
        }

        case UPDATE_QUESTION_FILTER: return {
            authUserData: state.authUserData,
            headers: state.headers,
            filters: {
                topics: action.payload.topics,
                tags: action.payload.tags
            },
        }
    }
    return state;
}
