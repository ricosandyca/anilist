const appConfig = {
  appName: import.meta.env.VITE_APP_NAME || '',
  anilistGraphQLEndpoint: import.meta.env.VITE_ANILIST_GRAPHQL_ENDPOINT || '',
};

export default appConfig;
