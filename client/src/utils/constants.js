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
        url: '/event',
    },
    {
        id: 3,
        text: 'join',
        url: '/join',
    },
]

export const BASE_URL = (process.env.BASE_URL === undefined ? 'http://localhost:5001' : `${process.env.BASE_URL}`)

export const events_url = '/api/events'

export const status_url = '/status'

export const profile_url = '/profile'
