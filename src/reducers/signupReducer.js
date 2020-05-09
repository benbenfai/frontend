import {SIGN_START,SIGN_SUCCESS,SIGN_FAIL} from '../actions/signupAction';

const initialState = {
	loading: false,
	error: null
}

const signReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SIGN_START':
            return {
                ...state,
                error: null,
                loading: true
            };
        case 'SIGN_SUCCESS':
            return {
                ...state,
                error: null,
                loading: false
            };
        case 'SIGN_FAIL':
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default: 
            return state
    }
   
}

export default signReducer;