import { Router } from 'express';
import { database } from '../database/db';
import { FilterObject, LikeRequest } from '../types/cards';

export const cardRoutes = Router();

// GET /api/cards - получить карточки с фильтрацией и пагинацией
cardRoutes.get('/', async (req, res) => {
  try {
    const { startNum, endNum, ...filterParams } = req.body;
    
    const start = parseInt(startNum as string) || 0;
    const end = parseInt(endNum as string) || 9;
    const limit = end - start + 1;
    
    const filterObj: FilterObject = filterParams;
    
    // Базовый запрос с JOIN таблиц
    let query = `
      SELECT 
        s.id as skillId,
        s.createDate,
        s.skillName as skillName,
        u.name,
        u.city,
        CAST(strftime('%Y', 'now') - strftime('%Y', u.birthday) AS INTEGER) as age,
        u.avatarUrl as avatar_url,
        CASE WHEN s.likes LIKE '%' || ? || '%' THEN 1 ELSE 0 END as liked,
        CASE WHEN s.requested LIKE '%' || ? || '%' THEN 1 ELSE 0 END as onRequest,
        s.categorie as canTeach,
        u.wantLearn as wantLearn
      FROM Skills s
      INNER JOIN Users u ON s.ownerId = u.id
      WHERE 1=1
    `;

    const params: any[] = [req.query.currentUserId || '', req.query.currentUserId || ''];

    // Применяем фильтры
    if (filterObj.category && filterObj.category.length > 0) {
      query += ` AND s.categorie IN (${filterObj.category.map(() => '?').join(',')})`;
      params.push(...filterObj.category);
    }

    if (filterObj.subcategory && filterObj.subcategory.length > 0) {
      query += ` AND s.subCategorie IN (${filterObj.subcategory.map(() => '?').join(',')})`;
      params.push(...filterObj.subcategory);
    }

    if (filterObj.city) {
      query += ` AND u.city LIKE ?`;
      params.push(`%${filterObj.city}%`);
    }

    if (filterObj.gender) {
      query += ` AND u.gender = ?`;
      params.push(filterObj.gender);
    }

    if (filterObj.matchName) {
      query += ` AND (s.skillName LIKE ?)`;
      params.push(`%${filterObj.matchName}%`, `%${filterObj.matchName}%`);
    }

    // Фильтр по поисковому типу
    // if (filterObj.searchType === 'wantLearn') {
    //   query += ` AND u.wantLearn LIKE '%' || s.categorie || '%'`;
    // } else if (filterObj.searchType === 'canLearn') {
    //   query += ` AND s.categorie LIKE '%' || u.wantLearn || '%'`;
    // }else if (filterObj.searchType === 'all'){
    //   query += ` AND s.categorie LIKE '%' || u.wantLearn || '%'`;
    //   query += ` AND s.categorie LIKE '%' || s.categorie || '%'`;
    // }

    // Сортировка
    if (filterObj.sortByNew) {
      query += ` ORDER BY s.createDate DESC`;
    } else if (filterObj.sortByLike) {
      query += ` ORDER BY LENGTH(s.likes) DESC, s.createDate DESC`;
    } else {
      query += ` ORDER BY s.id DESC`;
    }

    // Пагинация
    query += ` LIMIT ? OFFSET ?`;
    params.push(limit, start);

    const result = await database.getAllQuery<any>(query, params);
    
    if (result.success) {
      // Преобразуем данные в формат TCard
      const cards = result.data.map((row: any) => ({
        skillId: row.skillId,
        createDate: row.createDate,
        userName: row.userName,
        city: row.city,
        age: row.age?.toString() || '0',
        avatar_url: row.avatar_url,
        liked: Boolean(row.liked),
        onRequest: Boolean(row.onRequest),
        canTeach: row.canTeach ? [row.canTeach] : [],
        wantLearn: row.wantLearn ? row.wantLearn.split(',').map((item: string) => item.trim()) : []
      }));

      res.json({
        cards,
        total: cards.length,
        hasMore: cards.length === limit
      });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/cards/like - поставить лайк карточке
cardRoutes.post('/like', async (req, res) => {
  try {
    const { userId, skillId }: LikeRequest = req.body;

    if (!userId || !skillId) {
      res.status(400).json({ error: 'User ID and Skill ID are required' });
      return;
    }

    // Получаем текущие лайки навыка
    const skillResult = await database.getQuery<any>(
      'SELECT likes FROM Skills WHERE id = ?',
      [skillId]
    );

    if (!skillResult.success || !skillResult.data) {
      res.status(404).json({ error: 'Skill not found' });
      return;
    }

    const currentLikes = skillResult.data.likes || '';
    const likesArray = currentLikes.split(',').filter(Boolean);

    // Проверяем, не лайкал ли уже пользователь
    if (likesArray.includes(userId)) {
      res.status(409).json({ error: 'User already liked this skill' });
      return;
    }

    // Добавляем лайк
    likesArray.push(userId);
    const newLikes = likesArray.join(',');

    const updateResult = await database.runQuery(
      'UPDATE Skills SET likes = ? WHERE id = ?',
      [newLikes, skillId]
    );

    if (updateResult.success) {
      res.json({ 
        message: 'Like added successfully',
        likesCount: likesArray.length
      });
    } else {
      res.status(500).json({ error: updateResult.error });
    }
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/cards/dislike - убрать лайк с карточки
cardRoutes.post('/dislike', async (req, res) => {
  try {
    const { userId, skillId }: LikeRequest = req.body;

    if (!userId || !skillId) {
      res.status(400).json({ error: 'User ID and Skill ID are required' });
      return;
    }

    // Получаем текущие лайки навыка
    const skillResult = await database.getQuery<any>(
      'SELECT likes FROM Skills WHERE id = ?',
      [skillId]
    );

    if (!skillResult.success || !skillResult.data) {
      res.status(404).json({ error: 'Skill not found' });
      return;
    }

    const currentLikes = skillResult.data.likes || '';
    let likesArray = currentLikes.split(',').filter(Boolean);

    // Проверяем, лайкал ли пользователь
    if (!likesArray.includes(userId)) {
      res.status(409).json({ error: 'User has not liked this skill' });
      return;
    }

    // Убираем лайк
    likesArray = likesArray.filter((id:string) => {
      return id !== userId;
    });
    const newLikes = likesArray.join(',');

    const updateResult = await database.runQuery(
      'UPDATE Skills SET likes = ? WHERE id = ?',
      [newLikes, skillId]
    );

    if (updateResult.success) {
      res.json({ 
        message: 'Like removed successfully',
        likesCount: likesArray.length
      });
    } else {
      res.status(500).json({ error: updateResult.error });
    }
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/cards/:id - получить конкретную карточку
cardRoutes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { currentUserId } = req.body;

    const query = `
      SELECT 
        s.id as skillId,
        s.createDate,
        s.name as skillName,
        u.city,
        CAST(strftime('%Y', 'now') - strftime('%Y', u.birthday) AS INTEGER) as age,
        u.avatarUrl as avatar_url,
        CASE WHEN s.likes LIKE '%' || ? || '%' THEN 1 ELSE 0 END as liked,
        CASE WHEN s.requested LIKE '%' || ? || '%' THEN 1 ELSE 0 END as onRequest,
        s.categorie as canTeach,
        u.wantLearn as wantLearn,
        s.description,
        s.subCategorie,
        s.photoUrls
      FROM Skills s
      INNER JOIN Users u ON s.ownerId = u.id
      WHERE s.id = ?
    `;

    const result = await database.getQuery<any>(query, [currentUserId || '', currentUserId || '', id]);
    
    if (result.success) {
      if (result.data) {
        const card = {
          skillId: result.data.skillId,
          createDate: result.data.createDate,
          userName: result.data.userName,
          city: result.data.city,
          age: result.data.age?.toString() || '0',
          avatar_url: result.data.avatar_url,
          liked: Boolean(result.data.liked),
          onRequest: Boolean(result.data.onRequest),
          canTeach: result.data.canTeach ? [result.data.canTeach] : [],
          wantLearn: result.data.wantLearn ? result.data.wantLearn.split(',').map((item: string) => item.trim()) : [],
          description: result.data.description,
          subCategory: result.data.subCategorie,
          photoUrls: result.data.photoUrls ? result.data.photoUrls.split(',') : []
        };
        res.json(card);
      } else {
        res.status(404).json({ error: 'Card not found' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});