import { useEffect, useState } from 'react';
import { Route, Switch, useLocation, Redirect } from 'wouter';
import { Home } from './pages/home';
import { Signup } from './pages/signup';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { NotFound } from './pages/not-found';
import { startTokenRefresh, stopTokenRefresh } from './api';
import { Layout } from './components/layout';

export const Router = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, navigate] = useLocation();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
        // Start token refresh for logged-in users
        startTokenRefresh();
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
      }
    }
    setLoading(false);

    // Cleanup on unmount
    return () => {
      stopTokenRefresh();
    };
  }, []);

  // Save user to localStorage when it changes
  const handleSetUser = (userData: any) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <Switch>
      <Route path="/">
        {user ? <Redirect to="/dashboard" /> : <Home />}
      </Route>

      <Route path="/signup">
        {user ? (
          <Redirect to="/dashboard" />
        ) : (
          <Layout loading={loading}>
            <Signup
              onSuccess={() => navigate('/login')}
              onSwitchToLogin={() => navigate('/login')}
              loading={loading}
              setLoading={setLoading}
            />
          </Layout>
        )}
      </Route>

      <Route path="/login">
        {user ? (
          <Redirect to="/dashboard" />
        ) : (
          <Layout loading={loading}>
            <Login
              onSuccess={(userData: any) => {
                handleSetUser(userData);
                navigate('/dashboard');
              }}
              onSwitchToSignup={() => navigate('/signup')}
              loading={loading}
              setLoading={setLoading}
            />
          </Layout>
        )}
      </Route>

      <Route path="/dashboard">
        {!user ? (
          <Redirect to="/login" />
        ) : (
          <Layout user={user} setUser={handleSetUser} loading={loading} setLoading={setLoading}>
            <Dashboard setLoading={setLoading} />
          </Layout>
        )}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}
