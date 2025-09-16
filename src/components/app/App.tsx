import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '../../services/store/store';
import { useEffect } from 'react';
import styles from './App.css';
import { AppFooter } from '../appFooter/AppFooter';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.background;
  const closeModal = () => {
    navigate(backgroundLocation || '/');
  };
  const dispatch = useDispatch();

  useEffect(() => {
    'load data here';
  }, [dispatch]);

  // todo protectedRoutes
  // todo Modal

  return (
    <div className={styles.App}>
      {/* todo */}
      {/* <AppHeader /> */}
      <Routes>
        <Route
          path='/'
          element={
            // todo
            // <MainPage />
            <h1>MainPage</h1>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <h1>loginPage</h1>
              {/* todo */}
              {/* <Login /> */}
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <h1>Register</h1>
              {/* todo */}
              {/* <Register /> */}
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <h1>Profile</h1>
                {/* todo */}
                {/* <Profile /> */}
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path='*'
          element={
            <h1>NotFound404</h1>
            // todo
            // <NotFound404 />
          }
        />
        <Route
          path='/500'
          element={
            <h1>InternalError500</h1>
            // todo
            // <InternalError500 />
          }
        />
      </Routes>
      <AppFooter />
    </div>
  );
}

export default App;
