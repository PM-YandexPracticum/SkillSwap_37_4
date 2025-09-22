import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SkillPage.module.css';

import GreenButton from '../../components/buttons/GreenButton';
import { TCard } from '../../components/card/type';
import { SkillCardProps } from '../../components/skillCard/SkillCard';
import { Card } from '../../components/card';
import { SkillCard } from '../../components/skillCard/SkillCard';
import { Preloader } from '../../components/ui/preloader/preloader';
import { CardCarousel } from '../../components/cardCarousel';

const SkillPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [cardData, setCardData] = useState<TCard | null>(null);
  const [skillData, setSkillData] = useState<SkillCardProps | null>(null);
  const [cardCarouselData, setCardCarouselData] = useState<TCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);

      // заглушка
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            card: {
              userEmail: 'example@example.com',
              likes: ['user1@example.com', 'user2@example.com'],
              createDate: '2023-10-01',
              userName: 'Иван',
              city: 'Санкт-Петербург',
              age: '34',
              avatar_url: 'https://i.ibb.co/1YmL5xnT/Photo.png',
              canTeach: [{ name: 'Игра на барабанах', color: '#f7e7f2' }],
              wantLearn: [
                { name: 'Тайм менеджмент', color: '#e7f2f6' },
                { name: 'Медитация', color: '#e9f7e7' }
              ]
            },
            skill: {
              name: 'Игра на барабанах',
              category: 'Творчество и искусство',
              subCategory: 'Музыка и звук',
              description:
                'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами.',
              photoUrl: [
                '/images/skills/drums1.png',
                '/images/skills/drums2.png',
                '/images/skills/drums3.png'
              ]
            },
            similar: [
              {
                userEmail: 'example@example.com',
                likes: ['user1@example.com', 'user2@example.com'],
                createDate: '2023-10-01',
                userName: 'Иван',
                city: 'Санкт-Петербург',
                age: '34',
                avatar_url: 'https://i.ibb.co/1YmL5xnT/Photo.png',
                canTeach: [{ name: 'Игра на барабанах', color: '#f7e7f2' }],
                wantLearn: [
                  { name: 'Тайм менеджмент', color: '#e7f2f6' },
                  { name: 'Медитация', color: '#e9f7e7' }
                ],
                onClick: () => alert('Кнопка нажата!')
              },
              {
                userEmail: 'example@example.com',
                likes: ['user1@example.com', 'user2@example.com'],
                createDate: '2023-10-01',
                userName: 'Иван',
                city: 'Санкт-Петербург',
                age: '34',
                avatar_url: 'https://i.ibb.co/1YmL5xnT/Photo.png',
                canTeach: [{ name: 'Игра на барабанах', color: '#f7e7f2' }],
                wantLearn: [
                  { name: 'Тайм менеджмент', color: '#e7f2f6' },
                  { name: 'Медитация', color: '#e9f7e7' }
                ],
                onClick: () => alert('Кнопка нажата!')
              }
            ]
          });
        }, 500)
      );

      const { card, skill, similar } = response as {
        card: TCard;
        skill: SkillCardProps;
        similar: TCard[];
      };

      setCardData(card);
      setSkillData(skill);
      setCardCarouselData(similar);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading || !cardData || !skillData) {
    return (
      <div className={styles.preloaderOverlay}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.mainSection}>
        <Card {...(cardData as TCard)} />
        <SkillCard {...(skillData as SkillCardProps)}>
          <GreenButton
            onClick={() => alert('Кнопка нажата!')}
            className={styles.buttonWidth}
          >
            Предложить обмен
          </GreenButton>
        </SkillCard>
      </div>
      <CardCarousel name='Похожие предложения' cards={cardCarouselData} />
    </div>
  );
};

export default SkillPage;
