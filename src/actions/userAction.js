import {history} from '../components/useful/history';
import {alertActions} from './alert.actions';
import {userService} from '../components/api/fetch';
import {userState} from './state/user_state';

export const userAction = {
    authLogin,
    logout,
    signup
};

function authLogin (username, password){

    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
		    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(user) { return { type: userState.LOGIN_REQUEST, user } }
    function success(user) { return { type: userState.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userState.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userState.LOGOUT };
}

function signup (email, username, password){
    return dispatch => {
        dispatch(request({username}));

        userService.register(email, username, password)
            .then(user => {
                history.push("/login");
                dispatch(success(user))
		dispatch(alertActions.success('Registration successful'));
            })
            .catch(error => {
                dispatch(failure(error.toString()));
		dispatch(alertActions.error(error.toString()));
                history.push('/');
            })
    }
    function request(user) { return { type: 'SIGN_START', user } }
    function success(user) { return { type: 'SIGN_SUCCESS', user } }
    function failure(error) { return { type: 'SIGN_FAIL', error } }
}



