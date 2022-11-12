import { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '~/routes';
import theme from '~/styles/theme';

const App: FC = () => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;
