import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const AuthHome = () => {

    const user = useSelector(state => state.authentication.user);

    return (
        <div className="col-lg-8 offset-lg-2">
            <br/>
            <h1>Hi {user.username}!</h1>
        </div>
    );
}

export default AuthHome;