# MacEats

This project was inspired by feedback from students at McMaster, where I asked them to anonymously identify what they felt was missing in their lives as McMaster students. MacEats is therefore inspired by some of the responses that I received. 

## Menu data

`items.json` is reconciled with the [McMaster Hospitality locations directory](https://hospitality.mcmaster.ca/locations/our-locations/) and its McMaster-hosted location menus (last checked October 9, 2026). It contains 443 menu entries, including current listed prices, from the 11 locations that publish detailed menus there. Locations that only provide a description or link to a third-party brand menu are not represented with potentially stale item lists.

## Shared likes

Likes are stored in MongoDB so every visitor sees the same count. To configure a deployment:

1. Create a MongoDB database and store its connection string as `MONGO_URI` in the deployment host's environment-variable settings. Never commit it; `.env.example` shows the expected format.
2. Run `npm install`, then deploy the project. The first successful `GET /api/items` seeds the menu automatically without resetting likes. Run `npm run seed` after later menu-data changes to update names and tags without resetting existing likes.
3. The shared API is available at `GET /api/items` and `PUT /api/items/:id`.
