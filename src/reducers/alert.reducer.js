import alertState from '../actions/state/altert_state';

const alert = (state = {}, action) => {
  switch (action.type) {
    case alertState.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertState.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertState.CLEAR:
      return {};
    default:
      return state
  }
}

export default alert;