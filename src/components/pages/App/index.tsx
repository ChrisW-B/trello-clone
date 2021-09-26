import './App.css';

import React from 'react';

import { CardProvider } from '../../../contexts/cardContext';
import { ColumnType } from '../../../datamodel';
import Column from '../../organisms/Column';

const App: React.FC = () => {
  return (
    <CardProvider>
      <div className='app'>
        <Column type={ColumnType.ToDo} />
        <Column type={ColumnType.InProgress} />
        <Column type={ColumnType.QA} />
        <Column type={ColumnType.Done} />
      </div>
    </CardProvider>
  );
};

export default App;
