import './Column.css';

import { ReactElement } from 'react';
import React from 'react';

import { useColumnCards, useMoveCard } from '../../../contexts/cardContext';
import { ColumnType } from '../../../datamodel';
import AddCardForm from '../../molecules/AddCardForm';
import Card from '../../molecules/Card';

type OwnProps = {
  columnType: ColumnType;
};

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();

  // prevent event from bubbling and showing multiple drop suggestion outlines
  e.stopPropagation();
  document.querySelectorAll('.drag-over').forEach((ele) => ele.classList.remove('drag-over'));
  e.currentTarget.classList.add('drag-over');

  e.dataTransfer.dropEffect = 'move';
};

const handleDragExit = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
};

const Column = ({ columnType }: OwnProps): ReactElement<OwnProps> => {
  const [showAddCard, setShowAddCard] = React.useState(false);

  const cards = useColumnCards(columnType);

  const moveCard = useMoveCard(columnType);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, i?: number) => {
    e.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const id = e.dataTransfer.getData('text/plain');
    console.log(i);
    moveCard(id, i ?? cards.length);
    document.querySelectorAll('.drag-over').forEach((ele) => ele.classList.remove('drag-over'));
    e.stopPropagation();
  };

  return (
    <div className='column'>
      <h2 className='column-title'>{columnType}</h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={(e) => e.preventDefault()}
        onDragLeave={handleDragExit}
        className='column-card-list'
      >
        {cards.map((card, i) => (
          <Card
            {...card}
            onDrop={(e) => handleDrop(e, i)}
            onDragOver={handleDragOver}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={handleDragExit}
            key={card.cardId}
          />
        ))}
        {showAddCard ? (
          <AddCardForm type={columnType} onClose={() => setShowAddCard(false)} />
        ) : null}
      </div>

      {!showAddCard ? (
        <button className='column-addCard' type='button' onClick={() => setShowAddCard(true)}>
          + Add Another Card
        </button>
      ) : null}
    </div>
  );
};

export default Column;
