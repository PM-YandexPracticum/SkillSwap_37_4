
import { Router } from 'express';
import { database } from '../database/db';
import { CreateUserRequest, LoginRequest, LoginResponse, UpdateUserRequest, User } from '../types/user';

export const userRoutes = Router();

// POST /api/users/login - аутентификация пользователя
userRoutes.post('/login', async (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;
    
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Ищем пользователя по email и проверяем пароль
    const result = await database.getQuery<any>(
      `SELECT id, name, email, password, avatarUrl, birthday, description, city, gender, wantLearn 
       FROM Users WHERE email = ? AND password = ?`,
      [email, password]
    );
    
    if (result.success) {
      if (result.data) {
        // Создаем объект пользователя без пароля
        const user: User = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          avatarUrl: result.data.avatarUrl,
          birthday: result.data.birthday,
          description: result.data.description,
          city: result.data.city,
          gender: result.data.gender,
          wantLearn: result.data.wantLearn
        };
        
        const response: LoginResponse = {
          user,
          message: 'Login successful'
        };
        
        res.json(response);
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users - получить всех пользователей

userRoutes.get('/', async (req, res) => {
  try {
    const result = await database.getAllQuery<any>(
      `SELECT id, name, email, avatarUrl, birthday, description, city, gender, wantLearn 
       FROM Users`
    );
    
    if (result.success) {
      res.json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/:id - получить пользователя по ID
userRoutes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await database.getQuery<any>(
      `SELECT id, name, email, avatarUrl, birthday, description, city, gender, wantLearn 
       FROM Users WHERE id = ?`,
      [id]
    );
    
    if (result.success) {
      if (result.data) {
        res.json(result.data);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/users - создать нового пользователя
userRoutes.post('/', async (req, res) => {
  try {
    const userData: CreateUserRequest = req.body;
    
    if (!userData.id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const result = await database.runQuery(
      `INSERT INTO Users (id, name, email, password, avatarUrl, birthday, description, city, gender, wantLearn)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.id,
        userData.name || null,
        userData.email || null,
        userData.password || null,
        userData.avatarUrl || null,
        userData.birthday || null,
        userData.description || null,
        userData.city || null,
        userData.gender || null,
        userData.wantLearn || null
      ]
    );
    
    if (result.success) {
      // Получаем созданного пользователя без пароля
      const userResult = await database.getQuery<any>(
        `SELECT id, name, email, avatarUrl, birthday, description, city, gender, wantLearn 
         FROM Users WHERE id = ?`,
        [userData.id]
      );
      
      res.status(201).json({
        ...userResult.data,
        message: 'User created successfully'
      });
    } else {
      if (result.error?.includes('UNIQUE constraint failed')) {
        res.status(409).json({ error: 'User with this ID already exists' });
      } else {
        res.status(500).json({ error: result.error });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/users/:id - обновить пользователя
userRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userData: UpdateUserRequest = req.body;
    
    const result = await database.runQuery(
      `UPDATE Users 
       SET name = ?, email = ?, avatarUrl = ?, birthday = ?, description = ?, 
           city = ?, gender = ?, wantLearn = ?, updatedAt = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [
        userData.name || null,
        userData.email || null,
        userData.avatarUrl || null,
        userData.birthday || null,
        userData.description || null,
        userData.city || null,
        userData.gender || null,
        userData.wantLearn || null,
        id
      ]
    );
    
    if (result.success) {
      if (result.data.changes > 0) {
        // Получаем обновленного пользователя
        const userResult = await database.getQuery<any>(
          `SELECT id, name, email, avatarUrl, birthday, description, city, gender, wantLearn 
           FROM Users WHERE id = ?`,
          [id]
        );
        
        res.json({
          ...userResult.data,
          message: 'User updated successfully'
        });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/users/:id - удалить пользователя
userRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await database.runQuery(
      'DELETE FROM Users WHERE id = ?',
      [id]
    );
    
    if (result.success) {
      if (result.data.changes > 0) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});