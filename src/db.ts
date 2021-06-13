import * as SQLite from 'expo-sqlite';
import { SQLStatementErrorCallback } from 'expo-sqlite';
import { IPost } from './interfaces';

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
            return result.rows._array as IPost[];
          },
          (_, err) => {
            reject(err);
            return true;
          }
        );
      })
    });
  }
}