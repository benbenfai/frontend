import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/Reducer';
import {authentication} from '../reducers/authentication.reducer';
import alert from '../reducers/alert.reducer';

const AllReducer = combineReducers({userReducer, authentication, alert});

export default () => {
    const store  = createStore(
        AllReducer,
        applyMiddleware(thunk)
    )

    return store;
}
