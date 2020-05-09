import React,{useState,useEffect} from 'react'
import {history} from '../useful/history';
import {alertActions} from '../../actions/alert.actions';

export const Service = {
    hardwareget
};

async function hardwareget(url) {

    const Options = {
        method: 'GET',
        headers: {  'Content-Type': 'application/json' },
    };

    const response = await fetch(url, Options)
    const json = await response.json();

    return json

}

function gethardware(url){

    return dispatch => {

        hardwareget(url)
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