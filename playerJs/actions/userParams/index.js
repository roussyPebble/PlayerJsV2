import { SET_USER_PARAMS } from '../../constants/action-types';

export function setUserParams(userParams) {
    return {
        type: SET_USER_PARAMS,
        payload: userParams
    };
}