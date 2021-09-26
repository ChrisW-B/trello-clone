import './Card.css';

import React, { ReactElement } from 'react';

type OwnProps = {
  title: string;
  cardId: string;
} & React.ComponentProps<'div'>;

const Card = ({ title, cardId, ...rest }: OwnProps): ReactElement<OwnProps> => {
  return (
    <div
      className='card'
      draggable='true'
      onDragEnter={(e) => e.preventDefault()}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', cardId);
        e.dataTransfer.effectAllowed = 'move';
      }}
      {...rest}
    >
      <p className='card-title'>{title}</p>
    </div>
  );
};

export default Card;
