import React from 'react'

export const links = [
    {
        id: 1,
        text: 'home',
        url: '/',
    },
    {
        id: 2,
        text: 'events',
        url: '/events',
    },
    {
        id: 3,
        text: 'about',
        url: '/about',
    },
]

export const BASE_URL = process.env.BASE_URL || 'http://localhost:5001';

export const events_url = BASE_URL + '/api/events';
