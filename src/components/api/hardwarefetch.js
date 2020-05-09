import React,{useState,useEffect} from 'react'
import {history} from '../useful/history';
import {alertActions} from '../../actions/alert.actions';

export const Service = {
    addhardware
};

async function add(url,data) {

    const Options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
    };

    const response = await fetch(url, Options)
    const json = await response.json();

}

function addhardware(url,data){

    return dispatch => {

        add(url,data)
            .then(
                message => { 
                    dispatch(alertActions.success(message.toString()));
                    history.push('/');
                    window.location.reload();
                },
                error => {
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}