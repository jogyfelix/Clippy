import SQLite from 'react-native-sqlite-2';
import {getLinkPreview} from 'link-preview-js';

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

export const addClip = async (url, collectionName, id) => {
  const result = await getLinkPreview(url);
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists Clips (id integer primary key not null, Url text,Read boolean,Title text,SiteName text,ThumbIcon text,CollectionName text,CollectionId integer);',
        [],
      );
      tx.executeSql(
        'insert into Clips (Url,Read,Title,SiteName,ThumbIcon,CollectionName,CollectionId) values (?,?,?,?,?,?,?)',
        [
          url,
          false,
          result.title,
          result.siteName,
          result.favicons[0],
          collectionName,
          id,
        ],
        () => {
          resolve('Saved');
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const getClips = collectionName => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM Clips where CollectionName = ?',
        [collectionName],
        (tx, res) => {
          resolve(res.rows._array);
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const changeClipRead = (url, id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'update Clips set Read = CASE WHEN Read = 0 THEN 1 ELSE 0 END where Url = ? AND Id=?',
        [url, id],
        (tx, res) => {
          resolve('Updated');
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const updateClip = async (url, collectionName, id, collectionId) => {
  const result = await getLinkPreview(url);
  const promise = new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'update Clips set Url=?,CollectionName=?,Title=?,SiteName=?,ThumbIcon=?,CollectionId=? where id=?',
        [
          url,
          collectionName,
          result.title,
          result.siteName,
          result.favicons[0],
          collectionId,
          id,
        ],
        (tx, res) => {
          resolve('Updated');
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const updateCollection = (newName, collectionName, collectionId) => {
  console.log(newName, collectionName, collectionId);
  const promise = new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql('update Collections set Name=? where id=?', [
        newName,
        collectionId,
      ]);
      txn.executeSql(
        'update Clips set CollectionName=? where CollectionId=?',
        [newName, collectionId],
        (tx, res) => {
          resolve('Updated');
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

export const getCollectionsHome = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT CS.Id,CS.Name,CL.Title FROM Collections CS LEFT JOIN Clips CL ON CS.Name=CL.CollectionName AND CS.Id=CL.CollectionId',
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
  const promise = new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql('DELETE FROM Clips WHERE CollectionName=?', [name]);
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

export const deleteClip = (collectionName, url, id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        'DELETE FROM Clips WHERE CollectionName=? AND Url=? AND Id=?',
        [collectionName, url, id],
        (tx, res) => {
          resolve('Deleted');
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};
