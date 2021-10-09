import React, { Fragment } from 'react';

import { Provider } from 'react-redux';
import ToDo from './containers/todo/todo';
import Title from './components/title/title';
import store from './store';

const App = () => (
  <Provider store={store}>
    <>
      <Title title="ToDo App" />
      <ToDo />
    </>
  </Provider>
);

export default App;
