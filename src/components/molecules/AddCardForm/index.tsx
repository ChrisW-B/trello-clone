import './AddCardForm.css';

import React, { ReactElement } from 'react';

import { useAddCard } from '../../../contexts/cardContext';
import { ColumnType } from '../../../datamodel';

type OwnProps = {
  type: ColumnType;
  onClose(): void;
};

const AddCardForm = ({ type, onClose }: OwnProps): ReactElement<OwnProps> => {
  const [newCardTitle, setNewCardTitle] = React.useState('');
  const addCard = useAddCard(type);

  const handleNewCardSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCardTitle) {
      addCard(newCardTitle);
      setNewCardTitle('');
      onClose();
    }
  };

  const handleUpdateNewCardTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardTitle(e.target.value ?? '');
  };

  const handleCancelCardCreate = () => {
    setNewCardTitle('');
    onClose();
  };

  return (
    <form onSubmit={handleNewCardSubmit}>
      <textarea
        autoFocus
        className='addCard-input'
        onChange={handleUpdateNewCardTitle}
        required
        rows={3}
        placeholder='Enter a title for this card...'
      ></textarea>
      <button className='addCard-confirm' type='submit'>
        Add card
      </button>
      <button
        className='addCard-cancel'
        type='button'
        onClick={handleCancelCardCreate}
        aria-label='Close'
      >
        ×
      </button>
    </form>
  );
};

export default AddCardForm;
