import { useLocation, Routes, Route } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import { useSelector, useDispatch } from '../../services/store/store';
import { ProfilePageSidebar } from '../../components/profilePageSidebar/ProfilePageSidebar';
import { ProfilePageAvatar } from '../../components/profilePageAvatar/ProfilePageAvatar';
import { ProfilePageForm } from '../../components/profilePageForm/ProfilePageForm';
import { ProfilePageRequest } from '../../components/profilePageRequest/ProfilePageRequest';
import { ProfilePageMessageText } from '../../components/profilePageMessageText/ProfilePageMessageText';
import { ProfilePageLike } from '../../components/profilePageLike/ProfilePageLike';
import { ProfilePageUserInfo } from '../../components/profilePageUserInfo/ProfilePageUserInfo';

import {
  userSelector,
  updateUserThunk
} from '../../services/slices/userSlice/userSlice';

export default function ProfileDetailsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(userSelector);

  const [formValue, setFormValue] = useState({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    password: user?.password,
    avatarUrl: user?.avatarUrl,
    birthday: user?.birthday,
    aboutMe: user?.aboutMe,
    city: user?.city,
    gender: user?.gender,
    wantLearn: user?.wantLearn,
    canLearn: user?.canLearn
  });

  const handleSubmit = () => {
    dispatch(updateUserThunk(formValue));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

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
                  <ProfilePageAvatar
                    user={formValue}
                    handleInputChange={handleInputChange}
                  />
                  <ProfilePageForm
                    user={formValue}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                  />
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
