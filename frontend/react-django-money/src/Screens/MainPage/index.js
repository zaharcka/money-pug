import React from 'react';
import {
  useSelector,
} from 'react-redux';
import SignIn from '../signIn';
import Dashboard from '../Dashboard';


const MainPage = () => {
  return !!useSelector(state => state.api.token) ? <Dashboard /> : <SignIn />;
};


export default MainPage;
