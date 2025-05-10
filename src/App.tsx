import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { client } from './apollo/client';
import { MyRootComponent } from './components/MyRootComponent';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <MyRootComponent />
    </ApolloProvider>
  );
};

export default App; 