import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAddCard } from '../../../contexts/cardContext';
import { ColumnType } from '../../../datamodel';
import AddCardForm from '../AddCardForm';

jest.mock('../../../contexts/cardContext', () => ({
  useAddCard: jest.fn().mockReturnValue(() => {
    return;
  }),
}));

describe('AddCardForm tests', () => {
  it('should correctly render an add card form', () => {
    const closeFn = jest.fn();
    render(<AddCardForm type={ColumnType.ToDo} onClose={closeFn} />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Enter a title for this card...',
    );
    expect(screen.getByRole('button', { name: 'Add card' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should call close when canceled', () => {
    const closeFn = jest.fn();
    render(<AddCardForm type={ColumnType.ToDo} onClose={closeFn} />);
    userEvent;
    const closeBtn = screen.getByRole('button', { name: 'Close' });
    userEvent.click(closeBtn);
    expect(closeFn).toHaveBeenCalledTimes(1);
  });

  it('should not allow submission with no input', () => {
    const closeFn = jest.fn();

    render(<AddCardForm type={ColumnType.ToDo} onClose={closeFn} />);
    const addBtn = screen.getByRole('button', { name: 'Add card' });
    userEvent.click(addBtn);
    expect(closeFn).toHaveBeenCalledTimes(0);
  });

  it('should submit the user input and then call close', () => {
    const addCardFn = jest.fn();
    (useAddCard as jest.Mock).mockReturnValue(addCardFn);
    const closeFn = jest.fn();
    render(<AddCardForm type={ColumnType.ToDo} onClose={closeFn} />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'Test input');

    const addBtn = screen.getByRole('button', { name: 'Add card' });
    userEvent.click(addBtn);

    expect(addCardFn).toHaveBeenCalledWith('Test input');
    expect(closeFn).toHaveBeenCalledTimes(1);
  });
});
