import React from 'react';
import Routes from './routes';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import environment from '../config/RelayEnvironment';

const App = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Routes/>
    </RelayEnvironmentProvider>
  );
};


export default App;
