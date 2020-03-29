import React, { useEffect, useState } from 'react';
import Routes from './routes';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import environment from '../config/RelayEnvironment';
import '../config/Reactotron';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </RelayEnvironmentProvider>
  );
};


export default App;
