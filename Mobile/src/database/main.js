import React, { useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

/**
 * 
 * A função DatabaseHandler inicializa um banco de dados SQLite, cria tabelas e insere dados.
 */
const DatabaseHandler = () => {
  useEffect(() => {
    const db = SQLite.openDatabase(
      {
        name: 'greendata.db',
        location: '.',
      },
      () => {
        console.log('Database opened');
      },
      error => {
        console.log('Error: ', error);
      }
    );

    db.transaction(tx => {
      
      /**
       * Cria tabelas
       */
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)',
        [],
        () => {
          console.log('Table created successfully');
        },
        error => {
          console.log('Error: ', error);
        }
      );

      /**
       * Insere dados
       */
      tx.executeSql(
        'INSERT INTO Users (name, password) VALUES (?, ?)',
        ['teste', 'teste'],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Data inserted successfully');
          }
        },
        error => {
          console.log('Error: ', error);
        }
      );

      // Consultar dados
      tx.executeSql(
        'SELECT * FROM Users',
        [],
        (tx, results) => {
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            console.log(`ID: ${item.id}, Name: ${item.name}, Age: ${item.age}`);
          }
        },
        error => {
          console.log('Error: ', error);
        }
      );
    });
  }, []);

  return (
    <></>
  );
};

export default DatabaseHandler;
