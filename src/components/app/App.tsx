import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '../../services/store/store';
import { useEffect } from 'react';
import styles from './App.css';
import { AppFooter } from '../appFooter/AppFooter';
import { NotFound404 } from '../../pages/404';
import { InternalError500 } from '../../pages/500';
import ProfileDetailsPage from '../../pages/profile/ProfilePage';

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
        <Route
          path='/profile/*'
          element={
            <ProtectedRoute>
              <ProfileDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/500' element={<InternalError500 />} />
      </Routes>
      <AppFooter />
      {/* todo */}
      {/* <AppFooter /> */}
    </div>
  );
}

export default App;
