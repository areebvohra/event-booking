import React, { FC, useEffect } from 'react';
import 'react-native-gesture-handler';
import { ResultSet, SQLError, SQLiteDatabase, Transaction, openDatabase, } from 'react-native-sqlite-storage';

import Routes from './src/routes';

const db: any = openDatabase({
  name: 'bookings'
})

interface AppProps { }

const App: FC<AppProps> = () => {

  const createTable = () => {
    db.transaction((txn: Transaction) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50), email VARCHAR(50), tickets VARCHAR(2), eventId VARCHAR(10))`, [],
        () => {
          console.log('Table created successfully');
        },
        (transaction: Transaction, error: SQLError) => {
          console.log('error on creating table', error.message);
        }
      )
    })
  }

  useEffect(() => {
    createTable();
  }, [])


  return (
    <Routes />
  );
}

export default App;