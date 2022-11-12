import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSeasonDashYear } from '~/utils/anime-season';

const MainPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // auto navigate to current anime season
    const seasonDashYear = getSeasonDashYear(new Date());
    navigate(`/${seasonDashYear}`);
  }, []);

  return null;
};

export default MainPage;
