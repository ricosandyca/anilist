import { RouteObject, useRoutes } from 'react-router-dom';

import { withShell } from '~/hoc/with-shell';
import AnimeDetailPage from '~/pages/AnimeDetail';
import AnimeListPage from '~/pages/AnimeList';
import MainPage from '~/pages/Main';
import NotFoundPage from '~/pages/NotFound';

// route list
const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/:seasonDashYear',
    element: <AnimeListPage />,
  },
  {
    path: '/media/:mediaId',
    element: <AnimeDetailPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default withShell(Routes);
