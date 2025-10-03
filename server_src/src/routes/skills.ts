import { Router } from 'express';
import { database } from '../database/db';
import { CreateSkillRequest, UpdateSkillRequest } from '../types/skill';

export const skillRoutes = Router();

// GET /api/skills/:id - получить навык по ID
skillRoutes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await database.getQuery<any>(
      `SELECT 
        s.id,
        s.ownerId,
        s.skillName,        
        s.categorie as category,
        s.subCategorie as subCategory,
        s.description,
        s.photoUrls
       FROM Skills s
       WHERE s.id = ?`,
      [id]
    );
    
    if (result.success) {
      if (result.data) {
        const skill = {
          id: result.data.id,
          ownerId: result.data.ownerId,
          name: result.data.skillName,
          photoUrl: result.data.photoUrls ? result.data.photoUrls.split(',').filter((url: string) => url.trim() !== '') : [],
          category: result.data.category,
          subCategory: result.data.subCategory,
          description: result.data.description,
        };
        console.log(skill)
        res.json(skill);
      } else {
        res.status(404).json({ error: 'Skill not found' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error fetching skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/skills/owner/:ownerId - получить навыки по владельцу
skillRoutes.get('/owner/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;
    
    const result = await database.getAllQuery<any>(
      `SELECT 
        s.id,
        s.skillName,
        s.ownerId,
        s.categorie as category,
        s.subCategorie as subCategory,
        s.description,
        s.photoUrls
       FROM Skills s
       WHERE s.ownerId = ?
       ORDER BY s.createDate DESC`,
      [ownerId]
    );
    
    if (result.success) {
      const skills = result.data.map((row: any) => ({
        id: row.id,
        ownerId: row.ownerId,
        name: result.data.skillName,
        photoUrl: row.photoUrls ? row.photoUrls.split(',').filter((url: string) => url.trim() !== '') : [],
        category: row.category,
        subCategory: row.subCategory,
        description: row.description,
      }));
      
      res.json(skills);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error fetching skills by owner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/skills - создать новый навык
skillRoutes.post('/', async (req, res) => {
  try {
    const skillData: CreateSkillRequest = req.body;
    
    if (!skillData.ownerId) {
      res.status(400).json({ error: 'Owner ID is required' });
      return;
    }

    // Проверяем существование пользователя
    const userResult = await database.getQuery<any>(
      'SELECT id FROM Users WHERE id = ?',
      [skillData.ownerId]
    );
    
    if (!userResult.success || !userResult.data) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const skillId = `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const result = await database.runQuery(
      `INSERT INTO Skills (id, ownerId, categorie, subCategorie, createDate, description, likes, requested, photoUrls)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        skillId,
        skillData.ownerId,
        skillData.category || null,
        skillData.subCategory || null,
        currentDate,
        skillData.description || null,
        '', // начальные лайки - пустая строка
        '', // начальные запросы - пустая строка
        skillData.photoUrl ? skillData.photoUrl.join(',') : null
      ]
    );
    
    if (result.success) {
      // Получаем созданный навык
      const skillResult = await database.getQuery<any>(
        `SELECT 
          s.id,
          s.ownerId,
          s.categorie as category,
          s.subCategorie as subCategory,
          s.createDate,
          s.description,
          s.likes,
          s.requested,
          s.photoUrls,
          u.name as ownerName,
          u.avatarUrl as ownerAvatar,
          u.city as ownerCity
         FROM Skills s
         INNER JOIN Users u ON s.ownerId = u.id
         WHERE s.id = ?`,
        [skillId]
      );
      
      if (skillResult.success && skillResult.data) {
        const createdSkill = {
          id: skillResult.data.id,
          ownerId: skillResult.data.ownerId,
          photoUrl: skillResult.data.photoUrls ? skillResult.data.photoUrls.split(',').filter((url: string) => url.trim() !== '') : [],
          name: skillResult.data.ownerName,
          category: skillResult.data.category,
          subCategory: skillResult.data.subCategory,
          description: skillResult.data.description,
          createDate: skillResult.data.createDate,
          likes: skillResult.data.likes ? skillResult.data.likes.split(',').filter((id: string) => id.trim() !== '') : [],
          requested: skillResult.data.requested ? skillResult.data.requested.split(',').filter((id: string) => id.trim() !== '') : [],
          ownerInfo: {
            name: skillResult.data.ownerName,
            avatar: skillResult.data.ownerAvatar,
            city: skillResult.data.ownerCity
          }
        };
        
        res.status(201).json({
          ...createdSkill,
          message: 'Skill created successfully'
        });
      } else {
        res.status(500).json({ error: 'Failed to retrieve created skill' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/skills/:id - обновить навык
skillRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const skillData: UpdateSkillRequest = req.body;
    
    // Проверяем существование навыка
    const existingSkill = await database.getQuery<any>(
      'SELECT id FROM Skills WHERE id = ?',
      [id]
    );
    
    if (!existingSkill.success || !existingSkill.data) {
      res.status(404).json({ error: 'Skill not found' });
      return;
    }

    const result = await database.runQuery(
      `UPDATE Skills 
       SET categorie = ?, subCategorie = ?, description = ?, photoUrls = ?
       WHERE id = ?`,
      [
        skillData.category || null,
        skillData.subCategory || null,
        skillData.description || null,
        skillData.photoUrl ? skillData.photoUrl.join(',') : null,
        id
      ]
    );
    
    if (result.success) {
      if (result.data.changes > 0) {
        // Получаем обновленный навык
        const skillResult = await database.getQuery<any>(
          `SELECT 
            s.id,
            s.ownerId,
            s.categorie as category,
            s.subCategorie as subCategory,
            s.createDate,
            s.description,
            s.likes,
            s.requested,
            s.photoUrls,
            u.name as ownerName,
            u.avatarUrl as ownerAvatar,
            u.city as ownerCity
           FROM Skills s
           INNER JOIN Users u ON s.ownerId = u.id
           WHERE s.id = ?`,
          [id]
        );
        
        if (skillResult.success && skillResult.data) {
          const updatedSkill = {
            id: skillResult.data.id,
            ownerId: skillResult.data.ownerId,
            photoUrl: skillResult.data.photoUrls ? skillResult.data.photoUrls.split(',').filter((url: string) => url.trim() !== '') : [],
            name: skillResult.data.ownerName,
            category: skillResult.data.category,
            subCategory: skillResult.data.subCategory,
            description: skillResult.data.description,
            createDate: skillResult.data.createDate,
            likes: skillResult.data.likes ? skillResult.data.likes.split(',').filter((id: string) => id.trim() !== '') : [],
            requested: skillResult.data.requested ? skillResult.data.requested.split(',').filter((id: string) => id.trim() !== '') : [],
            ownerInfo: {
              name: skillResult.data.ownerName,
              avatar: skillResult.data.ownerAvatar,
              city: skillResult.data.ownerCity
            }
          };
          
          res.json({
            ...updatedSkill,
            message: 'Skill updated successfully'
          });
        } else {
          res.status(500).json({ error: 'Failed to retrieve updated skill' });
        }
      } else {
        res.status(404).json({ error: 'Skill not found' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/skills/:id - удалить навык
skillRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Сначала проверяем существование навыка
    const existingSkill = await database.getQuery<any>(
      'SELECT id FROM Skills WHERE id = ?',
      [id]
    );
    
    if (!existingSkill.success) {
      res.status(500).json({ error: existingSkill.error });
      return;
    }
    
    if (!existingSkill.data) {
      res.status(404).json({ error: 'Skill not found' });
      return;
    }

    const result = await database.runQuery(
      'DELETE FROM Skills WHERE id = ?',
      [id]
    );
    
    if (result.success) {
      if (result.data.changes > 0) {
        res.json({ message: 'Skill deleted successfully' });
      } else {
        res.status(404).json({ error: 'Skill not found' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

skillRoutes.get('/skillPage/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await database.getQuery<any>(
      `SELECT 
        s.id,
        s.ownerId,
        s.skillName,        
        s.categorie as category,
        s.subCategorie as subCategory,
        s.description,
        s.photoUrls
       FROM Skills s
       WHERE s.id = ?`,
      [id]
    );
    
    if (result.success) {
      if (result.data) {
        const skill = {
          id: result.data.id,
          ownerId: result.data.ownerId,
          name: result.data.skillName,
          photoUrl: result.data.photoUrls ? result.data.photoUrls.split(',').filter((url: string) => url.trim() !== '') : [],
          category: result.data.category,
          subCategory: result.data.subCategory,
          description: result.data.description,
        };
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
          WHERE s.ownerId=? AND s.skillName=?
        `;
        const params: any[] = ['','', skill.ownerId, skill.name];

        const result_card = await database.getAllQuery<any>(query, params);
        console.log(result_card);
        if (result_card.success) {
          // Преобразуем данные в формат TCard
          const cards = result_card.data.map((row: any) => ({
            skillId: row.skillId,
            createDate: row.createDate,
            userName: row.userName,
            city: row.city,
            age: row.age?.toString() || '0',
            avatar_url: row.avatar_url,
            liked: false,
            onRequest: false,
            canTeach: row.canTeach ? [row.canTeach] : [],
            wantLearn: row.wantLearn ? row.wantLearn.split(',').map((item: string) => item.trim()) : []
          }))
          res.json({skill:skill, card:cards});
        };
      } else {
        res.status(404).json({ error: 'Skill not found' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error fetching skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
