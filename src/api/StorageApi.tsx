import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

// c l a s s   S t o r a g e A p i
// -------------------------------
class StorageApi {
  constructor() {
    this.createSqlitePicturesTable();
    // this.dropSqlitePicturesTable();
    // this.deleteAll();
  }

  createSqlitePicturesTable = async () => {
    return await new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) =>
          tx.executeSql(
            'create table if not exists pictures (id integer primary key not null, base64imageOrUri text);',
            [],
            (result) => resolve(result),
            this.SQLTransactionErrorCallback,
          ),
        (error: SQLite.SQLError) => reject(error),
        () =>
          console.log(
            'StorageApi/createSqlitePicturesTable: success transaction',
          ),
      );
    });
  };

  dropSqlitePicturesTable = async () => {
    return await new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) =>
          tx.executeSql(
            'drop table pictures;',
            [],
            (result) => resolve(result),
            this.SQLTransactionErrorCallback,
          ),
        (error: SQLite.SQLError) => reject(error),
        () =>
          console.log(
            'StorageApi/dropSqlitePicturesTable: success transaction',
          ),
      );
    });
  };

  deleteAll = async () => {
    console.log(
      'StorageApi/deleteAll -----------------------------> A SUPPRIMER < ------------------------------------------',
    );
    return await new Promise((reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => this._deleteAllSqlite(tx),
        (error: SQLite.SQLError) => reject(error),
        undefined,
      );
    });
  };

  add = async (base64imageOrUri: string) => {
    // console.log('StorageApi/add')
    return await new Promise((resolve, reject) => {
      db.transaction(
        (tx) => this._addSqliteItem(tx, base64imageOrUri),
        (error: SQLite.SQLError) => reject(error),
        undefined,
      );
      db.transaction(
        (tx: SQLite.SQLTransaction) => this._fetchAllSqlite(tx, resolve),
        (error: SQLite.SQLError) => reject(error),
        undefined,
      );
    });
  };

  fetchAll = async () => {
    return await new Promise((resolve, reject) => {
      db.transaction(
        (tx: SQLite.SQLTransaction) => this._fetchAllSqlite(tx, resolve),
        (error: SQLite.SQLError) => reject(error),
        undefined,
      );
    });
  };

  remove = async (id: number) => {
    return await new Promise((resolve, reject) => {
      db.transaction(
        (tx) => this._removeSqlite(tx, id),
        (error: SQLite.SQLError) => reject(error),
        undefined,
      );
      db.transaction(
        (tx: SQLite.SQLTransaction) => this._fetchAllSqlite(tx, resolve),
        (error: SQLite.SQLError) => reject(error),
        undefined,
      );
    });
  };

  _addSqliteItem = async (
    tx: SQLite.SQLTransaction,
    base64imageOrUri: string,
  ) => {
    // console.log('StorageApi/_addSqliteItem: base64imageOrUri=', base64imageOrUri);
    tx.executeSql(
      'insert into pictures (base64imageOrUri) values (?)',
      [base64imageOrUri],
      undefined,
      this.SQLTransactionErrorCallback,
    );
  };

  _fetchAllSqlite = async (
    tx: SQLite.SQLTransaction,
    resolve: (arg0: any) => void,
  ) => {
    tx.executeSql(
      'select * from pictures',
      [],
      (_: any, resultSet: any) => resolve(resultSet),
      this.SQLTransactionErrorCallback,
    );
  };

  _removeSqlite = async (tx: SQLite.SQLTransaction, id: number) => {
    tx.executeSql(
      'delete from pictures where id = ?',
      [id],
      undefined,
      this.SQLTransactionErrorCallback,
    );
  };

  _deleteAllSqlite = async (tx: SQLite.SQLTransaction) => {
    tx.executeSql(
      'delete from pictures',
      [],
      undefined,
      this.SQLTransactionErrorCallback,
    );
  };

  SQLTransactionErrorCallback = (
    tx: SQLite.SQLTransaction,
    error: SQLite.SQLError,
  ): boolean => {
    throw {tx: tx, error: error};
  };
}

export const STORAGE_API = new StorageApi();
