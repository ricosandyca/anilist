const appConfig = {
  appName: import.meta.env.VITE_APP_NAME || '',
  appAuthor: import.meta.env.VITE_APP_AUTHOR || '',
  appAuthorURL: import.meta.env.VITE_APP_AUTHOR_URL || '',
  anilistGraphQLEndpoint: import.meta.env.VITE_ANILIST_GRAPHQL_ENDPOINT || '',
};

export default appConfig;
