import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useColumnCards } from '../../../contexts/cardContext';
import { ColumnType } from '../../../datamodel';
import Column from '../Column';

jest.mock('../../../contexts/cardContext', () => ({
  useColumnCards: jest.fn().mockReturnValue([]),
  useMoveCard: jest.fn().mockReturnValue(() => {
    return;
  }),
  useAddCard: jest.fn().mockReturnValue(() => {
    return;
  }),
}));

describe('card column tests', () => {
  it('should render a list of cards', () => {
    (useColumnCards as jest.Mock).mockReturnValue([
      { title: 'Card1', cardId: '1' },
      { title: 'Card2', cardId: '2' },
    ]);
    render(<Column columnType={ColumnType.ToDo} />);
    expect(screen.getByRole('heading', { name: 'To Do' })).toBeInTheDocument();
    expect(screen.getByText('Card1')).toBeInTheDocument();
    expect(screen.getByText('Card2')).toBeInTheDocument();
  });

  it('should display the add card form when add card is clicked', () => {
    (useColumnCards as jest.Mock).mockReturnValue([
      { title: 'Card1', cardId: '1' },
      { title: 'Card2', cardId: '2' },
    ]);
    render(<Column columnType={ColumnType.ToDo} />);
    const addCardBtn = screen.getByRole('button', { name: '+ Add Another Card' });
    userEvent.click(addCardBtn);
    expect(screen.getByRole('button', { name: 'Add card' })).toBeInTheDocument();
  });
});
