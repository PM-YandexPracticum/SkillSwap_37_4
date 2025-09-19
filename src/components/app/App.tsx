import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '../../services/store/store';
import { useEffect } from 'react';
import styles from './App.css';
import { AppFooter } from '../appFooter/AppFooter';
import { NotFound404 } from '../../pages/404';
import { InternalError500 } from '../../pages/500';
import { CatalogPage } from '../../pages/catalog-page';

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
          element={<CatalogPage/>}
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