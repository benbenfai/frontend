import alertState from './state/altert_state';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertState.SUCCESS, message };
}

function error(message) {
    return { type: alertState.ERROR, message };
}

function clear() {
    return { type: alertState.CLEAR };
}