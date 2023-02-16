import React from 'react'

export const links = [
    {
        id: 1,
        text: 'home',
        url: '/',
    },
    {
        id: 2,
        text: 'Host',
        url: '/events',
    },
    {
        id: 3,
        text: 'join',
        url: '/join',
    },
]

export const BASE_URL = process.env.BASE_URL || 'http://localhost:5001'

export const events_url = '/api/events'

export const status_url = '/status'

export const profile_url='/profile'
