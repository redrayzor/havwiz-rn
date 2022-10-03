import React from 'react';
import store from './app/store';
import {Provider} from 'react-redux';

import NavigationWrapper from './NavigationWrapper';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationWrapper />
    </Provider>
  );
}
