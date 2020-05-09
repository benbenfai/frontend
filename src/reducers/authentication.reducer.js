import {userState} from '../actions/state/user_state';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication (state = initialState, action){
  switch (action.type) {
    case userState.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userState.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userState.LOGIN_FAILURE:
      return {};
    case userState.LOGOUT:
      return {};
    default:
      return state
  }
}

