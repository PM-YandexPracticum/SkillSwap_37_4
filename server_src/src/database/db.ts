import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import {initialUsers as initialUsersExport} from './mock/initialUsers'
import {initialSkills as initialSkillsExport} from './mock/initialSkills'
import {initialExchanges as initialExchangesExport} from './mock/initialExchanges'
export interface QueryResult {
  success: boolean;
  error?: string;
  data?: any;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

class Database {
  private db: sqlite3.Database | null = null; // Инициализируем как null
  private dbPath: string;

  constructor() {
    this.dbPath = path.join(__dirname, '..', '..', 'data', 'app.db');
    this.ensureDataDirectory();
  }

  // чек директории бд
  private ensureDataDirectory(): void {
    const dataDir = path.join(__dirname, '..', '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  // проверка подключения бд
  public isConnected(): boolean {
    return this.db !== null;
  }

  // инит бд
  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          console.error('Error opening database:', err.message);
          this.db = null;
          reject(err);
        } else {
          console.log('Connected to SQLite database:', this.dbPath);
          resolve();
        }
      });
    });
  }

  //инит
  public async initialize(): Promise<void> {
    try {
      if (!this.isConnected()) {
        throw new Error('Database not connected');
      }
      await this.createTables();
      await this.insertInitialData();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  // Создание таблицы пользователей
  private createTables(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      const sql = [`
        CREATE TABLE IF NOT EXISTS "Notify" (
          "id" TEXT NOT NULL UNIQUE,
          "exchangeId" TEXT,
          "date" DATETIME,
          "notifiedStatus" TEXT,
          PRIMARY KEY("id")
        );`,

        `CREATE TABLE IF NOT EXISTS "Users" (
          "id" TEXT NOT NULL UNIQUE,
          "name" TEXT,
          "email" TEXT,
          "password" TEXT,
          "avatarUrl" TEXT,
          "birthday" DATE,
          "description" TEXT,
          "city" TEXT,
          "gender" TEXT,
          "wantLearn" TEXT,
          PRIMARY KEY("id")
        );`,

        `CREATE TABLE IF NOT EXISTS "Skills" (
          "id" TEXT NOT NULL UNIQUE,
          "skillName" TEXT,
          "ownerId" TEXT,
          "categorie" TEXT,
          "subCategorie" TEXT,
          "createDate" DATETIME,
          "description" TEXT,
          "likes" TEXT,
          "requested" TEXT,
          "photoUrls" TEXT,
          PRIMARY KEY("id")
        );`,

        `CREATE TABLE IF NOT EXISTS "ExchangeHistory" (
          "id" TEXT NOT NULL UNIQUE,
          "fromUserId" TEXT,
          "toUserId" TEXT,
          "skillId" TEXT,
          "status" TEXT,
          PRIMARY KEY("id")
        );`]
        ;
    for (const sql_q of sql) {

      this.db.run(sql_q, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Table ready');
          resolve();
        }
      });
    }
    });
  }

  // инит данных
  private async insertInitialData(): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not connected');
      }


      console.log('Initializing database with sample data...');
  
      // Проверяем, есть ли уже данные в основных таблицах
      const userCount = await this.getCount('Users');
      const skillsCount = await this.getCount('Skills');
      const exchangeCount = await this.getCount('ExchangeHistory');
      const notifyCount = await this.getCount('Notify');
  
      if (userCount > 0 || skillsCount > 0 || exchangeCount > 0 || notifyCount > 0) {
        console.log('Database already contains data, skipping initialization.');
        return;
      }
  
      try {
        console.log('Inserting initial users...');
        const initialUsers = initialUsersExport;

      for (const user of initialUsers) {
        await this.runQuery(
          `INSERT INTO Users (id, name, email, password, avatarUrl, birthday, description, city, gender, wantLearn)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [user.id, user.name, user.email, user.password, user.avatarUrl, 
          user.birthday, user.description, user.city, user.gender, user.wantLearn]
        );
      }

      // 2. Инициализация навыков
      console.log('Inserting initial skills...');
      const initialSkills = initialSkillsExport;

      for (const skill of initialSkills) {
        await this.runQuery(
          `INSERT INTO Skills (id, skillName, ownerId, categorie, subCategorie, createDate, description, likes, requested, photoUrls)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [skill.id, skill.name, skill.ownerId, skill.categorie, skill.subCategorie, skill.createDate,
          skill.description, skill.likes, skill.requested, skill.photoUrls]
        );
      }

      // 3. Инициализация истории обменов
      console.log('Inserting exchange history...');
      const initialExchanges = initialExchangesExport;
      for (const exchange of initialExchanges) {
        await this.runQuery(
          `INSERT INTO ExchangeHistory (id, fromUserId, toUserId, skillId, status)
          VALUES (?, ?, ?, ?, ?)`,
          [exchange.id, exchange.fromUserId, exchange.toUserId, exchange.skillId, exchange.status]
        );
      }

      // 4. Инициализация уведомлений
      console.log('Inserting notifications...');
      const initialNotifications = [
        {
          id: 'notify_1',
          exchangeId: 'ex_2',
          date: '2024-01-20 10:30:00',
          notifiedStatus: 'sent'
        },
        {
          id: 'notify_2',
          exchangeId: 'ex_3',
          date: '2024-01-20 14:15:00',
          notifiedStatus: 'pending'
        },
        {
          id: 'notify_3',
          exchangeId: 'ex_5',
          date: '2024-01-21 09:45:00',
          notifiedStatus: 'read'
        },
        {
          id: 'notify_4',
          exchangeId: 'ex_1',
          date: '2024-01-19 16:20:00',
          notifiedStatus: 'sent'
        }
      ];

      for (const notify of initialNotifications) {
        await this.runQuery(
          `INSERT INTO Notify (id, exchangeId, date, notifiedStatus)
          VALUES (?, ?, ?, ?)`,
          [notify.id, notify.exchangeId, notify.date, notify.notifiedStatus]
        );
      }
      console.log('Database initialization completed successfully!');
      
    } catch (error) {
      console.error('Error during database initialization:', error);
      throw error;
    }
  } catch (error) {
      console.error('Error during database initialization:', error);
      throw error;
    }
};

private getCount(tableName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    if (!this.db) {
      reject(new Error('Database not connected'));
      return;
    }

    this.db.get(`SELECT COUNT(*) as count FROM ${tableName}`, (err, row: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count);
      }
    });
  });
}

  public runQuery(sql: string, params: any[] = []): Promise<QueryResult> {
    return new Promise((resolve) => {
      if (!this.db) {
        resolve({
          success: false,
          error: 'Database not connected'
        });
        return;
      }

      this.db.run(sql, params, function(err) {
        if (err) {
          resolve({
            success: false,
            error: err.message
          });
        } else {
          resolve({
            success: true,
            data: { lastID: this.lastID, changes: this.changes }
          });
        }
      });
    });
  }

  public getQuery<T>(sql: string, params: any[] = []): Promise<QueryResult> {
    return new Promise((resolve) => {
      if (!this.db) {
        resolve({
          success: false,
          error: 'Database not connected'
        });
        return;
      }

      this.db.get(sql, params, (err, row: T) => {
        if (err) {
          resolve({
            success: false,
            error: err.message
          });
        } else {
          resolve({
            success: true,
            data: row
          });
        }
      });
    });
  }

  // Получение всех записей
  public getAllQuery<T>(sql: string, params: any[] = []): Promise<QueryResult> {
    return new Promise((resolve) => {
      if (!this.db) {
        resolve({
          success: false,
          error: 'Database not connected'
        });
        return;
      }

      this.db.all(sql, params, (err, rows: T[]) => {
        if (err) {
          resolve({
            success: false,
            error: err.message
          });
        } else {
          resolve({
            success: true,
            data: rows
          });
        }
      });
    });
  }

  // Закрытие соединения
  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve();
        return;
      }

      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Database connection closed');
          this.db = null;
          resolve();
        }
      });
    });
  }

  // Получение экземпляра базы данных
  public getDatabase(): sqlite3.Database | null {
    return this.db;
  }
}

// Создаем и экспортируем экземпляр базы данных
export const database = new Database();

/*
[
        {
          id: '1',
          name: 'Иван Петров',
          email: 'ivan@example.com',
          password: 'hashed_password_123',
          avatarUrl: 'https://example.com/avatars/ivan.jpg',
          birthday: '1990-05-15',
          description: 'Люблю программирование и путешествия',
          city: 'Москва',
          gender: 'male',
          wantLearn: 'JavaScript, React, Node.js'
        },
        {
          id: '2',
          name: 'Мария Сидорова',
          email: 'maria@example.com',
          password: 'hashed_password_456',
          avatarUrl: 'https://example.com/avatars/maria.jpg',
          birthday: '1992-08-20',
          description: 'Фотограф и художник',
          city: 'Санкт-Петербург',
          gender: 'female',
          wantLearn: 'Photoshop, Figma, UI/UX design'
        },
        {
          id: '3',
          name: 'Алексей Иванов',
          email: 'alex@example.com',
          password: 'hashed_password_789',
          avatarUrl: null,
          birthday: '1988-12-10',
          description: 'Преподаватель английского языка',
          city: 'Казань',
          gender: 'male',
          wantLearn: 'Business English, TOEFL preparation'
        },
        {
          id: '4',
          name: 'Екатерина Волкова',
          email: 'ekaterina@example.com',
          password: 'hashed_password_101',
          avatarUrl: 'https://example.com/avatars/ekaterina.jpg',
          birthday: '1995-03-25',
          description: 'Дизайнер интерфейсов',
          city: 'Новосибирск',
          gender: 'female',
          wantLearn: 'Illustrator, After Effects'
        }
      ];

      [
        {
          id: 'skill_1',
          name: 'skill_1',
          ownerId: '1', // Иван Петров
          categorie: 'Программирование',
          subCategorie: 'JavaScript',
          createDate: '2024-01-15 10:00:00',
          description: 'Обучаю основам JavaScript, современному синтаксису ES6+',
          likes: '2,3', // Мария и Алексей лайкнули
          requested: '2', // Мария запросила обмен
          photoUrls: 'https://example.com/skills/js1.jpg,https://example.com/skills/js2.jpg'
        },
        {
          id: 'skill_2',
          name: 'skill_2',
          ownerId: '2', // Мария Сидорова
          categorie: 'Дизайн',
          subCategorie: 'Photoshop',
          createDate: '2024-01-16 14:30:00',
          description: 'Уроки по Photoshop: ретушь, коллажи, работа со слоями',
          likes: '1,3', // Иван и Алексей лайкнули
          requested: '1,3', // Иван и Алексей запросили обмен
          photoUrls: 'https://example.com/skills/ps1.jpg'
        },
        {
          id: 'skill_3',
          name: 'skill_3',
          ownerId: '3', // Алексей Иванов
          categorie: 'Языки',
          subCategorie: 'Английский',
          createDate: '2024-01-17 09:15:00',
          description: 'Индивидуальные занятия английским для IT-специалистов',
          likes: '1,2', // Иван и Мария лайкнули
          requested: '1', // Иван запросил обмен
          photoUrls: null
        },
        {
          id: 'skill_4',
          name: 'skill_4',
          ownerId: '1', // Иван Петров
          categorie: 'Программирование',
          subCategorie: 'React',
          createDate: '2024-01-18 16:45:00',
          description: 'React разработка: компоненты, хуки, состояние',
          likes: '2,4', // Мария и Екатерина лайкнули
          requested: '4', // Екатерина запросила обмен
          photoUrls: 'https://example.com/skills/react1.jpg'
        },
        {
          id: 'skill_5',
          name: 'skill_5',
          ownerId: '4', // Екатерина Волкова
          categorie: 'Дизайн',
          subCategorie: 'Figma',
          createDate: '2024-01-19 11:20:00',
          description: 'Создание дизайн-систем и прототипов в Figma',
          likes: '1,2,3', // Все лайкнули
          requested: '1,2', // Иван и Мария запросили обмен
          photoUrls: 'https://example.com/skills/figma1.jpg,https://example.com/skills/figma2.jpg'
        }
      ];

      [
        {
          id: 'exchange_1',
          fromUserId: '1', // Иван
          toUserId: '2',   // Мария
          skillId: 'skill_1', // JavaScript
          status: 'completed'
        },
        {
          id: 'exchange_2',
          fromUserId: '2', // Мария
          toUserId: '3',   // Алексей
          skillId: 'skill_2', // Photoshop
          status: 'in_progress'
        },
        {
          id: 'exchange_3',
          fromUserId: '3', // Алексей
          toUserId: '1',   // Иван
          skillId: 'skill_3', // Английский
          status: 'pending'
        },
        {
          id: 'exchange_4',
          fromUserId: '4', // Екатерина
          toUserId: '1',   // Иван
          skillId: 'skill_5', // Figma
          status: 'completed'
        },
        {
          id: 'exchange_5',
          fromUserId: '1', // Иван
          toUserId: '4',   // Екатерина
          skillId: 'skill_4', // React
          status: 'in_progress'
        }
      ];

*/