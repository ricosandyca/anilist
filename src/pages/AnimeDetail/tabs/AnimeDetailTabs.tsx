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
import { Media } from '~/types/anilist-graphql';

export type AnimeDetailTabsProps = {
  media: Media;
};

const AnimeDetailTabs: FC<AnimeDetailTabsProps> = ({ media }) => {
  const isMDDown = useBreakpointValue({ base: true, lg: false });
  const [activeTab, setActiveTab] = useQueryState<string>('tab', '');

  const tabs = useMemo(() => {
    return [
      {
        id: 'relations',
        title: 'Relations',
        element: <AnimeDetailRelations />,
        show: (media.relations?.edges || []).length > 0,
      },
      {
        id: 'characters',
        title: 'Characters',
        element: <AnimeDetailCharacters />,
        show: (media.characters?.edges || []).length > 0,
      },
      {
        id: 'streaming-episodes',
        title: 'Watch',
        element: <AnimeDetailEpisodes />,
        show: (media.streamingEpisodes || []).length > 0,
      },
    ];
  }, [media]);

  const activeTabIndex = useMemo(() => {
    const tabIndex = tabs.findIndex(({ id }) => id === activeTab);
    if (tabIndex < 0) return 0;
    return tabIndex;
  }, [activeTab]);

  const handleTabsChange = useCallback((index: number) => {
    const tabId = tabs[index].id;
    setActiveTab(tabId);
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
        {tabs.map((tab) => tab.show && <Tab key={tab.id}>{tab.title}</Tab>)}
      </TabList>

      <TabPanels>
        {tabs.map(
          (tab) =>
            tab.show && (
              <TabPanel key={tab.id} p={0}>
                {tab.element}
              </TabPanel>
            ),
        )}
      </TabPanels>
    </Tabs>
  );
};

export default memo(AnimeDetailTabs);
