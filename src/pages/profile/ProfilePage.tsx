import { useLocation, Routes, Route } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { ProfilePageSidebar } from '../../components/profilePageSidebar/ProfilePageSidebar';
import { ProfilePageAvatar } from '../../components/profilePageAvatar/ProfilePageAvatar';
import { ProfilePageForm } from '../../components/profilePageForm/ProfilePageForm';
import { ProfilePageRequest } from '../../components/profilePageRequest/ProfilePageRequest';
import { ProfilePageMessageText } from '../../components/profilePageMessageText/ProfilePageMessageText';
import { ProfilePageLike } from '../../components/profilePageLike/ProfilePageLike';
import { ProfilePageUserInfo } from '../../components/profilePageUserInfo/ProfilePageUserInfo';

export default function ProfileDetailsPage() {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <ProfilePageSidebar currentPath={location.pathname} />
        <main className={styles.userInfo}>
          <Routes>
            <Route
              path='/details'
              element={
                <>
                  <ProfilePageAvatar />
                  <ProfilePageForm />
                </>
              }
            />
            <Route path='/requests' element={<ProfilePageRequest />} />
            <Route path='/message-texts' element={<ProfilePageMessageText />} />
            <Route path='/likes' element={<ProfilePageLike />} />
            <Route path='/skills' element={<ProfilePageUserInfo />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
