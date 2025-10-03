import { Router } from 'express';
import { database } from '../database/db';
import { ENotifyStatus, TNotifyHistoryItem } from '../types/notify';

export const notifyRoutes = Router();

// GET /api/notify/user/:userId - получить уведомления для пользователя
notifyRoutes.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Проверяем существование пользователя
    const userResult = await database.getQuery<any>(
      'SELECT id FROM Users WHERE id = ?',
      [userId]
    );
    
    if (!userResult.success || !userResult.data) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const result = await database.getAllQuery<any>(
      `SELECT 
        n.id,
        n.exchangeId,
        n.date as notifyDate,
        n.notifiedStatus as status,
        eh.fromUserId,
        eh.toUserId,
        eh.skillId,
        eh.status as exchangeStatus,
        u_from.name as fromUserName,
        u_from.avatarUrl as fromUserAvatar,
        u_to.name as toUserName,
        s.categorie as skillCategory,
        s.subCategorie as skillSubCategory,
        s.description as skillDescription
       FROM Notify n
       INNER JOIN ExchangeHistory eh ON n.exchangeId = eh.id
       INNER JOIN Users u_from ON eh.fromUserId = u_from.id
       INNER JOIN Users u_to ON eh.toUserId = u_to.id
       INNER JOIN Skills s ON eh.skillId = s.id
       WHERE eh.toUserId = ?
       ORDER BY n.date DESC`,
      [userId]
    );
    
    if (result.success) {
      const notifications: TNotifyHistoryItem[] = result.data.map((row: any) => ({
        id: row.id,
        skillId: row.skillId,
        fromUser: row.fromUserId,
        toUser: row.toUserId,
        notifyDate: new Date(row.notifyDate),
        status: row.status as ENotifyStatus,
        additionalInfo: {
          fromUserName: row.fromUserName,
          fromUserAvatar: row.fromUserAvatar,
          toUserName: row.toUserName,
          skillCategory: row.skillCategory,
          skillSubCategory: row.skillSubCategory,
          skillDescription: row.skillDescription,
          exchangeStatus: row.exchangeStatus,
          isInitiator: row.fromUserId === userId // Пользователь является инициатором обмена
        }
      }));
      console.log(notifications)
      res.json(notifications);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/notify/clear - очистить уведомления пользователя
notifyRoutes.post('/notify/clear', async (req, res) => {
  try {
    const { userIds } = req.body;
    
    const notificationIds = userIds;
    
    if (notificationIds.length === 0) {
      res.json({ 
        message: 'No notifications to clear',
        clearedCount: 0
      });
      return;
    }

    // УДАЛЯЕМ уведомления из таблицы
    const placeholders = notificationIds.map(() => '?').join(',');
    const deleteResult = await database.runQuery(
      `DELETE FROM Notify WHERE id IN (${placeholders})`,
      notificationIds
    );
    
    if (deleteResult.success) {
      res.json({ 
        message: 'Notifications cleared successfully',
        clearedCount: deleteResult.data.changes
      });
    } else {
      res.status(500).json({ error: deleteResult.error });
    }
  } catch (error) {
    console.error('Error clearing notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});