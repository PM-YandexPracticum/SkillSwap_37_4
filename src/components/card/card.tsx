import { CardUI } from '../ui/card/card';
import { TCard } from './type';
import { FC } from 'react';

export const Card: FC<TCard> = ({
  userEmail,
  likes,
  createDate,
  userName,
  city,
  age,
  avatar_url,
  canTeach,
  wantLearn,
  onClick
}) => {
  const remainingWantLearn = wantLearn.length > 2 ? wantLearn.length - 2 : 0;
  const getAge = (age: string) => {
    const ageNumber = Number(age);
    if (isNaN(ageNumber)) return '';
    const lastDigit = ageNumber % 10;
    const lastTwoDigits = ageNumber % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${ageNumber} год`;
    } else if (
      lastDigit >= 2 &&
      lastDigit <= 4 &&
      lastTwoDigits !== 12 &&
      lastTwoDigits !== 13 &&
      lastTwoDigits !== 14
    ) {
      return `${ageNumber} года`;
    } else {
      return `${ageNumber} лет`;
    }
  };
  return (
    <CardUI
      avatar_url={avatar_url}
      userName={userName}
      city={city}
      age={getAge(age)}
      userEmail={userEmail}
      likes={likes}
      createDate={createDate}
      canTeach={canTeach}
      wantLearn={wantLearn}
      remainingWantLearn={remainingWantLearn}
      onClick={onClick}
    />
  );
};

/*
    const cardData = {
    userEmail: 'example@example.com',
    likes: ['user1@example.com', 'user2@example.com'],
    createDate: '2023-10-01',
    userName: 'Иван',
    city: 'Санкт-Петербург',
    age: '34',
    avatar_url: 'https://i.ibb.co/1YmL5xnT/Photo.png',
    canTeach: [
      { name: 'Игра на барабанах', color: '#f7e7f2' }
    ],
    wantLearn: [
      { name: 'Тайм менеджмент', color: '#e7f2f6' },
      { name: 'Медитация', color: '#e9f7e7' },
      { name: 'Тест', color: '#8cc84b' },
      { name: 'Тест2', color: '#e535ab' },
      { name: 'Тест3', color: '#8cc84b' },
      { name: 'Тест', color: '#8cc84b' },
      { name: 'Тест2', color: '#e535ab' },
      { name: 'Тест3', color: '#8cc84b' },
      { name: 'Тест', color: '#8cc84b' },
      { name: 'Тест2', color: '#e535ab' },
      { name: 'Тест3', color: '#8cc84b' }
    ],
    onClick: () => alert('Кнопка нажата!')
  };
*/
