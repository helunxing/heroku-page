# Time Agreement: Frontend

This introduction is for the Time Agreement web app project,
specifically its Frontend part.

This project is deployed at: <https://hlx.codes>

Other parts introduction for this project:

[Backend](https://github.com/helunxing/microservices-backend)

[Backend for Frontend part & overall introduction](../)

## page explanation

### /

home page, explanation of this website function.
links for host and join events.

[//]: # (### /user/{id} or /u/{id})

### /me

Dashboard page, list events that host by the user and user joined events.

depend on api: `api/user/{userSub}`, `/api/event/{eventId}`,

### /event

Host new events.

depend on api: POST `/api/event`, GET `/api/postcode/{queryCode}`

### /event/{id}

For all user, they can see event detail, and join it.
For the creator of the event, can see all user join it, edit and delete it.

### /join

Input the id of event and join it, list all public events.
