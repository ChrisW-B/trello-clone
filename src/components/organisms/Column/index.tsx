import './Column.css';

import { ReactElement } from 'react';
import React from 'react';

import { useAddCard, useColumnCards, useMoveCard } from '../../../contexts/cardContext';
import { ColumnType } from '../../../datamodel';
import Card from '../../molecules/Card';

type OwnProps = {
  type: ColumnType;
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

const Column = ({ type }: OwnProps): ReactElement<OwnProps> => {
  const [showAddCard, setShowAddCard] = React.useState(false);
  const [newCardTitle, setNewCardTitle] = React.useState('');

  const cards = useColumnCards(type);
  const addCard = useAddCard(type);
  const moveCard = useMoveCard(type);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, i?: number) => {
    e.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const id = e.dataTransfer.getData('text/plain');
    console.log(i);
    moveCard(id, i ?? cards.length);
    document.querySelectorAll('.drag-over').forEach((ele) => ele.classList.remove('drag-over'));
    e.stopPropagation();
  };

  const handleNewCardSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCard(newCardTitle);
    setNewCardTitle('');
    setShowAddCard(false);
  };

  const handleUpdateNewCardTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardTitle(e.target.value ?? '');
  };

  const handleCancelCardCreate = () => {
    setNewCardTitle('');
    setShowAddCard(false);
  };

  return (
    <div className='column'>
      <h2 className='column-title'>{type}</h2>
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
          <form onSubmit={handleNewCardSubmit}>
            <textarea onChange={handleUpdateNewCardTitle} required rows={3}></textarea>
            <button type='submit'>Add Card</button>
            <button type='button' onClick={handleCancelCardCreate}>
              X
            </button>
          </form>
        ) : null}
      </div>

      {!showAddCard ? (
        <button type='button' onClick={() => setShowAddCard(true)}>
          + Add Another Card
        </button>
      ) : null}
    </div>
  );
};

export default Column;
