# GraphQL based scorekeeper server

## Get going

Edit docker-compose.yml and create a .env file with:

```env
PRISMA_SECRET=
PRISMA_MANAGEMENT_API_SECRET=
APP_SECRET=
```

Assuming you've got node and npm installed you can get started with:

```sh
docker-compose up -d
npm run deploy
npm run dev
```