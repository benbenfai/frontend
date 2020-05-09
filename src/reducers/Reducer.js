import { combineReducers } from 'redux'
import {userState} from '../actions/state/user_state';

const signupReducer = (state = {}, action) => {
    switch(action.type) {
        case userState.SIGN_START:
            return {
                registering: true
            };
        case userState.SIGN_SUCCESS:
            return {};
        case userState.SIGN_FAIL:
            return {};
        default: 
            return state
    }
   
}

const userReducer = combineReducers({
  signupReducer
})

export default userReducer;