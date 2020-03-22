import React from 'react';
import Routes from './routes';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import environment from '../config/RelayEnvironment';
import '../config/Reactotron';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <PaperProvider>
        <Routes/>
      </PaperProvider>
    </RelayEnvironmentProvider>
  );
};


export default App;
