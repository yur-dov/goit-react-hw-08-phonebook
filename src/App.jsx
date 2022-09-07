/* react, react-router-dom */
import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

/* redux-state */
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';

/* notification */
import { Toaster } from 'react-hot-toast';

/* components */
import AppBar from './views/AppBar';
import Container from './components/Container';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "home-page" */)
);

const LoginView = lazy(() =>
  import('./views/LoginView' /* webpackChunkName: "login" */)
);

const RegisterView = lazy(() =>
  import('./views/RegisterView' /* webpackChunkName: "register" */)
);

const ContactsView = lazy(() =>
  import('./views/ContactsView' /* webpackChunkName: "contacts" */)
);

function App() {
  const dispatch = useDispatch();
  const isRefreshingCurrentUser = useSelector(
    authSelectors.getIsRefreshingCurrentUser
  );

  useEffect(() => {
    dispatch(authOperations.refreshCurrentUser());
  }, [dispatch]);

  return (
    !isRefreshingCurrentUser && (
      <div>
        <AppBar />
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Container>
                    <RegisterView />
                  </Container>
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Container>
                    <LoginView />
                  </Container>
                </PublicRoute>
              }
            ></Route>

            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsView />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="*"
              element={<h2>404 error, this page doesn't exist</h2>}
            ></Route>
          </Routes>
        </Suspense>

        <Toaster
          toastOptions={{
            className: '',
            style: {
              fontSize: 16,
            },
          }}
        />
      </div>
    )
  );
}

export default App;
