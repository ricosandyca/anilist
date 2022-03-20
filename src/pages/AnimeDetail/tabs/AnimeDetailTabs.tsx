import { FC, memo, useCallback, useMemo } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
} from '@chakra-ui/react';

import AnimeDetailCharacters from './AnimeDetailCharacters';
import AnimeDetailEpisodes from './AnimeDetailEpisodes';
import AnimeDetailRelations from './AnimeDetailRelations';
import { useQueryState } from '~/hooks/use-query-state';

const tabs = [
  {
    id: 'characters',
    title: 'Characters',
    element: <AnimeDetailCharacters />,
  },
  {
    id: 'relations',
    title: 'Relations',
    element: <AnimeDetailRelations />,
  },
  {
    id: 'streaming-episodes',
    title: 'Episodes',
    element: <AnimeDetailEpisodes />,
  },
];

const AnimeDetailTabs: FC = () => {
  const isMDDown = useBreakpointValue({ base: true, lg: false });
  const [activeTab, setActiveTab] = useQueryState('tab', tabs[0].id);

  const activeTabIndex = useMemo(() => {
    const tabIndex = tabs.findIndex(({ id }) => id === activeTab);
    if (tabIndex < 0) return 0;
    return tabIndex;
  }, [activeTab]);

  const handleTabsChange = useCallback((index: number) => {
    const tabId = tabs[index].id;
    setActiveTab(tabId || '');
  }, []);

  return (
    <Tabs
      index={activeTabIndex}
      onChange={handleTabsChange}
      w="full"
      colorScheme="purple"
      isLazy
    >
      <TabList maxW="full" justifyContent={isMDDown ? 'center' : 'flex-start'}>
        {tabs.map((tab) => (
          <Tab key={tab.id}>{tab.title}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={tab.id}>{tab.element}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default memo(AnimeDetailTabs);
