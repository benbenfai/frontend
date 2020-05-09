import React,{useState,useEffect} from 'react'

export const userService = {
    login,
    logout,
    register
};

async function login(username, password) {

    const Options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch('http://localhost:5000/user/${username}', Options)
    const json = await response.json();

    localStorage.setItem('user', JSON.stringify(json.user));
    localStorage.setItem('access_token', JSON.stringify(json.access_token));
    localStorage.setItem('refresh_token', JSON.stringify(json.refresh_token));

}

function logout() {

    localStorage.removeItem('user');
}

async function register(email, username, password) {
    const Options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email, username, password })
    };

    await fetch('http://localhost:5000/user/register', Options);
}
