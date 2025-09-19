import styles from './ProfilePageAvatar.module.css';

export function ProfilePageAvatar() {
  return (
    <div className={styles.profileAvatarBlock}>
      <img
        //src={avatarPreview || '/default-avatar.png'}
        src={'/default-avatar.png'}
        alt='Аватар'
        className={styles.profileAvatar}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/default-avatar.png';
        }}
      />
      <input
        type='file'
        /*ref={fileInputRef}
        onChange={handleAvatarChange}*/
        accept='image/*'
        style={{ display: 'none' }}
      />
      <button
        className={styles.profileEditPhotoBtn}
        /*onClick={() => fileInputRef.current?.click()}*/
        type='button'
      >
        <span className={styles.profileGalleryEdit} />
      </button>
    </div>
  );
}
