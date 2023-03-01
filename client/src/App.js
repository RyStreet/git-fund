import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';

import Homepage from './pages/Homepage';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import CreateProject from './pages/CreateProject';
import Profile from './pages/Profile';
import Project from './pages/Project';

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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  <ApolloProvider client={client}>
    <Router>
      <div>
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
        </Routes>
      </div>
    </Router>
  </ApolloProvider>
};

export default App();