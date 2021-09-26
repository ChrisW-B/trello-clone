import React, { useContext } from 'react';
import { v4 } from 'uuid';

import Card from '../components/molecules/Card';
import { ColumnType } from '../datamodel';

type CardAction =
  | { type: 'ADD_CARD'; payload: { title: string; cardId: string; column: ColumnType } }
  | { type: 'MOVE_CARD'; payload: { cardId: string; index: number; column: ColumnType } };

const cardReducer = (
  state: Record<ColumnType, React.ComponentProps<typeof Card>[]>,
  action: CardAction,
) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        ...state,
        [action.payload.column]: [
          ...state[action.payload.column],
          { cardId: action.payload.cardId, title: action.payload.title },
        ],
      };
    case 'MOVE_CARD': {
      const removedCard = Object.values(state)
        .flat()
        .find((card) => card.cardId === action.payload.cardId);
      const stateRemovedCard = {
        [ColumnType.ToDo]: state[ColumnType.ToDo].filter(
          (card) => card.cardId !== action.payload.cardId,
        ),
        [ColumnType.InProgress]: state[ColumnType.InProgress].filter(
          (card) => card.cardId !== action.payload.cardId,
        ),
        [ColumnType.QA]: state[ColumnType.QA].filter(
          (card) => card.cardId !== action.payload.cardId,
        ),
        [ColumnType.Done]: state[ColumnType.Done].filter(
          (card) => card.cardId !== action.payload.cardId,
        ),
      };
      return {
        ...stateRemovedCard,
        [action.payload.column]: [
          ...stateRemovedCard[action.payload.column].slice(0, action.payload.index),
          removedCard,
          ...stateRemovedCard[action.payload.column].slice(action.payload.index),
        ],
      };
    }
  }
};

const CardContext = React.createContext<
  [
    Record<ColumnType, React.ComponentProps<typeof Card>[]>,
    (title: string, column: ColumnType) => void,
    (cardId: string, column: ColumnType, index: number) => void,
  ]
>([
  {
    [ColumnType.ToDo]: [],
    [ColumnType.InProgress]: [],
    [ColumnType.QA]: [],
    [ColumnType.Done]: [],
  },
  () => {
    throw new Error('CardContext must be a child of CardProvider.');
  },
  () => {
    throw new Error('CardContext must be a child of CardProvider.');
  },
]);

export const CardProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<Record<ColumnType, React.ComponentProps<typeof Card>[]>, CardAction>
  >(cardReducer, {
    [ColumnType.ToDo]: [],
    [ColumnType.InProgress]: [],
    [ColumnType.QA]: [],
    [ColumnType.Done]: [],
  });

  const createCard = (title: string, column: ColumnType) => {
    dispatch({ type: 'ADD_CARD', payload: { title, column, cardId: v4() } });
  };
  const moveCard = (cardId: string, column: ColumnType, index: number) => {
    dispatch({ type: 'MOVE_CARD', payload: { cardId, column, index } });
  };
  return (
    <CardContext.Provider value={[state, createCard, moveCard]}>{children}</CardContext.Provider>
  );
};

export const useColumnCards = (column: ColumnType): React.ComponentProps<typeof Card>[] => {
  const [contextData] = useContext(CardContext);
  const [data, setData] = React.useState<React.ComponentProps<typeof Card>[]>(contextData[column]);

  React.useEffect(() => {
    setData(contextData[column]);
  }, [contextData[column]]);
  return data;
};

export const useAddCard = (column: ColumnType): ((title: string) => void) => {
  const [, addCard] = useContext(CardContext);
  return (title: string) => addCard(title, column);
};

export const useMoveCard = (column: ColumnType): ((cardId: string, index: number) => void) => {
  const [, , moveCard] = useContext(CardContext);
  return (cardId: string, index: number) => moveCard(cardId, column, index);
};
