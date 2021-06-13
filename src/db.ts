import * as SQLite from 'expo-sqlite';
import { SQLStatementErrorCallback } from 'expo-sqlite';
import { IPost, IPostData } from './interfaces';

const db = SQLite.openDatabase('post.db');

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY NOT NULL,
          text TEXT NOT NULL,
          img TEXT NOT NULL,
          date TEXT NOUT NULL,
          booked BOOLEAN)`,
          [],
          resolve,
          (_, err) => {
            reject(err);
            return true;
          }
        );
      });
    });
  }

  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM posts',
          [],
          (_, result) => {
            resolve((result.rows as any)._array as IPost[])
          },
          (_, err) => {
            reject(err);
            return true;
          }
        );
      })
    });
  }

  static createPost({text, date, booked, img} : IPostData) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)',
          [text, date, booked, img],
          (_, result) => {
            resolve(result.insertId);
          },
          (_, err) => {
            reject(err);
            return true;
          }
        );
      })
    });
  }

  static updatePost(id: string, booked: boolean) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE posts SET booked = ? WHERE id = ?',
          [!booked, id],
          resolve,
          (_, err) => {
            reject(err);
            return true;
          }
        );
      })
    });
  }

  static removePost(id: string) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM posts WHERE id = ?',
          [id],
          resolve,
          (_, err) => {
            reject(err);
            return true;
          }
        );
      })
    });
  }
}