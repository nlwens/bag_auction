# Changelog for Web Advance

## REST Principles
Added API spec file in PDF format to the documentation folder.

Changed the GET call for all items, now when no bags are found at the back end, it will return an empty Json instead of 404 error.

Changed the path for bids API now they are nested inside /bags.

Created a writable store for latest price of each bag so the current price in description component will also be updated once the new bid is placed.

Changed the path of login and register using /users and /auth replace /login and /register at back end.

## Code quality
### Backend
Changed the comment language to English.

Deleted unnecessary console.logs in the application.

Changed the camelCased naming of 2 middlewares now all the files in backend are named kebab-cased.

Removed auth.js file from the template.

### Frontend
Fetches are now done in #await template blocks, onMount is used no more in the application.

## Architecture
Changed registration of router in a more optimal way as app.use('/bags', bagsRouter) instead.

Removed bids-router.js and it is now nested inside of bags-router.js

## Authentication & Security
Combined isNotAdmin and isAdmin function in the backend middleware together to a single checkRole function to reduce the code duplication.

## Testing
Updated failed test now they are running successful.

Changed the test plan chapter.