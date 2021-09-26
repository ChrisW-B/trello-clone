import './App.css';

import React from 'react';

import { CardProvider } from '../../../contexts/cardContext';
import { ColumnType } from '../../../datamodel';
import Column from '../../organisms/Column';

const App: React.FC = () => {
  return (
    <CardProvider>
      <div className='app'>
        <Column columnType={ColumnType.ToDo} />
        <Column columnType={ColumnType.InProgress} />
        <Column columnType={ColumnType.QA} />
        <Column columnType={ColumnType.Done} />
      </div>
    </CardProvider>
  );
};

export default App;
