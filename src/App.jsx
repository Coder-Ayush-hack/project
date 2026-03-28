import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RoleProvider, useRole } from './context/RoleContext';
import Layout from './components/Layout';
import Overview from './views/Overview';
import Performance from './views/Performance';
import UserActivity from './views/UserActivity';
import Login from './views/Login';

function AppRoutes() {
  const { isLoggedIn } = useRole();

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="performance" element={<Performance />} />
          <Route path="activity" element={<UserActivity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <RoleProvider>
      <AppRoutes />
    </RoleProvider>
  );
}

export default App;
