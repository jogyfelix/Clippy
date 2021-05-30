import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('clippy.db', '1.0', '', 1);

export const addCollection = name => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists Collections (id integer primary key not null, Name text);',
        [],
      );
      tx.executeSql(
        'insert into Collections (Name) values (?)',
        [name],
        () => {
          resolve('Saved');
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const getCollections = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM Collections',
        [],
        (tx, res) => {
          resolve(res.rows._array);
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const deleteCollection = (id, name) => {
  console.log(id, name);
  const promise = new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'DELETE FROM Collections WHERE id=? and Name=?',
        [id, name],
        (tx, res) => {
          resolve('Deleted');
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};
