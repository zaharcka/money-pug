import React from 'react';
import {
  Provider,
} from 'react-redux';
import createStore from './redux/store';
import MainPage from './Screens/MainPage';



const store = createStore();

function App() {
    return (
      <Provider store={store}>
        <MainPage />
      </Provider>
    )
}

export default App;
