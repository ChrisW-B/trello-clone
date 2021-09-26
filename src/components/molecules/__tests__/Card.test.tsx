import { render, screen } from '@testing-library/react';

import Card from '../Card';

describe('Card tests', () => {
  it('should render a card with a title', () => {
    render(<Card title='Test Title' cardId='123' />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Title').parentElement).toHaveAttribute('draggable', 'true');
  });
});
