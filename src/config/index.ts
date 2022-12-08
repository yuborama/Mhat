const PROJECTS_ID = {
  develop: 'b6341425-7c7b-45bd-939a-dc15db168d62',
  staging: 'b6341425-7c7b-45bd-939a-dc15db168d62',
  production: 'b6341425-7c7b-45bd-939a-dc15db168d62',
};

const HOST = {
  develop: 'b6341425-7c7b-45bd-939a-dc15db168d62.sites.develop.ixulabs.com',
  staging: 'b6341425-7c7b-45bd-939a-dc15db168d62.sites.staging.ixulabs.com',
  production: 'b6341425-7c7b-45bd-939a-dc15db168d62.sites.production.ixulabs.com',
};

const CONFIG = {
  GRAPHQL_URL: process.env.GRAPHQL_SERVER_URL ?? 'https://yubo.stacklycode.com/graphql/',
  GRAPHQL_URL_WS: process.env.GRAPHQL_URL_WS ?? 'wss://chat-service.staging.ixuapis.com/graphql/',
  APP_ENV: process.env.APP_ENV ?? 'develop',
  PROJECT_ID: PROJECTS_ID[(process.env.APP_ENV ?? 'develop') as keyof typeof PROJECTS_ID],
  HOST: HOST[(process.env.APP_ENV ?? 'develop') as keyof typeof HOST],
};

export default CONFIG;
