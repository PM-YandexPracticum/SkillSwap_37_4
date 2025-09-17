import { useLocation, Routes, Route } from 'react-router-dom';
import styles from './ProfilePage.module.css';
//import { Sidebar } from '';
//import { Avatar } from '';
//import { Form } from '';
//import { Request } from '';
//import { MessageText } from '';
//import { Like } from '';
//import { UserInfo } from '';

export default function ProfileDetailsPage() {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Sidebar currentPath={location.pathname} />
        <main className={styles.userInfo}>
          <Routes>
            <Route
              path="/details"
              element={
                <>
                  <Avatar />
                  <Form />
                </>
              }
            />
            <Route path="/request" element={<Request />} />
            <Route path="/message-text" element={<MessageText />} />
            <Route path="/like" element={<Like />} />
            <Route path="/user-info" element={<UserInfo />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
