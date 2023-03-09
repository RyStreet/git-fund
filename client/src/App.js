import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './pages/Homepage';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import CreateProject from './pages/CreateProject';
import Profile from './pages/Profile';
import SingleProject from './pages/SingleProject';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: "graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return(
  <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<Homepage />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/login'
            element={<LoginForm />}
          />
          <Route 
            path='/signup'
            element={<SignupForm />}
          />
          <Route 
            path='/create-project'
            element={<CreateProject />}
          />
          <Route 
            path='/projects/:projectId'
            element={<SingleProject />}
          />
          <Route 
            path='/profiles/:username'
            element={<Profile />}
          />
        </Routes>
        <Footer/>
      </>
    </Router>
  </ApolloProvider>
)};

export default App;