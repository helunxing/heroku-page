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

export const base_url = ''

export const events_url = base_url + '/api/event'

export const postcode_url = base_url + '/api/postcode'

export const status_url = base_url + '/api/status'

export const single_events_url = base_url + '/api/event'

export const join_url = base_url + '/api/join'
