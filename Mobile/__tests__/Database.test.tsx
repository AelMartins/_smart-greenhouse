import 'react-native';
import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import DatabaseHandler from '../src/database/main';
import { it, expect } from '@jest/globals';
import renderer, { act, create } from 'react-test-renderer';

it('deve exibir o log "Database opened" quando for aberto com sucesso', async () => {
  const logSpy = jest.spyOn(console, 'log');
  
  SQLite.openDatabase = jest.fn().mockImplementation((config, success, error) => {
    success();
    return { transaction: jest.fn() };
  });
  
  await act(async () => {
    create(<DatabaseHandler />);
  });
  
  expect(logSpy).toHaveBeenCalledWith('Database opened');
  
  logSpy.mockRestore();
});

it('deve criar a tabela Users corretamente', async () => {
  const executeSqlMock = jest.fn();
  const transactionMock = jest.fn(callback => callback({ executeSql: executeSqlMock }));
  const openDatabaseMock = jest.fn().mockImplementation((config, success, error) => {
    success();
    return { transaction: transactionMock };
  });
  SQLite.openDatabase = openDatabaseMock;
  
  const component = renderer.create(<DatabaseHandler />);
  
  await act(async () => {});
  expect(openDatabaseMock).toHaveBeenCalled();
  expect(transactionMock).toHaveBeenCalled();
  
  expect(executeSqlMock).toHaveBeenCalledWith(
    'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)',
    [],
    expect.any(Function),
    expect.any(Function)
  );
});
