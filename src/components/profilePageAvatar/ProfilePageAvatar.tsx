import styles from './ProfilePageAvatar.module.css';
import { TUser } from '../../services/slices/userSlice/type';
import { useRef, ChangeEvent, useState, SyntheticEvent } from 'react';
import { TSkillTag } from '../../components/cardTag/CardTag';

export type ProfilePageFormProps = {
  user: {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    avatarUrl: string | undefined;
    birthday: Date | undefined;
    aboutMe: string | undefined;
    city: string | undefined;
    gender: string | undefined;
    wantLearn: TSkillTag[] | undefined;
    canLearn: TSkillTag[] | undefined;
  };
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
};

export function ProfilePageAvatar({
  user,
  handleInputChange
}: ProfilePageFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={styles.profileAvatarBlock}>
      <img
        src={user?.avatarUrl}
        alt='Аватар'
        className={styles.profileAvatar}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/default-avatar.png';
        }}
      />
      <input
        type='file'
        ref={fileInputRef}
        accept='image/*'
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              handleInputChange({
                target: {
                  name: 'avatarUrl',
                  value: reader.result
                }
              } as any);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <button
        className={styles.profileEditPhotoBtn}
        onClick={() => fileInputRef.current?.click()}
        type='button'
      >
        <span className={styles.profileGalleryEdit} />
      </button>
    </div>
  );
}
