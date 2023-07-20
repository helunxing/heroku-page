# Time Agreement: Backend for Frontend

This introduction is for the Time Agreement web app project,
specifically its Backend for Frontend (or called BFF) part
and project overall structure.

This project is deployed at: <https://hlx.codes>

Other parts introduction for this project:

[Frontend](https://github.com/helunxing/heroku-page/tree/release/client)

[Microservices Backend](https://github.com/helunxing/microservices-backend)

## Overall Structure

架构图片

The Frontend accesses the restful API provided by the Backend for Frontend (BFF),
which in turn interacts with Microservices and returns the required data to the Frontend.

I chose this structure for several reasons.
First, changes made to the Frontend often require corresponding changes to the API.
For example, if function A on the Frontend relies on the API of microservice X,
and function B on the Frontend relies on the API of microservice Y,
a chang to A, need require data from Y,
If there is no BFF layer, then the relation of API would have to be changed,
either by Y providing a new interface to A
or by X accessing data from Y and changing its own API.
With the BFF layer in place, X and Y can simply provide a fixed interface,
leaving the integrates data from different sources task of satisfying A's changes to the BFF layer.

The benefits of this structure are two-fold.
First, it allows microservices to focus on their own functionality and provide clean, basic APIs
that are not affected by small modifications on the Frontend.
Second, it ensures system security by reducing the need for the Frontend to access redundant data
and by keeping BFF complete data and processing logic separate from Frontend, which may be seen or edited by user.

Why isn't the BFF treated as a new microservice?
It is important to have clear boundaries of responsibility within a team,
to minimize unneeded coordination efforts.
And the same applies to individual responsibilities.
The purpose of making the BFF independent of microservices is to consider it in the context of Frontend development
and to make changes to the Frontend functionality without affecting the API.

## API provide by BFF introduce

### GET `/login`, `/logout`, `/callback`

user third part logging function provide by <https://auth0.com/>

### GET `/api/event`

return all public events

### POST `/api/event`

create new event, return the redirect of its page.

### GET, PUT, DELETE  `/api/event/{eventId}`

return, update, delete event by id.

### GET, PUT `/api/join/{eventId}`

return, create or update time selection.

### GET `/api/user/{userSub}`

return the user info, if is not in the database, create one.

the user info contains: user id, joined events, created events

### GET `/api/postcode/{queryCode}`

return addresses under the given zip code.

depend on microservice: postcode, identity check 
