import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

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
          PRIMARY KEY("id"),
          FOREIGN KEY ("exchangeId") REFERENCES "ExchangeHistory"("id")
          ON UPDATE NO ACTION ON DELETE NO ACTION
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
          "ownerId" TEXT,
          "categorie" TEXT,
          "subCategorie" TEXT,
          "createDate" DATETIME,
          "description" TEXT,
          "likes" TEXT,
          "requested" TEXT,
          "photoUrls" TEXT,
          PRIMARY KEY("id"),
          FOREIGN KEY ("ownerId") REFERENCES "Users"("id")
          ON UPDATE NO ACTION ON DELETE NO ACTION
        );`,

        `CREATE TABLE IF NOT EXISTS "ExchangeHistory" (
          "id" TEXT NOT NULL UNIQUE,
          "fromUserId" TEXT,
          "toUserId" TEXT,
          "skillId" TEXT,
          "status" TEXT,
          PRIMARY KEY("id"),
          FOREIGN KEY ("fromUserId") REFERENCES "Users"("id")
          ON UPDATE NO ACTION ON DELETE NO ACTION,
          FOREIGN KEY ("skillId") REFERENCES "Skills"("id")
          ON UPDATE NO ACTION ON DELETE NO ACTION,
          FOREIGN KEY ("toUserId") REFERENCES "Users"("id")
          ON UPDATE NO ACTION ON DELETE NO ACTION
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

      // Проверяем нужен ли инит пользовтелей
      // Нужны еще базовые иниты остальных таблиц
      const userCount = await this.getUserCount();

      if (userCount === 0) {
        console.log('Users inserting initial data...');
        const initialUsers = [
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
          }
        ];

        for (const user of initialUsers) {
          await this.runQuery(
            `INSERT INTO Users (id, name, email, password, avatarUrl, birthday, description, city, gender, wantLearn)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user.id, user.name, user.email, user.password, user.avatarUrl, 
             user.birthday, user.description, user.city, user.gender, user.wantLearn]
          );
        }
        
        console.log('Users initial data inserted successfully');
      }
    } catch (error) {
      console.error('Error inserting initial data:', error);
    }
  }

  private getUserCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      this.db.get('SELECT COUNT(*) as count FROM Users', (err, row: any) => {
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